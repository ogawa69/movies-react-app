import React from 'react'

import './movie-list.css'
import Movie from '../movie/movie'

const MovieList = ({ getData: moviesData }) => {
  const elements = moviesData.map(({ id, ...items }) => {
    return <Movie key={id} {...items} />
  })

  return <div className="movie-list">{elements}</div>
}

export default MovieList
