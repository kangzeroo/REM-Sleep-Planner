import React, { Component } from 'react';
import Radium from 'radium'

class Buffer extends Component {

  render() {
    const { buffer, setBuffer } = this.props
    return (
      <div style={comStyles().mainview}>
        <input type='number' onChange={setBuffer} value={buffer} style={comStyles().input}/>
        <div style={comStyles().mins}> &nbsp; minutes to fall asleep</div>
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
      margin: "20px auto"
    },
    input: {
      padding: '10px',
      fontWeight: "bold",
      textAlign: "center",
      fontSize: "1.3rem",
      width: "100px",
      border: "4px solid rgba(0,0,0,0.4)",
      borderRadius: "30px"
    },
    mins: {
      fontSize: "1.3rem",
      padding: "10px"
    }
  }
}

const RadiumHOC = Radium(Buffer)
export default RadiumHOC;
