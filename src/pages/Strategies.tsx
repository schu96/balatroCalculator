/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import FMLayout from './fmLayout';

export default function StratsPage() {
  return (
    <FMLayout>
      <title>Helpful Strategies</title>
      <br/>
      <h1>Deck Thinning</h1>
      <div>
        <br/>
        <p className="px-[50px]">
          Most decks in Balatro will start off with a standard 52 card deck consisting of 4 suits and cards A-10KQJ, with the exception of the Abandoned Deck {"(40 cards across 4 suits, no face cards"}, Checkered Deck {"(52 cards between Spades and Hearts)"}, and Erratic deck {"(52 cards, completely random deck generation across suits and ranks)"}.
        </p>
        <br/>
        <p className="px-[50px]">
          Thinning out the deck is crucial to consistently make high scoring hands. Considering a deck with 8 hand size, 2 maximum sized discards, and 4 playable hands, the player will access at most 33 out of 52 cards available in a 52 card deck.
        </p>
        <br/>
        <p className="px-[50px]">
          Balatro offers many different card removal resources in the form of Jokers, Tarots, and Spectral cards. The Spectral card Immolate is an extremely powerful option for its ability to remove 5 random cards in exchange for $20. The more common source of card removal, the Tarot card Hanged Man, allows the player to destroy 2 cards in the hand and can be held in a consumable spot until an opportunity arises.

          My personal strategy is to target 4s, 6s, and 7s for initial card removal or modification since there are few Joker synergies for these cards compared to other ranks.
        </p>
      </div>
      <br/>
      <h1>Adding Cards</h1>
      <div>
        <br/>
        <p className="px-[50px]">
          Cards added to the deck should synergize with your Jokers or contain powerful enhancements; drawing a high scoring potential playing card usually won't mean much if you hand is filled with useless cards or doesn't benefit from any Joker effects.

          Playing cards purchased from booster packs can be extremely beneficial to your deck. Cards in the booster pack can potentially come with Spectral, Tarot, or Seal enhancements that can easily be modified to fit your deck's highest scoring hand.
        </p>
      </div>
      <br/>
      <h1>Trading Hands for Scaling</h1>
      <div>
        <p className="px-[50px]">
          Although it is tempting to complete rounds in 1 playable hand, opting to purposely lower your score via Joker re-ordering or playing low scoring hands can be the difference between a win or a loss.

          A great example of this is the Green Joker, a Joker that gains +1 mult for each hand played and -1 mult for each discard used. Assuming that no discards are used, opting to create a 1 hand win will only create a +1 mult net gain vs using all hand available for a +4 mult net gain.
        </p>
      </div>
      <br/>
    </FMLayout>
  )
}