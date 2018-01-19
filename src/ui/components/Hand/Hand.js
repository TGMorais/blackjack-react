import React from "react";
import Card from '../Card/Card';
import './hand.css';

const Hand = ({ cards = [] }) => {
  return (
      <div className="hand flex">
          {
              /*  use index as key for now */
              cards.map((card,i) => <Card key={i} {...card} />)
          }
      </div>
  )
};

export default Hand;
