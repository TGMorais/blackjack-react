import React from "react";

import { pipe } from '../state/utils/functional';
import gameState from "../state/gameState";
import gameActions from "../state/gameActions";
import PlayerActions from "../state/playerActions";

import Game from "./Game";


class GameContainer extends React.Component {
  state = gameState;

  componentWillMount = () => {
    this.setState(gameActions.load);
  };

  handlePlayerAction = (e) => {
    const action = e.target.dataset.action;
    if(!PlayerActions[action]) {
      throw new Error(`Player action not valid! ${action}`)
    }

    console.log("handleGameAction", action);
  };

  handleStart = () => {
    const startGameActions = pipe(
      gameActions.start,
      gameActions.dealPlayer,
      gameActions.dealPlayer,
      gameActions.dealDealer
    )

    this.setState(startGameActions)
  };

  render() {
    const { state, handleStart, handlePlayerAction } = this;
    return <Game gameState={state} onStart={handleStart} onAction={handlePlayerAction} />;
  }
}

export default GameContainer;
