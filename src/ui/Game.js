import React from "react";
import PropTypes from 'prop-types'

import { GameStateShape, GameCardShape } from "../state/gameState"


import "./styles/base.css";
import "./styles/flex.css";

import Controls from "./components/Controls/Controls";
import Deck from "./components/Deck/Deck";
import Dealer from "./components/Dealer/Dealer";
import Player from "./components/Player/Player";

import Startscreen from "./components/Startscreen/Startscreen"



const bjStyle = {
  width: "100%",
  minWidth: "400px",
  minHeight: "400px",
  height: "75vh",
  maxWidth: "1024px",
  margin: "10vh auto 0 auto",
  borderRadius: "6px",
  padding: "1em",
  position: "relative",
  textAlign: "center",
  backgroundSize: `20px 20px`
};

class Game extends React.Component {
  static propTypes = {
    gameState: GameCardShape
  }

  render() {
    const { gameState, onStart, onAction } = this.props;
    const { deck, dealer, player } = gameState;

    console.log('will render table', gameState)

    const game = gameState.started ? (
      <Gamescreen {...gameState} onAction={onAction} />
    ) : (
      <Startscreen onStart={onStart} />
    );

    return (
      <div className="blackjack flex" style={bjStyle}>
        {game}
      </div>
    );
  }
}

const Gamescreen = ({deck, player, dealer, onAction}) => {
  console.log('will render gamescreen', dealer)
  return (
    <React.Fragment>
      <div className="flex-1">
        <Deck cards={deck}/>
      </div>
      <div className="flex-2">
        <div className="flex-1">
          <Dealer {...dealer} />
        </div>
        <div className="flex-1">
          <Player {...player} />
        </div>
        <div className="flex-half flex flex-centered">
          <Controls onAction={onAction} />
        </div>
      </div>
      <div className="flex-1">
      </div>
    </React.Fragment>
  );
};

export default Game;
