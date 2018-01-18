const deck = {
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
      return deck.shuffle(deck.create())
  },

  /**
   * Deals numCards cards
   *
   */
  deal: (deck, numCards) => {
    //todo: asset deck = array, numCards = number

    
    if (numCards > deck.length) {
      throw new Error(
        `It's impossible to deal ${numCards}. Deck only has ${deck.length}!`
      );
    }

    const newdeck = [...deck];
    const hand = [];
    //

    while (numCards > 0) {
      hand.push(newdeck.shift());
      numCards--;
    }

    return {
      deck: newdeck,
      hand
    };
  }
};

const players = {};

const blackjack = {
  deck: deck,
  players: players
};

export default blackjack;
