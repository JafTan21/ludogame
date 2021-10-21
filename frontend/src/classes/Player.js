import Soldier from "./Soldier";
import Board from "./Board";
const { DISTANCE_OF_BORDER_AND_PLAYER, DISTANCE_OF_BORDER_AND_HOME, HOME_BOX_SIZE, HOME_SIZE, BOARD_SIZE } = require("helper/config");

export default class Player {
    static spot_size = (BOARD_SIZE / 15);
    constructor({ ctx, num, user_id, color }) {
        this.num = num;
        this.user_id = user_id;
        this.ctx = ctx;

        this.color = color;

        this.soldiers = {};

        const { x, y } = Board.getPositionOfHome(this.color);

        this.soldiersPosition = {
            1: { x: (x + DISTANCE_OF_BORDER_AND_PLAYER + DISTANCE_OF_BORDER_AND_HOME), y: (y + DISTANCE_OF_BORDER_AND_PLAYER + DISTANCE_OF_BORDER_AND_HOME), is_active: false },
            2: { x: (x + (DISTANCE_OF_BORDER_AND_PLAYER * 5) + DISTANCE_OF_BORDER_AND_HOME), y: (y + DISTANCE_OF_BORDER_AND_PLAYER + DISTANCE_OF_BORDER_AND_HOME), is_active: false },
            3: { x: (x + DISTANCE_OF_BORDER_AND_PLAYER + DISTANCE_OF_BORDER_AND_HOME), y: (y + (DISTANCE_OF_BORDER_AND_PLAYER * 5) + DISTANCE_OF_BORDER_AND_HOME), is_active: false },
            4: { x: (x + (DISTANCE_OF_BORDER_AND_PLAYER * 5) + DISTANCE_OF_BORDER_AND_HOME), y: (y + (DISTANCE_OF_BORDER_AND_PLAYER * 5) + DISTANCE_OF_BORDER_AND_HOME), is_active: false }
        };

        this.defaultSoldiersPosition = {
            1: { x: (x + DISTANCE_OF_BORDER_AND_PLAYER + DISTANCE_OF_BORDER_AND_HOME), y: (y + DISTANCE_OF_BORDER_AND_PLAYER + DISTANCE_OF_BORDER_AND_HOME), is_active: false },
            2: { x: (x + (DISTANCE_OF_BORDER_AND_PLAYER * 5) + DISTANCE_OF_BORDER_AND_HOME), y: (y + DISTANCE_OF_BORDER_AND_PLAYER + DISTANCE_OF_BORDER_AND_HOME), is_active: false },
            3: { x: (x + DISTANCE_OF_BORDER_AND_PLAYER + DISTANCE_OF_BORDER_AND_HOME), y: (y + (DISTANCE_OF_BORDER_AND_PLAYER * 5) + DISTANCE_OF_BORDER_AND_HOME), is_active: false },
            4: { x: (x + (DISTANCE_OF_BORDER_AND_PLAYER * 5) + DISTANCE_OF_BORDER_AND_HOME), y: (y + (DISTANCE_OF_BORDER_AND_PLAYER * 5) + DISTANCE_OF_BORDER_AND_HOME), is_active: false }
        }

        this.currentPosition = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
        }
    }

    // updateSoldierPosition({ soldierNum, x, y }) {
    //     this.soldiersPosition[soldierNum].x = x;
    //     this.soldiersPosition[soldierNum].y = y;
    // }

    updateCurrentPosition({ num, position }) {
        if (position < 57)
            this.currentPosition[num] = position;
    }

    activeSoldier(soldierNum) {
        this.soldiersPosition[soldierNum].is_active = true;
    }

    draw() {
        const spot_size = Player.spot_size;
        for (let i = 1; i <= 4; i++) {
            let { x, y } = Board.getNthSpot({
                color: this.color,
                n: this.currentPosition[i],
                currX: this.soldiersPosition[i].x,
                currY: this.soldiersPosition[i].y,
            });
            x = x * spot_size;
            y = y * spot_size;

            if (!this.soldiersPosition[i].is_active) {
                x = this.soldiersPosition[i].x;
                y = this.soldiersPosition[i].y;
            }

            this.soldiers[i] = (new Soldier({
                ctx: this.ctx,
                x, y,
                color: this.color,
                is_active: this.soldiersPosition[i].is_active,
            }));

        }

    }
}

