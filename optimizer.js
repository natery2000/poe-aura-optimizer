import { costTypes } from './costTypes.js';
import { equipmentLimits } from './equimentLimits.js';
import { supports } from './gems.js';

export function getGemsFromSet(set) {
  var usedGems = [];
  for (var equip in set) {
    if (Array.isArray(set[equip])) {
      usedGems.push.apply(usedGems, set[equip]);
    }
  }
  return usedGems;
}

export function getOptimizedAuras(options) {
  var combos = {};

  for (var equipmentLimit in options.equipmentLimits) {
    combos[equipmentLimit] = combinations(
      options.auras,
      options.equipmentLimits[equipmentLimit]
    );
  }

  var sets = getSets(
    combos,
    0,
    [
      {
        Head: [],
        Body: [],
        'Main Hand': [],
        'Off Hand': [],
        Neck: [],
        'Left Ring': [],
        'Right Ring': [],
        Gloves: [],
        Boots: [],
      },
    ],
    options
  );

  return sets
    .sort(function (set) {
      return getGemsFromSet(set).length;
    })
    .reverse();
}

export function getAuraCount(set) {
  return getGemsFromSet(set).filter(function (gem) {
    return !gem.name.includes('Enlight');
  }).length;
}

function combinations(list, length) {
  var set = [];
  var listSize = list.length;
  var combinationsCount = 1 << listSize;

  set.push([]);
  for (var i = 1; i < combinationsCount; i++) {
    var combination = [];
    for (var j = 0; j < listSize; j++) {
      if (i & (1 << j)) combination.push(list[j]);
    }
    set.push(combination);
    if (combination.length > 0) {
      for (var enlighten in supports) {
        set.push([...combination, supports[enlighten]]);
      }
    }
  }

  return set.filter(function (auraSet) {
    return auraSet.length <= length;
  });
}

function getSets(combos, index, currentSets, options) {
  if (index >= equipmentLimits.length) return currentSets;

  var newSets = [];
  currentSets.forEach(function (set) {
    var usedGems = getGemsFromSet(set);
    var viableNextEquipCombos = combos[Object.keys(combos)[index]].filter(
      function (nextEquip) {
        return (
          nextEquip.filter(function (gem) {
            return usedGems.includes(gem);
          }).length === 0
        );
      }
    );

    viableNextEquipCombos.forEach(function (nextCombo) {
      var cur = { ...set };
      cur[Object.keys(combos)[index]] = nextCombo;

      if (isValidSet(cur, options))
        newSets.push.apply(newSets, getSets(combos, index + 1, [cur], options));
    });
  });

  return newSets;
}

function isValidSet(set, options) {
  var remainingLife = options.life;
  var remainingMana = options.mana;

  set['Head'].forEach(function (aura) {
    var multiplier = (100. - options.globalRMR) / 100.;
    if (
      set['Head'].some(function (aura) {
        return aura.name.includes('Enlight');
      })
    )
      multiplier *= supports.filter(function (support) {
        return (
          support.name ==
          set['Head'].filter(function (aura) {
            return aura.name.includes('Enlight');
          })[0].name
        );
      })[0].cost;
    if (aura.name.includes('Enlight')) var x = 0;
    else if (aura.costType === costTypes.PERCENT)
      remainingMana -= options.mana * (aura.cost / 100) * multiplier;
    else if (aura.costType === costTypes.FLAT)
      remainingMana -= aura.cost * multiplier;
  });
  set['Body'].forEach(function (aura) {
    var multiplier = (100. - options.globalRMR) / 100.;
    if (
      set['Body'].some(function (aura) {
        return aura.name.includes('Enlight');
      })
    )
      multiplier *= supports.filter(function (support) {
        return (
          support.name ==
          set['Body'].filter(function (aura) {
            return aura.name.includes('Enlight');
          })[0].name
        );
      })[0].cost;
    if (aura.name.includes('Enlight')) var x = 0;
    else if (aura.costType === costTypes.PERCENT)
      remainingMana -= options.mana * (aura.cost / 100);
    else if (aura.costType === costTypes.FLAT) remainingMana -= aura.cost;
  });
  set['Main Hand'].forEach(function (aura) {
    var multiplier = (100. - options.globalRMR) / 100.;
    if (
      set['Main Hand'].some(function (aura) {
        return aura.name.includes('Enlight');
      })
    )
      multiplier *= supports.filter(function (support) {
        return (
          support.name ==
          set['Main Hand'].filter(function (aura) {
            return aura.name.includes('Enlight');
          })[0].name
        );
      })[0].cost;
    if (aura.name.includes('Enlight')) var x = 0;
    else if (aura.costType === costTypes.PERCENT)
      remainingMana -= options.mana * (aura.cost / 100);
    else if (aura.costType === costTypes.FLAT) remainingMana -= aura.cost;
  });
  set['Off Hand'].forEach(function (aura) {
    var multiplier = (100. - options.globalRMR) / 100.;
    if (
      set['Off Hand'].some(function (aura) {
        return aura.name.includes('Enlight');
      })
    )
      multiplier *= supports.filter(function (support) {
        return (
          support.name ==
          set['Off Hand'].filter(function (aura) {
            return aura.name.includes('Enlight');
          })[0].name
        );
      })[0].cost;
    if (aura.name.includes('Enlight')) var x = 0;
    else if (aura.costType === costTypes.PERCENT)
      remainingMana -= options.mana * (aura.cost / 100);
    else if (aura.costType === costTypes.FLAT) remainingMana -= aura.cost;
  });
  set['Neck'].forEach(function (aura) {
    var multiplier = (100. - options.globalRMR) / 100.;
    if (
      set['Neck'].some(function (aura) {
        return aura.name.includes('Enlight');
      })
    )
      multiplier *= supports.filter(function (support) {
        return (
          support.name ==
          set['Neck'].filter(function (aura) {
            return aura.name.includes('Enlight');
          })[0].name
        );
      })[0].cost;
    if (aura.name.includes('Enlight')) var x = 0;
    else if (aura.costType === costTypes.PERCENT)
      remainingMana -= options.mana * (aura.cost / 100);
    else if (aura.costType === costTypes.FLAT) remainingMana -= aura.cost;
  });
  set['Left Ring'].forEach(function (aura) {
    var multiplier = (100. - options.globalRMR) / 100.;
    if (
      set['Left Ring'].some(function (aura) {
        return aura.name.includes('Enlight');
      })
    )
      multiplier *= supports.filter(function (support) {
        return (
          support.name ==
          set['Left Ring'].filter(function (aura) {
            return aura.name.includes('Enlight');
          })[0].name
        );
      })[0].cost;
    if (aura.name.includes('Enlight')) var x = 0;
    else if (aura.costType === costTypes.PERCENT)
      remainingMana -= options.mana * (aura.cost / 100);
    else if (aura.costType === costTypes.FLAT) remainingMana -= aura.cost;
  });
  set['Right Ring'].forEach(function (aura) {
    var multiplier = (100. - options.globalRMR) / 100.;
    if (
      set['Right Ring'].some(function (aura) {
        return aura.name.includes('Enlight');
      })
    )
      multiplier *= supports.filter(function (support) {
        return (
          support.name ==
          set['Right Ring'].filter(function (aura) {
            return aura.name.includes('Enlight');
          })[0].name
        );
      })[0].cost;
    if (aura.name.includes('Enlight')) var x = 0;
    else if (aura.costType === costTypes.PERCENT)
      remainingMana -= options.mana * (aura.cost / 100);
    else if (aura.costType === costTypes.FLAT) remainingMana -= aura.cost;
  });
  set['Gloves'].forEach(function (aura) {
    var multiplier = (100. - options.globalRMR) / 100.;
    if (
      set['Gloves'].some(function (aura) {
        return aura.name.includes('Enlight');
      })
    )
      multiplier *= supports.filter(function (support) {
        return (
          support.name ==
          set['Gloves'].filter(function (aura) {
            return aura.name.includes('Enlight');
          })[0].name
        );
      })[0].cost;
    if (aura.name.includes('Enlight')) var x = 0;
    else if (aura.costType === costTypes.PERCENT)
      remainingMana -= options.mana * (aura.cost / 100);
    else if (aura.costType === costTypes.FLAT) remainingMana -= aura.cost;
  });
  set['Boots'].forEach(function (aura) {
    var multiplier = (100. - options.globalRMR) / 100.;
    if (
      set['Boots'].some(function (aura) {
        return aura.name.includes('Enlight');
      })
    )
      multiplier *= supports.filter(function (support) {
        return (
          support.name ==
          set['Boots'].filter(function (aura) {
            return aura.name.includes('Enlight');
          })[0].name
        );
      })[0].cost;
    if (aura.name.includes('Enlight')) var x = 0;
    else if (aura.costType === costTypes.PERCENT)
      remainingMana -= options.mana * (aura.cost / 100);
    else if (aura.costType === costTypes.FLAT) remainingMana -= aura.cost;
  });

  set.remainingLife = remainingLife;
  set.remainingMana = remainingMana;

  return remainingLife > 0 && remainingMana > 0;
}
