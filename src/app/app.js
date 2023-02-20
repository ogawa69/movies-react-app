import React, { Component } from 'react'
import { Offline } from 'react-detect-offline'
import './app.css'

import MovieService from '../movie-service'
import MovieList from '../movie-list'
import SearchPanel from '../search-panel'
import PaginationPanel from '../pagination-panel'

import NoInternet from './no-internet'

export default class App extends Component {
  movieService = new MovieService()

  state = {
    searchValue: null,
    isLoaded: false,
    items: [],
    currPage: 1,
    pages: null,
    error: null,
  }

  componentDidMount() {
    this.movieService.startPage().then(this.onDataLoaded, this.onError)
  }

  onDataLoaded = (res) => {
    this.setState({
      isLoaded: true,
      items: res.results,
      pages: res.total_pages,
      error: false,
    })
  }

  onError = () => {
    this.setState({
      isLoaded: true,
      items: [],
      pages: null,
      error: true,
    })
  }

  getData = (string, page) => {
    if (string) {
      this.setState({ searchValue: string })
      this.movieService.searchMovies(string, page).then(this.onDataLoaded, this.onError)
    }
  }

  changeSearchValue = (e) => {
    this.setState({
      searchValue: e.target.value,
      isLoaded: false,
      items: [],
      pages: null,
      error: null,
    })
  }

  changeCurrPage = (page) => {
    this.setState({
      currPage: page,
    })
  }

  render() {
    const { searchValue, items, currPage, pages, isLoaded, error } = this.state
    return (
      <div className="container">
        <SearchPanel getData={this.getData} changeSearchValue={this.changeSearchValue} searchValue={searchValue} />
        <MovieList moviesData={items} isLoaded={isLoaded} error={error} />
        <PaginationPanel
          searchValue={searchValue}
          currPage={currPage}
          pages={pages}
          getData={this.getData}
          changeCurrPage={this.changeCurrPage}
        />
        <Offline>
          <NoInternet />
        </Offline>
      </div>
    )
  }
}
