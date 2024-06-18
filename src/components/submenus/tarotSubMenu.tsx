import React from "react";
interface tmProps {
  setMenu1 : (state : boolean) => void,
  handleTOpen : (e : React.MouseEvent) => void,
  handleTarotClick : (e : React.MouseEvent) => void
}
export default function TarotSubMenu (props : tmProps) {
  const {setMenu1, handleTOpen, handleTarotClick} = props;
  const DIV_STYLE = "w-[75px] text-start pl-1";
  const goBack = (e : React.MouseEvent) => {
    e.stopPropagation();
    setMenu1(false);
    handleTOpen(e);
  }
  const createList = () => {
    const tarotNames = ["No Tarot", "Magician", "Empress", "Hierophant", "Lovers", "Chariot", "Justice", "Devil", "Tower"]
    return tarotNames.map((name : string) => {
      return (
        <li className="w-[75px]">
          <div className={DIV_STYLE} onClick={handleTarotClick}>{name}</div>
        </li>
      )
    })
  }
  return (
  <ul className="z-30 absolute bg-slate-500 w-[150px] columns-2 -left-[30px] top-[75px] rounded-lg tarotModalOpen"
  tabIndex={0}
  >
    <li className="w-[75px]">
      <div className={DIV_STYLE} onClick={goBack}>Back</div>
    </li>
    {createList()}
  </ul>)
}