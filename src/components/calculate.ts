import { detectHandValue, htLevelChange } from ".";
import { cardDict, handValueType } from "../pages/BalatroCalculator.tsx";

interface simpleCardDict {
  rank : number,
  suit : string,
  baseValue : number,
  bonusChips : number,
  tarot? : string,
  spectral? : string,
  seal? : string,
  playOrder : number
}

export const calculate = (clickedCard : cardDict, handLevel : handValueType, balanced : boolean = false, chariots : number = 0, bossBlind : string = "") => {
  let handType = detectHandValue(clickedCard).split(" ").join("").toLowerCase();
  let validCards : simpleCardDict[] = getScoringCards(clickedCard);
  return calculateMath(validCards, handLevel, handType, balanced, chariots, bossBlind);
}

export const getScoringCards = (clickedCard : cardDict) => {
  let handType = detectHandValue(clickedCard).split(" ").join("").toLowerCase();
  let scoringCards : Array<simpleCardDict> = [];

  if (handType === "highcard") {
    let nonTowerCards = Object.entries(clickedCard).filter((card) => {
      return !(card[1].tarot === "Tower");
    })
    if (nonTowerCards.length === 0) {
      scoringCards = Object.values(clickedCard);
    } else {
      let highestRank = nonTowerCards.reduce((a, b) => a[1].rank > b[1].rank ? a : b);
      for (const [key, value] of Object.entries(clickedCard)) {
        if (value.tarot === "Tower") {
          scoringCards.push(value);
        } else {
          if (key === highestRank[0]) {
            scoringCards.push(value);
          }
        }
      }
    }

  }
  else if (handType === "pair" || handType === "twopair") {
    scoringCards = pairTripleFourHelper(clickedCard, 2);
  }
  else if (handType === "threeofakind") {
    scoringCards = pairTripleFourHelper(clickedCard, 3);
  }
  else if (handType === "fourofakind") {
    scoringCards = pairTripleFourHelper(clickedCard, 4);
  }
  else { // All other hand types require 5 valid scoring cards until jokers are implemented
    scoringCards = Object.values(clickedCard);
    }
  scoringCards.sort((a, b) => a.playOrder - b.playOrder);
  return scoringCards;
}

const calculateMath = (validTotal: simpleCardDict[], handLevel : handValueType, handType : string, balanced : boolean, chariots : number, bossBlind : string) => {
  let chips : number = handLevel[handType].base;
  let mult : number = handLevel[handType].mult;
  if (bossBlind === "The Flint") {
    chips = Math.round(chips / 2);
    mult = Math.round(mult / 2);
  }
  if (bossBlind === "The Arm") {
    let handLevelStore = JSON.parse(sessionStorage.getItem("handLevels") as string);
    if (handLevelStore[handType]["level"] !== 1) {
      chips = handLevelStore[handType]["base"] - htLevelChange[handType]["changeBase"];
      mult = handLevelStore[handType]["mult"] - htLevelChange[handType]["changeMult"];
    }
  }

  const playOrderMath = (card : simpleCardDict) => {
    let isTower = card.tarot === "Tower";
    if (bossBlindCheck(card, bossBlind) && !isTower) {
      return;
    }
    if (isTower) {
      chips += card.bonusChips + 50;
    } else {
      chips += card.baseValue + card.bonusChips;
      if (card.tarot === "Empress") {
        mult += 4;
      } else if (card.tarot === "Justice") {
        mult *= 2;
      } else if (card.tarot === "Hierophant") {
        chips += 50;
      }
    }
    if (card.spectral === "Holographic") {
      mult += 10;
    } else if (card.spectral === "Foil") {
      chips += 50;
    } else if (card.spectral === "Polychrome") {
      mult *= 1.5;
    }
  }


  for (var card of validTotal) {
    playOrderMath(card);
    if (card.seal === "Red") {
      playOrderMath(card);
    }
  }
  if (chariots > 0) {
    let counter = 0;
    while (counter != chariots) {
      mult *= 1.5;
      counter += 1;
    }
  }
  if (balanced) {
    let avg = (chips + mult) / 2;
    return Math.round(avg * avg);
  }
  return Math.round(chips * mult);
}

export const bossBlindCheck = (card : simpleCardDict, bossBlind : string) => {
  if (bossBlind === "The Goad") {
    if (card.suit === "Spades" || card.tarot === "Lovers") {
      return true;
    }
  } else if (bossBlind === "The Heart") {
    if (card.suit === "Hearts" || card.tarot === "Lovers") {
      return true;
    }
  } else if (bossBlind === "The Club") {
    if (card.suit === "Clubs" || card.tarot === "Lovers") {
      return true;
    }
  } else if (bossBlind === "The Window") {
    if (card.suit === "Diamonds" || card.tarot === "Lovers") {
      return true;
    }
  } else if (bossBlind === "The Plant") {
    if (card.rank > 10 && card.rank < 14) {
      return true;
    }
  }
  return false;
}


const pairTripleFourHelper = (cc : cardDict, desiredMatches : number) => {
  let ranksPlayed : {[rank : string] : number} = {};
  let intermediate = [];
  for (const [_, value] of Object.entries(cc)) {
    if (value.tarot === "Tower") {
      intermediate.push(value);
    } else {
      ranksPlayed[value.rank] = (ranksPlayed[value.rank] || 0) + 1;
    }
  }
  let ranksOfInterest = Object.keys(ranksPlayed).filter((cards) => {
    return ranksPlayed[cards] === desiredMatches;
  })
  let output = Object.values(cc).filter((val) => {
    if (val.tarot === "Tower") {
      return true;
    } else {
      return ranksOfInterest.includes(val.rank.toString());
    }
  })
  return output;
}