export function getOptimizedAuras(options) {
    return {
        head: [["Grace"],options.auras.map(function(aura) { return aura.name }).concat(["Enlighten(4)"])]
    };
}