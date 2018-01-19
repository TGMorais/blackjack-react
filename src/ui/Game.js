import React from "react";
// import PropTypes from "prop-types";

import { GameCardShape, GAMESTATES } from "../state/gameState";

import "./styles/base.css";
import "./styles/flex.css";

import Controls from "./components/Controls/Controls";
import Deck from "./components/Deck/Deck";
import Player from "./components/Player/Player";
import Score from "./components/Score/Score";
import Startscreen from "./components/Startscreen/Startscreen";
import Endscreen from "./components/Endscreen/Endscreen";

import "./game.css";

/**
 * Game component - top level stateless component
 **/
class Game extends React.Component {
  static propTypes = {
    gameState: GameCardShape
  };

  render() {
    const { gameState, onStart, onAction } = this.props;

    if (!gameState) {
      return null;
    }

    const unstarted = gameState.state === GAMESTATES.UNSTARTED;
    return (
      <div className="blackjack flex">
        {unstarted ? (
          <Startscreen onStart={onStart} />
        ) : (
          <Gamescreen
            gameState={gameState}
            onStart={onStart}
            onAction={onAction}
          />
        )}
      </div>
    );
  }
}

/**
 * Main game screen component
 * All the child component are smaller functional component
 * that make up the games UI
 * 
 * There are only two events fired
 * onStart - fires to starts/restarts the game
 * onAction - fires to handle a game action (HIT/STICK)
 * 
 */
const Gamescreen = ({ gameState, onAction, onStart }) => {
  const { deck, player, dealer, state } = gameState;
  return (
    <React.Fragment>
      <div className="flex-1 hide-mobile">
        <Deck cards={deck} />
      </div>
      <div className="flex-2 flex flex-col">
        {renderPlayerSection(dealer)}
        {renderPlayerSection(player)}
        {state === GAMESTATES.FINISHED
          ? renderEndScreen(!player.busted, onStart)
          : renderControls(onAction)}
      </div>
    </React.Fragment>
  );
};

const renderPlayerSection = player => (
  <div className="flex-1 flex">
    <Player className="flex-1" {...player} />
    <Score score={player.score} />
  </div>
);

const renderControls = onAction => (
  <div className="flex-half flex flex-centered">
    <Controls onAction={onAction} />
  </div>
);

const renderEndScreen = (won, onStart) => (
  <Endscreen won={won} onStart={onStart} />
);

export default Game;
