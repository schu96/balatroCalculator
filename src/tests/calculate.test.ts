import { calculate } from "../components/calculate";
import { handValues } from "../components/handValues";
// check package.json and remove "type": "module" if module is not defined in ES module scope
let highCard = {
  "a" : {rank : 11, suit : "Spades", bonusChips : 0, baseValue: 11, playOrder: 0}
}

let straight = {
  "a" : {rank : 2, suit : "Hearts", bonusChips : 0, baseValue : 2, playOrder: 0},
  "b" : {rank : 3, suit : "Spades", bonusChips : 0, baseValue : 3, playOrder: 1},
  "c" : {rank : 4, suit : "Clubs", bonusChips : 0, baseValue : 4, playOrder: 2},
  "d" : {rank : 5, suit : "Diamonds", bonusChips : 0, baseValue : 5, playOrder: 3},
  "e" : {rank : 6, suit : "Clubs", bonusChips : 0, baseValue : 6, playOrder: 4}
}

let flushV1 = {
  "a" : {rank : 2, suit: "Hearts", bonusChips: 0, baseValue: 2, tarot: "Empress", playOrder: 0},
  "b" : {rank : 3, suit: "Hearts", bonusChips: 0, baseValue: 3, playOrder: 1},
  "c" : {rank : 4, suit: "Hearts", bonusChips: 0, baseValue: 4, playOrder: 2},
  "d" : {rank : 6, suit: "Hearts", bonusChips: 0, baseValue: 6, playOrder: 3},
  "e" : {rank : 8, suit: "Hearts", bonusChips: 0, baseValue: 8, tarot: "Justice", playOrder: 4}
}

let flushV2 = {
  "a" : {rank : 2, suit: "Hearts", bonusChips: 0, baseValue: 2, tarot: "Justice", playOrder: 0},
  "b" : {rank : 3, suit: "Hearts", bonusChips: 0, baseValue: 3, playOrder: 1},
  "c" : {rank : 4, suit: "Hearts", bonusChips: 0, baseValue: 4, playOrder: 2},
  "d" : {rank : 6, suit: "Hearts", bonusChips: 0, baseValue: 6, playOrder: 3},
  "e" : {rank : 8, suit: "Hearts", bonusChips: 0, baseValue: 8, tarot: "Empress", playOrder: 4}
}

let polyHighCard = {
  "a" : {rank : 10, suit: "Hearts", bonusChips: 0, baseValue: 10, spectral: "Polychrome", playOrder: 0}
}

let redSealPair = {
  "a" : {rank : 5, suit: "Hearts", bonusChips : 10, baseValue : 5, seal : "Red", playOrder: 0},
  "b" : {rank : 5, suit: "Diamonds", bonusChips : 0, baseValue : 5, playOrder: 1}
}

let threeofakind = {
  "a" : {rank : 10, suit : "Spades", baseValue: 10, bonusChips : 0, playOrder: 0},
  "aa" : {rank : 10, suit: "Spades", baseValue : 10, bonusChips: 0, tarot: "Tower", playOrder: 1},
  "b" : {rank : 10, suit : "Spades", baseValue : 10, bonusChips: 0, playOrder: 2},
  "c" : {rank : 10 , suit : "Spades", baseValue: 10, bonusChips : 0, playOrder: 3}
}

let fullHouse = {
  "a": {rank : 13, suit: "Spades", baseValue: 10, bonusChips: 0, playOrder: 0},
  "b" : {rank : 13, suit: "Hearts", baseValue: 10, bonusChips: 0, playOrder: 1},
  "c" : {rank : 13, suit: "Diamonds", baseValue : 10, bonusChips: 0, playOrder: 2},
  "d" : {rank : 6, suit: "Clubs", baseValue: 6, bonusChips: 0, playOrder: 3},
  "e" : {rank: 6, suit: "Diamonds", baseValue: 6, bonusChips: 0, playOrder: 4}
}

test('calculates hand for high card', () => {
  expect(calculate(highCard, handValues)).toEqual(16);
})

test('calculates hand for straight', () => {
  expect(calculate(straight, handValues)).toEqual(200);
})

test('calculates hand for three of a kind', () => {
  let threeCalc = calculate(threeofakind, handValues);
  expect(threeCalc).toBe(330);
})

test('calculates hand for full house', () => {
  let fullHouseCalc = calculate(fullHouse, handValues);
  expect(fullHouseCalc).toBe(328);
})

test('calculates hand order properly', () => {
  let flushV1Calc = calculate(flushV1, {flush : { base : 30, mult : 4}});
  let flushV2Calc = calculate(flushV2, {flush : { base : 30, mult : 4}});
  expect(flushV1Calc).not.toEqual(flushV2Calc);
  expect(flushV1Calc).toBeGreaterThan(flushV2Calc);

})

test('calculates card editions', () => {
  expect(calculate(polyHighCard, handValues)).toEqual(22.5);
})

test('does recalculation for red seal marked cards', () => {
  let redSealCalculation = calculate(redSealPair, handValues);
  expect(redSealCalculation).toEqual(90);
})
