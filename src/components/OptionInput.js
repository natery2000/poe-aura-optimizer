import React, { Component} from "react";
import {hot} from "react-hot-loader";

class OptionInput extends Component{
  render(){
    return(
      <div className="section">
        <input type="text" id={this.props.id} defaultValue={this.props.value}></input>
        <label htmlFor={this.props.id}>{this.props.description}</label>
        <br />            
      </div>
    );
  }
}

export default hot(module)(OptionInput);