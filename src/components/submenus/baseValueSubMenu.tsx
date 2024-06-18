import React from 'react';
interface bvmProps {
  bonusBase : number,
  scoringValue : number,
  setMenu3 : (state : boolean) => void,
  handleTOpen : (e : React.MouseEvent) => void,
  handleBaseValue : (baseChange : number) => void,
}

export default function BaseValueSubMenu(props : bvmProps) {
  const { scoringValue, bonusBase, setMenu3, handleTOpen, handleBaseValue} = props;

  const closeModal = (e : React.MouseEvent) => {
    setMenu3(false);
    handleTOpen(e);
  }

  return (
    <ul className="z-30 absolute bg-slate-500 w-[150px] h-[125px] -left-[30px] top-[75px] rounded-lg modMenu3Open"
    tabIndex={0} onClick={(e) => e.stopPropagation()}>
      <li className="w-[150px]">
        <div className="w-[150px] text-start pl-2" onClick={(e) => {closeModal(e)}}>
          Back
        </div>
      </li>
      <li className="chipValueSum">
        <div>
          Current Value: {scoringValue + bonusBase}
        </div>
      </li>
      <li className="w-[150px] pt-2">
        <input className="w-[100px] text-black" type="number" id="baseValueChange"/>
      </li>
      <li className="inline-flex items-center">
        <input className="w-[25px] h-[25px] text-black m-2 mx-3" value="➖" type="button" id="baseValueDec" onClick={() => {
            let doc : HTMLFormElement = document.querySelector("#baseValueChange") as HTMLFormElement;
            if (doc.value) {
              handleBaseValue(parseInt(doc.value) * -1);
            }
            }}/>
        <input className="w-[25px] h-[25px] text-black m-2 mx-3" value="➕" type="button" id="baseValueInc" onClick={() => {
          let doc : HTMLFormElement = document.querySelector("#baseValueChange") as HTMLFormElement;
          if (doc.value) {
            handleBaseValue(parseInt(doc.value));
          }
        }}/>
      </li>
    </ul>
  )
}