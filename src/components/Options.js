import React, { Component} from "react";
import {hot} from "react-hot-loader";

import AuraOption from "./AuraOption";
import OptionInput from "./OptionInput";
import {auras} from "../data/gems"

class Options extends Component{
  render(){
    return(
      <div>        
        <OptionInput id="rmr" value="0" description="% global RMR (passive tree + rare affix)"></OptionInput>
        <div className="section">
          {auras.map(function(aura) {
            return <AuraOption name={aura.name} key={aura.name}></AuraOption>
          })} 
        </div>        
      </div>
    );
  }
}

export default hot(module)(Options); 