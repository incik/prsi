const HAND_SIZE = 5;

const SYMBOLS = ["Hearts", "Spades", "Diamonds", "Clubs"] as const;
type Symbol = (typeof SYMBOLS)[number];

type Card = [Symbol, string | number];

const PLAYERS = ["Human", "Computer"] as const;
type Player = (typeof PLAYERS)[number];

const CARDS = Object.keys(SYMBOLS).flatMap((symbol) =>
  [7, 8, 9, 10, "J", "Q", "K", "A"].map(
    (value) => [SYMBOLS[symbol as keyof typeof SYMBOLS], value] as Card,
  ),
);

const mapper: Record<Symbol, string> = {
  Hearts: "\u2665",
  Spades: "\u2660",
  Diamonds: "\u2666",
  Clubs: "\u2663",
};

function deal(
  pile: Array<Card>,
  numberOfCards: number,
): [Array<Card>, Array<Card>] {
  const cards: Array<Card> = [];

  for (let i = 0; i < numberOfCards; i++) {
    const index = Math.floor(Math.random() * pile.length);
    cards.push(pile[index]);

    pile.splice(index, 1);
  }

  return [cards, pile];
}

function playCard(index: number, pile: Array<Card>): [Card, Array<Card>] {
  if (pile.length === 0) {
    throw Error("Cannot play from empty hand!")
  }

  const realIndex = index - 1;
  if (index > pile.length || realIndex === -1) {
    throw Error("Cannot play non-existing card!")
  }

  const card = pile[realIndex];
  pile.splice(realIndex, 1);

  return [card, pile];
}

function draw(pile: Array<Card>): [Card, Array<Card>] {
  if (pile.length === 0) {
    throw Error("Cannot draw from empty pile!");
  }

  const index = Math.floor(Math.random() * pile.length);
  const card = pile[index];

  pile.splice(index, 1);

  return [card, pile];
}

function renderHand(cards: Array<Card>): string {
  let output = ``;

  for (let i = 0; i < cards.length; i++) {
    if (i > 9) {
      output += ` (${i + 1})   `;
    } else {
      output += ` (${i + 1})    `;
    }
  }
  output += "\n";
  for (let i = 0; i < cards.length; i++) {
    output += `|-----| `;
  }
  output += "\n";
  for (let i = 0; i < cards.length; i++) {
    if (cards[i][1] === 10) {
      output += `| ${cards[i][1]}  | `;
    } else {
      output += `| ${cards[i][1]}   | `;
    }
  }
  output += "\n";
  for (let i = 0; i < cards.length; i++) {
    output += `|     | `;
  }
  output += "\n";
  for (let i = 0; i < cards.length; i++) {
    output += `|   ${mapper[cards[i][0]]} | `;
  }
  output += "\n";
  for (let i = 0; i < cards.length; i++) {
    output += `|-----| `;
  }

  return output;
}

function renderCard(card: Card): string {
  return `|-----|\n| ${card[1]}   |\n|     |\n|   ${mapper[card[0]]} |\n|-----|`;
}

function renderGame(state: Record<string, Array<Card>>) {
  console.clear();

  Object.keys(state).map((key) => {
    console.log(key);
    console.log(renderHand(state[key]), "\n");
  });
  console.log("---");
}

function _renderOptions(hand: Array<Card>): string {
  return hand.map((_, index) => index + 1).join(", ");
}

function takeTurn(player: Player): Player {
  return player === "Human" ? "Computer" : "Human";
}

async function game() {
  let DRAW_PILE: Array<Card> = CARDS;
  let GAME_PILE: Array<Card> = [];
  let DISCARD_PILE: Array<Card> = [];

  let CURRENT_PLAYER: Player = "Human";

  let PLAYER_HAND: Array<Card> = [];
  let COMPUTER_HAND: Array<Card> = [];
  [PLAYER_HAND, DRAW_PILE] = deal(DRAW_PILE, HAND_SIZE);
  [COMPUTER_HAND, DRAW_PILE] = deal(DRAW_PILE, HAND_SIZE);

  const state = {
    PLAYER: PLAYER_HAND,
    COMPUTER: COMPUTER_HAND,
    "GAME PILE": GAME_PILE,
    "DRAW PILE": DRAW_PILE,
    "DISCARD PILE": DISCARD_PILE,
  };

  renderGame(state);

  const prompt = "CHOOSE A CARD: (" + _renderOptions(PLAYER_HAND) + "): ";

  process.stdout.write(`[${CURRENT_PLAYER}] ${prompt}`);
  for await (const line of console) {
    let playedCard;
    let drawnCard;
    [playedCard, PLAYER_HAND] = playCard(parseInt(line, 10), PLAYER_HAND);

    [drawnCard, DRAW_PILE] = draw(DRAW_PILE);
    PLAYER_HAND.push(drawnCard);
    GAME_PILE.push(playedCard);

    CURRENT_PLAYER = takeTurn(CURRENT_PLAYER);

    renderGame(state);

    process.stdout.write(`[${CURRENT_PLAYER}] ${prompt}`);
  }
}

game();
