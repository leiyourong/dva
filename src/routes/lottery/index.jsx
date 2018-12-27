import { Component } from 'react'
import { Button } from 'antd'
import { connect } from 'dva'
import shuffle from 'lodash/shuffle'
import style from './index.less'

@connect(state => {
  return {
    prizes: state.lottery.prizes
  }
})
export default class Lottery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      prizes: []
    }
  }

  openCard = e => {
    e.currentTarget.classList.add(style.open)
  }

  clearOpen = () => {
    Object.keys(this.refs).forEach(key => {
      this.refs[key].classList.remove(style.open)
    })
  }

  openAll = () => {
    Object.keys(this.refs).forEach(key => {
      this.refs[key].classList.add(style.open)
    })
  }

  resetLottery = () => {
    this.clearOpen()
    let { prizes } = this.state
    this.setState({
      prizes: shuffle(prizes)
    })
  }

  UNSAFE_componentWillReceiveProps (props) {
    this.setState({
      prizes: shuffle(props.prizes)
    })
  }

  render () {
    let { prizes } = this.state
    return <div>
      <div className={style.lottery}>
        {
          prizes.map((prize, index) => <div ref={index} key={index} className={`${style.card}`} onClick={this.openCard}>
            <div className={`${style.front} ${style.cardItem}`}></div>
            <div className={`${style.back} ${style.cardItem}`}>{prize}</div>
          </div>)
        }
      </div>
      <div className={style.action}>
        <Button type='primary' onClick={this.resetLottery}>重置</Button>
      </div>
    </div>
  }
}
