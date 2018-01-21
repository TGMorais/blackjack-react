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
 * Makes a function to deal with a specific player's turn
 * It returns the new app's state (with the new player state)
 * @param {HANDS} playerKey - Game has two players, "player" and "dealer"
 * @param {bool} flipped - If the player has to flip his cards in the begginig 
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
    //
    const newPlayerState = playerStateUpdate(player, cards, flipped);
    //
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
