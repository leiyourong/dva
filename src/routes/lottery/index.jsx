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
      prizes: props.prizes || []
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

  componentDidMount () {
    const { dispatch } = this.props
    dispatch({ type: 'lottery/fetch' })
  }

  noWebWork = () => {
    var t = Date.now()
    var result = []
    console.log(`startFetch: ${Date.now() - t}`)
    fetch('http://localhost:8000').then(data => {
      console.log(`insideFetch: ${Date.now() - t}`)
    })
    // 耗时操作-start 寻找1000000个随机数中的中位数
    for (let index = 0; index < 1000000; index++) {
      result.push(Math.random() * 1000000)
    }
    result.sort()
    result = result[Math.floor(result.length / 2)]
    // 耗时操作-结束
    this.setState({
      result
    })
  }

  withWebWork = () => {
    if (!Worker) {
      return
    }
    var t = Date.now()
    var self = this
    var work = new Worker('./worker.js')
    console.log(`afterFor: ${Date.now() - t}`)
    console.log(`startFetch: ${Date.now() - t}`)
    fetch('http://localhost:8000').then(data => {
      console.log(`insideFetch: ${Date.now() - t}`)
    })
    work.onmessage = result => {
      console.log(`insideMsg: ${Date.now() - t}`)
      self.setState({
        result
      }, () => {
        work.terminate()
      })
    }
  }

  render () {
    let { prizes, result } = this.state
    return <div>
      <div className={style.lottery}>
        {
          prizes.map((prize, index) => <div ref={index} key={index} className={`${style.card}`} onClick={this.openCard}>
            <div className={`${style.front} ${style.cardItem}`}></div>
            <div className={`${style.back} ${style.cardItem}`}>{prize}</div>
          </div>)
        }
      </div>
      {result}
      <div className={style.action}>
        <Button type='primary' onClick={this.resetLottery}>重置</Button>
        <Button type='primary' onClick={this.noWebWork}>NoWebWork</Button>
        <Button type='primary' onClick={this.withWebWork}>WithWebWork</Button>
      </div>
    </div>
  }
}
