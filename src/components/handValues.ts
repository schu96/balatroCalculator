export const handValues = {
  "highcard" : {
    "mult" : 1,
    "base" : 5
  },
  "pair" : {
    "mult" : 2,
    "base" : 10
  },
  "twopair" : {
    "mult" : 2,
    "base": 20
  },
  "threeofakind" : {
    "mult" : 3,
    "base" : 30
  },
  "straight" : {
    "mult" : 4,
    "base" : 30
  },
  "flush" : {
    "mult" : 4,
    "base" : 35
  },
  "fullhouse" : {
    "mult" : 4,
    "base" : 40,
  },
  "fourofakind" : {
    "mult" : 4,
    "base" : 60
  },
  "straightflush" : {
    "mult" : 8,
    "base" : 100
  },
  "fiveofakind" : {
    "mult" : 12,
    "base" : 120
  },
  "flushhouse" : {
    "mult" : 14,
    "base" : 140
  },
  "flushfive" : {
    "mult" : 16,
    "base" : 160
  }
}

export const displayHandValues = (name : string) : string => {
  switch (name) {
    case "highcard":
      return "High Card";
    case "twopair":
      return "Two Pair";
    case "flush":
    case "straight":
    case "pair":
      return name.charAt(0).toUpperCase() + name.slice(1);
    case "fullhouse":
      return "Full House";
    case "threeofakind":
      return "Three of a Kind";
    case "fourofakind":
      return "Four of a Kind";
    case "fiveofakind":
      return "Five of a Kind";
    case "flushfive":
      return "Flush Five";
    case "flushhouse":
      return "Flush House";
    case "straightflush":
      return "Straight Flush";
    default:
      throw new Error (`Unable to determine hand type for value : ${name}`);
  }
}
type htlcType = {
  [handValueName : string]: {
    "changeBase" : number,
    "changeMult" : number
  }
}
export const htLevelChange : htlcType = {
  "highcard" : {
    "changeBase" : 10,
    "changeMult" : 1
  },
  "pair" : {
    "changeBase" : 15,
    "changeMult" : 1
  },
  "twopair" : {
    "changeBase" : 20,
    "changeMult" : 1
  },
  "threeofakind" : {
    "changeBase" : 20,
    "changeMult" : 2
  },
  "flush" : {
    "changeBase" : 25,
    "changeMult" : 2
  },
  "fullhouse" : {
    "changeBase": 25,
    "changeMult": 2
  },
  "straight" : {
    "changeBase" : 30,
    "changeMult" : 3,
  },
  "fourofakind" : {
    "changeBase" : 30,
    "changeMult" : 3
  },
  "straightflush" : {
    "changeBase" : 40,
    "changeMult" : 4
  },
  "fiveofakind" : {
    "changeBase" : 35,
    "changeMult" : 3
  },
  "flushhouse" : {
    "changeBase" : 40,
    "changeMult" : 4
  },
  "flushfive" : {
    "changeBase" : 50,
    "changeMult" : 3
  }
}