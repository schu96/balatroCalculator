import { detectHandValue } from "./detectHandValue.ts";
import { cardDict } from "@/pages/BalatroCalculator.tsx";

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

export const calculate = (clickedCard : cardDict, handLevel : {[name : string] : {"mult": number, "base": number}}, balanced : boolean = false, chariots : number = 0) => {
  let handType = detectHandValue(clickedCard).split(" ").join("").toLowerCase();
  let validCards : simpleCardDict[] = getScoringCards(clickedCard);
  return calculateMath(validCards, handLevel, handType, balanced, chariots);
}

export const getScoringCards = (clickedCard : cardDict) => {
  let handType = detectHandValue(clickedCard).split(" ").join("").toLowerCase();
  let scoringCards : Array<simpleCardDict> = [];

  if (handType === "highcard") {
    let highestRank = Object.entries(clickedCard).filter((card) => {
      return !(card[1].tarot === "Tower");
    }).reduce((a, b) => a[1].rank > b[1].rank ? a : b);

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
  else if (handType === "pair" || handType === "twopair") {
    scoringCards = ptfHelper(clickedCard, 2);
  }
  else if (handType === "threeofakind") {
    scoringCards = ptfHelper(clickedCard, 3);
  }
  else if (handType === "fourofakind") {
    scoringCards = ptfHelper(clickedCard, 4);
  }
  else { // All other hand types require 5 valid scoring cards until jokers are implemented
    scoringCards = Object.values(clickedCard);
    }
    scoringCards.sort((a, b) => a.playOrder - b.playOrder);
    return scoringCards;
}

const calculateMath = (validTotal: simpleCardDict[], handLevel : {[name : string] : {"mult" : number, "base" : number}}, handType : string, balanced : boolean, chariots : number) => {
  let chips : number = handLevel[handType].base;
  let mult : number = handLevel[handType].mult;

  const playOrderMath = (card : simpleCardDict) => {
    if (card.tarot === "Tower") {
      chips += card.bonusChips + 50;
    } else {
      chips += card.baseValue + card.bonusChips;
    }
    if (card.tarot === "Empress") {
      mult += 4;
    } else if (card.tarot === "Justice") {
      mult *= 2;
    } else if (card.tarot === "Hierophant") {
      chips += 50;
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
    console.log(avg);
    return avg * avg;
  }
  return chips * mult;
}

const ptfHelper = (cc : cardDict, desiredMatches : number) => {
  let ranksPlayed : {[rank : string] : number} = {};
  let intermediate = [];
  for (const [_, value] of Object.entries(cc)) {
    if (value.tarot === "Tower") {
      intermediate.push(value);
    } else {
      ranksPlayed[value.rank] = (ranksPlayed[value.rank] || 0) + 1;
    }
  }
  let roi = Object.keys(ranksPlayed).filter((cards) => {
    return ranksPlayed[cards] === desiredMatches;
  })
  let output = Object.values(cc).filter((val) => {
    if (val.tarot === "Tower") {
      return true;
    } else {
      return roi.includes(val.rank.toString());
    }
  })
  return output;
}