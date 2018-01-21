import React from "react";
import "./gamebutton.css";

const GameButton = props => (
  <button className={'gamebutton'} {...props}>
    {props.children}
  </button>
);

export default GameButton;
