import React from 'react'

import './startscreen.css'
const Startscreen = ({ onStart }) => {
    return (
      <div className="start-screen flex flex-1 flex-centered">
        <button onClick={onStart}>Start Game</button>
      </div>
    );
  };
  

export default Startscreen