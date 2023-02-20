import React from 'react'

import './movie-list.css'
import Movie from '../movie/movie'

import Spinner from './spinner'
import ErrorAlert from './error-alert'

const MovieList = ({ moviesData, isLoaded, error }) => {
  const elements = moviesData.map(({ id, ...items }) => <Movie key={id} {...items} />)

  const hasData = isLoaded || !error
  const emptyData = isLoaded && moviesData.length === 0 && !error

  const errorMessage = error ? <ErrorAlert /> : null
  const content = hasData ? elements : null
  const spinner = !isLoaded ? <Spinner /> : null
  const noResult = emptyData ? <span className="movie-list__no-result">Search was inconclusive...</span> : null

  return (
    <div className="movie-list">
      {content}
      {spinner}
      {errorMessage}
      {noResult}
    </div>
  )
}

export default MovieList
