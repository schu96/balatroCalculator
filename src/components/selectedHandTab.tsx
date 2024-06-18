import { clickedCardContext, handValueType } from "../pages/BalatroCalculator";
import React, { useContext, useState, useEffect } from "react";
import { detectHandValue, calculate, getScoringCards } from ".";

export default function SelectedHandTab() {
  const {clickedCard, handLevel, setClickedCard} = useContext(clickedCardContext);
  const [hl, setHl] = useState<any>("");
  const [chariotHand, setChariotHand] = useState<number>(0);
  const [balancedCalc, setBalancedCalc] = useState<boolean>(false);

  useEffect(() => {
    setHl(() => {
      return retrieveHandLevel();
    });
  }, [clickedCard, handLevel]);

  const handLevelDisplay = () : string => {
    const handName = detectHandValue(clickedCard).toLowerCase().split(" ").join("");
    let handLevelInfo = JSON.parse(sessionStorage.getItem("handLevels") as string)[handName];
    return `${detectHandValue(clickedCard)} | Lv.${hl.level} ${hl.base} x ${hl.mult}`;
    }

  const retrieveHandLevel = () : { base : number, mult : number, level : number } => {
    const handName = detectHandValue(clickedCard).toLowerCase().split(" ").join("");
    let handLevelInfo = JSON.parse(sessionStorage.getItem("handLevels") as string)[handName];
    return JSON.parse(sessionStorage.getItem("handLevels") as string)[handName]
    }

  const clickedCardString = () => {
    let output = [];
    for (const [_, value] of Object.entries(clickedCard)) {
      if (value.tarot === "Tower") {
        output.push("Stone Card");
      } else {
        output.push(`${value.displaysuit}${value.displayrank}`);
      }
    }
    return output.join(" ");
  }
  const convertSuit = (s : string) : string => {
    if (s === "Spades") {
      return "♠";
    } else if (s === "Hearts") {
      return "♥";
    } else if (s === "Clubs") {
      return "♣";
    } else if (s === "Diamonds"){
      return "♦";
    }
    return "*";
  }

  const convertRank = (rank : number) : string => {
    if (rank <= 10) {
      return rank.toString();
    } else {
      if (rank === 11){
        return "A";
      } else if (rank === 12) {
        return "J";
      } else if (rank === 13) {
        return "Q";
      } else if (rank === 14){
        return "K";
      }
    }
    throw new Error(`Unknown rank detected in convertRank: ${rank}`);
  }
  const scoringBreakdown = () => {
    let scoringCards = getScoringCards(clickedCard);
    let handLevel = retrieveHandLevel();
    let cumulativeBase = handLevel.base;
    let cumulativeMult = handLevel.mult;
    let table = (
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col">Scoring Card</th>
            <th scope="col">Base Value</th>
            <th scope="col">Bonus Chips</th>
            <th scope="col">+Mult</th>
            <th scope="col">xMult</th>
            <th scope="col">Chips x Mult</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {scoringCards.map((card) => {
            if (card.tarot === "Tower") {
              cumulativeBase += 50 + card.bonusChips;
            } else {
              cumulativeBase += card.baseValue + card.bonusChips;
            }
            if (card.tarot === "Empress") {
              cumulativeMult += 4;
            } else if (card.tarot === "Justice") {
              cumulativeMult *= 2;
            }
            if (card.spectral === "Foil") {
              cumulativeBase += 50;
            } else if (card.spectral === "Holographic") {
              cumulativeMult += 10;
            } else if (card.spectral === "Polychrome"){
              cumulativeMult *= 1.5;
            }
            return (
              <tr>
                <th scope="row">{convertSuit(card.suit)}{convertRank(card.rank)}{card.tarot === "Tower" ? "🌑" : ""}</th>
                <td>{card.baseValue}</td>
                <td>
                  {card.bonusChips + (card.tarot === "Tower" ? 50 : 0) + (card.spectral === "Foil" ? 50 : 0)}
                </td>
                <td>
                  {(card.tarot === "Empress" ? 4 : 0) + ((card.spectral as string) === "Holographic" ? 10 : 0)}
                </td>
                <td>
                  {(card.tarot === "Justice" ? 2 : 1) * (card.spectral === "Polychrome" ? 1.5 : 0)}
                </td>
                <td>{cumulativeBase} x {cumulativeMult}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
    return table;
  }
  return (
    <div className={`bg-emerald-900 h-full bottom-0 px-2 selectedHandArea`}>
      <div className="flex flex-row">
        <div className="basis-1/4 grow handValueName">
          {Object.keys(clickedCard).length === 0 ? "No cards clicked yet" : handLevelDisplay()}
        </div>
        {Object.keys(clickedCard).length === 0 ? "" : (
          <div className="basis-1/4 grow handLevelBase">
            Est. Score: {calculate(clickedCard, JSON.parse(sessionStorage.getItem("handLevels") as string), balancedCalc, chariotHand)}
          </div>
        )}

        <button className="flex float-right resetClickedCards" onClick={() => setClickedCard({})}>
          Clear clicked cards
        </button>
      </div>
      <div className = {`simpleClickedCards`}>
        {Object.keys(clickedCard).length === 0 ? "" : clickedCardString()}
      </div>
      <div className={`breakdown`} onClick={() => {console.log(getScoringCards(clickedCard))}}>
        {Object.keys(clickedCard).length === 0 ? "" : scoringBreakdown()}
      </div>
      <div className="absolute bottom-[5px]">
        <label htmlFor="chariot">Chariot Cards in Hand: </label>
        <input className="w-[60px] text-black pl-2" id="chariot" type="number" step={1} defaultValue={0} onChange={(e) => {
          console.log(e.currentTarget.value);
          setChariotHand(parseInt(e.currentTarget.value));
        }}></input>

        <label className="pl-[50px]" htmlFor="balanced">Balanced Calculation </label>
        <input id="balanced" type="checkbox" defaultChecked={false} onChange={(e) =>{
          setBalancedCalc(!balancedCalc)
        }}></input>
      </div>
    </div>
  )
}