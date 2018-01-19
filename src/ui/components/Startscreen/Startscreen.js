import React from 'react'
import GameButton from "../GameButton/GameButton";

import './startscreen.css'
const Startscreen = ({ onStart }) => {
    return (
      <div className="start-screen flex flex-1 flex-centered">
        <GameButton onClick={onStart}>Start Game</GameButton>
      </div>
    );
  };
  

export default Startscreen