import React from "react";
import Hand from '../Hand/Hand';

import './dealer.css';

const Dealer = ({ hand = [] }) => {
  return (
      <div className="dealer">
          <p>Dealer hand</p>
          <Hand cards={hand} />
      </div>
  )
};

export default Dealer;
