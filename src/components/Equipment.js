import React, { Component} from "react";
import {hot} from "react-hot-loader";

class Equipment extends Component{
  render(){
    var values = [];
    for (var i = 0; i <= this.props.equipmentLimit.limit; i++) {
      values.push(i);
    }
    var props = this.props;
    return(
      <div>     
        <select 
          id={"equipment." + this.props.equipmentLimit.name} 
          name={this.props.equipmentLimit.name}
          defaultValue={props.equipmentLimit.limit}>
          {values.map(function(value) {
            return <option value={value} key={value}>{value}</option>
          })}
        </select>    
        <label htmlFor={"equipment." + this.props.equipmentLimit.name}>{this.props.equipmentLimit.name}</label>
        <br />
      </div>
    );
  }
}

export default hot(module)(Equipment);