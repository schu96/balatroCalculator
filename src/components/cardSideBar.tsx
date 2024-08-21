import React  from 'react';
import {handValueType} from '../pages/BalatroCalculator';
import {HandValueDisplay} from './index';

interface SidebarProps {
  handValues : Record<string, unknown> | handValueType;
  setHandLevel : React.Dispatch<React.SetStateAction<handValueType>>;
}
export type handValueContents = {
  level : number,
  base : number,
  mult : number
}

export default function Sidebar(
{handValues, setHandLevel} : SidebarProps
  ) {
  const output = [];
  for (const [key, value] of Object.entries(handValues)) {
    const v = value as handValueContents;
    if (v) {
        output.push(HandValueDisplay(key, v.level, v.base, v.mult, handValues, setHandLevel));
      }
  }

  return (
    <div className="top-[100px] sidebar align-top inline-block w-2/12 sticky ml-5">
      <div className="columns-1 gap-1">
        {output}
      </div>
    </div>
  )
}