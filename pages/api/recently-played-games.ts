export default async (_, res) => {
	const url =
		`http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/` +
		`?key=${process.env.STEAM_API_KEY}` +
		`&steamid=${process.env.STEAM_USER_ID}` +
		`&format=json`

	const data = await fetch(url).then((r) => r.json())

	return res.status(200).json(data)
}
