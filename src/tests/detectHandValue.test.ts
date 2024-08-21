import { cardDict } from "@/pages/BalatroCalculator";
import { detectHandValue } from "../components/detectHandValue";

const highCard : cardDict = {
  "a" : {"rank" : 11, "suit": "Spades", bonusChips : 0, baseValue : 10, playOrder: 0}
}

const highCardFull : cardDict = {
  "a" : {"rank" : 11, "suit" : "Spades", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank": 12, "suit" : "Diamonds", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c" : {"rank" : 4, "suit" : "Clubs", bonusChips : 0, baseValue : 4, playOrder: 2},
  "d" : {"rank" : 2, "suit" : "Clubs", bonusChips : 0, baseValue : 2, playOrder: 3},
  "e" : {"rank" : 3, "suit" : "Clubs", bonusChips : 0, baseValue : 3, playOrder: 4},
}

const pair : cardDict = {
  "a" : {"rank" : 11, "suit" : "Spades", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank" : 11, "suit" : "Spades", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c" : {"rank" : 12, "suit" : "Hearts", bonusChips : 0, baseValue : 10, playOrder: 2},
  "d" : {"rank" : 13, "suit" : "Hearts", bonusChips : 0, baseValue : 10, playOrder: 3},
}

const twoPair : cardDict = {
  "a" : {"rank" : 11, "suit" : "Spades", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank" : 11, "suit" : "Spades", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c" : {"rank" : 12, "suit" : "Hearts", bonusChips : 0, baseValue : 10, playOrder: 2},
  "d" : {"rank" : 13, "suit" : "Hearts", bonusChips : 0, baseValue : 10, playOrder: 3},
  "e" : {"rank" : 13, "suit" : "Hearts", bonusChips : 0, baseValue : 10, playOrder: 4},
}

const threeofaKind : cardDict = {
  "a" : {"rank" : 11, "suit": "Spades", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank" : 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c" : {"rank" : 11, "suit" : "Diamonds", bonusChips : 0, baseValue : 10, playOrder: 2},
}

const threeofaKindjunk : cardDict = {
  "a" : {"rank" : 11, "suit": "Spades", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank" : 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c" : {"rank" : 11, "suit" : "Diamonds", bonusChips : 0, baseValue : 10, playOrder: 2},
  "d" : {"rank" : 12, "suit" : "Diamonds", bonusChips : 0, baseValue : 10, playOrder: 3},
  "e" : {"rank" : 2, "suit" : "Clubs", bonusChips : 0, baseValue : 2, playOrder: 4},
}

const straight : cardDict = {
  "a" : {"rank" : 2, "suit": "Spades", bonusChips : 0, baseValue : 2, playOrder: 0},
  "b" : {"rank" : 3, "suit": "Hearts", bonusChips : 0, baseValue : 3, playOrder: 1},
  "c" : {"rank" : 4, "suit" : "Clubs", bonusChips : 0, baseValue : 4, playOrder: 2},
  "d" : {"rank" : 5, "suit": "Diamonds", bonusChips : 0, baseValue : 5, playOrder: 3},
  "e" : {"rank" : 6, "suit" : "Spades", bonusChips : 0, baseValue : 6, playOrder: 4}
}

const straightFail : cardDict = {
  "a" : {"rank" : 3, "suit": "Spades", bonusChips : 0, baseValue : 3, playOrder: 1},
  "b" : {"rank" : 5, "suit": "Hearts", bonusChips : 0, baseValue : 5, playOrder: 2},
  "c" : {"rank" : 7, "suit" : "Clubs", bonusChips : 0, baseValue : 7, playOrder: 3},
  "d" : {"rank" : 9, "suit": "Diamonds", bonusChips : 0, baseValue : 9, playOrder: 4},
  "e" : {"rank" : 11, "suit" : "Spades", bonusChips : 0, baseValue : 10, playOrder: 5}
}

const straightAcetoFive : cardDict = {
  "a" : {"rank" : 14, "suit" : "Tower", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank" : 2, "suit" : "Diamonds", bonusChips : 0, baseValue : 2, playOrder: 1},
  "c" : {"rank" : 3, "suit" : "Spades", bonusChips : 0, baseValue : 3, playOrder: 2},
  "d" : {"rank" : 5, "suit" : "Diamonds", bonusChips : 0, baseValue : 5, playOrder: 3},
  "e" : {"rank" : 4, "suit" : "Clubs", bonusChips : 0, baseValue : 4, playOrder: 4}
}

const flush : cardDict = {
  "a" : {"rank" : 11, "suit" : "Club", tarot: "Lovers", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank" : 12, "suit" : "Hearts", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c" : {"rank" : 2, "suit" : "Club", tarot : "Lovers", bonusChips : 0, baseValue : 2, playOrder: 2},
  "d" : {"rank" : 5, "suit" : "Hearts", bonusChips : 0, baseValue : 5, playOrder: 3},
  "e" : {"rank" : 2, "suit" : "Hearts", bonusChips : 0, baseValue : 2, playOrder: 4},
}

const fullhouse : cardDict = {
  "a" : {"rank" : 10, "suit" : "Spades", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank" : 10, "suit" : "Hearts", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c" : {"rank" : 9 , "suit" : "Spades", bonusChips : 0, baseValue : 9, playOrder: 2},
  "d" : {"rank": 9, "suit" : "Spades", bonusChips : 0, baseValue : 9, playOrder: 3},
  "e" : {"rank" : 9, "suit" : "Hearts", bonusChips : 0, baseValue : 9, playOrder: 4}
}

const fourofakind : cardDict = {
  "a" : {"rank" : 11, "suit" : "Spades", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank" : 11, "suit" : "Hearts", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c" : {"rank" : 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 2},
  "d" : {"rank" : 11, "suit" : "Diamonds", bonusChips : 0, baseValue : 10, playOrder: 3},
  "e" : {"rank" : 12, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 4}
}


const flushFive : cardDict = {
  "a": {"rank": 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b": {"rank": 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c": {"rank": 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 2},
  "d": {"rank": 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 3},
  "e": {"rank": 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 4}
}

const straightFlush : cardDict = {
  "a": {"rank": 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b": {"rank": 12, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c": {"rank": 13, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 2},
  "d": {"rank": 14, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 3},
  "e": {"rank": 10, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 4}
}

const fiveofakind : cardDict = {
  "a" : {"rank" : 11, "suit" : "Spades", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank" : 11, "suit" : "Hearts", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c" : {"rank" : 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 2},
  "d" : {"rank" : 11, "suit" : "Diamonds", bonusChips : 0, baseValue : 10, playOrder: 3},
  "e" : {"rank" : 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 4}
}

test('detects hand played as high card', () => {
  expect(detectHandValue(highCard)).toBe("High Card");
  expect(detectHandValue(highCardFull)).toBe("High Card");
});

test('detects hand played as straight', () => {
  expect(detectHandValue(straight)).toBe("Straight");
  expect(detectHandValue(straightFail)).not.toBe("Straight");
  expect(detectHandValue(straightAcetoFive)).toBe("Straight");
})

test('detects hand played as pair or two pair', () => {
  expect(detectHandValue(pair)).toBe("Pair");
  expect(detectHandValue(twoPair)).toBe("Two Pair");
})

test('detects the difference between a two pair and three of a kind', () => {
  expect(detectHandValue(threeofaKind)).toBe("Three of a Kind");
  expect(detectHandValue(threeofaKindjunk)).toBe("Three of a Kind");
  expect(detectHandValue(threeofaKind)).not.toEqual(detectHandValue(twoPair));
})

test('detects the difference between a straight flush, flush, and flush five', () => {
  expect(detectHandValue(flush)).toBe("Flush");
  expect(detectHandValue(flushFive)).toBe("Flush Five");
  expect(detectHandValue(straightFlush)).toBe("Straight Flush");
})

test('detects the difference between full house and the lesser pairing hands', () => {
  expect(detectHandValue(fullhouse)).toBe("Full House");
  expect(detectHandValue(fullhouse)).not.toEqual(detectHandValue(threeofaKind));
  expect(detectHandValue(fullhouse)).not.toEqual(detectHandValue(twoPair));
})

test('detects the difference between a royal flush and a straight', () => {
  expect(detectHandValue(straightFlush)).toBe("Straight Flush");
  expect(detectHandValue(straight)).toBe("Straight");
})

test('detects the difference between a four vs five of a kind', () => {
  expect(detectHandValue(fourofakind)).toBe("Four of a Kind");
  expect(detectHandValue(fiveofakind)).toBe("Five of a Kind");
})