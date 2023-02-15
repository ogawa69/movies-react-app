import React, { Component } from 'react'
import { format } from 'date-fns'
import './movie.css'
import Card from 'antd/es/card/Card'
import { Image, Tag, Typography } from 'antd'
const { Title, Paragraph } = Typography

export default class Movie extends Component {
  render() {
    const { title, release_date, overview, poster_path } = this.props
    const releaseDate = format(new Date(release_date), 'MMMM dd, yyyy')
    const cutOverview = (string) => {
      if (string) {
        const arr = string.split(' ')
        const res = arr.reduce((acc, cur) => (acc.length < 215 ? acc + ' ' + cur : acc))
        return res.length < 215 ? res : res + ' ...'
      }
    }

    return (
      <Card
        className="card"
        cover={
          <Image
            className="card__img"
            width={183}
            height={281}
            style={{ borderRadius: 0 }}
            preview={false}
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          />
        }
      >
        <Title level={5} className="card__tittle" style={{ marginBottom: 0 }}>
          {title}
        </Title>
        <Paragraph className="card__release-date" style={{ marginBottom: 5 }}>
          {releaseDate}
        </Paragraph>
        <Tag className="card__tag">Action</Tag>
        <Tag>Drama</Tag>
        <Paragraph className="card__description">{cutOverview(overview)}</Paragraph>
      </Card>
    )
  }
}
