import _ from 'lodash'
import React from 'react'

export default class Slider2 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mouseDown: false,
      thumbTop: 0
    }

    this.slideArea = React.createRef()

    _.bindAll(
      this,
      'handleMouseMove',
      'handleMouseDown',
      'handleMouseUp',
      'moveThumb',
      'calculateTop',
      'calculateValue'
    )
  }

  componentDidMount() {
    const { value } = this.props
    const { y, height } = this.slideArea.current.getBoundingClientRect()

    this.setState({
      thumbTop: this.calculateTop(height, value)
    })

    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { y, height } = this.slideArea.current.getBoundingClientRect()

    if (nextProps.value != this.props.value) {
      nextState.thumbTop = this.calculateTop(height, nextProps.value)
    }

    return true
  }

  handleDragOver(e) {
    e.preventDefault()
  }

  handleMouseDown(e) {
    e.preventDefault()

    this.setState({
      mouseDown: true
    })
  }

  handleMouseUp() {
    const { name, handleMouseUp } = this.props

    if (this.state.mouseDown) {
      // handleMouseUp(name)

      this.setState({
        mouseDown: false
      })
    }
  }

  handleMouseMove(e) {
    const { mouseDown } = this.state

    if (mouseDown) {
      this.moveThumb(e.clientY)
    }
  }

  moveThumb(clientY) {
    const { y, height } = this.slideArea.current.getBoundingClientRect()
    const { name, property, min, max, handleValueChange } = this.props
    const areaBottom = this.calculateBottom(y, height)
    const thumbTop = clientY - y

    console.log(y, height, min, max, thumbTop, this.slideArea.current)

    if (thumbTop >= 0 && clientY <= areaBottom) {
      const value = this.calculateValue(height, thumbTop)
      handleValueChange(name, property, value)

      this.setState({
        thumbTop
      })
    }
  }

  calculateBottom(y, height) {
    return y + height
  }

  calculateTop(height, value) {
    const { min, max } = this.props
    const range = max - min
    const coef = range / height
    const top = value / coef

    return top
  }

  calculateValue(height, thumbTop) {
    const { min, max } = this.props
    const range = max - min
    const coef = range / height
    const value = thumbTop * coef

    return value
  }

  render() {
    const { thumbTop } = this.state

    const style = {
      transform: `translateY(${thumbTop}px)`
    }

    return (
      <div
        className="Slider"
        ref={this.slideArea}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <div
          className="thumb"
          style={style}
          onMouseDown={this.handleMouseDown}
        />
      </div>
    )
  }
}
