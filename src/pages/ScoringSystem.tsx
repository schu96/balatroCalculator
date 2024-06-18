'use client';

import React from 'react';
import FMLayout from './fmLayout';

export default function ScoringPage () {
  return (
    <FMLayout>
      <title>Scoring Breakdown</title>
      <div>
        <p>The Scoring System in Balatro is one of the most important concepts to understand in order to win a run. A hand's scoring value can wildly differ depending on the order in which the cards are played and the order of Joker cards in the top row. Scoring can be broken down into 4 main phases:</p>
      </div>
      <br/>
    <div>
      <ul>
        <li> 1. Pre-scoring
          <p className="px-[50px]">
          Pre-scoring typically occurs with Jokers that you currently own. An example of pre-scoring phase effects can seen with the Vampire Joker {"(removes all tarot enhancements and gains 0.1x mult cumulatively)"}, the Square Joker {"(+4 chips to self if a 4 card hand is played)"}, or the Midas Joker {"(all scoring face cards become Devil Tarot enhanced/Gold cards"}.
          </p>
          <br/>
          <p className="px-[50px]">
          Pre-scoring will trigger from left to right of the Joker order. Consider a hand played with 3 of a Kind Kings with no Tarot Enhancements, with the Vampire Joker and Midas Joker. If the Midas Joker is positioned to the left of the Vampire Joker, the 3 King cards will convert to Gold cards, which will then trigger the Vampire Joker's effect to remove the Gold card enhancement and gain 0.3 xMult. If the Midas Joker is positioned to the right of the Vampire Joker, the Vampire Joker will not gain any xMult and the Midas Joker will convert the cards to Gold cards.
          </p>
        </li>
        <br></br>
        <li> 2. Played Hand Scoring
          <p className="px-[50px]">
            The hand played is scored from left to right, adding the card's base value chips, triggering tarot card modifications, triggering spectral card modifications, activating Joker effects, and finally to Gold or Red Seal modifications.
          </p>
          <br/>
          <p className="px-[50px]">
            The order of your hand played can easily make or break the effectiveness of your played hand based on when +Mult effects and xMult effects are scored. Your +Mult effects should be applied BEFORE xMult effects are calculated. {"(4 + 2) x 2"} is a far better outcome than {"(2 x 2) + 4"}
          </p>
        </li>
        <br></br>
        <li> 3. Effects in Hand
          <p className="px-[50px]">
            Effects in hand are commonly by cards with the Chariot tarot enhancement but are more plentiful as Joker effects. Effects in hand are also activated in order from highest rank to lowest rank.
          </p>
        </li>
        <br></br>
        <li> 4. Joker scoring
          <p className="px-[50px]">
            The Joker scoring phase is often looked over by new players. Similar to the Played Hand Scoring Phase, Joker effects are evaluated from left to right and will trigger any Spectral modificiations AFTER they have triggered their main effect. A general rule of thumb is to keep +Mult and +Chips Jokers to the left {"(i.e. Tarot Joker, Mystical Summit, Wee Joker)"} and xMult Jokers in ascending order;
          </p>
        </li>
      </ul>

    </div>
    </FMLayout>
  )
}