export function getOptimizedAuras(options) {
    var headCombinations = combinations(options.auras, options.head);

    return {
        head: [headCombinations]
    };
}

function combinations(list, length) {
    var set = [],
        listSize = list.length,
        combinationsCount = (1 << listSize);

    for (var i = 1; i < combinationsCount; i++, set.push(combination))
        for (var j=0, combination = []; j<listSize; j++)
            if (i & (1 << j))
                combination.push(list[j]);
    return set.filter(function(auraSet) {return auraSet.length <= length});
}