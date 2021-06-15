import { getOptimizedAuras } from "./optimizer.js";
import { auras } from "./auras.js";

function optimize() {
    var optimizedAuras = getOptimizedAuras({auras: auras});
    console.log(optimizedAuras);
};

var content = document.getElementById("content");

auras.forEach(function(aura) {
    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = aura.name;
    input.value = aura.name;
    content.appendChild(input);

    var label = document.createElement("label");
    label.for = aura.name;
    label.innerHTML = aura.name;
    content.appendChild(label);

    var br = document.createElement("br");
    content.appendChild(br);
});

var submit = document.createElement("button");
submit.innerHTML = "Optimize";
submit.onclick = optimize;
content.appendChild(submit);

        // <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
        // <label for="vehicle1"> I have a bike</label><br>
        // <input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
        // <label for="vehicle2"> I have a car</label><br>
        // <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">
        // <label for="vehicle3"> I have a boat</label><br></br>