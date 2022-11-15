/// <reference lib="dom" />

import dotenv from 'dotenv'
import open from 'open'
import http from 'http'
import qs from 'querystring'

dotenv.config()

const port = 3000
const redirect_uri = `http://localhost:${port}`

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env

const scopes = ['user-read-currently-playing', 'user-top-read']
const codeUrl =
	`https://accounts.spotify.com/authorize?` +
	`client_id=${SPOTIFY_CLIENT_ID}` +
	`&response_type=code` +
	`&redirect_uri=${redirect_uri}` +
	`&scope=${scopes.join(' ')}`

const codePromise = new Promise<string>((resolve) => {
	open(codeUrl)
	console.log('A window has been opened in the browser to authenticate against spotify.')
	const server = http.createServer((req, res) => {
		const url = new URL(req.url!, redirect_uri)
		res.write('You can close this window now.')
		resolve(url.searchParams.get('code')!)
		res.end()
		server.close()
	})

	server.listen(port)
})

codePromise.then(async (code) => {
	const url = `https://accounts.spotify.com/api/token`
	const creds = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')
	const res = await fetch(url, {
		method: 'POST',
		body: qs.stringify({
			grant_type: 'authorization_code',
			code,
			redirect_uri,
		}),
		headers: {
			Authorization: `Basic ${creds}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then((res) => res.json())
	console.log(res.refresh_token)
})
