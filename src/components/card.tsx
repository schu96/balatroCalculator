import React, { useEffect, useId, useState } from 'react';
import { BaseValueSubMenu, SealSubMenu, SpectralSubMenu, TarotSubMenu } from './submenus';
import { tarotType } from '@/pages/BalatroCalculator';
interface cardProps {
  s : string,
  val : number | string,
  handleCardClick : any,
  id? : string | null,
  spectralEnhancement? : string | null | undefined,
  tarotEnhancement? : tarotType,
  sealType? : string,
  deleteCard : (suit : string, id : string) => void,
}

export default function Card ( props : cardProps ) {
  const {s, val, handleCardClick, id, spectralEnhancement, tarotEnhancement, sealType, deleteCard} = props;
  const dropdownStyle : string = "z-30 bg-purple-700 border-x-2 border-t-2 border-solid border-white text-start rounded-sm w-24";
  const FOIL : string = "bg-[repeating-radial-gradient(circle_closest-side_at_50%,_royalblue_10px,_navy_15px,_royalblue_15px,_dodgerblue_10px)]";
  const HOLOGRAPHIC : string = "bg-[linear-gradient(rgba(69,_60,_153,0.4),_rgba(90,0,10,_0.5))]";
  const POLYCHROME : string = "bg-[linear-gradient(_40deg,_rgba(200,_0,_0,_0.8),_rgba(200,_0,_0,_0)_70.71%_),_linear-gradient(100deg,_rgba(0,_200,_0,_0.8),_rgba(0,_200,_0,_0)_50.71%),_linear-gradient(160deg,_rgba(0,_0,_200,_0.8),_rgba(0,_0,_200,_0)_90.71%)]";
  const unique = id === null ? useId() : id;

  /*
    Red = bg-red-500, Blue = bg-blue-500,
    Purple = bg-purple-500, Yellow = bg-yellow-500
  */
  const [seal, setSeal] = useState<string>(sealType ? sealType : "");
  /*
    Magician = 1, Empress = 3, Hierophant = 5, Lovers = 6,
    Chariot = 7, Justice = 8, Devil = 15, Tower = 16
  */
  const [menu1, setMenu1] = useState<boolean>(false);
  const [menu2, setMenu2] = useState<boolean>(false);
  const [menu3, setMenu3] = useState<boolean>(false);
  const [tarotOpen, setTarotOpen] = useState<boolean> (false);
  const [specOpen, setSpecOpen] = useState<boolean> (false);
  const [tarot, setTarot] = useState<string> (tarotEnhancement ? tarotEnhancement : "");
  const [tarotDisplay, setTarotDisplay] = useState<string> ("");
  const [spectral, setSpectral] = useState<string> (spectralEnhancement ? spectralEnhancement : "");

  const [scoringValue, setScoringValue] = useState<number>(0);
  const [rankValue, setRankValue] = useState<number>(); // determines hand type, should not change
  const [suit, setSuit] = useState<string>(s);

  //format is text-<colorname>-<colorValue>
  const [isStoneCard, setIsStoneCard] = useState<boolean> (false);
  const [isLoversCard, setIsLoversCard] = useState<boolean> (false);
  const [bonusBase, setBonusBase] = useState<number>(0);

  const assignDisplaySuit = () => {
    switch(s) {
      case "Spades":
        return "♠";
      case "Hearts":
        return "♥";
      case "Clubs":
        return "♣";
      case "Diamonds":
        return "♦";
      default:
        return "*";
    }
  }
  const assignDisplayValue = () => {
    if (typeof val === "number") {
      if (val > 10) {
        switch(val) {
          case 14:
            return "A";
          case 11:
            return "J";
          case 12:
            return "Q";
          case 13:
            return "K";
        }
      }
    }
    return val;
  }
  const displaySuit : string = assignDisplaySuit();
  const displayValue : number | string = assignDisplayValue();

  const assignSuitColor = () => {
    if (isStoneCard) {
      return "text-zinc-500/25";
    } else if (displaySuit === "♠") {
      return "text-cyan-500";
    } else if (displaySuit === "♥") {
      return "text-red-500";
    } else if (displaySuit === "♣") {
      return "text-green-500";
    } else if (displaySuit === "♦") {
      return "text-yellow-500";
    } else{
      return "";
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("sealStorage")) {
      let sealStorage = JSON.parse(sessionStorage.getItem("sealStorage") as string);
      if (sealStorage[unique as string]) {
        setSeal(sealStorage[unique as string]);
      }
    }
    if (sessionStorage.getItem("tarotStorage")) {
      let tarotStorage = JSON.parse(sessionStorage.getItem("tarotStorage") as string);
      if (tarotStorage[unique as string]) {
        setTarot(tarotStorage[unique as string]);
      }
    }
    if (sessionStorage.getItem("specStorage")) {
      let specStorage = JSON.parse(sessionStorage.getItem("specStorage") as string);
      if (specStorage[unique as string]) {
        setSpectral(specStorage[unique as string]);
      }
    }
    if (sessionStorage.getItem("bonusChips")) {
      let bonusStorage = JSON.parse(sessionStorage.getItem("bonusChips") as string);
      if (bonusStorage[unique as string]) {
        setBonusBase(bonusStorage[unique as string]);
      }
    }
    assignDisplaySuit();
    if (!val) { // Prevents empty card components from being added
      return
    }
    if (typeof(val) === 'number') {
      setScoringValue(val);
      setRankValue(val);
    } else {
      switch (val) {
        case("A"):
          setScoringValue(11);
          setRankValue(14);
          break;
        case ("J"):
          setScoringValue(10);
          setRankValue(11);
          break;
        case ("Q"):
          setScoringValue(10);
          setRankValue(12);
          break;
        case ("K"):
          setScoringValue(10);
          setRankValue(13);
          break;
        default:
          throw new Error(`The value provided is not valid ${val} ${typeof val}`);
      }
    }
  }, [])

  useEffect(() => {
    if (tarot === "") {
      return;
    }
    modifierSessionSave("tarotStorage", tarot);
    if (tarot === "Tower") {
      setIsStoneCard(true);
    } else {
      setIsStoneCard(false);
    }
    if (tarot === "Lovers") {
      setIsLoversCard(true);
    } else {
      setIsLoversCard(false);
    }
    convertTarot();
  }, [tarot])

  useEffect(() => {
    if (spectral !== "") {
      modifierSessionSave("specStorage", spectral);
    }
    if (seal !== ""){
      modifierSessionSave("sealStorage", seal);
    }
  }, [spectral, seal])

  const modifierSessionSave = (storageName : string, variant : string) => {
    if (sessionStorage.getItem(storageName)) {
      let temp = JSON.parse(sessionStorage.getItem(storageName) as string);
      temp[unique as string] = variant;
      sessionStorage.setItem(storageName, JSON.stringify(temp));
    } else {
      sessionStorage.setItem(storageName, JSON.stringify({[unique as string] : variant}));
    }
  }

  const handleSealClick = (e : React.MouseEvent) => {
    e.stopPropagation();
    let temp = "";
    if (e.currentTarget.textContent === "None") {
      setSeal("");
    } else {
      setSeal(e.currentTarget.textContent as string);
      temp = e.currentTarget.textContent as string;
    }
    modifierSessionSave("sealStorage", temp);
    setMenu2(false);
  }

  const handleBaseValue = (baseChange : number) => {
    let temp = bonusBase + baseChange <= 0 ? 0 : bonusBase + baseChange;
    setBonusBase(temp);
    modifierSessionSave("bonusChips", temp.toString());
  }

  const sealColor = () : string => {
    switch (seal) {
      case "Red":
        return "bg-red-500 border border-solid border-white rounded-full"
      case "Yellow":
        return "bg-yellow-500 border border-solid border-white rounded-full";
      case "Blue":
        return "bg-blue-500 border border-solid border-white rounded-full";
      case "Purple":
        return "bg-purple-500 border border-solid border-white rounded-full";
      default:
        return "";
    }
  }

  const handleTOpen = (e : React.MouseEvent | React.FocusEvent) => {
    e.stopPropagation();
    setTarotOpen(true);
  }
  const handleTClose = (e : React.MouseEvent | React.FocusEvent) => {
    e.stopPropagation();
    setTarotOpen(false);
  }
  const handleSpecOpen = (e : React.MouseEvent | React.FocusEvent) => {
    e.stopPropagation();
    setSpecOpen(true);
  }
  const handleSpecClose = (e : React.MouseEvent | React.FocusEvent) => {
    e.stopPropagation();
    setSpecOpen(false);
  }

  const handleTarotClick = (e : React.MouseEvent) => {
    e.stopPropagation();
    let adjustedTarot = e.currentTarget.textContent as string;
    if (adjustedTarot === "No Tarot") {
      setTarot("");
    } else {
      setTarot(adjustedTarot);
    }
    setTarotOpen(false);
    setMenu1(false);
    modifierSessionSave("tarotStorage", adjustedTarot);
  }

  const handleSpecClick = (e : React.MouseEvent) => {
    e.stopPropagation();
    let adjustedSpec = e.currentTarget.textContent as string;
    setSpectral(adjustedSpec);
    setSpecOpen(false);
    modifierSessionSave("specStorage", adjustedSpec);
  }

  const handleCardModBlur = (e : React.FocusEvent) => {
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      handleTClose(e);
      setMenu1(false);
      setMenu2(false);
      setMenu3(false);
    }
  }

  const handleSubMenuClose = (e : React.MouseEvent) => {
    setMenu1(true);
    handleTClose(e);
  }
  const convertSpec = () => {
    if (spectral === "Foil") {
      return FOIL;
    } else if (spectral === "Holographic") {
      return HOLOGRAPHIC;
    } else if (spectral === "Polychrome") {
      return POLYCHROME;
    }
    return "";
  }

  const convertTarot = () => {
    switch(tarot) {
      case "Magician":
        setTarotDisplay("I");
        break;
      case "Empress" :
        setTarotDisplay("III");
        break;
      case "Hierophant":
        setTarotDisplay("V");
        break;
      case "Lovers":
        setTarotDisplay("VI");
        break;
      case "Chariot":
        setTarotDisplay("VII");
        break;
      case "Justice":
        setTarotDisplay("VIII");
        break;
      case "Devil":
        setTarotDisplay("XV");
        break;
      case "Tower":
        setTarotDisplay("XVI");
        break;
      default:
        setTarotDisplay("");
        break;
    }
  }
  return (
    <button className={`relative grid box-border rounded-lg aspect-[2/3] object-fit h-30 w-[1/13] p-3 border-2 items-center justify-center cursor-pointer ${convertSpec()} ${isStoneCard ? "bg-zinc-800" : "" } playingCard`} onClick={handleCardClick} id={unique} key={unique}
    data-suit={suit} data-rank={rankValue} data-basevalue={scoringValue} data-bonuschips={bonusBase} data-isstone={isStoneCard} data-islovers={isLoversCard} data-tarot={tarot} data-spec={spectral} data-seal={seal}>
      <div className={`absolute left-2 top-0  text-lg ${assignSuitColor()} playingCardSuit`}>
        {isLoversCard ? "*" : displaySuit}
      </div>
      <div className={`absolute right-2 top-0.5 spectralbutton`} onClick={handleSpecOpen} onBlur={handleSpecClose} tabIndex={0}>
        👻
        {specOpen ? ( <SpectralSubMenu handleSpecClick={handleSpecClick}/> ) : null}
      </div>
      <div className={`${sealColor()} flex h-3 w-3 top-2 left-3 relative sealIndicator`}/>
      <div className="text-lg playingCardRank">
        {displayValue}
      </div>
      <div className="h-12 w-16 border border-solid border-red-500 rounded cardModifications" tabIndex={1} onClick={handleTOpen}
      onBlur={handleCardModBlur}
      >
        <div className="text-sm displayBaseValue"> +{bonusBase} </div>
        <div className="text-sm showTarot">🔮 {tarotDisplay} </div>
        {tarotOpen ? (
          <div className={`z-30 absolute bg-slate-500 w-[150px] h-[100px] -left-[30px] top-[75px] rounded-lg modModalOpen`}>
            <div className="flex experimental">
              <div className="inline-flex basis-[15%] grow shrink ml-[10px] back" onClick ={(e) => { handleTClose(e); }}>
                X
              </div>
              <div className="inline-flex basis-2/3 grow shrink tarot" onClick={handleSubMenuClose}>
                Add Tarot
              </div>
            </div>
            <div className="seal" onClick={(e) => {
              setMenu2(true)
              handleTClose(e);
            }}>
              Add Seal
            </div>
            <div className="incrementBaseValue" onClick={(e) => {
              setMenu3(true);
              handleTClose(e);
            }}>
              ±Base Value
            </div>
            <div className="deleteCard" onClick={(e) => {
              deleteCard(suit, unique as string);
              handleTClose(e);
              }}>
              Delete Card
            </div>
          </div>
          ) : null }
        {menu1 ? ( <TarotSubMenu setMenu1={setMenu1} handleTOpen={handleTOpen} handleTarotClick={handleTarotClick}/> ) : null}
        {menu2 ? ( <SealSubMenu setMenu2={setMenu2} handleTOpen={handleTOpen} handleSealClick={handleSealClick}/> ) : null}
        {menu3 ? ( <BaseValueSubMenu scoringValue={scoringValue} bonusBase={bonusBase} setMenu3={setMenu3} handleTOpen={handleTOpen} handleBaseValue={handleBaseValue}/> ) : null}
      </div>
    </button>
  )
}

// foil card value
// repeating-radial-gradient(circle closest-side at 50%, royalblue 10px, navy 15px, royalblue 15px, dodgerblue 10px)

//polychrome card value
//linear-gradient( 40deg, rgba(200, 0, 0, 0.8), rgba(200, 0, 0, 0) 70.71% ), linear-gradient(100deg, rgba(0, 200, 0, 0.8), rgba(0, 200, 0, 0) 50.71%), linear-gradient(160deg, rgba(0, 0, 200, 0.8), rgba(0, 0, 200, 0) 90.71%)

//holographic card value
//linear-gradient(rgba(69, 60, 153,0.4), rgba(90,0,10, 0.5))