import React, { useState } from "react"

export default function AddCard ( props : any) {
  const { createCard } = props;
  const [addCardMenu, setAddCardMenu] = useState<boolean>(false);
  const [dropdownSize, setDropdownSize] = useState<number>(1);

  const handleOpenAddCard = (e : React.MouseEvent) => {
    e.stopPropagation();
    setAddCardMenu(true);
  }

  const handleCloseAddCard = (e : React.MouseEvent | React.FocusEvent) => {
    e.stopPropagation();
    setAddCardMenu(false);
  }


  const cycleRanks = () => {
    const ranks = [
      "A", "2", "3", "4", "5", "6", "7",
      "8", "9", "10", "J", "Q", "K"
    ]
    return ranks.map((rank : string) => {
      return (
      <option className="w-[75px] left-[35px]" key={`0-${rank}`}>
        {rank}
      </option>)
    })
  }

  const cycleTarots = () => {
    const tarots = [
      "No tarot", "Magician", "Empress", "Hierophant",
      "Lovers", "Chariot", "Justice", "Devil", "Tower"
    ]
    return tarots.map((tarot : string) => {
      return (
        <option className="" key={`1-${tarot}`}>
          {tarot}
        </option>
      )
    })
  }

  const cycleSpectrals = () => {
    const spectrals = ["No spec", "Foil", "Holographic", "Polychrome"];
    return spectrals.map((spectral : string) => {
      return (
        <option className= "" key={`2-${spectral}`}>
          {spectral}
        </option>
      )
    })
  }

  const cycleSeals = () => {
    const seals = ["No seal", "Red", "Blue", "Purple", "Gold"];
    return seals.map((seal : string) => {
      return (
        <option className="" key={`3-${seal}`}>
        {seal}
        </option>
      )
    })
  }
  const getFields = () => {
    let tarot = (document.querySelector("#addCardTarotField") as HTMLFormElement).value;
    let spectral = (document.querySelector("#addCardSpecField") as HTMLFormElement).value;
    let seal = (document.querySelector("#addCardSealField") as HTMLFormElement).value;
    let cardValues = {
      rank : (document.querySelector("#addCardRankField") as HTMLFormElement).value,
      s : (document.querySelector("#addCardSuitField") as HTMLFormElement).value,
      tarot : tarot === "No tarot" ? "" : tarot,
      spectral : spectral === "No spec" ? "" : spectral,
      seal : seal === "No seal" ? "" : seal,
    }
    createCard(cardValues);
  }

  const handleAddCardBlur = (e : React.FocusEvent) => {
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      if (e.target.id !== "addCardRankField") { // needed to prevent unwanted blur interaction when selecting a rank
        console.log("I am e", e);
        handleCloseAddCard(e);
      }
    }
  }
  return (
    <button className={`relative grid box-border rounded-lg aspect[2/3] object-fit h-30 w-[1/13] p-3 border-2 items-center justify-center cursor-pointer`} id={"add_card"} onClick={handleOpenAddCard}
    tabIndex={1}
    onBlur={handleAddCardBlur}>
      <div className={`text-xl addCard`}>
        +
        {addCardMenu ? (
          <ul className="z-30 -left-[35px] top-[5px] text-base absolute bg-slate-500 w-[200px] h-[175px] rounded-lg addCardMenu">
            <li className="w-[150px]">
              <div className="w-[150px] text-start pl-2" onClick={(e) => {handleCloseAddCard(e)}}>
                Back
              </div>
            </li>
            <li className="addCardSuitField">
              <select className="w-[100px] pl-2 text-black" id="addCardSuitField">
                <option>Spades</option>
                <option>Hearts</option>
                <option>Clubs</option>
                <option>Diamonds</option>
                <option>Wilds</option>
              </select>
            </li>
            <li className="addCardRankField">
                <select className="w-[100px] pl-2 focus:absolute focus:left-[50px] text-black"
                id="addCardRankField" size={dropdownSize}
                onFocus={() => {setDropdownSize(5)}}
                onBlur={() => {setDropdownSize(1)}}
                onChange={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  e.target.blur();
                  setDropdownSize(1);
                }}
                >
                  {cycleRanks()}
                </select>
            </li>
            <li className="addCardTarotField">
              <select className="w-[100px] pl-2 text-black" id="addCardTarotField">
                {cycleTarots()}
              </select>
            </li>
            <li className="addCardSpecField">
              <select className="w-[100px] pl-2 text-black" id="addCardSpecField">
                {cycleSpectrals()}
              </select>
            </li>
            <li className="addCardSealField">
              <select className="w-[100px] pl-2 text-black" id="addCardSealField">
                {cycleSeals()}
              </select>
            </li>
            <li className="createCard">
              <div className="w-[100px] bg-gray-700 inline-flex pl-2 border border-red-500 cursor-pointer"
              onClick={() => {getFields()}}>
                Create card
              </div>
            </li>
          </ul>
        ) : null}
      </div>
    </button>
  )
}