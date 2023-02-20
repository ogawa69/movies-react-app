import React, { Component } from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'

import './search-panel.css'

export default class SearchPanel extends Component {
  componentDidUpdate(prevProps) {
    const { searchValue } = this.props
    if (prevProps.searchValue !== searchValue) {
      this.debouncedGetData()
    }
  }

  debouncedGetData = debounce(() => this.props.getData(this.props.searchValue), 1000)

  render() {
    const { searchValue, changeSearchValue } = this.props

    return (
      <Input
        className="search-panel"
        placeholder="Type to search..."
        value={searchValue}
        onChange={changeSearchValue}
      />
    )
  }
}
