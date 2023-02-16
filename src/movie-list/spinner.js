import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
)

const Spinner = () => <Spin className="movie-list__spinner" size="large" indicator={antIcon} />

export default Spinner
