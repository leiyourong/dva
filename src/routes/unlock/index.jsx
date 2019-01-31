import { Component } from 'react'
import style from './index.less'
import { Button } from 'antd'

export default class GestureUnlock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tapArr: []
    }
  }
  getContext() {
    this.canvas = document.getElementById('gestureUnlock')
    this.canvas.width = '300'
    this.canvas.height = '300'
    this.ctx = this.canvas.getContext('2d')
  }

  bindEvent () {
    const hastouch = 'ontouchstart' in window ? true : false,
      tapstart = hastouch ? 'touchstart' : 'mousedown',
      tapmove = hastouch ? 'touchmove' : 'mousemove',
      tapend = hastouch ? 'touchend' : 'mouseup',
      self = this,
      canvas = self.canvas

    canvas.addEventListener(tapstart, e => {
      self.isTap = true
      self.resetCanvas()
    })
    canvas.addEventListener(tapmove, e => {
      if (self.isTap && !self.isTaping) {
        self.isTaping = true
        self.calTap(e, self)
        self.isTaping = false
      }
    })
    canvas.addEventListener(tapend, e => {
      self.isTap = false
    })
  }

  calTap (e) {
    const offset = [e.offsetX, e.offsetY]
    const isInPath = this.ctx.isPointInPath(...offset)
    if (isInPath) {
      const num = this.getRealNum(...offset)
      if (this.state.tapArr.indexOf(num) === -1) {
        this.setState({
          tapArr: [...this.state.tapArr, num]
        })
      }
    }
    this.drawLine(...offset)
  }
  /**
   * @description 获取真正的数字
   * @param {number} x 横坐标
   * @param {number} y 纵坐标
   */
  getRealNum (x, y) {
    return Math.floor(x / 100) + Math.floor(y / 100) * 3 + 1
  }

  getNumPoint (num) {
    return [(num - 1) % 3 * 100 + 50, Math.floor((num - 1) / 3) * 100 + 50]
  }

  drawLine (x, y) {
    const self = this,
      tapArr = self.state.tapArr,
      ctx = self.ctx
    if (tapArr && tapArr.length > 0) {
      ctx.strokeStyle = 'rgb(242, 242, 242)'
      tapArr.forEach((num, index) => {
        if (index === 0) {
          ctx.moveTo(...self.getNumPoint(num))
        } else {
          ctx.lineTo(...self.getNumPoint(num))
        }
      })
      // ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  renderBtn () {
    const ctx = this.ctx
    ctx.beginPath()
    ctx.strokeStyle = 'rgb(242, 242, 242)'
    const radius = 30, startDeg = 0, stopDeg = 2 * Math.PI
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        ctx.moveTo(x * 100 + 80, y * 100 + 50)
        ctx.arc(x * 100 + 50, y * 100 + 50, radius, startDeg, stopDeg)
      }
    }
    ctx.stroke()
    ctx.closePath()
    ctx.fillStyle = 'rgb(255, 0, 0)'
    ctx.font = '30px Arial'
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        ctx.fillText(x + y * 3 + 1, x * 100 + 42, y * 100 + 62)
      }
    }
    ctx.save()
  }

  resetCanvas = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.renderBtn()
    this.setState({
      tapArr: []
    })
  }

  componentDidMount () {
    this.getContext()
    this.renderBtn()
    this.bindEvent()
  }

  render () {
    return <div className={style.container}>
      <canvas id='gestureUnlock'>你的浏览器不支持Canvas</canvas>
      <div className={style.result}>结果：{this.state.tapArr}</div>
      <Button onClick={this.resetCanvas}>重置</Button>
    </div>
  }
}
