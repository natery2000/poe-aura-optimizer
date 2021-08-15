import React, { Component} from "react";
import {hot} from "react-hot-loader";

import ListviewItem from "./ListviewItem"

import { sortDirection } from "../data/sortDirection";

import "../styles/styles.css"

class Listview extends Component{  
  constructor(props) {
    super(props);
    this.state = {columnSort: "", columnSortDirection: -1, columns: this.props.columns};
  }

  updateSort(columnSort, columnSortDirection) {
    var state = {...this.state};
    state.columnSort = columnSort;
    state.columnSortDirection = columnSortDirection;
    this.setState(state);
  }

  sortAuras(columnName) {
    var columnSortDirection;
    if (this.state.columnSort == columnName) {
      columnSortDirection = this.state.columnSortDirection == sortDirection.ASCENDING ? sortDirection.DESCENDING : sortDirection.ASCENDING;
    } else {
      columnSortDirection = sortDirection.ASCENDING;
    }
    this.updateSort(columnName, columnSortDirection);

    this.props.onSort(columnName, columnSortDirection);
  }

  render(){   
    var itemWithSeparator = this.state.columns.map((e, i) => i < this.state.columns.length - 1 ? [e, 0] : [e]).reduce((a, b) => a.concat(b))
    var me = this;
    var i = 0;
    return(
      <div> 
        <div className="Row">
          {itemWithSeparator.map(function(column) {
            if (column == 0) {
              return <div key={Math.random()} className="separator"></div>
            } else {
              var element = <div key={column.name} className="columnheader" style={{width: column.width}}>
                              <p key={column.name + 'p'} onClick={() => me.sortAuras(column.name)} style={{margin: "3 0 5 0"}}>{column.name}</p>
                            </div>  
              i++;
              return element;
            }
          })}
        </div>    
        <div className="listviewitems">
          {this.props.items?.map(function(item) {
            return <ListviewItem itemData={item} key={Math.random()} columns={me.state.columns}></ListviewItem>
          })}
        </div>
      </div>
    );
  }
}

export default hot(module)(Listview);