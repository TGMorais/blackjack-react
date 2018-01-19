import React from "react";

import { pipe } from "../state/utils/functional";
import gameState from "../state/gameState";
import gameActions from "../state/gameActions";
import PlayerActions from "../state/playerActions";

import Game from "./Game";

/**
 * GameContainer
 * Top level and only statefull component of the app
 * Passes game state down as props
 */
class GameContainer extends React.Component {
  state = gameState;

  componentWillMount = () => {
    //Game state is saved in storage, so load it 
    this.setState(gameActions.load);
  };

  /**
   * Responds to a game action event
   * Fire correspondant action to mutate the state
   */
  handlePlayerAction = e => {
    const action = e.target.dataset.action;
    if (!PlayerActions[action]) {
      throw new Error(`Player action not valid! ${action}`);
    }

    if (PlayerActions[action] === PlayerActions.HIT) {
      this.setState(gameActions.dealPlayer);
      return;
    }

    if (PlayerActions[action] === PlayerActions.STICK) {
      this.setState(gameActions.dealDealer);
      return;
    }
  };

  /**
   * Responds on game start event
   * Fires all the actions for the game state to start
   */
  handleStart = () => {
    //Pipe all functions, since they are all "state mutations" (same signitare)
    const startGameActions = pipe(
      gameActions.start,
      gameActions.dealPlayer,
      gameActions.dealDealer,
      gameActions.dealPlayer,
      gameActions.dealDealer
    );

    this.setState(startGameActions);
  };

  render() {
    return (
      <Game
        gameState={this.state}
        onStart={this.handleStart}
        onAction={this.handlePlayerAction}
      />
    );
  }
}

export default GameContainer;
