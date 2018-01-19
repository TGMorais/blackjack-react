import React from 'react'

const Deck = ({cards = []}) => (
    <div className="deck">
        {cards.length}!!
    </div>
)

export default Deck;
