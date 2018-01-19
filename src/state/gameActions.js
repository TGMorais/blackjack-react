import { saveGame, loadGame, withSavedGame } from "./utils/storage";
import blackjack from "../logic/blackjack";

const Hands = {
  player: 'player',
  dealer: 'dealer'
}

const gameLoad = prevState => {
  const savedState = loadGame();
  return {
    ...prevState,
    ...savedState
  };
  //noop for now
  // return prevState;
};

const gameStart = (prevState, props) => {
  let deck = blackjack.deck.createShuffled();

  return {
    ...prevState,
    deck,
    started: true
  };
};

const gameDeal = playerKey => {
  return (prevState, props) => {
    const player = prevState[playerKey];
    if(!player) {
      throw new Error(`Player not found: ${playerKey}`)
    }

    const { deck, hand } = blackjack.deck.deal(prevState.deck, 1);
    const newHand = [ ...(player.hand||[]), ...hand ];
    
    const newPlayerState = { ...player, hand: newHand }
    //
    const ns = {
      ...prevState,
      deck,      
      [playerKey]: newPlayerState,
    };
    console.log('calculare gameDeal', ns)
    return ns;
  };
};

export default {
  load: gameLoad,
  start: withSavedGame(gameStart),
  //
  dealPlayer: withSavedGame(gameDeal(Hands.player)),
  dealDealer: withSavedGame(gameDeal(Hands.dealer)),
};
