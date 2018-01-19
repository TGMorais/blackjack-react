import React from "react";

import BlackjackTable from "./BlackjackTable";
import { pipe } from '../state/utils/functional';
import gameState from "../state/gameState";
import gameActions from "../state/gameActions";


class GameContainer extends React.Component {
  state = gameState;

  componentWillMount = () => {
    this.setState(gameActions.load);
  };

  handleGameAction = () => {
    console.log("handleGameAction");
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
    const { state, handleStart } = this;
    return <BlackjackTable gameState={state} onStart={handleStart} />;
  }
}

export default GameContainer;
