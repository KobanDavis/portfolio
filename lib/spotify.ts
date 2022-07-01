import SpotifyWebApi from 'spotify-web-api-node'

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

const spotify = new SpotifyWebApi({ clientId, clientSecret, refreshToken })

export default async function getSpotifyClient() {
	const res = await spotify.refreshAccessToken()
	spotify.setAccessToken(res.body.access_token)
	return spotify
}
