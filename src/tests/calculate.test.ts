import { cardDict } from "@/pages/BalatroCalculator";
import { calculate, handValues } from "../components";
// check package.json and remove "type": "module" if module is not defined in ES module scope
const highCard : cardDict = {
  "a" : {rank : 14, suit : "Spades", bonusChips : 0, baseValue: 11, playOrder: 0}
}
const highCardTower : cardDict = {
  "a" : {rank : 14, suit: "Spades", bonusChips : 0, baseValue: 11, playOrder: 0},
  "b" : {rank : 12, suit: "Hearts", bonusChips : 0, baseValue: 10, tarot : "Tower", playOrder: 1}
}
const redSealPair : cardDict = {
  "a" : {rank : 5, suit: "Hearts", bonusChips : 10, baseValue : 5, seal : "Red", playOrder: 0},
  "b" : {rank : 5, suit: "Diamonds", bonusChips : 0, baseValue : 5, playOrder: 1}
}

const twoPairEmpress : cardDict = {
  "a" : {rank : 2, suit: "Clubs", bonusChips : 0, baseValue : 2, tarot : "Empress", playOrder : 0},
  "b" : {rank : 2, suit: "Spades", bonusChips : 0, baseValue : 2, tarot : "Empress", playOrder : 1},
  "c" : {rank : 3, suit: "Clubs", bonusChips : 0, baseValue : 3, playOrder: 2},
  "d" : {rank : 3, suit: "Diamonds", bonusChips : 0, baseValue : 3, playOrder: 3}
}

const threeofakind : cardDict = {
  "a" : {rank : 10, suit : "Spades", baseValue: 10, bonusChips : 0, playOrder: 0},
  "aa" : {rank : 10, suit: "Spades", baseValue : 10, bonusChips: 0, tarot: "Tower", playOrder: 1},
  "b" : {rank : 10, suit : "Spades", baseValue : 10, bonusChips: 0, playOrder: 2},
  "c" : {rank : 10 , suit : "Spades", baseValue: 10, bonusChips : 0, playOrder: 3}
}

const straight : cardDict = {
  "a" : {rank : 2, suit : "Hearts", bonusChips : 0, baseValue : 2, playOrder: 0},
  "b" : {rank : 3, suit : "Spades", bonusChips : 0, baseValue : 3, playOrder: 1},
  "c" : {rank : 4, suit : "Clubs", bonusChips : 0, baseValue : 4, playOrder: 2},
  "d" : {rank : 5, suit : "Diamonds", bonusChips : 0, baseValue : 5, playOrder: 3},
  "e" : {rank : 6, suit : "Clubs", bonusChips : 0, baseValue : 6, playOrder: 4}
}

const flushV1 : cardDict = {
  "a" : {rank : 2, suit: "Hearts", bonusChips: 0, baseValue: 2, tarot: "Justice", playOrder: 4},
  "b" : {rank : 3, suit: "Hearts", bonusChips: 0, baseValue: 3, playOrder: 1},
  "c" : {rank : 4, suit: "Hearts", bonusChips: 0, baseValue: 4, playOrder: 2},
  "d" : {rank : 6, suit: "Hearts", bonusChips: 0, baseValue: 6, playOrder: 3},
  "e" : {rank : 8, suit: "Hearts", bonusChips: 0, baseValue: 8, tarot: "Empress", playOrder: 0}
}

const flushV2 : cardDict = {
  "a" : {rank : 2, suit: "Hearts", bonusChips: 0, baseValue: 2, tarot: "Justice", playOrder: 0},
  "b" : {rank : 3, suit: "Hearts", bonusChips: 0, baseValue: 3, playOrder: 1},
  "c" : {rank : 4, suit: "Hearts", bonusChips: 0, baseValue: 4, playOrder: 2},
  "d" : {rank : 6, suit: "Hearts", bonusChips: 0, baseValue: 6, playOrder: 3},
  "e" : {rank : 8, suit: "Hearts", bonusChips: 0, baseValue: 8, tarot: "Empress", playOrder: 4}
}

const polyHighCard : cardDict = {
  "a" : {rank : 10, suit: "Hearts", bonusChips: 0, baseValue: 10, spectral: "Polychrome", playOrder: 0}
}

const fullHouse : cardDict = {
  "a": {rank : 13, suit: "Spades", baseValue: 10, bonusChips: 0, playOrder: 0},
  "b" : {rank : 13, suit: "Hearts", baseValue: 10, bonusChips: 0, playOrder: 1},
  "c" : {rank : 13, suit: "Diamonds", baseValue : 10, bonusChips: 0, playOrder: 2},
  "d" : {rank : 6, suit: "Clubs", baseValue: 6, bonusChips: 0, playOrder: 3},
  "e" : {rank: 6, suit: "Diamonds", baseValue: 6, bonusChips: 0, playOrder: 4}
}

test('calculates hand for high card', () => {
  expect(calculate(highCard, handValues)).toEqual(16);
})

test('calculates hand for high card w/ tower card', () => {
  expect(calculate(highCardTower, handValues)).toEqual(66);
})

test('calculates hand for two pair', () => {
  expect(calculate(twoPairEmpress, handValues)).toEqual(300)
})
test('calculates hand for straight', () => {
  expect(calculate(straight, handValues)).toEqual(200);
})

test('calculates hand for three of a kind w/ tower card', () => {
  expect(calculate(threeofakind, handValues)).toBe(330);
})

test('calculates hand for full house', () => {
  const fullHouseCalc = calculate(fullHouse, handValues);
  expect(fullHouseCalc).toBe(328);
})

test('calculates hand order properly', () => {
  // flushV1Calc has an empress card calculated first in the play order
  const flushV1Calc = calculate(flushV1, handValues);
  const flushV2Calc = calculate(flushV2, handValues);
  expect(flushV1Calc).not.toEqual(flushV2Calc);
  expect(flushV1Calc).toBeGreaterThan(flushV2Calc);

})

test('calculates card editions', () => {
  //Final scores are rounded, which means that the polyHighCard will round up from 22.5 to 23
  expect(calculate(polyHighCard, handValues)).toEqual(23);
})

test('does recalculation for red seal marked cards', () => {
  const redSealCalculation = calculate(redSealPair, handValues);
  expect(redSealCalculation).toEqual(90);
})
