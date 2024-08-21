import { clickedCardContext} from "../pages/BalatroCalculator";
import React, { useContext, useState, useEffect } from "react";
import { detectHandValue, calculate, getScoringCards, bossBlindCheck, htLevelChange } from ".";

type handTypeValue = {
  base : string | number,
  mult : string | number,
  level: string | number
}

export default function SelectedHandTab() {
  const {clickedCard, handLevel, setClickedCard} = useContext(clickedCardContext);
  const [handType, sethandType] = useState<handTypeValue>({"base" : "", "mult" : "", "level" : ""});
  const [dropdownSize, setDropdownSize] = useState<number>(1);
  const [bossBlind, setBossBlind] = useState<string>("None");
  const [chariotHand, setChariotHand] = useState<number>(0);
  const [balancedCalc, setBalancedCalc] = useState<boolean>(false);

  useEffect(() => {
    sethandType(() => {
      return retrieveHandLevel();
    });
  }, [clickedCard, handLevel]);

  const handLevelDisplay = () : string => {
    return `${detectHandValue(clickedCard)} | Lv.${handType.level} ${handType.base} x ${handType.mult}`;
    }

  const retrieveHandLevel = () : { base : number, mult : number, level : number } => {
    const handName = detectHandValue(clickedCard).toLowerCase().split(" ").join("");
    return JSON.parse(sessionStorage.getItem("handLevels") as string)[handName]
    }

  const cycleBossBlinds = () => {
    const bossNames = [
      "None", "The Goad", "The Heart", "The Club", "The Window",
      "The Flint", "The Plant", "The Arm",
    ]
    return bossNames.map((name : string) => {
      return (
        <option className="" key={`boss-${name}`}>
          {name}
        </option>
      )
    })
  }

  const clickedCardString = () => {
    const output = [];
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
      if (rank === 14){
        return "A";
      } else if (rank === 11) {
        return "J";
      } else if (rank === 12) {
        return "Q";
      } else if (rank === 13){
        return "K";
      }
    }
    throw new Error(`Unknown rank detected in convertRank: ${rank}`);
  }
  const scoringBreakdown = () => {
    const scoringCards = getScoringCards(clickedCard);
    const handLevel = retrieveHandLevel();
    let cumulativeBase = handLevel.base;
    let cumulativeMult = handLevel.mult;
    let theFlintDebuff = false;
    let theArmDebuff = false;
    const table = (
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
            const isTower = card.tarot === "Tower"
            if (bossBlind === "The Flint" && !theFlintDebuff) {
              cumulativeBase = Math.round(cumulativeBase / 2);
              cumulativeMult = Math.round(cumulativeMult / 2);
              theFlintDebuff = true;
            } else if (bossBlind === "The Arm" && ! theArmDebuff) {
              const handLevelStore = JSON.parse(sessionStorage.getItem("handLevels") as string);
              const handType = detectHandValue(clickedCard).toLowerCase().split(" ").join("");
              if (handLevelStore[handType].level !== 1) {
                cumulativeBase = handLevelStore[handType]["base"] - htLevelChange[handType]["changeBase"];
                cumulativeMult = handLevelStore[handType]["mult"] - htLevelChange[handType]["changeMult"];
                theArmDebuff = true;
              }
            }
            if (bossBlindCheck(card, bossBlind) && !isTower) {
              // pass
            } else {
              if (isTower) {
                cumulativeBase += 50 + card.bonusChips;
              } else {
                cumulativeBase += card.baseValue + card.bonusChips;
                if (card.tarot === "Empress") {
                  cumulativeMult += 4;
                } else if (card.tarot === "Justice") {
                  cumulativeMult *= 2;
                }
              }
              if (card.spectral === "Foil") {
                cumulativeBase += 50;
              } else if (card.spectral === "Holographic") {
                cumulativeMult += 10;
              } else if (card.spectral === "Polychrome"){
                cumulativeMult *= 1.5;
              }
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
            Est. Score: {calculate(clickedCard, handLevel, balancedCalc, chariotHand, bossBlind)}
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
        <input className="w-[50px] text-black pl-2" id="chariot" type="number" step={1} defaultValue={0} onChange={(e) => {
          setChariotHand(parseInt(e.currentTarget.value));
        }}/>

        <label className="pl-[50px]" htmlFor="balanced">Balanced Calculation </label>
        <input id="balanced" type="checkbox" defaultChecked={false} onChange={() =>{
          setBalancedCalc(!balancedCalc)
        }}/>

        <label className="pl-[50px]" htmlFor="bossName">Boss Blind: </label>
        <select className="w-[125px] text-black pl-1" id="bossName" size={dropdownSize} onFocusCapture={() => setDropdownSize(5)}
        onBlur={() => {setDropdownSize(1)}} onChange={(e) => {
          setBossBlind(e.target.value);
          e.target.blur();
          setDropdownSize(1);
        }}>
          {cycleBossBlinds()}
        </select>
      </div>
    </div>
  )
}