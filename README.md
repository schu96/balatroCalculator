## Balatro Calculator

[Balatro](https://www.playbalatro.com/) is a poker based roguelike game where players must create poker hands to beat a pre-determined score each level. This project is intended to calculate an __ESTIMATED__ final score for a given poker hand since the current, unmodded version of the game does not show the final score until the "Play" button is pressed.

This calculator currently does not factor in Joker effects for calculations (*but may have some support in the future*). Card info, modification, and hand type level data is stored within the browser's ```sessionStorage``` to allow data persistence between refreshes.

The code in this project **does not include any source code from Balatro itself**, which may lead to some inaccuracies when comparing the final hand score from the game to the score given from this calculator.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to check out the calculator.

If you would like to contribute to this project, you can start by checking out `src/pages/BalatroCalculator.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Operations

Card data is stored within the browser's ```sessionStorage``` as such:

```Spades```/```Hearts```/```Clubs```/```Diamonds``` : Contains the card's suit, rank, and a unique ID

```tarotStorage```/```sealStorage```/```specStorage```/```bonusChips```: Contains the id and type of modification applied for each card

```handLevels```: Contains hand type levels

If all 4 suit sessionStorage containers are found to be empty, the page will default to generating a standard 52 card deck. If any of the suit storage containers contain card data, a function is called to parse and their respective container with cards from the previous session.

Card enhancements are populated after a card is created by checking if a card's id matches an id within storage container. Each enhancement is stored separately so that users can
easily remove all of one type of enhancement in the Options Tab.

Hand levels are stored as an object where the hand type name serves as a key to another object containing the ```base```, ```mult```, and ```level``` of the hand type.

## Options
The options tab has a number of useful functions such as

* Saving or resetting the deck and hand level states
* Removing all or one enhancement of the current deck
* Changing the deck between Standard, Checkered, or Abandoned

## Modifying Cards
Tarot, Seal, and Bonus Chip modifications are available through a submenu that appears after clicking the red box within a card. The ability to delete cards from the deck is also available within the red box submenu. The spectral modifications submenu can be accessed after clicking on the 👻 sticker. Each modification is given a visual indicator of the effect on a card.

<table>
  <tr>
    <th>Modifier Name</th>
    <th>Examples</th>
  </tr>
  <tr>
    <td>Seals</td>
  </tr>
  <tr>
    <td>Spectral Enhancements</td>
  </tr>
  <tr>
    <td>Tarot / Bonus Chips</td>
  </tr>
</table>


Cards can be added by clicking on the ```+``` card at the end of each suit container.


## Calculations and Scoring
Calculations are performed each time a card has been clicked and will show the hand type, hand level, hand type values within the Clicked Card tab.

Each time a card is clicked it is assigned a ```playOrder``` value to maintain card order. If a clicked card is clicked again, it will be removed from the scoring calculation and update the ```playOrder``` of other clicked cards if necessary.

Played hands can range from 1 to 5 cards, which allows players to potentially add a non-scoring card to their played hand (i.e. a Two Pair hand consisting of ♠K ♠K ♥Q ♣Q ♦2).
Cards valid for scoring are determined by the hand type returned from the ```detectHandValue``` function, which is used as a parameter for the ```getScoringCards``` function to return a list of cards sorted by ```playOrder```

The scoring cards are then fed into the ```calculateMath``` function, which pulls the base chip value and multiplier value of the detected poker hand. Scoring goes in the following order:
1) Card base chips + any bonus chip value
2) Tarot card value enhancements
3) Spectral card value enhancements
4) Seal enhancements

After completing the scoring order above, the effect of ```Chariot``` cards held in hand can be applied. Each increment to the ```Chariot``` card input will recalculate the final multiplier of the scoring hand.

If the [Plasma Deck](https://balatrogame.fandom.com/wiki/Decks) is used for the current run, a checkbox within the ```Current Hand``` tab can be toggled to change the scoring calculation from standard to balanced.

To apply the effects of a [Boss Blind](https://balatrogame.fandom.com/wiki/Blinds_and_Antes), click on the Boss Blind's name in the dropdown menu.

A scoring breakdown is provided to the user showing the cumulative chips and multiplier from each card scored.
