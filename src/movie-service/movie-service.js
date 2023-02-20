export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3'
  _apiKey = 'api_key=d6688323256dcc39ced9f689bcc6e0bd'

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`)

    return await res.json()
  }

  async startPage() {
    const res = await this.getResource(`/trending/all/day?${this._apiKey}`)
    return res
  }

  async searchMovies(query, page = 1) {
    const res = await this.getResource(
      `/search/movie?${this._apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`
    )
    return res
  }
}
