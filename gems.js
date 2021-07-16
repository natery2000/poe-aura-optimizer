import { costTypes } from "./costTypes.js";

export const auras = [
  { name: "Discipline", cost: 35, costType: costTypes.PERCENT },
  { name: "Hatred", cost: 50, costType: costTypes.PERCENT },
  { name: "Purity of Ice", cost: 35, costType: costTypes.PERCENT },
];

export const supports = [
  { name: "Enlighten(2)", cost: 0.96, costType: costTypes.PERCENT },
  { name: "Enlighten(3)", cost: 0.92, costType: costTypes.PERCENT },
  { name: "Enlighten(4)", cost: 0.88, costType: costTypes.PERCENT },
];
