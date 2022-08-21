import getSpotifyClient from 'lib/spotify'
import { FC } from 'react'

interface HobbiesProps {
	recentlyPlayed: SpotifyApi.TrackObjectFull[]
}

const Hobbies: FC<HobbiesProps> = ({ recentlyPlayed }) => {
	console.log()
	return (
		<div className='flex items-center justify-center w-full flex-col h-screen'>
			<span className='font-bold text-2xl mb-8'>Top tracks:</span>
			<div className='w-max grid grid-cols-3 gap-8'>
				{recentlyPlayed.map((song) => (
					<div className=' relative cursor-pointer select-none' onClick={() => window.open(song.external_urls.spotify, '_blank')}>
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
		</div>
	)
}

export const getServerSideProps = async () => {
	const client = await getSpotifyClient()
	const response = await client.getMyTopTracks()
	const items = response.body.items.map((item) => item) as SpotifyApi.TrackObjectFull[]

	const tracks = items.slice(0, 9)

	return { props: { recentlyPlayed: tracks } }
}

export default Hobbies
