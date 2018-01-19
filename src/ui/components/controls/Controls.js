import React from "react";
import PlayerActions from "../../../state/playerActions";
import "./controls.css";

import GameButton from "../GameButton/GameButton";

const Controls = ({ onAction }) => (
  <div className="controls">
    <GameButton data-action={PlayerActions.HIT} onClick={onAction}>
      Hit!
    </GameButton>
    <GameButton data-action={PlayerActions.STICK} onClick={onAction}>
      Stick
    </GameButton>
  </div>
);

export default Controls;
