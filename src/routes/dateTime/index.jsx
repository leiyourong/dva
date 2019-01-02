import { Component } from 'react'
import moment from 'moment'
import chunk from 'lodash/chunk'

export default class DateTime extends Component {
  constructor (props) {
    super(props)
    this.state = {
      prizes: []
    }
  }

  componentDidMount() {
    this.timeMarker()
  }

  getContext() {
    this.canvas = document.getElementById('datetime')
    this.ctx = this.canvas.getContext('2d')
    return this
  }

  getText() {
    const ctx = this.ctx
    const canvas = this.canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.font = '30px Arial'
    ctx.fillText(moment(new Date()).format('YYYY-MM-DD hh:mm:ss'), 10, 80)
    return this
  }

  getTextPixel() {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    this.pixelsData = chunk(imageData.data, 4).reduce((prev, cur, index) => {
      if (cur && cur[3]) {
        prev.push({
          data: cur,
          posX: index % this.canvas.width,
          posY: Math.floor(index / this.canvas.width)
        })
      }
      return prev
    }, [])
    return this
  }

  drawPixel() {
    const canvas = this.canvas
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.pixelsData.forEach(({ data, posX, posY }) => {
      this.ctx.fillStyle = `rgba(${data}`
      let r = Math.random() * 2
      this.ctx.fillRect(posX, posY, r, r);
    })
    return this
  }

  timeMarker() {
    this.getContext().getText().getTextPixel().drawPixel()
    this.timeout = setTimeout(() => {
      this.timeMarker()
    }, 1000)
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout)
  }

  render () {
    return <div style={{ width: '1000px', height: '400px' }}>
      <canvas id='datetime' style={{ width: '1000px', height: '400px', background: '#ccc' }}>你的浏览器不支持Canvas</canvas>
    </div>
  }
}
