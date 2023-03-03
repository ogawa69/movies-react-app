import React from 'react'

import './movie-list.css'
import Movie from '../movie/movie'

import Spinner from './spinner'
import ErrorAlert from './error-alert'

const MovieList = ({ menuSelected, guestToken, moviesData, isLoaded, error }) => {
  const elements = moviesData.map(({ id, ...items }) => <Movie guestToken={guestToken} id={id} key={id} {...items} />)
  let count = 0
  const hasData = isLoaded || !error
  const emptyData = isLoaded && moviesData.length === 0 && !error

  const errorMessage = error ? <ErrorAlert /> : null
  const content = hasData ? elements : null
  const plsType =
    !isLoaded && count === 0 ? <span className="movie-list__no-result">Please type to search...</span> : null
  const spinner = !isLoaded && count > 0 ? <Spinner /> : null
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
      {plsType}
      {spinner}
      {errorMessage}
      {noResult}
      {emptyRated}
    </div>
  )
}

export default MovieList
