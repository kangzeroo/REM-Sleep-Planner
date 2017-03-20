import React, { Component } from 'react';
import Radium from 'radium'

class REMCard extends Component {

  render() {
    const { result } = this.props
    return (
      <div className='card' style={comStyles().mainview}>
        <div style={comStyles().time}>{ result.time.format('h:mm a') }</div>
        <div style={comStyles().sleptHours}>{ result.sleptHours.toFixed(1) } <span style={comStyles().hours}>hours</span></div>
      </div>
    );
  }
}

const comStyles = () => {
  return {
    mainview: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      borderRadius: '20px',
      fontWeight: "bold",
      ":hover": {
        backgroundColor: "rgba(0,0,0,0.1)"
      }
    },
    time: {
      width: '60%',
      padding: "10px",
      textAlign: "center",
      fontSize: "1.3rem",
      borderRadius: '20px',
    },
    sleptHours: {
      width: '40%',
      backgroundColor: 'rgba(0,0,0,0.05)',
      padding: "10px",
      fontSize: "1.3rem",
      borderRadius: '20px',
      textAlign: "center"
    },
    hours: {
      fontSize: "0.8rem",
    }
  }
}

const RadiumHOC = Radium(REMCard)
export default RadiumHOC;
