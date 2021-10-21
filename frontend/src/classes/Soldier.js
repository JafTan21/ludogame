const { PLAYER_CIRCLE_RADIUS, SOLDIER_SIZE } = require("helper/config");

export default class Soldier {

    constructor({ ctx, x, y, color, is_active }) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;

        this.img = `/players/${color}.png`;

        this.draw();
        this.is_active = is_active;
    }

    draw() {
        const x = this.x;
        const y = this.y;

        const img = new Image();
        img.addEventListener('load', () => {
            this.ctx.drawImage(img, x, y, SOLDIER_SIZE, SOLDIER_SIZE);
        }, false)
        img.src = this.img;
    }
}