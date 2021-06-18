import { getOptimizedAuras } from "./optimizer.js";
import { auras } from "./auras.js";
import { equipmentLimits } from "./equimentLimits.js";

function getOptions() {
    var options = {};
    options.auras = [];
    options.equipmentLimits = []
    options.life = 1000;
    options.mana = 1000;

    auras.forEach(function(aura) {
        if (document.getElementById("aura." + aura.name).checked) {options.auras.push(aura);}
    });
    
    equipmentLimits.forEach(function(equipmentLimit) {
        options.equipmentLimits[equipmentLimit.name] = document.getElementById("equipment." + equipmentLimit.name).selectedIndex;
    });
    
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
content.appendChild(equipmentDiv);
equipmentLimits.forEach(function(equipmentLimit) {
    var select = document.createElement("select");
    select.id = "equipment." + equipmentLimit.name;
    select.name = equipmentLimit.name;
    for(var i = 0; i <= equipmentLimit.limit; i++) {
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
content.appendChild(submitDiv);
var submit = document.createElement("button");
submit.innerHTML = "Optimize";
submit.onclick = optimize;
submitDiv.appendChild(submit);