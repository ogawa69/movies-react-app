import React, { Component } from 'react'
import { Offline } from 'react-detect-offline'
import { Menu, Alert } from 'antd'
import './App.css'

import MovieService from '../../services/movie-service'
import MovieList from '../MovieList'
import SearchPanel from '../SearchPanel'
import PaginationPanel from '../PagintationPanel'
import { MovieServiceGenresProvider } from '../../context'

export default class App extends Component {
  movieService = new MovieService()

  state = {
    guestToken: null,
    menuSelected: 'search',
    searchValue: null,
    isLoaded: false,
    items: [],
    tags: [],
    currPage: 1,
    pages: null,
    error: null,
  }

  componentDidMount() {
    const prevGuestToken = JSON.parse(localStorage.getItem('guestToken'))
    if (prevGuestToken) {
      this.setState({
        guestToken: prevGuestToken,
      })
    }
    if (!prevGuestToken) {
      this.movieService.getGuestToken().then(this.onGuestSessionLoaded, (err) => console.log(err))
    }
    this.movieService.getGenre().then(this.onTagsLoaded, (err) => console.log(err))
  }

  onDataLoaded = (res) => {
    this.setState({
      isLoaded: true,
      items: res.results,
      pages: res.total_pages,
      error: false,
    })
  }

  onDataError = () => {
    this.setState({
      isLoaded: true,
      items: [],
      pages: null,
      error: true,
    })
  }

  onTagsLoaded = (res) => {
    this.setState({
      tags: res,
    })
  }

  onGuestSessionLoaded = (res) => {
    this.setState({
      guestToken: res.guest_session_id,
    })
    localStorage.setItem('guestToken', JSON.stringify(res.guest_session_id))
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

  changeMenuSelected = (e) => {
    this.setState({ menuSelected: e.key })
    if (e.key === 'rated') {
      this.movieService.getRatedMovie(this.state.guestToken).then(this.onDataLoaded, this.onDataError)
    }
  }

  render() {
    const { guestToken, menuSelected, searchValue, items, tags, currPage, pages, isLoaded, error } = this.state
    const menuItems = [
      {
        label: 'Search',
        key: 'search',
      },
      {
        label: 'Rated',
        key: 'rated',
      },
    ]

    return (
      <div className="container">
        <Menu
          className="menu"
          mode="horizontal"
          onClick={this.changeMenuSelected}
          selectedKeys={menuSelected}
          items={menuItems}
        />
        <SearchPanel
          menuSelected={menuSelected}
          getData={this.getData}
          changeSearchValue={this.changeSearchValue}
          searchValue={searchValue}
        />
        <MovieServiceGenresProvider value={tags}>
          <MovieList
            menuSelected={menuSelected}
            guestToken={guestToken}
            moviesData={items}
            isLoaded={isLoaded}
            error={error}
          />
        </MovieServiceGenresProvider>

        <PaginationPanel
          searchValue={searchValue}
          currPage={currPage}
          pages={pages}
          getData={this.getData}
          changeCurrPage={this.changeCurrPage}
        />
        <Offline>
          <Alert
            className="warning-alert"
            message="Warning"
            description="Internet connection is lost..."
            type="warning"
            showIcon
            closable
          />
        </Offline>
      </div>
    )
  }
}
