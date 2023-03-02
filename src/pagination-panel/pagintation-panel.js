import React, { Component } from 'react'
import { Pagination } from 'antd'
import './pagination-panel.css'

export default class PaginationPanel extends Component {
  componentDidUpdate(prevProps) {
    const { searchValue, currPage, getData } = this.props
    if (prevProps.currPage !== currPage) {
      getData(searchValue, currPage)
    }
  }

  render() {
    const { changeCurrPage, currPage, pages } = this.props

    return (
      <Pagination
        className="pagination"
        onChange={(page) => changeCurrPage(page)}
        defaultCurrent={currPage}
        total={pages * 10}
        showSizeChanger={false}
      />
    )
  }
}
