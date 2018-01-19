import React from "react";
import Hand from '../Hand/Hand';

import './player.css';

const Player = ({ hand = [] }) => {
  return (
      <div className="player">
          <Hand cards={hand} />
          <p>Player hand</p>
      </div>
  )
};

export default Player;
