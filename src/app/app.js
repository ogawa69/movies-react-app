import React, { Component } from 'react'
import './app.css'

import MovieService from '../movie-service'
import MovieList from '../movie-list'

export default class App extends Component {
  movieService = new MovieService()

  state = {
    items: [],
  }

  constructor() {
    super()
    this.getData()
  }

  async getData() {
    this.movieService.searchMovies('wolf').then((res) =>
      this.setState({
        items: res,
      })
    )
  }

  render() {
    return (
      <div className="container">
        <MovieList getData={this.state.items} />
      </div>
    )
  }
}
