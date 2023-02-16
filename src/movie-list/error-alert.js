import React from 'react'
import { Alert } from 'antd'

const ErrorAlert = () => (
  <Alert
    className="movie-list__error-alert"
    message="Error"
    description="Something went wrong..."
    type="error"
    showIcon
  />
)

export default ErrorAlert
