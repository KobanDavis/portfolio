import { FC, useRef } from 'react'
import { Bracket, Title } from 'components'
import GenreGraph, { Genre } from 'components/GenreGraph'
import ShadowCard from 'components/ShadowCard'
import getSpotifyClient from 'lib/spotify'
import steam, { Game } from 'lib/steam'
import Photo from 'components/Photo'

interface ProfileProps {
	me: SpotifyApi.CurrentUsersProfileResponse
	recentlyPlayed: SpotifyApi.TrackObjectFull[]
	genres: Genre[]
	recentGames: Game[]
	userProfile: any
}

const Profile: FC<ProfileProps> = ({ me, recentlyPlayed, genres, recentGames, userProfile }) => {
	const parentRef = useRef<HTMLDivElement>(null)
	return (
		<div ref={parentRef} className='max-h-screen w-full overflow-y-auto snap-mandatory snap-y'>
			<Title parent={parentRef}>Profile</Title>
			<div className='flex flex-col items-center'>
				<span className='text-4xl my-2 font-bold'>Hey!</span>
				<span>I'm Koban!</span>
				<div className='block'>
					<Photo />
				</div>
			</div>
			<Bracket label='Music'>
				<div className='flex self-end mb-6 items-center relative cursor-pointer select-none' onClick={() => open(me.external_urls.spotify, '_blank')}>
					<span className='font-bold'>{me.display_name}</span>
					<img className='h-8 w-8 ml-2 object-cover rounded-full' src={me.images[0].url} />
				</div>
				<span className='font-bold text-2xl mb-6 self-start'>Top tracks:</span>
				<div className='w-max grid grid-cols-3 mb-6 gap-6'>
					{recentlyPlayed.map((song) => (
						<ShadowCard key={song.id} onClick={() => window.open(song.external_urls.spotify, '_blank')}>
							<img className='h-11 w-11 mr-2' src={song.album.images[0].url} />
							<div className='flex flex-col text-sm'>
								<span className='font-semibold'>{song.name}</span>
								<span className='leading-tight'>{song.artists[0].name}</span>
							</div>
						</ShadowCard>
					))}
				</div>
				<span className='font-bold text-2xl mb-6 self-start'>
					Top Genres <span className='font-normal text-gray-400'>(by artist)</span>:
				</span>
				<GenreGraph scrollContainer={parentRef} className='h-48' genres={genres} />
			</Bracket>
			<Bracket label='Gaming'>
				<div className='flex self-end mb-6 items-center relative cursor-pointer select-none' onClick={() => open(userProfile.profileurl, '_blank')}>
					<span className='font-bold'>{userProfile.personaname}</span>
					<img className='h-8 w-8 ml-2 object-cover' src={userProfile.avatarfull} />
				</div>
				<span className='font-bold text-2xl mb-6 self-start'>Recently played games:</span>
				<div className='w-max grid grid-cols-3 gap-6'>
					{recentGames.map((game) => (
						<ShadowCard key={game.appid} onClick={() => window.open(`https://store.steampowered.com/app/${game.appid}`)}>
							<img
								className='h-11 w-11 mr-2'
								src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
							/>
							<div className='flex flex-col text-sm'>
								<span className='font-semibold '>{game.name}</span>
								<span className='leading-tight'>{Math.floor(game.playtime_forever / 60)}h</span>
							</div>
						</ShadowCard>
					))}
				</div>
			</Bracket>
			<span className='mb-8' />
		</div>
	)
}

export const getServerSideProps = async () => {
	const client = await getSpotifyClient()
	const [meRes, topTracksRes, artistsRes, recentGames, userProfile] = await Promise.all([
		client.getMe(),
		client.getMyTopTracks(),
		client.getMyTopArtists(),
		steam.getRecentlyPlayedGames(),
		steam.getUserProfile(),
	])

	const tracks = topTracksRes.body.items.slice(0, 9)

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
		.map(([name, popularity]) => ({ name, popularity }))

	return { props: { recentlyPlayed: tracks, genres, recentGames, userProfile, me: meRes.body } }
}

export default Profile
