import React from 'react'
import { Alert } from 'antd'

import './MovieList.css'
import Movie from '../Movie/Movie'
import Spinner from '../Spinner'

const MovieList = ({ menuSelected, guestToken, moviesData, isLoaded, error }) => {
  const elements = moviesData.map(({ id, ...items }) => <Movie guestToken={guestToken} id={id} key={id} {...items} />)

  let count = 0

  const hasData = isLoaded || !error
  const emptyData = isLoaded && moviesData.length === 0 && !error

  const errorMessage = error ? (
    <Alert
      className="movie-list__error-alert"
      message="Error"
      description="Something went wrong..."
      type="error"
      showIcon
    />
  ) : null
  const content = hasData ? elements : null
  const plsType = !isLoaded && count === 0 ? <span className="movie-list__alert">Please type to search...</span> : null
  const spinner = !isLoaded && count > 0 ? <Spinner /> : null
  const noResult =
    emptyData && menuSelected !== 'rated' ? <span className="movie-list__alert">Search was inconclusive...</span> : null
  const emptyRated =
    emptyData && menuSelected === 'rated' ? (
      <span className="movie-list__alert">Your rated list is empty...</span>
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
