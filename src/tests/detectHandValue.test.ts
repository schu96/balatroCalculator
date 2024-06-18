import { detectHandValue } from "../components/detectHandValue";

let highCard = {
  "a" : {"rank" : 11, "suit": "Spades", bonusChips : 0, baseValue : 10, playOrder: 0}
}

let highCardFull = {
  "a" : {"rank" : 11, "suit" : "Spades", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank": 12, "suit" : "Diamonds", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c" : {"rank" : 4, "suit" : "Clubs", bonusChips : 0, baseValue : 4, playOrder: 2},
  "d" : {"rank" : 2, "suit" : "Clubs", bonusChips : 0, baseValue : 2, playOrder: 3},
  "e" : {"rank" : 3, "suit" : "Clubs", bonusChips : 0, baseValue : 3, playOrder: 4},
}

let pair = {
  "a" : {"rank" : 11, "suit" : "Spades", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank" : 11, "suit" : "Spades", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c" : {"rank" : 12, "suit" : "Hearts", bonusChips : 0, baseValue : 10, playOrder: 2},
  "d" : {"rank" : 13, "suit" : "Hearts", bonusChips : 0, baseValue : 10, playOrder: 3},
}

let twoPair = {
  "a" : {"rank" : 11, "suit" : "Spades", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank" : 11, "suit" : "Spades", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c" : {"rank" : 12, "suit" : "Hearts", bonusChips : 0, baseValue : 10, playOrder: 2},
  "d" : {"rank" : 13, "suit" : "Hearts", bonusChips : 0, baseValue : 10, playOrder: 3},
  "e" : {"rank" : 13, "suit" : "Hearts", bonusChips : 0, baseValue : 10, playOrder: 4},
}

let threeofaKind = {
  "a" : {"rank" : 11, "suit": "Spades", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank" : 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c" : {"rank" : 11, "suit" : "Diamonds", bonusChips : 0, baseValue : 10, playOrder: 2},
}

let threeofaKindjunk = {
  "a" : {"rank" : 11, "suit": "Spades", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank" : 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c" : {"rank" : 11, "suit" : "Diamonds", bonusChips : 0, baseValue : 10, playOrder: 2},
  "d" : {"rank" : 12, "suit" : "Diamonds", bonusChips : 0, baseValue : 10, playOrder: 3},
  "e" : {"rank" : 2, "suit" : "Clubs", bonusChips : 0, baseValue : 2, playOrder: 4},
}

let straight = {
  "a" : {"rank" : 2, "suit": "Spades", bonusChips : 0, baseValue : 2, playOrder: 0},
  "b" : {"rank" : 3, "suit": "Hearts", bonusChips : 0, baseValue : 3, playOrder: 1},
  "c" : {"rank" : 4, "suit" : "Clubs", bonusChips : 0, baseValue : 4, playOrder: 2},
  "d" : {"rank" : 5, "suit": "Diamonds", bonusChips : 0, baseValue : 5, playOrder: 3},
  "e" : {"rank" : 6, "suit" : "Spades", bonusChips : 0, baseValue : 6, playOrder: 4}
}

let straightFail = {
  "a" : {"rank" : 3, "suit": "Spades", bonusChips : 0, baseValue : 3, playOrder: 1},
  "b" : {"rank" : 5, "suit": "Hearts", bonusChips : 0, baseValue : 5, playOrder: 2},
  "c" : {"rank" : 7, "suit" : "Clubs", bonusChips : 0, baseValue : 7, playOrder: 3},
  "d" : {"rank" : 9, "suit": "Diamonds", bonusChips : 0, baseValue : 9, playOrder: 4},
  "e" : {"rank" : 11, "suit" : "Spades", bonusChips : 0, baseValue : 10, playOrder: 5}
}

let straightAcetoFive = {
  "a" : {"rank" : 11, "suit" : "Tower", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank" : 2, "suit" : "Diamonds", bonusChips : 0, baseValue : 2, playOrder: 1},
  "c" : {"rank" : 3, "suit" : "Spades", bonusChips : 0, baseValue : 3, playOrder: 2},
  "d" : {"rank" : 5, "suit" : "Diamonds", bonusChips : 0, baseValue : 5, playOrder: 3},
  "e" : {"rank" : 4, "suit" : "Clubs", bonusChips : 0, baseValue : 4, playOrder: 4}
}

let flush = {
  "a" : {"rank" : 11, "suit" : "Club", tarot: "Lovers", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank" : 12, "suit" : "Hearts", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c" : {"rank" : 2, "suit" : "Club", tarot : "Lovers", bonusChips : 0, baseValue : 2, playOrder: 2},
  "d" : {"rank" : 5, "suit" : "Hearts", bonusChips : 0, baseValue : 5, playOrder: 3},
  "e" : {"rank" : 2, "suit" : "Hearts", bonusChips : 0, baseValue : 2, playOrder: 4},
}

let fullhouse = {
  "a" : {"rank" : 10, "suit" : "Spades", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b" : {"rank" : 10, "suit" : "Hearts", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c" : {"rank" : 9 , "suit" : "Spades", bonusChips : 0, baseValue : 9, playOrder: 2},
  "d" : {"rank": 9, "suit" : "Spades", bonusChips : 0, baseValue : 9, playOrder: 3},
  "e" : {"rank" : 9, "suit" : "Hearts", bonusChips : 0, baseValue : 9, playOrder: 4}
}

let flushFive = {
  "a": {"rank": 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b": {"rank": 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c": {"rank": 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 2},
  "d": {"rank": 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 3},
  "e": {"rank": 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 4}
}

let straightFlush = {
  "a": {"rank": 11, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 0},
  "b": {"rank": 12, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 1},
  "c": {"rank": 13, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 2},
  "d": {"rank": 14, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 3},
  "e": {"rank": 10, "suit" : "Clubs", bonusChips : 0, baseValue : 10, playOrder: 4}
}

let fiveofakind = {
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

test('detects the difference between a straight flush, flush, and flush five', () => {
  expect(detectHandValue(flush)).toBe("Flush");
  expect(detectHandValue(flushFive)).toBe("Flush Five");
  expect(detectHandValue(straightFlush)).toBe("Straight Flush");

})

test('detects the difference between a royal flush and a straight', () => {
  expect(detectHandValue(straightFlush)).toBe("Straight Flush");
  expect(detectHandValue(straight)).toBe("Straight");
})