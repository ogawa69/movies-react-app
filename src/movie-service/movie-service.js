export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3'
  _apiKey = 'api_key=d6688323256dcc39ced9f689bcc6e0bd'

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`)

    return await res.json()
  }

  async searchMovies(value) {
    const res = await this.getResource(
      `/search/movie?${this._apiKey}&language=en-US&query=${value}&page=1&include_adult=false`
    )
    return res.results
  }
}
