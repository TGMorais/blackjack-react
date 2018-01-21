import React from "react";
import ReactDOM from "react-dom";
import GameButton from "../GameButton";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<GameButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly", () => {
  const tree = renderer.create(<GameButton>Button</GameButton>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Change state when hovered", () => {
  var clicked = false;
  const component = renderer.create(
    <GameButton onClick={() => {clicked = true}}>Button</GameButton>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.onClick();
  tree = component.toJSON();
  expect(clicked).toBe(true)
});
