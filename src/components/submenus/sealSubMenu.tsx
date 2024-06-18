import React from "react";

interface sealSubMenuProps {
  setMenu2 : (state : boolean) => void,
  handleTOpen : (e : React.MouseEvent) => void,
  handleSealClick : (e : React.MouseEvent) => void
}

export default function SealSubMenu (props : sealSubMenuProps) {
  const {setMenu2, handleTOpen, handleSealClick} = props;
  return (
    <ul className="z-30 absolute bg-slate-500 w-[150px] h-[100px] columns-2 -left-[30px] top-[75px] rounded-lg modMenu2Open"
    tabIndex={0}
    onClick={(e) => {e.stopPropagation()}}
  >
    <li className="w-[100px]">
      <div className="w-[100px] text-start pl-1" onClick={(e) => {
        setMenu2(false);
        handleTOpen(e);
      }}>Back</div>
    </li>
    <li className="w-[100px]">
      <div className="w-[100px] text-start pl-1" onClick={handleSealClick}>None</div>
    </li>
    <li className="w-[100px]">
      <div className="w-[100px] text-start pl-1" onClick={handleSealClick}>Red</div>
    </li>
    <li className="w-[100px]">
      <div className="w-[100px] text-start pl-1" onClick={handleSealClick}>Blue</div>
    </li>
    <li className="w-[100px]">
      <div className="w-[100px] text-start pl-1" onClick={handleSealClick}>Purple</div>
    </li>
    <li className="w-[100px]">
      <div className="w-[100px] text-start pl-1" onClick={handleSealClick}>Yellow</div>
    </li>
  </ul>
  )
}