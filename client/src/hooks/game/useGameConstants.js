import React, { useState } from 'react'

export default function useGameConstants() {

    const BOARD_SIZE = 380;
    const HOME_SIZE = 150;
    const HOME_BOX_SIZE = 100;
    const PLAYER_CIRCLE_RADIUS = 12;
    const COLORS = {
        BLUE: 'blue',
        RED: 'red',
        GREEN: 'green',
        YELLOW: 'yellow'
    };


    return {
        BOARD_SIZE,
        HOME_SIZE,
        COLORS,
        HOME_BOX_SIZE,
        PLAYER_CIRCLE_RADIUS,
    };

}
