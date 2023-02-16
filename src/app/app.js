import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import './app.css'

import MovieService from '../movie-service'
import MovieList from '../movie-list'

import NoInternet from './no-internet'

export default class App extends Component {
  movieService = new MovieService()

  state = {
    isLoaded: false,
    items: [],
    error: null,
  }

  constructor() {
    super()
    this.getData()
  }

  onDataLoaded = (res) => {
    this.setState({
      isLoaded: true,
      items: res,
      error: false,
    })
  }

  onError = () => {
    this.setState({
      isLoaded: true,
      items: [],
      error: true,
    })
  }

  async getData() {
    this.movieService.searchMovies('wolf').then(this.onDataLoaded).catch(this.onError)
  }

  render() {
    const { items, isLoaded, error } = this.state

    return (
      <div className="container">
        <Online>
          <MovieList getData={items} isLoaded={isLoaded} error={error} />
        </Online>
        <Offline>
          <NoInternet />
        </Offline>
      </div>
    )
  }
}
