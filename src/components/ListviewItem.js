import React, { Component} from "react";
import {hot} from "react-hot-loader";

import "../styles/styles.css"

class ListviewItem extends Component{

  render(){
    var itemWithSeparator = this.props.itemData.map((e, i) => i < this.props.itemData.length - 1 ? [e, 0] : [e]).reduce((a, b) => a.concat(b))
    var me = this;
    var i = 0;
    return(
      <div key={Math.random()} className="row"> 
        {itemWithSeparator.map(function(item) {
          if (item == 0) {
            return <div key={Math.random()} className="separator"></div>
          } else {
            var element = <div key={Math.random()} className="column" style={{width: me.props.columns[i].width}}>
                            <p key={Math.random()} style={{margin: "0 0 5 0"}}>{item.text}</p>
                          </div>
            i++;
            return element;
          }
        })}
      </div>
    );
  }
}

export default hot(module)(ListviewItem);