import React, { Component } from 'react';
import Radium from 'radium'
import REMCard from './REMCard'

class REMResults extends Component {

  render() {
    const { results } = this.props
    return (
      <div style={comStyles().mainview}>
        {
          results.map((r)=>{
            return (
              <REMCard key={r.time.unix()} result={r} />
            )
          })
        }
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
      flexDirection: "column",
      justifyContent: "center",
      padding: "30px"
    }
  }
}

const RadiumHOC = Radium(REMResults)
export default RadiumHOC;
