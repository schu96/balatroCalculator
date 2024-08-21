'use client'
import React, { useState, useEffect, ReactElement, createContext } from "react";
import FMLayout from './fmLayout';
import { Card, AddCard, Sidebar, SuitContainer, handValues, TabContainer } from '../components';

export type tarotType = "Magician" | "Empress" | "Hierophant" | "Lovers" | "Chariot" | "Justice" | "Tower" | "Devil" | "" | undefined;

export interface cardDict {
  [id : string] : {
    rank : number,
    displayrank? : number | string,
    suit : string,
    displaysuit?: string,
    baseValue : number,
    bonusChips : number,
    tarot? : tarotType,
    spectral? : string,
    seal? : string,
    playOrder : number
  }
}

type clickedCardContextType = {
  clickedCard : cardDict,
  setClickedCard : (clickedCard : cardDict) => void,
  handLevelSaveSession? : () => void,
  cardSaveSession? : () => void,
  handLevel : handValueType,
  setHandLevel? : (handLevel : handValueType) => void,
  makeDeck : (suit : "Spades" | "Hearts" | "Clubs" | "Diamonds") => void,
  makeDeckCheckered : () => void,
  makeDeckAbandoned : (suit : "Spades" | "Hearts" | "Clubs" | "Diamonds") => void,
  spadeContainer? : Array<ReactElement>,
  setSpadeContainer? : (spadeContainer : Array<ReactElement>) => void,
  heartContainer? : Array<ReactElement>,
  setHeartContainer? : (heartContainer : Array<ReactElement>) => void,
  clubContainer? : Array<ReactElement>,
  setClubContainer? : (clubContainer : Array<ReactElement>) => void,
  diamondContainer? : Array<ReactElement>,
  setDiamondContainer? : (diamondContainer : Array<ReactElement>) => void,
  clearAllCards : () => void,
}

type cardStorageInfo = {
  s : string,
  val : number,
  id : string
}

export type createCardInfo = {
  rank : string | number,
  s : string,
  tarot? : tarotType,
  spectral? : string,
  seal? : string
}

export const clickedCardContext = createContext<clickedCardContextType>({} as clickedCardContextType);

export type handValueType = {
  [handValueName : string] :
  {
    base : number,
    mult : number,
    level: number
  }
}

export default function BalatroPage() {
  // More preferrable to specify an empty dict object instead of trying to make a placeholder clickedCard state
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  const [clickedCard, setClickedCard] = useState <cardDict | {}> ({});
  const [spadeContainer, setSpadeContainer] = useState <Array<ReactElement>> ([]);
  const [heartContainer, setHeartContainer] = useState <Array<ReactElement>> ([]);
  const [clubContainer, setClubContainer] = useState <Array<ReactElement>> ([]);
  const [diamondContainer, setDiamondContainer] = useState <Array<ReactElement>> ([]);
  const [handLevel, setHandLevel] = useState<handValueType> ({});

  const CONTAINER_NAMES = ["Spades", "Hearts", "Clubs", "Diamonds", "Wilds"];

  const makeDeck = (suit: "Spades" | "Hearts" | "Clubs" | "Diamonds") => {
    const container : Array<ReactElement> = [];
    for (let rank = 2; rank <= 14; rank++ ) {
      const id = (Math.floor(new Date().valueOf() * Math.random())).toString();
      if (rank === 14) {
        container.push(<Card s={suit} val={"A"} handleCardClick={handleCardClick} id={id} deleteCard={deleteCard} />)
      } else if (rank === 11) {
        container.push(<Card s={suit} val={"J"} handleCardClick={handleCardClick} id={id} deleteCard={deleteCard} />)
      } else if (rank === 12) {
        container.push(<Card s={suit} val={"Q"} handleCardClick={handleCardClick} id={id} deleteCard={deleteCard} />)
      } else if (rank === 13) {
        container.push(<Card s={suit} val={"K"} handleCardClick={handleCardClick} id={id} deleteCard={deleteCard} />)
      } else {
        container.push(<Card s={suit} val={rank} handleCardClick={handleCardClick} id={id} deleteCard={deleteCard} />)
      }
    }
    container.push(<AddCard createCard={createCard} />)
    if (suit === "Spades") {
      setSpadeContainer(container);
    } else if (suit === "Hearts") {
      setHeartContainer(container);
    } else if (suit === "Clubs") {
      setClubContainer(container);
    } else {
      setDiamondContainer(container);
    }
  }

  const makeDeckCheckered = () => {
    clearAllCards();
    makeDeck("Spades");
    makeDeck("Hearts");
  }

  const makeDeckAbandoned = (suit : "Spades" | "Hearts" | "Clubs" | "Diamonds") => {
    const container : Array<ReactElement> = [];
    for (let rank = 2; rank < 11; rank ++) {
      const id = (Math.floor(new Date().valueOf() * Math.random())).toString();
      container.push(<Card s={suit} val={rank} handleCardClick={handleCardClick} id={id} deleteCard={deleteCard} />)
    }
    const aceId = (Math.floor(new Date().valueOf() * Math.random())).toString();
    container.push(<Card s={suit} val={"A"} handleCardClick={handleCardClick} id={aceId} deleteCard={deleteCard}/>)
    container.push(<AddCard createCard={createCard} />);
    if (suit === "Spades") {
      setSpadeContainer(container);
    } else if (suit === "Hearts") {
      setHeartContainer(container);
    } else if (suit === "Clubs") {
      setClubContainer(container)
    } else {
      setDiamondContainer(container);
    }
  }

  const clearAllCards = () => {
    setSpadeContainer([]);
    setHeartContainer([]);
    setClubContainer([]);
    setDiamondContainer([]);
  }

  useEffect(() => {
    if (Object.keys(sessionStorage).filter((keyName) => {
      return CONTAINER_NAMES.includes(keyName);
      }).length === 0) {
      makeDeck("Spades");
      makeDeck("Hearts");
      makeDeck("Clubs");
      makeDeck("Diamonds");
    }
    for (const container of CONTAINER_NAMES) {
      if (sessionStorage.getItem(container)) {
        const arr = [];
        for (const item of JSON.parse(sessionStorage.getItem(container) as string)) {
          arr.push(<Card s={item.s} val={item.val} id={item.id} handleCardClick={handleCardClick} deleteCard={deleteCard}/>);
        }
        arr.push(<AddCard createCard={createCard} />)
        switch(container) {
          case "Spades":
            setSpadeContainer(arr);
            break;
          case "Hearts":
            setHeartContainer(arr);
            break;
          case "Clubs":
            setClubContainer(arr);
            break;
          case "Diamonds":
            setDiamondContainer(arr);
            break;
        }
      }
    }
    if (sessionStorage.getItem("handLevels")) {
      setHandLevel(JSON.parse(sessionStorage.getItem("handLevels") as string));
    } else {
      setHandLevel((prevHandLevels : handValueType) => {
        const temp = Object.assign({}, prevHandLevels);
        for (const [key, value] of Object.entries(handValues)) {
          temp[key] = {"base" : value.base, "mult" : value.mult, "level": value.level};
        }
        return temp;
      })
    }
  }, [])


  useEffect(() => {
    cardSaveSession();
  }, [spadeContainer, heartContainer, clubContainer, diamondContainer])

  useEffect(() => {
    handLevelSaveSession();
  }, [handLevel])

  const deleteCard = (suit : string, id : string) => {
    const container = JSON.parse(sessionStorage.getItem(suit) as string);
    const temp = container.filter((cardObject : cardStorageInfo) => {
      return cardObject["id"] !== id;
    });
    if (!temp) {
      throw new Error(`Unable to find valid container: ${suit}`)
    }
    const newContainer : Array<ReactElement> = [];
    for (const obj of temp) {
      newContainer.push(<Card s={obj.s} val={obj.val} handleCardClick={handleCardClick} id={obj.id} deleteCard={deleteCard}/>)
    }
    newContainer.push(<AddCard createCard={createCard} />)
    if (suit === "Spades") {
      setSpadeContainer(newContainer);
    } else if (suit === "Hearts") {
      setHeartContainer(newContainer);
    } else if (suit === "Clubs") {
      setClubContainer(newContainer);
    } else if (suit === "Diamonds") {
      setDiamondContainer(newContainer);
    }
  }

  const cardSaveSession = () => {
    if (spadeContainer.length !== 0) {
      const arr = spadeContainer.map((spade) => { return spade.props; })
      sessionStorage.setItem("Spades", JSON.stringify(arr.slice(0, -1)));
    }
    if (heartContainer.length !== 0) {
      const heartArr = heartContainer.map((heart) => {return heart.props; })
      sessionStorage.setItem("Hearts", JSON.stringify(heartArr.slice(0, -1)));
    }
    if (clubContainer.length !== 0) {
      const clubArr = clubContainer.map((club) => { return club.props; })
      sessionStorage.setItem("Clubs", JSON.stringify(clubArr.slice(0, -1)));
    }
    if (diamondContainer.length !== 0) {
      const diamondArr = diamondContainer.map((diamond) => { return diamond.props; })
      sessionStorage.setItem("Diamonds", JSON.stringify(diamondArr.slice(0, -1)));
    }
  }

  const handLevelSaveSession = () => {
    sessionStorage.setItem("handLevels", JSON.stringify(handLevel));
  }

  const createCard = (item : createCardInfo) => {
    let container = JSON.parse(sessionStorage.getItem(item.s) as string);
    if (!isNaN(parseInt(container.rank))) {
      container.rank = parseInt(container.rank)
    }
    const newContainer : Array<ReactElement> = [];
    if (!container) {
      container = {};
    } else {
      for (const obj of container) {
        newContainer.push(<Card s={obj.s} val={obj.val} handleCardClick={handleCardClick} id={obj.id} deleteCard={deleteCard} />);
      }
    }
    const id = (Math.floor(new Date().valueOf() * Math.random())).toString();
    newContainer.push(<Card s={item.s} val={item.rank} handleCardClick={handleCardClick} deleteCard={deleteCard} tarotEnhancement={item.tarot} spectralEnhancement={item.spectral} sealType={item.seal} id={id} />);
    newContainer.push(<AddCard createCard={createCard} />);
    if (item.s === "Spades") {
      setSpadeContainer(newContainer);
    } else if (item.s === "Hearts") {
      setHeartContainer(newContainer);
    } else if (item.s === "Clubs") {
      setClubContainer(newContainer);
    } else if (item.s === "Diamonds") {
      setDiamondContainer(newContainer);
    }
  }
  const handleCardClick = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const unique = e.currentTarget.id;
    const cardButton = e.currentTarget;
    const element = e.currentTarget.querySelector(".playingCardRank") as Element;
    const r = Number.isNaN(Number(element.textContent)) ? element.textContent : Number(element.textContent);
    const s = e.currentTarget.querySelector(".playingCardSuit") as Element;
    setClickedCard((prevCards : cardDict) => {
      const temp = Object.assign({}, prevCards);
      if (temp[unique]) {
        const oopsOrder = temp[unique].playOrder as number;
        delete temp[unique];
        for (const card of Object.values(temp)) {
          if (card.playOrder as number> oopsOrder) {
            (card.playOrder as number) -= 1;
            }
        }
      } else {
        if (Object.keys(temp).length === 5) {
          console.log("Max number of cards displayed");
          return temp;
        } else {
          temp[unique] = {
            suit : cardButton.getAttribute("data-suit") as string,
            displaysuit : s.textContent as string,
            rank : parseInt(cardButton.getAttribute("data-rank") as string),
            displayrank : r as number | string,
            baseValue : parseInt(cardButton.getAttribute("data-basevalue") as string),
            bonusChips : parseInt(cardButton.getAttribute("data-bonuschips") as string),
            seal : cardButton.getAttribute("data-seal") as string,
            tarot : cardButton.getAttribute("data-tarot") as tarotType,
            spectral : cardButton.getAttribute("data-spec") as string,
            playOrder : Object.keys(prevCards).length,
          }
        }
      }
      return temp;
    })
  }

  // const handleShowClickedCards = () => {
  //   if (showClickedCards) {
  //     setShowClickedCards(!showClickedCards);
  //   } else {
  //     setShowClickedCards(!showClickedCards);
  //   }
  // }

  return (
  <FMLayout>
    <title> Balatro Calculator </title>
      <br/>
      <div>
        <Sidebar handValues = {handLevel} setHandLevel = {setHandLevel} />
        <div className = "inline-block w-9/12 ml-4 cardContents">
          <SuitContainer {...{suitName : "Spades", cards: spadeContainer}} />
          <SuitContainer {...{suitName : "Hearts", cards: heartContainer}} />
          <SuitContainer {...{suitName : "Clubs", cards : clubContainer}} />
          <SuitContainer {...{suitName : "Diamonds", cards : diamondContainer}} />
        </div>
      </div>
      {/* <div className = "selectedCards">
        <span onClick={handleShowClickedCards}> Show clicked cards here </span>
        <br/>
        <div className = "grid w-full grid-cols-5 gap-4 object-cover clickedCards ">
          {displayClickedCards()}
        </div>
      </div> */}
      <br/>
      <clickedCardContext.Provider value={{clickedCard, setClickedCard, handLevel, handLevelSaveSession, cardSaveSession, makeDeck, makeDeckAbandoned, makeDeckCheckered, spadeContainer, setSpadeContainer, heartContainer, setHeartContainer, clubContainer, setClubContainer, diamondContainer, setDiamondContainer, clearAllCards}}>
        <TabContainer />
      </clickedCardContext.Provider>
  </FMLayout>
  )
}