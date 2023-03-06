import React, { Component } from 'react'
import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import './Movie.css'
import { Progress, Rate, Tag, Typography } from 'antd'
import { StarFilled } from '@ant-design/icons'

import MovieService from '../../services/movie-service'
import { MovieServiceGenresConsumer } from '../../context'
const { Paragraph } = Typography

export default class Movie extends Component {
  movieService = new MovieService()

  state = {
    rate: 0,
  }

  componentDidMount() {
    this.getMovieRate()
  }

  cutOverview = (string) => {
    if (string) {
      const arr = string.split(' ')
      const res = arr.reduce((acc, cur) => (acc.length < 85 ? acc + ' ' + cur : acc))
      return res.length < 85 ? res : res + ' ...'
    }
  }
  colorRate = (rate) => {
    if (rate < 3) {
      return '#E90000'
    }
    if (rate >= 3 && rate < 5) {
      return '#E97E00'
    }
    if (rate >= 5 && rate < 7) {
      return '#E9D100'
    }
    if (rate >= 7) {
      return '#66E900'
    }
  }

  createTags = (list, items) => {
    if (items) {
      let res = []
      list.forEach((el) => {
        items.forEach((itemArr) => {
          if (el.id === itemArr) {
            res.push(el.name)
          }
        })
      })

      return res.map((el) => (
        <Tag key={uuidv4()} className="card__tag">
          {el}
        </Tag>
      ))
    } else {
      return null
    }
  }

  onChangeRateMovie = (rate) => {
    const { id } = this.props
    this.movieService.rateMovie(id, rate)
    const prevRateData = JSON.parse(localStorage.getItem('rateData'))
    const newRateData = { id: id, rate: rate }
    if (!prevRateData) {
      const res = []
      res.push(newRateData)
      localStorage.setItem('rateData', JSON.stringify(res))
    }
    if (prevRateData) {
      let count = 0
      const res = prevRateData.map((el) => {
        if (el.id === id) {
          count++
          return { ...el, rate: rate }
        } else {
          return el
        }
      })
      if (count === 0) {
        res.push(newRateData)
      }
      localStorage.setItem('rateData', JSON.stringify(res))
    }
    return this.getMovieRate()
  }

  getMovieRate = () => {
    const rateData = JSON.parse(localStorage.getItem('rateData'))
    if (rateData) {
      rateData.forEach((el) => {
        if (el.id === this.props.id) {
          this.setState({
            rate: el.rate,
          })
        }
      })
    }
  }

  render() {
    const { title, release_date = '', overview, poster_path, vote_average, genre_ids } = this.props
    const { rate } = this.state

    const releaseDate = release_date.length ? format(new Date(release_date), 'MMMM dd, yyyy') : ''

    const rateCircle = Number(vote_average * 10)

    return (
      <div className="card">
        <img className="card__img" src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
        <div className="card__description">
          <span className="card__tittle">
            {title}
            <Progress
              type="circle"
              width={30}
              style={{ marginLeft: 'auto' }}
              percent={rateCircle}
              format={(rateCircle) => (rateCircle / 10).toFixed(1)}
              strokeColor={this.colorRate(rateCircle / 10)}
            />
          </span>
          <Paragraph className="card__release-date" style={{ marginBottom: 7 }}>
            {releaseDate}
          </Paragraph>
          <MovieServiceGenresConsumer>
            {(tags) => {
              return <div className="card__tags">{this.createTags(tags, genre_ids)}</div>
            }}
          </MovieServiceGenresConsumer>
          <Paragraph className="card__movie-description" style={{ marginBottom: 0 }}>
            {this.cutOverview(overview)}
          </Paragraph>
          <Rate
            className="card__rated"
            character={<StarFilled className="star" />}
            count={10}
            onChange={this.onChangeRateMovie}
            value={rate}
          ></Rate>
        </div>
      </div>
    )
  }
}
