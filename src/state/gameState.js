import PropTypes from 'prop-types';

const gameState = {
    started: false,
    player:  {
    },
    dealer: {
    },
    deck: []
}

export const GameCardShape = PropTypes.shape({
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    suit: PropTypes.oneOf( ["spades", "diamonds", "hearts", "clubs"] ),
    value: PropTypes.number
})
export const GamePlayershape = PropTypes.shape({
    hand: PropTypes.arrayOf(GameCardShape)
})

export const GameStateShape = PropTypes.shape({
    deck: PropTypes.arrayOf(GameCardShape),
    player: GamePlayershape,
    dealer: GamePlayershape
})

export default gameState