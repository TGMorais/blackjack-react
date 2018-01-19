import React from 'react'

import './deck.css';
const Deck = ({cards = []}) => (
    <div className="deck">
        <div className="deck-card"></div>
        <div className="deck-card"></div>
    </div>
)

export default Deck;
