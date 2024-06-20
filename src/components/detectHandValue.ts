import { cardDict } from "../pages/BalatroCalculator";
// ~/nextjsTest/test-app/src/components -> npx ts-node detectHandValue.ts
// remember to change tsconfig.json "module" : "esnext" to "module" : "bundler"

export const detectHandValue = (clickedCard : cardDict) : string => {
  let numCardsPlayed : number = Object.keys(clickedCard).length;
  let ranksPlayed : {[rank : string] : number} = {};
  let suitsPlayed : {[suit : string] : number} = {"Spades": 0, "Hearts": 0, "Clubs" : 0, "Diamonds": 0};
  // let suitsPlayed : {[suit : string] : number} = {"♠" : 0, "♥" : 0, "♣": 0, "♦": 0}
  for (const [_, value] of Object.entries(clickedCard)) {
    if (value.tarot === "Tower") {
     // Tower cards have no suit and rank during hand value detection
    } else {
      if (typeof value.rank === 'string') {
        switch (value.rank) {
          case "J":
            ranksPlayed[11] = (ranksPlayed[11] || 0) + 1;
            break;
          case "Q":
            ranksPlayed[12] = (ranksPlayed[12] || 0) + 1;
            break;
          case "K":
            ranksPlayed[13] = (ranksPlayed[13] || 0) + 1;
            break;
          case "A":
            ranksPlayed[14] = (ranksPlayed[14] || 0) + 1;
            break;
        }
      } else {
        ranksPlayed[value.rank] = (ranksPlayed[value.rank] || 0) + 1;
      }
      if (value.tarot === 'Lovers') {
        suitsPlayed["Spades"] += 1;
        suitsPlayed["Hearts"] += 1;
        suitsPlayed["Clubs"] += 1;
        suitsPlayed["Diamonds"] += 1;
      } else {
        suitsPlayed[value.suit] += 1;
      }
    }
  }
    const sameSuit = Object.values(suitsPlayed).includes(5);
    const sameRank = Object.values(ranksPlayed).includes(5);
    const straightHand = straightCheck(ranksPlayed);
    switch (numCardsPlayed) {
      case 5:
        if (sameSuit && pairCheck(ranksPlayed) === "Full House") {
          return "Flush House";
        } else if (sameRank && !sameSuit) {
          return "Five of A Kind";
        } else if (sameSuit && straightHand) {
          return "Straight Flush";
        } else if (sameRank && sameSuit) {
          return "Flush Five";
        } else if (straightHand) {
          return "Straight";
        } else if (sameSuit && !sameRank && !straightHand){
          return "Flush";
        }
      case 4:
      case 3:
      case 2:
        return pairCheck(ranksPlayed);
      default:
        return "High Card";
    }
}

const pairCheck = (rankDict : {[rank : string] : number}) => {
  let pairArr = Object.values(rankDict).filter((value) => value === 2);
  let tripletArr = Object.values(rankDict).filter((value) => value === 3);
  let fourArr = Object.values(rankDict).filter((value) => value === 4);
  if (pairArr.length === 1 && tripletArr.length === 1) {
    return "Full House";
  } else if (tripletArr.length === 1) {
    return "Three of a Kind";
  } else if (fourArr.length === 1) {
    return "Four of a Kind";
  } else if (pairArr.length === 2) {
    return "Two Pair";
  } else if (pairArr.length === 1) {
    return "Pair";
  }
  return "High Card";
}

const straightCheck = (rankDict : {[rank : string] : number}) : boolean => {
  // A = 11, J = 12, Q = 13, K = 14
  if (Object.keys(rankDict).length < 5) {
    return false;
  }
  let ranks = Object.keys(rankDict).map(value => Number(value)).sort((a , b)=> a - b);
  if (ranks.includes(11) && (!ranks.includes(5) && !ranks.includes(14))) {
    /*
    [9, 10, 11, 12, 13] gives a false straight hand, Valid straights using "A"(11) must have either 5 or "K"(14)
    */
    return false;
  }
  let prev = ranks[0];
  for (const i of ranks.slice(1)) {
    if (prev + 1 !== i) {
      if (prev === 5 && i === 11) {
        // pass
      } else if (prev === 10 && i === 12) {
        // pass
      } else {
        return false;
      }
    }
    prev = i;
  }
  return true;
}
