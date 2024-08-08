//TODO - figure out how to read effects from the jokerData.ts file, and how effects should apply in actual calculation formulas
import React from 'react';

interface jokerProps {
  name : string,
  calculationType : number,
  activationType: string,
  copyable : boolean,
  rarity : number,
  cost : number,
  chipCounter : number,
  multCounter : number,
  probabilityChance : number,
  spectralEnhancement? : string,
}

export default function JokerCard ( props : any ) {
  var name;
  var calculationType; //use numbers to determine when to calculate
  var effectType; // use different strings?
  var copyable; // use boolean
  var rarity; // use number
  var cost; // use number
  var spectralEnhancment; // use full names like playing cards
  var chipCounter; // number, should be used for Jokers like Square Joker/Vampire/etc
  var multCounter;
  var probabilityChance; // could be too niche to implement for Space Joker/8 ball, etc

  return (
    <div className={`jokerTest`}>
      {name}
    </div>
  )
}