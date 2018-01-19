import blackjack from "../blackjack";

const DECKSIZE = blackjack.DECK_SIZE;

describe("Creates new deck", () => {
  let deck;
  beforeEach(() => {
    deck = blackjack.create();
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
    newdeck = blackjack.create();
    shuffled = blackjack.shuffle(newdeck);
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
    const createShuffled = blackjack.createShuffled();
    expect(createShuffled.length).toEqual(DECKSIZE);
  });

  //TODO
  //test integrity of deck, (number of suits, total number of card values, etc)
});

describe("Deals a new hand", () => {
  let startDeck;
  let startHand;

  beforeEach(() => {
    startDeck = blackjack.createShuffled();
    startHand = [];
  });

  test("Deal returns new state", () => {
    const state = blackjack.deal(startDeck, 1);
    expect(state).toHaveProperty("deck");
    expect(state).toHaveProperty("cards");
  });

  test("Card is removed from deck and placed in hand", () => {
    var { deck, cards } = blackjack.deal(startDeck, 1);

    expect(cards).toHaveLength(1);
    expect(deck).toHaveLength(DECKSIZE - 1);
  });
});

describe("Caculates a hand value", () => {

  //improve
  const fakeHand = (v) => ({ value: v })

  test("A 10 and a 2 is 12", () => {
    let hand = [fakeHand(10), fakeHand(2)];
    var value = blackjack.calculateHand(hand);
    expect(value).toEqual(12);
  });

  test("An Ace is 11", () => {
    let hand = [fakeHand(11)];
    var value = blackjack.calculateHand(hand);
    expect(value).toEqual(11);
  });
  
  test("A 2 and Jack is 12", () => {
    let hand = [fakeHand(10), fakeHand(2)];
    var value = blackjack.calculateHand(hand);
    expect(value).toEqual(12);
  });

  test("Two J|K|Q and a 2 is 22", () => {
    let hand = [fakeHand(10), fakeHand(10), fakeHand(2)];
    expect(blackjack.calculateHand(hand)).toEqual(22);
  })

  test("An ace and a J|K|Q is 21", () => {
    let hand = [fakeHand(11), fakeHand(10)];
    let v = blackjack.calculateHand(hand);
    expect(v).toEqual(21);
  })

  test("An ace and two J|K|Q is 21", () => {
    let hand = [fakeHand(11), fakeHand(10), fakeHand(10)];
    let v = blackjack.calculateHand(hand);
    expect(v).toEqual(21);
  })

  test("Two aces and a J|K|Q is 12", () => {
    let hand = [fakeHand(11), fakeHand(11), fakeHand(10)];
    let v = blackjack.calculateHand(hand);
    expect(v).toEqual(12);
  })

  test("Three aces and a J|K|Q is 13", () => {
    let hand = [fakeHand(11), fakeHand(11), fakeHand(11), fakeHand(10)];
    let v = blackjack.calculateHand(hand);
    expect(v).toEqual(13);
  })

  
  test("A 7 a J|Q|K and a 4 is 21", () => {
    let hand = [fakeHand(7), fakeHand(10), fakeHand(4)];
    let v = blackjack.calculateHand(hand);
    expect(v).toEqual(21);
  })
  //
});
