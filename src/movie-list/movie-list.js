import React from 'react'

import './movie-list.css'
import Movie from '../movie/movie'

import Spinner from './spinner'
import ErrorAlert from './error-alert'

const MovieList = ({ menuSelected, guestToken, moviesData, isLoaded, error }) => {
  const elements = moviesData.map(({ id, ...items }) => <Movie guestToken={guestToken} id={id} key={id} {...items} />)

  const hasData = isLoaded || !error
  const emptyData = isLoaded && moviesData.length === 0 && !error

  const errorMessage = error ? <ErrorAlert /> : null
  const content = hasData ? elements : null
  const spinner = !isLoaded ? <Spinner /> : null
  const noResult =
    emptyData && menuSelected !== 'rated' ? (
      <span className="movie-list__no-result">Search was inconclusive...</span>
    ) : null
  const emptyRated =
    emptyData && menuSelected === 'rated' ? (
      <span className="movie-list__empty-rated">Your rated list is empty...</span>
    ) : null

  return (
    <div className="movie-list">
      {content}
      {spinner}
      {errorMessage}
      {noResult}
      {emptyRated}
    </div>
  )
}

export default MovieList
