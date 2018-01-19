const blackjack = {
  BUST_SCORE: 21,
  create: () => {
    const suits = ["spades", "diamonds", "hearts", "clubs"];
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const specials = { 1: "Ace", 11: "Jack", 12: "Queen", 13: "King" };

    const deck = suits
      .map(s => {
        return values.map(v => {
          return {
            suit: s,
            name: specials[v] || v,
            value: v > 10 ? 10 : v
          };
        });
      })
      .reduce((acc, v) => acc.concat(v));

    return deck;
  },

  shuffle: deck => {
    if (!(deck instanceof Array)) {
      throw new Error("Deck not an array");
    }

    let _deck = [...deck];
    let i = 0,
      len = _deck.length;

    const swap = (deck, a, b) => {
      let tmp = deck[a];
      deck[a] = deck[b];
      deck[b] = tmp;
    };

    while (i < len) {
      const newi = Math.floor(Math.random() * i);
      swap(_deck, i, newi);
      i++;
    }
    return _deck;
  },

  createShuffled: () => {
    return blackjack.shuffle(blackjack.create());
  },

  /**
   * Deals numCards cards
   *
   */
  deal: (deck, numCards) => {
    //todo: asset deck = array, numCards = number

    if (numCards > deck.length) {
      throw new Error(
        `It's impossible to deal ${numCards} cards. Deck only has ${deck.length} left!`
      );
    }

    const newdeck = [...deck];
    const cards = [];
    //

    while (numCards > 0) {
      cards.push(newdeck.shift());
      numCards--;
    }

    return {
      deck: newdeck,
      cards
    };
  },

  flipCard: card => {
    return { ...card, flipped: !(card.flipped) };
  },

  calculateHand: hand => {
    const cardValues = hand.filter(card => !(card.flipped)).map(card => card.value)
    return blackjack.calculateHandValue(cardValues);
  },

  calculateHandValue: cardValues => {
    let total = cardValues.reduce((accumulator, curr, prev) => {
      return accumulator + curr;
    }, 0);

    if (total > blackjack.BUST_SCORE) {
      let numAces = cardValues.filter(x => x === 11).length;
      while (numAces > 0 && total > blackjack.BUST_SCORE) {
        total -= 10;
        numAces--;
      }
    }

    return total;
  }
};

export default blackjack;
