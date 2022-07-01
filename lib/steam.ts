class SteamClient {
	constructor(private _apiKey: string) {}
}

const apiKey = process.env.STEAM_WEB_API_KEY
export default new SteamClient(apiKey)
