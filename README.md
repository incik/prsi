# PRSI

This is a repo that is meant to serve as a playground for different languages and technologies I'd like to try out. A long time ago, there was a guy in our school who always learned a new language by implemnting Snake in it. I mean, it's not the worst idea in the world. When you have one implementation in a language that you know as a reference, comparesment between the different languages and approaches is then easier. And if you are inspired by something in the new tecn/language, you can try to reimplement that in your refrence language ... Well, we'll see :)

I chose to implement Prsi - it's a primitive card game that can be played even by small children, so it should be easy to implement. At least I hope so :D

## Rules of Prsi

- The game is played with a deck of 32 cards:
  - Cards include `7`, `8`, `9`, `10`, `J`, `Q`, `K`, and `A` from all four suits (Hearts, Spades, Diamonds, Clubs).
- The game requires at least 2 players.
- At the start, each player is dealt 5 cards, with the remaining cards forming the draw pile.
- The top card from the draw pile is placed face-up on the "play pile".
- Players take turns to match the card on top of the play pile.
- The game loop:
  - The current player must match the card on top of the play pile by suit or rank.
  - If the player cannot match the card, they must draw a card from the draw pile.
  - Special card rules:
    - If the top card is an A and the player cannot match it with another A, their turn ends.
    - If the top card is a 7 and the player cannot match it with another 7, they must draw two cards from the draw pile.
    - If the top card is a Q, the player can declare a new suit to be matched for the next player.
- The player who empties their hand first wins the game.
