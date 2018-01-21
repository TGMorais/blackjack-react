import React from "react";
import ReactDOM from "react-dom";
import Hand from "../Hand";
import renderer from "react-test-renderer";
//TODO: use webpack alias!!
import blackjack from "../../../../logic/blackjack";

let deck = []
beforeEach(() => {
  deck = blackjack.create();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Hand />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly", () => {
  const tree = renderer.create(<Hand>Button</Hand>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders with cards correctly", () => {
  const cards = [...deck.slice(0, 3)];

  const tree = renderer.create(<Hand cards={cards}>Button</Hand>).toJSON();
  expect(tree).toMatchSnapshot();
});
