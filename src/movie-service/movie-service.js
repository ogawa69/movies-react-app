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

  async getGenre() {
    const genres = await this.getResource(`/genre/movie/list?${this._apiKey}&language=en-US`)
    return genres.genres
  }

  async getGuestToken() {
    const res = this.getResource(`/authentication/guest_session/new?${this._apiKey}`)
    return res
  }

  async rateMovie(movieId, rate) {
    const guestToken = JSON.parse(localStorage.getItem('guestToken'))
    const rateObj = {
      value: rate,
    }
    await fetch(`${this._apiBase}/movie/${movieId}/rating?${this._apiKey}&guest_session_id=${guestToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(rateObj),
    })
  }

  async getRatedMovie(token) {
    const res = this.getResource(
      `/guest_session/${token}/rated/movies?${this._apiKey}&language=en-US&sort_by=created_at.asc`
    )
    return res
  }
}
