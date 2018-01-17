import React from "react";

import Blackjack from "./Blackjack";
import gameState from "../state/gameState";
import gameActions from '../state/gameActions';
import  { loadGame } from '../state/utils/storage';

class GameContainer extends React.Component {
  state = gameState;

  componentWillMount = () => {
    this.setState(gameActions.load);
  };

  handleGameAction = () => {
    console.log("handleGameAction");
  };

  handleStart = () => {
    this.setState(gameActions.start);
  };

  render() {
    const { state, handleStart } = this;

    return <Blackjack gameState={state} onStart={handleStart} />;
  }
}

export default GameContainer;
