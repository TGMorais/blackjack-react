import React from "react";
import ReactDOM from "react-dom";
import Player from "../Player";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Player />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly", () => {
  const tree = renderer.create(<Player>Button</Player>).toJSON();
  expect(tree).toMatchSnapshot();
});