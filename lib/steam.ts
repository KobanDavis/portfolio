export interface Game {
	appid: number
	img_icon_url: string
	name: string
	playtime_2weeks: number
	playtime_forever: number
	playtime_linux_forever: number
	playtime_mac_forever: number
	playtime_windows_forever: number
}

class SteamClient {
	public static STEAM_USER_ID = '76561198326427286'
	constructor(private _apiKey: string) {}

	public async getRecentlyPlayedGames(): Promise<Game[]> {
		const url =
			`http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/` +
			`?key=${this._apiKey}` +
			`&steamid=${SteamClient.STEAM_USER_ID}` +
			`&format=json`

		const res = await fetch(url).then((r) => r.json())
		return res.response.games
	}

	public async getUserProfile(): Promise<any> {
		const url =
			`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/` +
			`?key=${this._apiKey}` +
			`&steamids=${SteamClient.STEAM_USER_ID}` +
			'&format=json'

		const res = await fetch(url).then((r) => r.json())
		return res.response.players[0]
	}
}

const apiKey = process.env.STEAM_API_KEY
export default new SteamClient(apiKey)
