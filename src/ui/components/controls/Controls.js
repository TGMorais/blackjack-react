import React from 'react'
import PlayerActions from '../../../state/playerActions'
import './controls.css';


const Controls = ({ onAction }) => (
    <div className="controls">
        <button className="control-hit" data-action={PlayerActions.HIT} onClick={onAction}>Hit!</button>
        <button className="control-stick" data-action={PlayerActions.STICK} onClick={onAction}>Stick</button>
    </div>
)

export default Controls;
