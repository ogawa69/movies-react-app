import React from 'react'
import { Alert } from 'antd'

const NoInternet = () => (
  <Alert
    className="warning-alert"
    message="Warning"
    description="Internet connection is lost..."
    type="warning"
    showIcon
    closable
  />
)

export default NoInternet
