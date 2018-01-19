import React from "react";
import GameButton from "../GameButton/GameButton";

import "./endscreen.css";
const Endscreen = ({ won, onStart }) => {
  const wonOrLost = won ? "won" : "lost";
  return (
    <div className="end-screen flex- flex-align-end1">
      <div>
        Game Over! You
        <span className={wonOrLost}> {wonOrLost}</span>
      </div>
      <GameButton onClick={onStart}>Restart Game</GameButton>
    </div>
  );
};

export default Endscreen;
