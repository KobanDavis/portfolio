import { ShadowText } from 'components'
import getSpotifyClient from 'lib/spotify'
import steam, { Game } from 'lib/steam'
import { FC, useEffect, useState } from 'react'

interface HobbiesProps {
	recentlyPlayed: SpotifyApi.TrackObjectFull[]
	genres: [string, number][]
	recentGames: Game[]
	userProfile: any
}

const Hobbies: FC<HobbiesProps> = ({ recentlyPlayed, genres, recentGames, userProfile }) => {
	console.log(userProfile)
	const maxPopularity = genres[0][1]
	return (
		<div className='flex flex-col items-center justify-center w-full min-h-screen p-4 space-y-20'>
			<div className='flex'>
				<div className='flex items-center'>
					<span className='font-bold'>Music</span>
					<div className='h-0.5 w-4 ml-2 bg-black rounded-l-full' />
				</div>
				<div className='relative w-max flex items-center justify-center flex-col pl-12'>
					<div className='absolute top-0 left-0 h-full w-4 border-2 border-r-0 border-black  rounded-l-xl' />
					<span className='font-bold text-2xl mb-8'>Top tracks:</span>
					<div className='w-max grid grid-cols-3 gap-8'>
						{recentlyPlayed.map((song) => (
							<div
								key={song.id}
								className=' relative cursor-pointer select-none'
								onClick={() => window.open(song.external_urls.spotify, '_blank')}
							>
								<div className='border border-black transform -translate-x-2 -translate-y-2 hover:translate-x-0 hover:translate-y-0 transition-transform flex p-2 pr-4 bg-white'>
									<img className='h-12 w-12 mr-2' src={song.album.images[0].url} />
									<div className='flex flex-col'>
										<span className='font-semibold '>{song.name}</span>
										<span className='leading-tight'>{song.artists[0].name}</span>
									</div>
								</div>
								<div className='-z-10 absolute top-0 left-0 h-full w-full bg-white border border-black' />
							</div>
						))}
					</div>
					<span className='font-bold text-2xl my-8'>Top Genres:</span>
					<div className='w-max grid grid-cols-3 gap-8'>
						{genres.map(([genre, popularity], i) => (
							<Genre key={genre} genre={genre} percent={(popularity / maxPopularity) * 100} delay={i * 100} />
						))}
					</div>
				</div>
			</div>
			<div className='flex'>
				<div className='flex items-center'>
					<span className='font-bold'>Gaming</span>
					<div className='h-0.5 w-4 ml-2 bg-black rounded-l-full' />
				</div>
				<div className='relative w-max flex items-center justify-center flex-col pl-12'>
					<div className='absolute top-0 left-0 h-full w-4 border-2 border-r-0 border-black  rounded-l-xl' />
					<div className=' relative cursor-pointer select-none' onClick={() => open(userProfile.profileurl, '_blank')}>
						<div className='my-4 transform -translate-x-2 -translate-y-2 hover:translate-x-0 hover:translate-y-0 transition-transform flex items-center'>
							<img className='h-12 w-12 mr-2' src={userProfile.avatarfull} />
							<div className='flex flex-col'>
								<ShadowText size={32} offset={2}>
									{userProfile.personaname}
								</ShadowText>
								<span className='leading-tight'></span>
							</div>
						</div>
					</div>
					<span className='font-bold text-2xl mb-8'>Recently played games:</span>
					<div className='w-max grid grid-cols-3 gap-8'>
						{recentGames.map((game) => (
							<div
								key={game.appid}
								className=' relative cursor-pointer select-none'
								onClick={() => window.open(`https://store.steampowered.com/app/${game.appid}`)}
							>
								<div className='border border-black transform -translate-x-2 -translate-y-2 hover:translate-x-0 hover:translate-y-0 transition-transform flex p-2 pr-4 bg-white'>
									<img
										className='h-12 w-12 mr-2'
										src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
									/>
									<div className='flex flex-col'>
										<span className='font-semibold '>{game.name}</span>
										<span className='leading-tight'>{Math.floor(game.playtime_forever / 60)}h</span>
									</div>
								</div>
								<div className='-z-10 absolute top-0 left-0 h-full w-full bg-white border border-black' />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

interface GenreProps {
	percent: number
	genre: string
	delay: number
}

const Genre: FC<GenreProps> = ({ genre, percent, delay }) => {
	const [hasMounted, setHasMounted] = useState<boolean>(false)

	useEffect(() => {
		setTimeout(setHasMounted, 0, true)
	}, [])

	return (
		<div className='relative select-none'>
			<div className='border border-black transform -translate-x-2 -translate-y-2 hover:translate-x-0 hover:translate-y-0 transition-transform flex p-2 pr-4 bg-white'>
				<span className='font-semibold '>{genre}</span>
				<div
					style={{
						width: (hasMounted ? percent : 0) + '%',
						transitionDelay: delay + 'ms',
					}}
					className='duration-500 flex transition-[width] h-full w-full absolute top-0 left-0 font-semibold bg-black text-white overflow-hidden whitespace-nowrap'
				>
					<span className='p-2 pr-4'>{genre}</span>
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps = async () => {
	const client = await getSpotifyClient()
	const [topTracksRes, artistsRes, recentGames, userProfile] = await Promise.all([
		client.getMyTopTracks(),
		client.getMyTopArtists(),
		steam.getRecentlyPlayedGames(),
		steam.getUserProfile(),
	])

	const items = topTracksRes.body.items.map((item) => item) as SpotifyApi.TrackObjectFull[]
	const tracks = items.slice(0, 9)

	const genres = Object.entries(
		artistsRes.body.items.reduce((genres, artist) => {
			artist.genres.forEach((genre) => {
				if (genre in genres) {
					genres[genre]++
				} else {
					genres[genre] = 1
				}
			})
			return genres
		}, {} as Record<string, number>)
	)
		.sort((a, b) => (a[1] > b[1] ? -1 : 1))
		.slice(0, 9)

	return { props: { recentlyPlayed: tracks, genres, recentGames, userProfile } }
}

export default Hobbies
