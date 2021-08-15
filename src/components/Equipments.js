import React, { Component} from "react";
import {hot} from "react-hot-loader";

import Equipment from "./Equipment";
import {equipmentLimits} from "../data/equipmentLimits";

class Equipments extends Component{
  render(){
    return(
      <div className="section">
        {equipmentLimits.map(function(equipmentLimit) {
          return <Equipment equipmentLimit={equipmentLimit} key={equipmentLimit.name}></Equipment>
        })}          
      </div>
    );
  }
}

export default hot(module)(Equipments);