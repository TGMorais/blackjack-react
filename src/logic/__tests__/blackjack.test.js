import blackjack from "../blackjack";

const DECKSIZE = 52; //?? (move inside blackjack)

describe("Creates new deck", () => {
  let deck;
  beforeEach(() => {
    deck = blackjack.deck.create();
  });

  test(`creates ${DECKSIZE} cards`, () => {
    expect(deck.length).toEqual(DECKSIZE);
  });

  test("Cards have correct shape", () => {
    //todo: use expect().toHaveProperty
    const isCorrectShape = s => s.name && s.suit && s.value;
    expect(deck.filter(isCorrectShape).length).toEqual(deck.length);
  });

  //TODO
  //test integrity of deck, (number of suits, total number of card values, etc)
});

describe("Shuffles a new deck", () => {
  let newdeck;
  let shuffled;

  beforeEach(() => {
    newdeck = blackjack.deck.create();
    shuffled = blackjack.deck.shuffle(newdeck);
  });

  test(`has ${DECKSIZE} cards`, () => {
    expect(shuffled.length).toEqual(DECKSIZE);
  });

  test("they are not in the same order", () => {
    const diffCount =
      newdeck.filter((v, i) => newdeck[i] !== shuffled[i]).length > 0;

    expect(diffCount).toEqual(true);
  });

  test("createdShuffled works", () => {
    const createShuffled = blackjack.deck.createShuffled();
    expect(createShuffled.length).toEqual(DECKSIZE);
  });

  //TODO
  //test integrity of deck, (number of suits, total number of card values, etc)
});

describe('Deals a new hand', () => {

  let startDeck;
  let startHand;

  beforeEach(() => {
    startDeck = blackjack.deck.createShuffled()
    startHand = [];
  })

  test("Deal returns new state", () => {
    const state = blackjack.deck.deal(startDeck, 1);
    expect(state).toHaveProperty('deck')
    expect(state).toHaveProperty('hand')
  })

  test("Card is removed from deck and placed in hand", () => {
    var { deck, hand } = blackjack.deck.deal(startDeck, 1);

    expect(hand).toHaveLength(1)
    expect(deck).toHaveLength(DECKSIZE-1)
  })
})
