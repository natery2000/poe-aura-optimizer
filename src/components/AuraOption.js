import React, { Component} from "react";
import {hot} from "react-hot-loader";

class AuraOption extends Component{
  render(){
    return(
      <div>
        <input type="checkbox" id={"aura." + this.props.name} value={this.props.name}></input>
        <label htmlFor={"aura." + this.props.name}>{this.props.name}</label>
        <br />            
      </div>
    );
  }
}

export default hot(module)(AuraOption);