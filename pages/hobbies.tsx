import { getRecentlyPlayed } from 'lib/spotify'
import { FC } from 'react'
import recentlyPlayed from './api/recently-played'

interface HobbiesProps {
	recentlyPlayed: any[]
}

const Hobbies: FC<HobbiesProps> = ({ recentlyPlayed }) => {
	return (
		<div>
			{recentlyPlayed.map((song) => (
				<div>{song.title}</div>
			))}
		</div>
	)
}

export const getServerSideProps = async () => {
	const response = await getRecentlyPlayed()
	const { items } = await response.json()

	const tracks = items.slice(0, 10).map(({ track }) => ({
		artist: track.artists.map((_artist) => _artist.name).join(', '),
		songUrl: track.external_urls.spotify,
		title: track.name,
	}))

	return {
		props: {
			recentlyPlayed: tracks,
		},
	}
}

export default Hobbies
