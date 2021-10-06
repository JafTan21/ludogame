import React from 'react'
import CornerBox from './CornerBox'
import Path from './Path'
import Player from './Player'

export default function PlayerArea({ color, cornerPosition, pathPosition }) {
    return (
        <>
            <CornerBox color={color} position={cornerPosition} />
            <Path color={color} position={pathPosition.line1} />
            <Path color={color} position={pathPosition.line2} />
            <Path color={color} position={pathPosition.line3} />

            <Player />
        </>
    )
}
