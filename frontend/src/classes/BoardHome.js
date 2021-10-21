const {
    HOME_SIZE,
    HOME_BOX_SIZE,
    PLAYER_CIRCLE_RADIUS,
    BOARD_SIZE
} = require("helper/config");


export default class BoardHome {
    constructor({ ctx, startingX, startingY, color }) {
        this.ctx = ctx;
        this.color = color;
        this.x = startingX;
        this.y = startingY;


        this.innerBoxX = this.x + ((HOME_SIZE - HOME_BOX_SIZE) / 2);
        this.innerBoxY = this.y + ((HOME_SIZE - HOME_BOX_SIZE) / 2);


        this.draw();
    }

    draw() {
        const ctx = this.ctx;
        const color = this.color;
        const x = this.x;
        const y = this.y;

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000"
        ctx.fillStyle = color

        ctx.fillRect(x, y, HOME_SIZE, HOME_SIZE)
        ctx.strokeRect(x, y, HOME_SIZE, HOME_SIZE);


        // inner home
        ctx.fillStyle = "#fff"

        const innerBoxX = this.innerBoxX;
        const innerBoxY = this.innerBoxY;
        ctx.fillRect(
            innerBoxX,
            innerBoxY,
            HOME_BOX_SIZE,
            HOME_BOX_SIZE
        );


        ctx.fillStyle = color;
        for (let i = 1; i <= 4; i++) this.drawInnerBox(i);

    }

    getInnerSpotPosition(number) {
        // 1-top-left, 2-top-right, 3-bottom-right, 4-bottom-left
        switch (number) {
            case 1:
                return { x: this.innerBoxX + (HOME_BOX_SIZE / 4), y: this.innerBoxY + (HOME_BOX_SIZE / 4) }

            case 2:
                return { x: this.innerBoxX + (HOME_BOX_SIZE / 4 * 3), y: this.innerBoxY + (HOME_BOX_SIZE / 4) }

            case 3:
                return { x: this.innerBoxX + (HOME_BOX_SIZE / 4), y: this.innerBoxY + (HOME_BOX_SIZE / 4 * 3) }

            case 4:
                return { x: this.innerBoxX + (HOME_BOX_SIZE / 4 * 3), y: this.innerBoxY + (HOME_BOX_SIZE / 4 * 3) }
        }
    }

    drawInnerBox(num) {
        const ctx = this.ctx;
        const { x, y } = this.getInnerSpotPosition(num);
        ctx.beginPath();
        ctx.arc(
            x,
            y,
            PLAYER_CIRCLE_RADIUS, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}
