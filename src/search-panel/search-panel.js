import React, { Component } from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'
import classNames from 'classnames'

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
    const { menuSelected, searchValue, changeSearchValue } = this.props
    const searchPanelClassName = classNames('search-panel', { hidden: menuSelected !== 'search' })

    return (
      <Input
        className={searchPanelClassName}
        placeholder="Type to search..."
        value={searchValue}
        onChange={changeSearchValue}
      />
    )
  }
}
