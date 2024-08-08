import { clickedCardContext } from "../pages/BalatroCalculator";
import React, { useState, useContext } from "react";
import { SelectedHandTab, OptionsTab } from ".";

export default function TabContainer() {
  const {clickedCard, setClickedCard, handLevel, handLevelSaveSession, cardSaveSession, makeDeck, makeDeckAbandoned, makeDeckCheckered, clearAllCards} = useContext(clickedCardContext);
  const [currentTab, setCurrentTab] = useState<string>("clickedCard");
  const [collapse, setCollapse] = useState<boolean>(true);

  const switchTab = () => {
    if (collapse) {
      return;
    }
    switch(currentTab) {
      case "clickedCard":
        return <SelectedHandTab />
      case "options":
        return <OptionsTab />
    }
  }

  const handleTabClick = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentTab(e.currentTarget.getAttribute("data-tabname") as string);
    setCollapse(false);
  }

  return (
  <div className={`w-full bg-zinc-600 absolute sticky ${collapse ? "h-[0px]" : "h-[300px]"} bottom-0 overflow-y-visibe tabContainer`}>
    <ol className="absolute w-full bg-transparent -top-[26px]">
      <button className="w-content border border-white bg-red-500 px-[5px] rounded-t-lg inline-block tab-list-item" data-tabname="clickedCard" onClick={handleTabClick}>
        Current Hand
      </button>
      <button className="w-content border border-white bg-blue-500 px-[5px] rounded-t-lg inline-block tab-list-item" data-tabname="options" onClick={handleTabClick}>
        Options
      </button>
      <button className = {`relative border-t border-x border-white w-8 top-[1px] bg-slate-500 float-right mr-[20px] rounded-t-lg collapseIcon`} onClick={() => setCollapse(!collapse)}>
        {collapse ? "v" : "^"}
      </button>
    </ol>
    <clickedCardContext.Provider
      value={{clickedCard, setClickedCard, handLevel, handLevelSaveSession, cardSaveSession, makeDeck, makeDeckAbandoned,makeDeckCheckered, clearAllCards}}>
      {switchTab()}
    </clickedCardContext.Provider>
  </div>
  )
}