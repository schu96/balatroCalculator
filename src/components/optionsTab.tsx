import { clickedCardContext } from '../pages/BalatroCalculator';
import React, { useState, useContext } from 'react';

export default function OptionsTab() {
  const [openDeckDD, setOpenDeckDD] = useState<boolean> (false);
  const { cardSaveSession, makeDeck, makeDeckAbandoned, makeDeckCheckered, clearAllCards} = useContext(clickedCardContext);
  const storageClearCards = () => {
    sessionStorage.removeItem("Spades");
    sessionStorage.removeItem("Hearts");
    sessionStorage.removeItem("Clubs");
    sessionStorage.removeItem("Diamonds");
    sessionStorage.removeItem("tarotStorage");
    sessionStorage.removeItem("sealStorage");
    sessionStorage.removeItem("specStorage");
    sessionStorage.removeItem("bonusChips");
  }

  const storageClearHandLevels = () => {
    sessionStorage.removeItem("handLevels")
  }

  const createDeckAction = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    storageClearCards();
    clearAllCards();
    switch(e.currentTarget.getAttribute("data-decktype")) {
      case "standard":
        makeDeck("Spades");
        makeDeck("Hearts");
        makeDeck("Clubs");
        makeDeck("Diamonds");
        break;
      case "checkered":
        makeDeckCheckered();
        break;
      case "abandoned":
        makeDeckAbandoned("Spades");
        makeDeckAbandoned("Hearts");
        makeDeckAbandoned("Clubs");
        makeDeckAbandoned("Diamonds");
        break;
      case "erratic":
        console.log("not implemented yet");
        break;
    }
  }

  const handleDeckClose = (event : React.MouseEvent | React.FocusEvent) => {
    event.stopPropagation();
    setOpenDeckDD(false);
  }

  const storageClearTarot = () => {
    sessionStorage.removeItem("tarotStorage");
    window.location.reload();
  }

  const storageClearSeal = () => {
    sessionStorage.removeItem("sealStorage");
    window.location.reload();
  }

  const storageClearSpec = () => {
    sessionStorage.removeItem("specStorage");
    window.location.reload();
  }

  return (
    <div className="my-2 justify-center text-center inline-table">
      <button className="border bg-gray-700 rounded-md border-red-500 mx-2 px-2 py-2 deckContainerSave"
      onClick={cardSaveSession}>
        Save current deck
      </button>
      <button className="border bg-gray-700 rounded-md border-red-500 mx-2 px-2 py-2 deckContainerClear"
      onClick={storageClearCards}>
        Clear saved deck
      </button>
      <button className="border bg-gray-700 rounded-md border-red-500 mx-2 px-2 py-2 handLevelClear"
      onClick={storageClearHandLevels}>
        Reset hand levels
      </button>
      <button className="border bg-gray-700 rounded-md border-red-500 mx-2 p-2 tarotClear" onClick={storageClearTarot}>
        Clear tarots
      </button>
      <button className="border bg-gray-700 rounded-md border-red-500 mx-2 p-2 sealClear" onClick={storageClearSeal}>
        Clear seals
      </button>
      <button className="border bg-gray-700 rounded-md border-red-500 mx-2 p-2 specClear" onClick={storageClearSpec}>
        Clear spectrals
      </button>
      <div className={`border bg-gray-700 rounded-md border-red-500 mx-2 cursor-pointer w-[120px] mt-[10px] justify-center ${openDeckDD ? "px-2 pt-2" : "p-2"} inline-grid makeDeck`}
      onClick={()=> {setOpenDeckDD(!openDeckDD)}} onBlur={handleDeckClose} tabIndex={0}>
        Change Deck
        {openDeckDD ? (
          <ul className="z-30 w-[120px] pt-2 inline-grid allDecks">
            <li className="grid justify-content-center standard">
              <button className="rounded border-t-[1px] border-red-500 px-2" data-decktype="standard" onMouseDown={createDeckAction}>Standard</button>
            </li>
            <li className="grid justify-content-center checkered">
              <button className="rounded border-t-[1px] border-red-500 px-2" data-decktype="checkered" onMouseDown={createDeckAction}>
                Checkered
              </button>
            </li>
            <li className="grid justify-content-center abandoned">
              <button className="rounded border-t-[1px] border-red-500 px-2" data-decktype="abandoned" onMouseDown={createDeckAction}>
                Abandoned
              </button>
            </li>
            { // Probably shouldn't even be here since its 52 completely random cards
            /* <li className="grid justify-content-center erratic">
              <button className="rounded border-t-[1px] border-red-500 px-2" data-decktype="erratic" onMouseDown={createDeckAction}>
                Erratic
              </button>
            </li> */}
          </ul>
        ) : null}
      </div>
    </div>
  )
}