import { FC, useRef } from 'react'
import { Bracket } from 'components'
import GenreGraph, { Genre } from 'components/GenreGraph'
import ShadowCard from 'components/ShadowCard'
import getSpotifyClient from 'lib/spotify'
import steam, { Game } from 'lib/steam'
import Photo from 'components/Photo'
import Fade from 'components/Fade'

interface ProfileProps {
	me: SpotifyApi.CurrentUsersProfileResponse
	topTracks: SpotifyApi.TrackObjectFull[]
	recentTracks: SpotifyApi.TrackObjectFull[]
	genres: Genre[]
	recentGames: Game[]
	userProfile: any
}

const Profile: FC<ProfileProps> = ({ me, topTracks, recentTracks, genres, recentGames, userProfile }) => {
	return (
		<>
			<div className='flex justify-around items-center min-h-screen'>
				<div className='flex flex-col w-max ml-4 overflow-hidden max-w-xl'>
					<Fade className='text-4xl py-2'>
						Hey! I'm <span className='font-bold'>Koban,</span>
					</Fade>
					<Fade className='text-2xl' delay={100}>
						a web developer based in the UK.
					</Fade>
					<Fade className='text-xl mt-2 font-light' delay={200}>
						I enjoy listening to music, gaming, basketball and breaking several bones skateboarding. Below you can see what I've been up to in my
						free time!
					</Fade>
				</div>
				<Photo />
			</div>
			<Bracket label='Music'>
				<div className='flex self-end mb-6 items-center relative cursor-pointer select-none' onClick={() => open(me.external_urls.spotify, '_blank')}>
					<span className='font-bold'>{me.display_name}</span>
					<img className='h-8 w-8 ml-2 object-cover rounded-full' src={me.images[0].url} />
				</div>
				<span className='font-bold text-2xl mb-6 self-start'>Top tracks:</span>
				<div className='w-max grid grid-cols-3 mb-6 gap-6'>
					{topTracks.map((song, i) => (
						<ShadowCard className='w-80' delay={(i % 3) * 100} key={song.id} onClick={() => window.open(song.external_urls.spotify, '_blank')}>
							<img className='h-11 w-11 mr-2' src={song.album.images[0].url} />
							<div className='flex flex-col min-w-0 text-sm'>
								<div className='font-semibold truncate'>{song.name}</div>
								<span className='leading-tight'>{song.artists[0].name}</span>
							</div>
						</ShadowCard>
					))}
				</div>

				<span className='font-bold text-2xl mb-6 self-start'>
					Top Genres <span className='font-normal text-gray-400'>(by artist)</span>:
				</span>
				<GenreGraph className='h-48 mb-6' genres={genres} />
				<span className='font-bold text-2xl mb-6 self-start'>Recent tracks:</span>
				<div className='w-max grid grid-cols-3 gap-6'>
					{recentTracks.map((song, i) => (
						<ShadowCard className='w-80' delay={(i % 3) * 100} key={song.id} onClick={() => window.open(song.external_urls.spotify, '_blank')}>
							<img className='h-11 w-11 mr-2' src={song.album.images[0].url} />
							<div className='flex flex-col min-w-0 text-sm'>
								<div className='font-semibold truncate'>{song.name}</div>
								<span className='leading-tight'>{song.artists[0].name}</span>
							</div>
						</ShadowCard>
					))}
				</div>
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
		</>
	)
}

export const getServerSideProps = async () => {
	const client = await getSpotifyClient()
	const [meRes, topTracksRes, artistsRes, recentTracksRes, recentGames, userProfile] = await Promise.all([
		client.getMe(),
		client.getMyTopTracks(),
		client.getMyTopArtists(),
		client.getMyRecentlyPlayedTracks(),
		steam.getRecentlyPlayedGames(),
		steam.getUserProfile(),
	])

	const topTracks = topTracksRes.body.items.slice(0, 9)
	const recentTracks = recentTracksRes.body.items.slice(0, 9).map(({ track }) => track) as SpotifyApi.TrackObjectFull[]

	const genres = Object.entries(
		artistsRes.body.items.reduce<Record<string, number>>((genres, artist) => {
			artist.genres.forEach((genre) => {
				if (genre in genres) {
					genres[genre]++
				} else {
					genres[genre] = 1
				}
			})
			return genres
		}, {})
	)
		.sort((a, b) => (a[1] > b[1] ? -1 : 1))
		.slice(0, 9)
		.map(([name, popularity]) => ({ name, popularity }))

	return { props: { topTracks, recentTracks, genres, recentGames, userProfile, me: meRes.body } }
}

export default Profile
