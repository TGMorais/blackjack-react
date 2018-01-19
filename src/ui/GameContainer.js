import React from "react";

import { pipe } from "../state/utils/functional";
import gameState from "../state/gameState";
import gameActions from "../state/gameActions";
import PlayerActions from "../state/playerActions";

import Game from "./Game";

class GameContainer extends React.Component {
  state = gameState;

  componentWillMount = () => {
    this.setState(gameActions.load);
  };

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

  handleStart = () => {
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
