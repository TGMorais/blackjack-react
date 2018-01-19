import React from "react";
import GameButton from "../GameButton/GameButton";

import "./endscreen.css";
const Endscreen = ({ won, onStart }) => {
  const wonOrLost = won ? "won" : "lost";
  return (
    <div className="end-screen flex- flex-align-end1">
      <div className="message">
        <div>Game over!</div>
        <div>
          <span>You</span> <span className={wonOrLost}> {wonOrLost}</span>
        </div>
      </div>
      <GameButton onClick={onStart}>Restart Game</GameButton>
    </div>
  );
};

export default Endscreen;
