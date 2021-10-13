import {
    COLORS,
    PLAYER_CIRCLE_RADIUS,
    HOME_BOX_SIZE,
    BOARD_SIZE,
    HOME_SIZE,
    DISTANCE_OF_BORDER_AND_HOME,
    DISTANCE_OF_BORDER_AND_PLAYER,
    getPositionOfHome
} from "../helpers/config";

export default class Player {

    constructor(ctx, color) {
        this.ctx = ctx;
        this.color = color;
        this.defaultPositions = {}
        this.init();
    }

    init() {
        const { x, y } = getPositionOfHome(this.color);
        const innerBoxX = x + ((HOME_SIZE - HOME_BOX_SIZE) / 2);
        const innerBoxY = y + ((HOME_SIZE - HOME_BOX_SIZE) / 2);

        for (let i = 1; i <= 4; i++) {
            this.draw(this.generatePosition({ x: innerBoxX, y: innerBoxY }, i), i);
            this.defaultPositions[i] = this.generatePosition({ x: innerBoxX, y: innerBoxY }, i);
        }

        // console.log(this.color + " ", this.defaultPositions)
    }

    draw({ x, y }, num) {
        const ctx = this.ctx;
        const img = new Image();
        img.addEventListener('load', () => {
            ctx.drawImage(img, x, y, PLAYER_CIRCLE_RADIUS * 2, PLAYER_CIRCLE_RADIUS * 2);
        }, false)
        img.src = `/players/${this.color}.png`;
        img.id = `${this.color}-${num}`;
    }

    generatePosition({ x, y }, num) {

        switch (num) {
            case 1:
                return {
                    x: x + DISTANCE_OF_BORDER_AND_PLAYER,
                    y: y + DISTANCE_OF_BORDER_AND_PLAYER,
                }

            case 2:
                return {
                    x: x + DISTANCE_OF_BORDER_AND_PLAYER * 5,
                    y: y + DISTANCE_OF_BORDER_AND_PLAYER,
                }

            case 3:
                return {
                    x: x + DISTANCE_OF_BORDER_AND_PLAYER,
                    y: y + DISTANCE_OF_BORDER_AND_PLAYER * 5,
                }

            case 4:
                return {
                    x: x + DISTANCE_OF_BORDER_AND_PLAYER * 5,
                    y: y + DISTANCE_OF_BORDER_AND_PLAYER * 5,
                }
        }
        return {
            x: x,
            y: y,
        }
    }



}