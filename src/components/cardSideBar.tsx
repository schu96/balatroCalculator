import React, {useContext , useState} from 'react';
import {cardDict, handValueType} from '../pages/BalatroCalculator';
import {HandValueDisplay, handValues} from './index';

interface SidebarProps {
  handValues : Record<string, unknown> | handValueType;
  setHandLevel : React.Dispatch<React.SetStateAction<handValueType>>;
}
export type handValueContents = {
  level : number,
  base : number,
  mult : number
}
// export default function Sidebar( cards : {} | cardDict) {
export default function Sidebar(
{handValues, setHandLevel} : SidebarProps
  ) {
  let output = [];
  for (const [key, value] of Object.entries(handValues)) {
    // output.push(HandValueDisplay(key, value.base, value.mult));
    let v = value as handValueContents;
    if (v) {
      // current implementation of HandValueDisplay does not support useState
      // would have to change to -> <HandValueDisplay ...props /> if useState is needed
        output.push(HandValueDisplay(key, v.level, v.base, v.mult, handValues, setHandLevel));
      }
  }
  // const logCards = () => {
  //   if (selectedCards === null || selectedCards == undefined) {
  //     return;
  //   }
  //   let output = [];
  //   for (const [key, value] of Object.entries(selectedCards)) {
  //     console.log(`${key} , ${value.suit}, ${value.rank}`);
  //   }
  // };

  return (
    <div className="top-[100px] sidebar align-top inline-block w-2/12 sticky ml-5">
      <div className="columns-1 gap-1">
        {output}
      </div>
    </div>
  )
}