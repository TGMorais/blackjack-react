import blackjack from "../logic/blackjack";


export default {
  HIT: "HIT",
  STICK: "STICK"
};



export const playerStateUpdate = (player, newCards, flipped) => {
  let newHand = [...player.hand, ...newCards];

  //2 - handle flip 'card' if applies
  //- I'm really not happy with this, but I can't some up with something better for now
  if (flipped) {
    newHand = handleFlippingCardRuleThing(newHand);
  }

  //get score of new hand
  const score = blackjack.calculateHand(newHand);

  //
  return {
    ...player,
    hand: newHand,
    score,
    busted: score > blackjack.BUST_SCORE
  };
};

//when the "player" is the dealer and hes got two card only (first round)
//the second card is flipped
const handleFlippingCardRuleThing = hand => {
  if (hand.length === 2) {
    hand[1] = blackjack.flipCard(hand[1]);
    return hand;
  }

  //inflip all cards when on second round of the player
  if (hand.find(card => card.flipped)) {
    hand = hand.map(card => ({ ...card, flipped: false }));
  }
  return hand;
};
