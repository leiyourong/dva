import React, { Component } from 'react'
import { connect } from 'dva'

@connect(state => {
  return {
    receiveList: state.notice.receiveList
  }
})
export default class extends Component {
  render () {
    console.log(props)
    return <div>123</div>
  }
}
