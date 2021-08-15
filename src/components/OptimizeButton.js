import React, { Component} from "react";
import {hot} from "react-hot-loader";

class OptimizeButton extends Component{
  render(){
    return(
      <div className="section">     
        <button onClick={this.props.onClick}>Optimize</button>
      </div>
    );
  }
}

export default hot(module)(OptimizeButton);