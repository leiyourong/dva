import React, { Component } from 'react'
import { connect } from 'dva'
import Notice from '@/components/Notice'

@connect(state => {
  return {
    receiveList: state.notice.receiveList
  }
})
export default class extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch({type: 'notice/fetch', payload: {id: 123} })
  }
  render () {
    const { receiveList = [] } = this.props
    return <div className="notice-list">
      {
        receiveList.map(notice => <Notice key={notice.id} {...notice} />)
      }
    </div>
  }
}
