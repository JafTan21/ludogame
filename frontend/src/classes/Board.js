import Spot from 'classes/Spot';
import Path from 'classes/Path';
import BoardHome from './BoardHome';
const {
    COLORS,
    HOME_SIZE,
    BOARD_SIZE
} = require('helper/config');


export default class Board {

    static paths = {
        red: Path.getRedPath(),
        green: Path.getGreenPath(),
        yellow: Path.getYellowPath(),
        blue: Path.getBluePath(),
    };

    constructor({ ctx }) {
        this.ctx = ctx;
        this.homes = [];

        let width = BOARD_SIZE - (HOME_SIZE * 2);
        this.winningBoxWidth = Math.sqrt(width * width);

        this.players = {};

        this.drawnXY = {};

    }

    static getNthSpot({ color, n, currX, currY }) {

        if (n - 1 == -1) {
            return { x: 0, y: 0 }
        }

        if (!Board.paths[color][n - 1]) {
            return { x: currX, y: currY };
        }

        return Board.paths[color][n - 1];
    }

    init() {
        // spots
        let BoxWidth = (BOARD_SIZE / 15);
        let BoxHeight = (BOARD_SIZE / 15);
        this.ctx.strokeStyle = "#e5e5e";


        this.drawnXY = {};

        for (const [key, value] of Object.entries(Board.paths)) {
            for (let i = 0; i < value.length; i++) {
                let spot = value[i];
                if (this.drawnXY[spot.x + '' + spot.y]) {
                    continue;
                }

                new Spot({
                    ctx: this.ctx,
                    x: spot.x, y: spot.y,
                    height: BoxHeight,
                    width: BoxWidth
                })

                this.drawnXY[spot.x + '' + spot.y] = true;
            }
        }

        // homes
        this.homes = [];
        for (const [key, color] of Object.entries(COLORS)) {
            this.drawHome(color);
        }

        // winning box ctx.lineWidth = 2;
        this.drawWinningBox();

        // players
        for (const [key, player] of Object.entries(this.players)) {
            player.draw();
        }
    }

    drawWinningBox() {
        const ctx = this.ctx;
        const BoxWidth = this.winningBoxWidth;

        ctx.strokeStyle = "#000";
        ctx.strokeRect(
            HOME_SIZE,
            HOME_SIZE,
            (BOARD_SIZE - (HOME_SIZE * 2)),
            (BOARD_SIZE - (HOME_SIZE * 2))
        );

        // blue
        ctx.fillStyle = COLORS.BLUE;
        ctx.beginPath();
        ctx.moveTo(HOME_SIZE, HOME_SIZE);
        ctx.lineTo(HOME_SIZE + BoxWidth / 2, HOME_SIZE + BoxWidth / 2);
        ctx.lineTo(HOME_SIZE, BOARD_SIZE - HOME_SIZE);
        ctx.stroke();
        ctx.fill();

        // red
        ctx.fillStyle = COLORS.RED;
        ctx.beginPath();
        ctx.moveTo(HOME_SIZE, BOARD_SIZE - HOME_SIZE);
        ctx.lineTo(HOME_SIZE + BoxWidth / 2, HOME_SIZE + BoxWidth / 2);
        ctx.lineTo(BOARD_SIZE - HOME_SIZE, BOARD_SIZE - HOME_SIZE);
        ctx.stroke();
        ctx.fill();


        // green
        ctx.fillStyle = COLORS.GREEN;
        ctx.beginPath();
        ctx.moveTo(BOARD_SIZE - HOME_SIZE, BOARD_SIZE - HOME_SIZE);
        ctx.lineTo(HOME_SIZE + BoxWidth / 2, HOME_SIZE + BoxWidth / 2);
        ctx.lineTo(BOARD_SIZE - HOME_SIZE, HOME_SIZE);
        ctx.stroke();
        ctx.fill();


        // yellow
        ctx.fillStyle = COLORS.YELLOW;
        ctx.beginPath();
        ctx.moveTo(BOARD_SIZE - HOME_SIZE, HOME_SIZE);
        ctx.lineTo(HOME_SIZE + BoxWidth / 2, HOME_SIZE + BoxWidth / 2);
        ctx.lineTo(HOME_SIZE, HOME_SIZE);
        ctx.stroke();
        ctx.fill();
    }

    static getPositionOfHome(color) {
        switch (color) {
            case COLORS.BLUE:
                return { x: 0, y: 0 };

            case COLORS.RED:
                return { x: 0, y: BOARD_SIZE - HOME_SIZE };

            case COLORS.GREEN:
                return { x: BOARD_SIZE - HOME_SIZE, y: BOARD_SIZE - HOME_SIZE };

            case COLORS.YELLOW:
                return { x: BOARD_SIZE - HOME_SIZE, y: 0 };
        }
    }

    drawHome(color) {
        const { x, y } = Board.getPositionOfHome(color);
        const home = new BoardHome({ ctx: this.ctx, startingX: x, startingY: y, color });
        this.homes.push(home);
    }

    addPlayer(player) {
        this.players[player.color] = player;
    }

    playerAt(x, y) {

    }

    clearAndDraw() {

        console.log("Before: ", this);

        this.ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE); //clear html5 canvas
        this.init();


        console.log("After: ", this);
    }

    draw() {
        this.init();
    }

    updatePlayerPositions({ positions }) {
        for (const [color, value] of Object.entries(positions)) {
            this.players[color].updateCurrentPosition({ position: value });
        }
    }
}
