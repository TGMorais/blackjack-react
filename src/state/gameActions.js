import { loadGame, withSavedGame } from "./utils/storage";
import blackjack from "../logic/blackjack";
import gameState, { GAMESTATES } from "./gameState";
import { playerStateUpdate } from './playerActions'

const HANDS = {
  player: "player",
  dealer: "dealer"
};

/**
 * Loads the game state from storage
 */
const loadAction = prevState => {
  const savedState = loadGame();
  return {
    ...prevState,
    ...savedState
  };
};

/**
 * Resets the game state to the initial state (new deck)
 */
const startAction = (prevState, props) => {
  let deck = blackjack.createShuffled();

  return {
    ...gameState,
    deck,
    state: GAMESTATES.STARTED
  };
};


/**
 * Helper HOC function to create an `DEAL` action for a player object
 * each playerKey maps to a player object in the state
 * 
 * @param {String} playerKey - type of player (player/m)
 * @param {boolean} flipped - Player (dealer) has cards flipped down
 * @return {Object} - new app state and new player state (from corresponding playerKey)
 */
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

    //3 - handle end of game if one player has busted
    let score = newPlayerState.score;
    if(score > blackjack.BUST_SCORE) {
      newGameState = GAMESTATES.FINISHED;
    }

    //Build new app state
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
