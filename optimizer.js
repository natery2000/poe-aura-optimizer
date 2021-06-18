import { costTypes } from "./costTypes.js";
import { equipmentLimits } from "./equimentLimits.js";

export function getOptimizedAuras(options) {
    var combos = {};

    for (var equipmentLimit in options.equipmentLimits) {
        combos[equipmentLimit] = combinations(options.auras, options.equipmentLimits[equipmentLimit]);        
    };

    var sets = getSets(combos, 0, [{"Head": [], "Body": [], "Main Hand": [], "Off Hand": [], "Neck": [], "Left Ring": [], "Right Ring": [], "Gloves": [], "Boots": []}], options);

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

function getSets(combos, index, currentSets, options) {
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
            
            if(isValidSet(cur, options))
                newSets.push.apply(newSets, getSets(combos, index + 1, [cur], options))
        });
    });

    return newSets;
}

function isValidSet(set, options) {
    var remainingLife = options.life;
    var remainingMana = options.mana;

    set["Head"].forEach(function(aura) {
        if (aura.costType === costTypes.PERCENT)
            remainingMana -= options.mana * (aura.cost / 100.);
        else if (aura.costType === costTypes.FLAT) 
            remainingMana -= aura.cost;
    });
    set["Body"].forEach(function(aura) {
        if (aura.costType === costTypes.PERCENT)
            remainingMana -= options.mana * (aura.cost / 100.);
        else if (aura.costType === costTypes.FLAT) 
            remainingMana -= aura.cost;
    });
    set["Main Hand"].forEach(function(aura) {
        if (aura.costType === costTypes.PERCENT)
            remainingMana -= options.mana * (aura.cost / 100.);
        else if (aura.costType === costTypes.FLAT) 
            remainingMana -= aura.cost;
    });
    set["Off Hand"].forEach(function(aura) {
        if (aura.costType === costTypes.PERCENT)
            remainingMana -= options.mana * (aura.cost / 100.);
        else if (aura.costType === costTypes.FLAT) 
            remainingMana -= aura.cost;
    });
    set["Neck"].forEach(function(aura) {
        if (aura.costType === costTypes.PERCENT)
            remainingMana -= options.mana * (aura.cost / 100.);
        else if (aura.costType === costTypes.FLAT) 
            remainingMana -= aura.cost;
    });
    set["Left Ring"].forEach(function(aura) {
        if (aura.costType === costTypes.PERCENT)
            remainingMana -= options.mana * (aura.cost / 100.);
        else if (aura.costType === costTypes.FLAT) 
            remainingMana -= aura.cost;
    });
    set["Right Ring"].forEach(function(aura) {
        if (aura.costType === costTypes.PERCENT)
            remainingMana -= options.mana * (aura.cost / 100.);
        else if (aura.costType === costTypes.FLAT) 
            remainingMana -= aura.cost;
    });
    set["Gloves"].forEach(function(aura) {
        if (aura.costType === costTypes.PERCENT)
            remainingMana -= options.mana * (aura.cost / 100.);
        else if (aura.costType === costTypes.FLAT) 
            remainingMana -= aura.cost;
    });
    set["Boots"].forEach(function(aura) {
        if (aura.costType === costTypes.PERCENT)
            remainingMana -= options.mana * (aura.cost / 100.);
        else if (aura.costType === costTypes.FLAT) 
            remainingMana -= aura.cost;
    });

    return remainingLife > 0 && remainingMana > 0;
}

function getGemsFromSet(set) {
    var usedGems = [];    
    for (var equip in set) {
        usedGems.push.apply(usedGems, set[equip]);
    }
    return usedGems;
}