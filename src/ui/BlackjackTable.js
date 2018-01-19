import React from "react";
import PropTypes from 'prop-types'

import { GameStateShape, GameCardShape } from '../state/gameState';


import "./styles/base.css";
import "./styles/flex.css";

import Controls from "./components/controls/Controls";
import Deck from "./components/deck/Deck";
import Dealer from "./components/dealer/Dealer";

import bgImage from "./img/pattern.png"



const bjStyle = {
  width: "100%",
  minWidth: "400px",
  minHeight: "400px",
  //   height: "100%",
  height: "75vh",
  // backgroundColor: "#EA2727",
  maxWidth: "1024px",
  margin: "10vh auto 0 auto",
  borderRadius: "6px",
  padding: "1em",
  position: "relative",
  textAlign: "center",
  backgroundImage: `url("${bgImage}")`
};

class BlackjackTable extends React.Component {
  static propTypes = {
    gameState: GameCardShape
  }

  render() {
    const { gameState, onStart } = this.props;
    const { deck, dealer, player } = gameState;

    console.log('will render table', gameState)

    const game = gameState.started ? (
      <Gamescreen {...gameState} />
    ) : (
      <Startscreen onStart={onStart} />
    );

    return (
      <div className="blackjack flex border-debug" style={bjStyle}>
        {game}
      </div>
    );
  }
}

// BlackjackTable.propTypes = {
//   gameState: GameStateShape
// }

const Startscreen = ({ onStart }) => {
  return (
    <div className="start-screen flex flex-1 flex-centered">
      <button onClick={onStart}>Start Game</button>
    </div>
  );
};

const Gamescreen = ({deck, player, dealer}) => {
  console.log('will render gamescreen', dealer)
  return (
    <React.Fragment>
      <div className="flex-1">
        <Deck cards={deck}/>
      </div>
      <div className="flex-2 flex flex-col">
        <div className="flex-1">
          <Dealer {...dealer} />
        </div>
        <div className="flex-1">
          {/* <Player /> */}
        </div>
        <div className="flex-1 flex flex-centered flex-align-end">
          <Controls />
        </div>
      </div>
      <div className="flex-1">
        {/* <GameInfo /> */}
      </div>
    </React.Fragment>
  );
};

export default BlackjackTable;
