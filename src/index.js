import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import GameContainer from './ui/GameContainer';

ReactDOM.render(<GameContainer />, document.getElementById("root"));
registerServiceWorker();
