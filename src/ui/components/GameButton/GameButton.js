import React from "react";
import "./gamebutton.css";

const GameButton = props => (
  //   <button
  //     class={`gamebutton {className}`}
  //     onClick={onClick}
  //     data-action={dataAction}
  //   />
  <button className={'gamebutton'} {...props}>
    {props.children}
  </button>
);

export default GameButton;
