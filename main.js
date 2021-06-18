import { getOptimizedAuras } from "./optimizer.js";
import { auras } from "./auras.js";
import { equipmentLimits } from "./equimentLimits.js";

function getOptions() {
    var options = {};
    options.auras = [];
    auras.forEach(function(aura) {
        if (document.getElementById(aura.name).checked) {options.auras.push(aura);}
    });
    options.head = 2;
    return options;
}

function optimize() {
    var optimizedAuras = getOptimizedAuras(getOptions());
    console.log(optimizedAuras);
};

var content = document.getElementById("content");

var auraDiv = document.createElement("div");
content.appendChild(auraDiv);
auras.forEach(function(aura) {
    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = aura.name;
    input.value = aura.name;
    auraDiv.appendChild(input);

    var label = document.createElement("label");
    label.for = aura.name;
    label.innerHTML = aura.name;
    auraDiv.appendChild(label);

    var br = document.createElement("br");
    auraDiv.appendChild(br);
});

var equipmentDiv = document.createElement("div");
content.appendChild(equipmentDiv);
equipmentLimits.forEach(function(equipmentLimit) {
    var select = document.createElement("select");
    select.name = equipmentLimit.name;
    select.id = equipmentLimit.name;
    for(var i = 0; i < equipmentLimit.limit; i++) {
        var item = document.createElement("option");
        item.value = i + 1;
        item.innerHTML = i + 1;
        select.appendChild(item);
    }
    equipmentDiv.appendChild(select);

    var label = document.createElement("label");
    label.for = equipmentLimit.name;
    label.innerHTML = equipmentLimit.name;
    equipmentDiv.appendChild(label);

    var br = document.createElement("br");
    equipmentDiv.appendChild(br);

    select.selectedIndex = equipmentLimit.limit - 1;
});

var submitDiv = document.createElement("div");
content.appendChild(submitDiv);
var submit = document.createElement("button");
submit.innerHTML = "Optimize";
submit.onclick = optimize;
submitDiv.appendChild(submit);