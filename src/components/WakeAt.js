import React, { Component } from 'react'
import Radium from 'radium'
import 'rc-time-picker/assets/index.css'
import moment from 'moment'
import TimePicker from 'rc-time-picker'



class WakeAt extends Component {

  onChange(value) {
    const { setTime } = this.props
    setTime(value, 'wakeAt')
  }

  render() {
    const format = 'h:mm a'
    const shouldWake = moment().hour(0).minute(0).add(450, 'minutes')
    return (
      <div style={comStyles().mainview}>
        <TimePicker
          showSecond={false}
          defaultValue={shouldWake}
          className="xxx"
          onChange={this.onChange.bind(this)}
          format={format}
          use12Hours
          style={comStyles().timePicker}
        />
      </div>
    );
  }
}

const comStyles = () => {
  return {
    mainview: {
      height: "50px" ,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      margin: "50px auto",
      alignItems: 'center',
      fontSize: "2rem",
      fontWeight: "bold"
    },
    timePicker: {
      padding: "5px"
    }
  }
}

const RadiumHOC = Radium(WakeAt)
export default RadiumHOC;
