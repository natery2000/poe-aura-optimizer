import {
  getAuraCount,
  getGemsFromSet,
  getOptimizedAuras,
} from "./optimizer.js";
import { auras } from "./gems.js";
import { equipmentLimits } from "./equimentLimits.js";
import { sortDirection } from "./sortDirection.js";

function getOptions() {
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

var optimizedAuras;
var columnSort = "Auras";
var columnSortDirection = sortDirection.ASCENDING;
function optimize() {
  optimizedAuras = getOptimizedAuras(getOptions());
  fillListview();
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function sortAuras(x, y) {
  if (columnSort == "Auras") {
    if (columnSortDirection == sortDirection.ASCENDING) return 1;
    else return -1;
  } else if (columnSort == "Life") {
    if (columnSortDirection == sortDirection.ASCENDING)
      return x.remainingLife - y.remainingLife;
    else return y.remainingLife - x.remainingLife;
  } else if (columnSort == "Mana") {
    if (columnSortDirection == sortDirection.ASCENDING)
      return x.remainingMana - y.remainingMana;
    else return y.remainingMana - x.remainingMana;
  }
}

function columnHeaderClicked(column) {
  console.log(column, columnSort, columnSortDirection);
  if (column == columnSort) {
    columnSortDirection = columnSortDirection == sortDirection.ASCENDING ? sortDirection.DESCENDING : sortDirection.ASCENDING;
  } else {
    columnSortDirection = sortDirection.ASCENDING;
    columnSort = column;
  }
  fillListview();
}

function fillListview() {
  var listviewItemsDiv = document.getElementById("listviewitems");

  removeAllChildNodes(listviewItemsDiv);

  var maxAuras = Math.max(
    ...optimizedAuras.map(function (set) {
      return getAuraCount(set);
    })
  );
  var auras = optimizedAuras.filter(function (set) {
    return getAuraCount(set) == maxAuras;
  });
  console.log('Before', auras);
  auras.sort(sortAuras);
  console.log('After', auras);
  for (var set in auras) {
    var auraRowDiv = document.createElement("div");
    auraRowDiv.className = "row";
    listviewItemsDiv.appendChild(auraRowDiv);

    var columnAuraDiv = document.createElement("div");
    columnAuraDiv.className = "column";
    columnAuraDiv.style = "width: 400px;";
    auraRowDiv.appendChild(columnAuraDiv);

    var columnAuraP = document.createElement("p");
    columnAuraP.className = "listview-text";
    columnAuraP.innerHTML = getGemsFromSet(auras[set])
      .map(function (aura) {
        return aura.name;
      })
      .join(", ");
    columnAuraDiv.appendChild(columnAuraP);

    var separatorAuraRowDiv = document.createElement("div");
    separatorAuraRowDiv.className = "separator";
    auraRowDiv.appendChild(separatorAuraRowDiv);

    var columnLifeDiv = document.createElement("div");
    columnLifeDiv.className = "column";
    columnLifeDiv.style = "width: 200px;";
    auraRowDiv.appendChild(columnLifeDiv);

    var columnAuraLifeP = document.createElement("p");
    columnAuraLifeP.className = "listview-text";
    columnAuraLifeP.innerHTML =
      Math.round(auras[set].remainingLife.toFixed(3) * 1000) / 1000;
    columnLifeDiv.appendChild(columnAuraLifeP);

    var separatorAuraLifeDiv = document.createElement("div");
    separatorAuraLifeDiv.className = "separator";
    auraRowDiv.appendChild(separatorAuraLifeDiv);

    var columnManaDiv = document.createElement("div");
    columnManaDiv.className = "column";
    columnManaDiv.style = "width: 200px;";
    auraRowDiv.appendChild(columnManaDiv);

    var columnAuraManaP = document.createElement("p");
    columnAuraManaP.className = "listview-text";
    columnAuraManaP.innerHTML =
      Math.round(auras[set].remainingMana * 1000) / 1000;
    columnManaDiv.appendChild(columnAuraManaP);
  }
}

var content = document.getElementById("content");

var rmrDiv = document.createElement("div");
rmrDiv.className = "section";
content.appendChild(rmrDiv);

var rmrInput = document.createElement("input");
rmrInput.type = "text";
rmrInput.id = "rmr";
rmrInput.value = 0;
rmrDiv.appendChild(rmrInput);

var rmrLabel = document.createElement("label");
rmrLabel.for = "rmr";
rmrLabel.innerHTML = "% global RMR (passive tree + rare affix)";
rmrDiv.appendChild(rmrLabel);

var auraDiv = document.createElement("div");
auraDiv.className = "section";
content.appendChild(auraDiv);

auras.forEach(function (aura) {
  var input = document.createElement("input");
  input.type = "checkbox";
  input.id = "aura." + aura.name;
  input.value = aura.name;
  auraDiv.appendChild(input);

  var label = document.createElement("label");
  label.for = "aura." + aura.name;
  label.innerHTML = aura.name;
  auraDiv.appendChild(label);

  var br = document.createElement("br");
  auraDiv.appendChild(br);
});

var equipmentDiv = document.createElement("div");
equipmentDiv.className = "section";
content.appendChild(equipmentDiv);
equipmentLimits.forEach(function (equipmentLimit) {
  var select = document.createElement("select");
  select.id = "equipment." + equipmentLimit.name;
  select.name = equipmentLimit.name;
  for (var i = 0; i <= equipmentLimit.limit; i++) {
    var item = document.createElement("option");
    item.value = i;
    item.innerHTML = i;
    select.appendChild(item);
  }
  equipmentDiv.appendChild(select);

  var label = document.createElement("label");
  label.for = "equipment." + equipmentLimit.name;
  label.innerHTML = equipmentLimit.name;
  equipmentDiv.appendChild(label);

  var br = document.createElement("br");
  equipmentDiv.appendChild(br);

  select.selectedIndex = equipmentLimit.limit;
});

var submitDiv = document.createElement("div");
submitDiv.className = "section";
content.appendChild(submitDiv);
var submit = document.createElement("button");
submit.innerHTML = "Optimize";
submit.onclick = optimize;
submitDiv.appendChild(submit);

var listviewDiv = document.createElement("div");
listviewDiv.className = "listview section";
content.appendChild(listviewDiv);

var listviewHeaderDiv = document.createElement("div");
listviewHeaderDiv.className = "listviewheader 2";
listviewDiv.appendChild(listviewHeaderDiv);

var headerRowDiv = document.createElement("div");
headerRowDiv.className = "row";
listviewHeaderDiv.appendChild(headerRowDiv);

var columnHeaderAuraDiv = document.createElement("div");
columnHeaderAuraDiv.className = "columnheader";
columnHeaderAuraDiv.style = "width: 400px;";
columnHeaderAuraDiv.onclick = function() { columnHeaderClicked('Auras') };
headerRowDiv.appendChild(columnHeaderAuraDiv);

var columnHeaderAuraP = document.createElement("p");
columnHeaderAuraP.className = "listview-text";
columnHeaderAuraP.innerHTML = "Auras";
columnHeaderAuraDiv.appendChild(columnHeaderAuraP);

var separatorAuraDiv = document.createElement("div");
separatorAuraDiv.className = "separator";
headerRowDiv.appendChild(separatorAuraDiv);

var columnHeaderLifeDiv = document.createElement("div");
columnHeaderLifeDiv.className = "columnheader";
columnHeaderLifeDiv.style = "width: 200px;";
columnHeaderLifeDiv.onclick = function() { columnHeaderClicked('Life') };
headerRowDiv.appendChild(columnHeaderLifeDiv);

var columnHeaderLifeP = document.createElement("p");
columnHeaderLifeP.className = "listview-text";
columnHeaderLifeP.innerHTML = "Life";
columnHeaderLifeDiv.appendChild(columnHeaderLifeP);

var separatorLifeDiv = document.createElement("div");
separatorLifeDiv.className = "separator";
headerRowDiv.appendChild(separatorLifeDiv);

var columnHeaderManaDiv = document.createElement("div");
columnHeaderManaDiv.className = "columnheader";
columnHeaderManaDiv.style = "width: 200px;";
columnHeaderManaDiv.onclick = function() { columnHeaderClicked('Mana') };
headerRowDiv.appendChild(columnHeaderManaDiv);

var columnHeaderManaP = document.createElement("p");
columnHeaderManaP.className = "listview-text";
columnHeaderManaP.innerHTML = "Mana";
columnHeaderManaDiv.appendChild(columnHeaderManaP);

var listviewItemsDiv = document.createElement("div");
listviewItemsDiv.id = "listviewitems";
listviewItemsDiv.className = "listviewitems";
listviewDiv.appendChild(listviewItemsDiv);

var listviewSpacerDiv = document.createElement("div");
listviewSpacerDiv.style = "height: 0px; width: 808px;";
listviewItemsDiv.appendChild(listviewSpacerDiv);
