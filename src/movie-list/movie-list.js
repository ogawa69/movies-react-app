import React from 'react'

import './movie-list.css'
import Movie from '../movie/movie'

import Spinner from './spinner'
import ErrorAlert from './error-alert'

const MovieList = ({ getData: moviesData, isLoaded, error }) => {
  const elements = moviesData.map(({ id, ...items }) => <Movie key={id} {...items} />)

  const hasData = isLoaded || !error

  const errorMessage = error ? <ErrorAlert /> : null
  const content = hasData ? elements : null
  const spinner = !isLoaded ? <Spinner /> : null

  return (
    <div className="movie-list">
      {content}
      {spinner}
      {errorMessage}
    </div>
  )
}

export default MovieList
