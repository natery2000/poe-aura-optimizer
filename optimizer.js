import { equipmentLimits } from "./equimentLimits.js";

export function getOptimizedAuras(options) {
    var combos = {};

    for (var equipmentLimit in options.equipmentLimits) {
        combos[equipmentLimit] = combinations(options.auras, options.equipmentLimits[equipmentLimit]);        
    };

    var sets = getSets(combos, 0, [{}]);

    return sets.sort(function(set) { return getGemsFromSet(set).length; }).reverse();
}

function combinations(list, length) {
    var set = [];
    var listSize = list.length;
    var combinationsCount = (1 << listSize);

    set.push([]);
    for (var i = 1; i < combinationsCount; i++, set.push(combination))
        for (var j = 0, combination = []; j < listSize; j++)
            if (i & (1 << j))
                combination.push(list[j]);

    return set.filter(function(auraSet) { return auraSet.length <= length; });
}

function getSets(combos, index, currentSets) {
    if (index >= equipmentLimits.length) return currentSets;

    var newSets = [];
    currentSets.forEach(function(set) {
        var usedGems = getGemsFromSet(set);
        var viableNextEquipCombos = combos[Object.keys(combos)[index]].filter(
            function(nextEquip) { 
                return nextEquip.filter(
                    function(gem) { 
                        return usedGems.includes(gem); }).length === 0});
                        
        viableNextEquipCombos.forEach(function(nextCombo) {
            var cur = { ...set };
            cur[Object.keys(combos)[index]] = nextCombo;
            newSets.push.apply(newSets, getSets(combos, index + 1, [cur]))
        });
    });

    return newSets;
}

function getGemsFromSet(set) {
    var usedGems = [];    
    for (var equip in set) {
        usedGems.push.apply(usedGems, set[equip]);
    }
    return usedGems;
}