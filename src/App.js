import React, { Component } from 'react'
import Radium, {StyleRoot} from 'radium'
import firebase from 'firebase'
import { config } from './config'
import moment from 'moment'

import WakeAt from './components/WakeAt'
import Buffer from './components/Buffer'
import REMResults from './components/REMResults'
import { calculateWhenToSleep, calculateWhenWillWake, calculateSleepNow } from './api/time'

class App extends Component {

  constructor(){
    super()
    this.state = {
      wakeAt: null,
      buffer: 10,
      title: 'If I fall asleep now, I will wake up naturally at: '
    }
  }

  componentWillMount(){
    firebase.initializeApp(config)
    const defaultBuffer = localStorage.getItem('buffer') || 10
    this.setState({
      buffer: defaultBuffer
    })
  }

  setTime(time, stateAttr){
    let title = this.state.title
    if(stateAttr === 'wakeAt'){
      title = 'If I want to wake up naturally on time, I need to sleep at these times:'
    }
    this.setState({
      [stateAttr]: time,
      title: title
    })
  }

  setBuffer(event){
    this.setState({
      buffer: event.target.value
    })
    localStorage.setItem('buffer', event.target.value)
  }

  calculateResults(buffer){
    const results = []
    if(this.state.wakeAt){
      calculateWhenToSleep(this.state.wakeAt, buffer).forEach((x)=>{
        results.push(x)
      })
    }else{
      calculateSleepNow(buffer).forEach((x)=>{
        results.push(x)
      })
    }
    return results
  }

  toggleNow(bool){
    if(bool){
      this.setState({
        wakeAt: null
      })
    }else{
      this.setState({
        wakeAt: moment().hour(0).minute(0).add(450, 'minutes'),
        title: 'If I want to wake up naturally on time, I need to sleep at these times:'
      })
    }
  }

  generateHeader(){
    return (
      <div style={comStyles().message}>
        <div onClick={()=>this.toggleNow(true)} style={comStyles(this.state.wakeAt).sleepNowBtn}>
          Sleep Now
        </div>
        <div onClick={()=>this.toggleNow(false)} style={comStyles(this.state.wakeAt).setWakeBtn}>
          Set Wakeup
        </div>
        {
          this.state.wakeAt
          ?
          <WakeAt setTime={this.setTime.bind(this)}/>
          :
          <div style={comStyles().now}>{ moment().format('h:mm a') }</div>
        }
        <Buffer buffer={this.state.buffer} setBuffer={this.setBuffer.bind(this)} />
      </div>
    )
  }

  render() {
    const results = this.calculateResults(this.state.buffer)
    return (
      <div className="App" style={comStyles().app}>
        { this.generateHeader() }
        <div style={comStyles().title}>{ this.state.title }</div>
        <REMResults results={results} />
      </div>
    );
  }
}


const comStyles = (bool) => {
  let wakeAt = 'normal'
  let sleepNow = 'bold'
  let wakeAtColor = 'black'
  let sleepNowColor = 'red'
  if(bool){
    wakeAt = 'bold'
    sleepNow = 'normal'
    wakeAtColor = 'red'
    sleepNowColor = 'black'
  }else{
    wakeAt = 'normal'
    sleepNow = 'bold'
    wakeAtColor = 'black'
    sleepNowColor = 'red'
  }
  return {
    now: {
      margin: "50px auto",
      fontSize: "3rem",
      fontWeight: "bold",
      textAlign: "center",
      height: "50px"
    },
    title: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      textAlign: "center",
      padding: "10px"
    },
    sleepNowBtn: {
      position: "absolute",
      top: "10px",
      right: "10px",
      fontWeight: sleepNow,
      color: sleepNowColor,
      cursor: "pointer"
    },
    setWakeBtn: {
      position: "absolute",
      top: "10px",
      left: "10px",
      fontWeight: wakeAt,
      color: wakeAtColor,
      cursor: "pointer"
    }
  }
}

const RadiumHOC = Radium(App)
export default RadiumHOC;
