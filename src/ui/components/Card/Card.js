import React from "react";
import "./card.css";

const NAMES = {
  queen: "Q",
  king: "K",
  jack: "J",
  ace: "A"
};

const SUITS = {
  'spades':'♠️',
  'clubs': '♣️',
  'diamonds': '♦️',
  'hearts':'♥️'
};

const normalize = n => (n && n.toLowerCase ? n.toLowerCase() : n);
const withNormalize = fn => arg => fn(normalize(arg));

const getName = withNormalize(n => NAMES[n] || n);
const getSuit = withNormalize(s => SUITS[s] || s);

const Card = ({ suit, name, flipped }) => {
  return (
    <div className={`card ${flipped ? 'flipped': ''}`}>
      {
        !flipped ? 
        (
          <React.Fragment>
            <div className="suit">{getSuit(suit)}</div>
            <div className="name">{getName(name || "")}</div>
          </React.Fragment>
        ) : null
      }
    </div>
  );
};

export default Card;
