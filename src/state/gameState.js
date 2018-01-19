import PropTypes from 'prop-types';

/**
 * Game/App can have three states
 */
export const GAMESTATES = {
    UNSTARTED: 'UNSTARTED',
    STARTED: 'STARTED',
    FINISHED: 'FINISHED'
}

/**
 * Shape of the App State
 */
const gameState = {
    state: GAMESTATES.UNSTARTED,
    player:  {
    },
    dealer: {
    },
    deck: []
}

export default gameState


/**
 * Anotations (for now) for PropTypes
 * since there is no Typescript/flow
 */
export const GameCardShape = PropTypes.shape({
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    suit: PropTypes.oneOf( ["spades", "diamonds", "hearts", "clubs"] ),
    value: PropTypes.number,
    flipped: PropTypes.bool
})
export const GamePlayershape = PropTypes.shape({
    hand: PropTypes.arrayOf(GameCardShape),
    score: PropTypes.number,
    busted: PropTypes.bool
})

export const GAMESTATEShape = PropTypes.shape({
    state: PropTypes.oneOf([
        GAMESTATES.FINISHED,
        GAMESTATES.STARTED,
        GAMESTATES.UNSTARTED
    ]),
    deck: PropTypes.arrayOf(GameCardShape),
    player: GamePlayershape,
    dealer: GamePlayershape
})
