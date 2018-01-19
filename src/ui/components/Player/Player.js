import React from "react";
import Hand from '../Hand/Hand';

import './player.css';

const Player = ({ hand = [], className }) => {
  return (
      <div className={`player ${className}`}>
          <Hand cards={hand} />
      </div>
  )
};

export default Player;
