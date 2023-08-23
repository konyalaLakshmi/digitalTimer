// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isTimeInProgress: false, timeElapsedSeconds: 0, timeInMinutes: 25}

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer = () => {
    clearInterval(this.timerId)
  }

  onDecrease = () => {
    const {timeInMinutes} = this.state
    if (timeInMinutes > 1) {
      this.setState(prev => ({timeInMinutes: prev.timeInMinutes - 1}))
    }
  }

  onIncrease = () => {
    this.setState(prev => ({timeInMinutes: prev.timeInMinutes + 1}))
  }

  renderIncreaseController = () => {
    const {timeElapsedSeconds, timeInMinutes} = this.state
    const isBtnDisabled = timeElapsedSeconds > 0

    return (
      <div className="time-increase-container">
        <p className="p1">Set Timer limit</p>
        <div className="increase-decrease">
          <button
            className="db"
            disabled={isBtnDisabled}
            type="button"
            onClick={this.onDecrease}
          >
            -
          </button>
          <p className="text">{timeInMinutes}</p>
          <button
            className="db"
            disabled={isBtnDisabled}
            type="button"
            onClick={this.onIncrease}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  resetTimer = () => {
    this.clearTimer()
    this.setState({
      isTimeInProgress: false,
      timeElapsedSeconds: 0,
      timeInMinutes: 25,
    })
  }

  increaseSeconds = () => {
    const {timeElapsedSeconds, timeInMinutes} = this.state

    const isTimerCompleted = timeElapsedSeconds === timeInMinutes * 60
    if (isTimerCompleted) {
      this.clearTimer()
      this.setState({isTimeInProgress: false})
    } else {
      this.setState(prev => ({timeElapsedSeconds: prev.timeElapsedSeconds + 1}))
    }
  }

  startStopTimer = () => {
    const {isTimeInProgress, timeElapsedSeconds, timeInMinutes} = this.state

    const isTimerCompleted = timeElapsedSeconds === timeInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedSeconds: 0})
    }
    if (isTimeInProgress) {
      this.clearTimer()
    } else {
      this.timerId = this.setState(this.increaseSeconds, 1000)
    }
    this.setState(prev => ({isTimeInProgress: !prev.isTimeInProgress}))
  }

  timerController = () => {
    const {isTimeInProgress} = this.state

    const imgUrl = isTimeInProgress
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const altText = isTimeInProgress ? 'pause icon' : 'play icon'

    return (
      <div className="bContainer">
        <button className="b" type="button" onClick={this.startStopTimer}>
          <img src={imgUrl} alt={altText} className="img" />
          <p className="bText">{isTimeInProgress ? 'Pause' : 'Start'}</p>
        </button>
        <button className="b" type="button" onClick={this.resetTimer}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="img"
          />
          <p className="bText">Reset</p>
        </button>
      </div>
    )
  }

  getTimeFormat = () => {
    const {timeElapsedSeconds, timeInMinutes} = this.state

    const remainingSeconds = timeInMinutes * 60 - timeElapsedSeconds

    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds % 60)

    const stringifiedM = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedS = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedM}:${stringifiedS}`
  }

  render() {
    const {isTimeInProgress} = this.state
    const labelText = isTimeInProgress ? 'Running' : 'Paused'

    return (
      <div className="bg">
        <h1 className="h1">Digital Timer</h1>
        <div className="container">
          <div className="img-container">
            <div className="co">
              <h1 className="h">{this.getTimeFormat()}</h1>
              <p className="para">{labelText}</p>
            </div>
          </div>
          <div className="control-container">
            {this.timerController()}
            {this.renderIncreaseController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
