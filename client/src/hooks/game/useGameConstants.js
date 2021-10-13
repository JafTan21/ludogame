import React, { useState } from 'react'
import {
    BOARD_SIZE,
    HOME_BOX_SIZE,
    HOME_SIZE,
    PLAYER_CIRCLE_RADIUS,
    COLORS
} from '../../helpers/config';


export default function useGameConstants() {

    return {
        BOARD_SIZE,
        HOME_SIZE,
        COLORS,
        HOME_BOX_SIZE,
        PLAYER_CIRCLE_RADIUS,
    };

}
