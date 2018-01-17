import { saveGame, loadGame } from "./utils/storage";
import blackjack from "../logic/blackjack";

const gameStart = (prevState, props) => {
  // const deck = blackjack.deck.newDeck();
  // const
  // const playerHand = blackjack.deck.dealCards(deck, 2)
  // const playerHand = blackjack.deck.dealCards(deck, 3)

  return {
    ...prevState,
    started: true
  };
};

const gameLoad = prevState => {
  // const savedState = loadGame();
  // return {
  //   ...prevState,
  //   ...savedState
  // };
  //noop for now
  return prevState;
};

const withSaveGame = fn => {
  return (prevState, props) => {
    const state = fn(prevState, props);
    saveGame(state);

    return state;
  };
};

export default {
  load: gameLoad,
  start: withSaveGame(gameStart)
};
