const { DISTANCE_OF_BORDER_AND_PLAYER, DISTANCE_OF_BORDER_AND_HOME, HOME_BOX_SIZE, HOME_SIZE } = require("helper/config");
const { default: Board } = require("./Board");
const { Soldier } = require("./Soldier");

class Player {
    constructor({ ctx, num, user_id, color }) {
        this.num = num;
        this.user_id = user_id;
        this.ctx = ctx;

        this.color = color;

        this.soldiers = {};

        let { x, y } = Board.getPositionOfHome(this.color);

        this.soldiersPosition = {
            1: { x: (x + DISTANCE_OF_BORDER_AND_PLAYER + DISTANCE_OF_BORDER_AND_HOME), y: (y + DISTANCE_OF_BORDER_AND_PLAYER + DISTANCE_OF_BORDER_AND_HOME) },
            2: { x: (x + (DISTANCE_OF_BORDER_AND_PLAYER * 5) + DISTANCE_OF_BORDER_AND_HOME), y: (y + DISTANCE_OF_BORDER_AND_PLAYER + DISTANCE_OF_BORDER_AND_HOME) },
            3: { x: (x + DISTANCE_OF_BORDER_AND_PLAYER + DISTANCE_OF_BORDER_AND_HOME), y: (y + (DISTANCE_OF_BORDER_AND_PLAYER * 5) + DISTANCE_OF_BORDER_AND_HOME) },
            4: { x: (x + (DISTANCE_OF_BORDER_AND_PLAYER * 5) + DISTANCE_OF_BORDER_AND_HOME), y: (y + (DISTANCE_OF_BORDER_AND_PLAYER * 5) + DISTANCE_OF_BORDER_AND_HOME) }
        };

        this.defaultSoldiersPosition = {
            1: { x: (x + DISTANCE_OF_BORDER_AND_PLAYER + DISTANCE_OF_BORDER_AND_HOME), y: (y + DISTANCE_OF_BORDER_AND_PLAYER + DISTANCE_OF_BORDER_AND_HOME) },
            2: { x: (x + (DISTANCE_OF_BORDER_AND_PLAYER * 5) + DISTANCE_OF_BORDER_AND_HOME), y: (y + DISTANCE_OF_BORDER_AND_PLAYER + DISTANCE_OF_BORDER_AND_HOME) },
            3: { x: (x + DISTANCE_OF_BORDER_AND_PLAYER + DISTANCE_OF_BORDER_AND_HOME), y: (y + (DISTANCE_OF_BORDER_AND_PLAYER * 5) + DISTANCE_OF_BORDER_AND_HOME) },
            4: { x: (x + (DISTANCE_OF_BORDER_AND_PLAYER * 5) + DISTANCE_OF_BORDER_AND_HOME), y: (y + (DISTANCE_OF_BORDER_AND_PLAYER * 5) + DISTANCE_OF_BORDER_AND_HOME) }
        }

        this.initSoldiers();
    }

    initSoldiers() {
        for (let i = 1; i <= 4; i++) {
            this.soldiers[i] = (new Soldier({
                ctx: this.ctx,
                x: this.defaultSoldiersPosition[i].x,
                y: this.defaultSoldiersPosition[i].y,
                color: this.color
            }));
        }
    }

    updateSoldierPosition({ soldierNum, x, y }) {
        this.soldiersPosition[soldierNum].x = x;
        this.soldiersPosition[soldierNum].y = y;
    }

    draw() {

        for (let i = 1; i <= 4; i++) {
            this.soldiers[i] = (new Soldier({
                ctx: this.ctx,
                x: this.soldiersPosition[i].x,
                y: this.soldiersPosition[i].y,
                color: this.color
            }));
        }

    }
}



module.exports = { Player }