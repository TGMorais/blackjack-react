import React from 'react';
import ReactDOM from 'react-dom';
import Blackjack from './Blackjack';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Blackjack />, div);
  ReactDOM.unmountComponentAtNode(div);
});
