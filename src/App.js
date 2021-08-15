import React, { Component} from "react";
import {hot} from "react-hot-loader";

import Options from "./components/Options"
import Equipments from "./components/Equipments";
import OptimizeButton from "./components/OptimizeButton";
import Listview from "./components/Listview";

import {getGemsFromSet, getOptimizedAuras} from "./optimizer"
import {auras} from "./data/gems"
import {equipmentLimits} from "./data/equipmentLimits"
import { sortDirection } from "./data/sortDirection";

class App extends Component{
  constructor(props) {
    super(props);
    this.listviewElement = React.createRef();
    this.columns = [{name: 'Auras', width: 400}, {name: 'Life', width: 70}, {name: 'Mana', width: 70}];
    this.state = {items: []};
    this.onSort = this.onSort.bind(this);
    this.updateItems = this.updateItems.bind(this);
  }  

  updateItems(items) {
    console.log('updating');
    this.setState({items: items});
    console.log('updated');
  }

  getOptions() {
    var options = {};
    options.auras = [];
    options.equipmentLimits = [];
    options.life = 1000;
    options.mana = 1000;
    options.globalRMR = document.getElementById("rmr").value;

    auras.forEach(function (aura) {
      if (document.getElementById("aura." + aura.name).checked) {
        options.auras.push(aura);
      }
    });

    equipmentLimits.forEach(function (equipmentLimit) {
      options.equipmentLimits[equipmentLimit.name] = document.getElementById(
        "equipment." + equipmentLimit.name
      ).selectedIndex;
    });

    return options;
  }

  optimizeOnClickHandler() {
    var optimizedAuras = getOptimizedAuras(this.getOptions());
    var items = optimizedAuras.map(function(optimizedAura) {
      return [
        {text: getGemsFromSet(optimizedAura).map(function (aura) {return aura.name;}).join(", ")},
        {text: optimizedAura.remainingLife},
        {text: optimizedAura.remainingMana}
      ]
    });    
    this.updateItems(items);
  }

  onSort(columnSort, columnSortDirection) {
    var columnIndex = this.columns.map(function(column) {return column.name;}).indexOf(columnSort);

    var sortableItems = [...this.state.items];
    sortableItems.sort(function(a, b) {
      if (a[columnIndex].text > b[columnIndex].text) {
        return 1;
      } 
      if (a[columnIndex].text < b[columnIndex].text) {
        return -1;
      }
      return 0;
    });

    if (columnSortDirection == sortDirection.DESCENDING) { sortableItems.reverse(); }

    console.log('sortableItems', sortableItems);
    this.updateItems(sortableItems);
  }

  render(){
    return(
      <div>
        <Options />
        <Equipments />
        <OptimizeButton onClick={() => this.optimizeOnClickHandler()}/>
        <Listview columns={this.columns} onSort={this.onSort} items={this.state.items}></Listview>
      </div>
    );
  }
}

export default hot(module)(App);