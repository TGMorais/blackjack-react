import React from "react";
import "./styles/base.css";
import "./styles/flex.css";
import Controls from "./components/controls/Controls";
import Deck from "./components/deck/Deck";
import Hand from "./components/hand/Hand";
import GameInfo from "./components/gameInfo/GameInfo";

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

class Blackjack extends React.Component {
  render() {
    const { props } = this;
    const { gameState, onStart } = props;
    // const { state } = game;

    const game = gameState.started ? (
      <Gamescreen />
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

const Startscreen = ({ onStart }) => {
  return (
    <div className="start-screen flex flex-1 flex-centered">
      <button onClick={onStart}>Start Game</button>
    </div>
  );
};

const Gamescreen = () => {
  return (
    <React.Fragment>
      <div className="flex-1">
        <Deck />
      </div>
      <div className="flex-2 flex flex-col">
        <div className="flex-1">Dealer</div>
        <div className="flex-1">Player</div>
        <div className="flex-1 flex flex-centered flex-align-end">
          <Controls />
        </div>
      </div>
      <div className="flex-1">
        <GameInfo />
      </div>
    </React.Fragment>
  );
};

export default Blackjack;
