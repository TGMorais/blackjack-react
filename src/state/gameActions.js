import { saveGame, loadGame, withSavedGame } from "./utils/storage";
import blackjack from "../logic/blackjack";
import gameState, { GAMESTATES } from "./gameState";
import { playerStateUpdate } from './playerActions'

const HANDS = {
  player: "player",
  dealer: "dealer"
};

const loadAction = prevState => {
  const savedState = loadGame();
  return {
    ...prevState,
    ...savedState
  };
  //noop for now
  return prevState;
};

const startAction = (prevState, props) => {
  let deck = blackjack.createShuffled();

  return {
    ...gameState,
    deck,
    state: GAMESTATES.STARTED
  };
};


const makeDealAction = (playerKey, flipped) => {
  return (prevState, props) => {
    const player = prevState[playerKey];

    if (!player) {
      throw new Error(`Player (key) not found in app state: ${playerKey}`);
    }

    if (!player.hand) {
      player.hand = [];
    }

    // 1 - deal x new cards, get new state of deck + cards delt
    const { deck, cards } = blackjack.deal(prevState.deck, 1);
    
    //2 - update states
    const newDeckState = deck;
    const newPlayerState = playerStateUpdate(player, cards, flipped);
    let newGameState = prevState.state;

    //3 - handle end of game
    let score = newPlayerState.score;
    if(score > blackjack.BUST_SCORE) {
      newGameState = GAMESTATES.FINISHED;
    }

    //
    const newAppState = {
      ...prevState,
      state: newGameState,
      deck: newDeckState,
      [playerKey]: newPlayerState
    };

    return newAppState;
  };
};



export default {
  load: loadAction,
  start: withSavedGame(startAction),
  //
  dealPlayer: withSavedGame(makeDealAction(HANDS.player)),
  dealDealer: withSavedGame(makeDealAction(HANDS.dealer, true))
};
