import { handValueType } from '../pages/BalatroCalculator';
import { handValueContents } from './cardSideBar';
import { displayHandValues } from './handValues';
import React from 'react';

export default function HandValueDisplay (
  handValueName: string, handValueLevel : number, handValueBase : number, handValueMult : number,
  handValues : handValueType | Record<string, unknown>, setHandLevel : (items : handValueType) => void
) {
  const incrementHandValue = () : void => {
    const values = Object.assign({}, handValues) as handValueType;
    let temp : handValueContents  = {"base" : 1, "mult" : 1, "level" : 1};
    switch(handValueName) {
      case "highcard" : {
        temp["base"] = values[handValueName]["base"] + 10;
        temp["mult"] = values[handValueName]["mult"] + 1;
        temp["level"] = values[handValueName]["level"] + 1;
        break;
      }
      case "pair": {
        temp["base"] = values[handValueName]["base"] + 15;
        temp["mult"] = values[handValueName]["mult"] + 1;
        temp["level"] = values[handValueName]["level"] + 1;
        break;
      }
      case "twopair" : {
        temp["base"] = values[handValueName]["base"] + 20;
        temp["mult"] = values[handValueName]["mult"] + 1;
        temp["level"] = values[handValueName]["level"] + 1;
        break;
      }
      case "flush" : {
        temp["base"] = values[handValueName]["base"] + 25;
        temp["mult"] = values[handValueName]["mult"] + 2;
        temp["level"] = values[handValueName]["level"] + 1;
        break;
      }
      case "threeofakind" : {
        temp["base"] = values[handValueName]["base"] + 20;
        temp["mult"] = values[handValueName]["mult"] + 2;
        temp["level"] = values[handValueName]["level"] + 1;
        break;
      }
      case "fullhouse" : {
        temp["base"] = values[handValueName]["base"] + 25;
        temp["mult"] = values[handValueName]["mult"] + 2;
        temp["level"] = values[handValueName]["level"] + 1;
        break;
      }
      case "straight" : {
        temp["base"] = values[handValueName]["base"] + 30;
        temp["mult"] = values[handValueName]["mult"] + 3;
        temp["level"] = values[handValueName]["level"] + 1;
        break;
      }
      case "fourofakind" : {
        temp["base"] = values[handValueName]["base"] + 30;
        temp["mult"] = values[handValueName]["mult"] + 3;
        temp["level"] = values[handValueName]["level"] + 1;
        break;
      }
      case "straightflush" : {
        temp["base"] = values[handValueName]["base"] + 40;
        temp["mult"] = values[handValueName]["mult"] + 4;
        temp["level"] = values[handValueName]["level"] + 1;
        break;
      }
      case "fiveofakind" : {
        temp["base"] = values[handValueName]["base"] + 35;
        temp["mult"] = values[handValueName]["mult"] + 3;
        temp["level"] = values[handValueName]["level"] + 1;
        break;
      }
      case "flushhouse" :{
        temp["base"] = values[handValueName]["base"] + 40;
        temp["mult"] = values[handValueName]["mult"] + 4;
        temp["level"] = values[handValueName]["level"] + 1;
        break;
      }
      case "flushfive": {
        temp["base"] = values[handValueName]["base"] + 50;
        temp["mult"] = values[handValueName]["mult"] + 3;
        temp["level"] = values[handValueName]["level"] + 1;
        break;
      }
    }
    values[handValueName] = temp;
    setHandLevel(values);
  }

  const decrementHandValue = () : void => {
    if (handValueLevel <= 1) {
      return;
    }
    const values = Object.assign({}, handValues) as handValueType;
    let temp : handValueContents = {"base" : 1, "mult" : 1, "level" : 1};
    switch(handValueName) {
      case "highcard" : {
        temp["base"] = values[handValueName]["base"] - 10;
        temp["mult"] = values[handValueName]["mult"] - 1;
        temp["level"] = values[handValueName]["level"] - 1;
        break;
      }
      case "pair" : {
        temp["base"] = values[handValueName]["base"] - 15;
        temp["mult"] = values[handValueName]["mult"] - 1;
        temp["level"] = values[handValueName]["level"] - 1;
        break;
      }
      case "twopair" : {
        temp["base"] = values[handValueName]["base"] - 20;
        temp["mult"] = values[handValueName]["mult"] - 1;
        temp["level"] = values[handValueName]["level"] - 1;
        break;
      }

      case "threeofakind" : {
        temp["base"] = values[handValueName]["base"] - 20;
        temp["mult"] = values[handValueName]["mult"] - 2;
        temp["level"] = values[handValueName]["level"] - 1;
        break;
      }

      case "flush" : {
        temp["base"] = values[handValueName]["base"] - 25;
        temp["mult"] = values[handValueName]["mult"] - 2;
        temp["level"] = values[handValueName]["level"] - 1;
        break;
      }

      case "fullhouse" : {
        temp["base"] = values[handValueName]["base"] - 25;
        temp["mult"] = values[handValueName]["mult"] - 2;
        temp["level"] = values[handValueName]["level"] - 1;
        break;
      }
      case "straight" : {
        temp["base"] = values[handValueName]["base"] - 30;
        temp["mult"] = values[handValueName]["mult"] - 3;
        temp["level"] = values[handValueName]["level"] - 1;
        break;
      }
      case "fourofakind" : {
        temp["base"] = values[handValueName]["base"] - 30;
        temp["mult"] = values[handValueName]["mult"] - 3;
        temp["level"] = values[handValueName]["level"] - 1;
        break;
      }
      case "straightflush" : {
        temp["base"] = values[handValueName]["base"] - 40;
        temp["mult"] = values[handValueName]["mult"] - 4;
        temp["level"] = values[handValueName]["level"] - 1;
        break;
      }
      case "fiveofakind" : {
        temp["base"] = values[handValueName]["base"] - 35;
        temp["mult"] = values[handValueName]["mult"] - 3;
        temp["level"] = values[handValueName]["level"] - 1;
        break;
      }
      case "flushhouse" :{
        temp["base"] = values[handValueName]["base"] - 40;
        temp["mult"] = values[handValueName]["mult"] - 4;
        temp["level"] = values[handValueName]["level"] - 1;
        break;
      }
      case "flushfive" : {
        temp["base"] = values[handValueName]["base"] - 50;
        temp["mult"] = values[handValueName]["mult"] - 3;
        temp["level"] = values[handValueName]["level"] - 1;
        break;
      }
    }
    values[handValueName] = temp;
    setHandLevel(values);
  }

  /*
  TODO change container colors based on their levels?
  Lv 1 - Slate, Lv 2 - Cerulean/alice blue, Lv 3 - Emerald, Lv 4, 5 - Yellow / Gold, Lv 6 - red, Lv 7+? - purple
  */
  return (
    <div className = "bg-purple-600 mb-5 rounded-lg handValueContainer" key={`${handValueName}-container`}>
      <div className = "flex justify-between ml-2 text-sm font-semibold handValueName">
        {displayHandValues(handValueName)}
        <div className = "mr-2 handLevel">
          Lv.{handValueLevel}
        </div>
      </div>
      <div className = "flex content-between justify-between items-center">
        <button className = "mx-3 flex decrement" onClick = {() => decrementHandValue()}> - </button>
        <div className = "text-center base">
          {handValueBase} x {handValueMult}
        </div>
        <button className = "mx-3 increment" onClick = {() => incrementHandValue()}> + </button>
      </div>
    </div>
  )
}