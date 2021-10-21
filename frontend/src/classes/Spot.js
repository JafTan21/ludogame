const { COLORS } = require("helper/config");

export default class Spot {
    static total = 0;
    constructor({ ctx, x, y, height, width }) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;

        this.color = "#fff";

        this.draw();
        Spot.total += 1;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = "#e5e5e";
        this.ctx.lineWidth = 0.5;

        const x = this.x, y = this.y;
        this.ctx.fillRect(
            x * this.width,
            y * this.height,
            this.width,
            this.height
        )

        if (
            ((x == 1 && y == 6) || (x > 0 && x < 6 && y == 7)) ||
            (x == 13 && y == 8) || (x > 8 && x < 14 && y == 7) ||
            (x == 8 && y == 1) || (y > 0 && y < 6 && x == 7) ||
            (x == 6 && y == 13) || (y > 8 && y < 14 && x == 7)
        ) {
            this.ctx.fillStyle = this.getColor(x, y);
            this.ctx.fillRect(
                x * this.width, y * this.height,
                this.width,
                this.height
            )
        }

        this.ctx.strokeRect(
            x * this.width, y * this.height,
            this.width,
            this.height
        );
    }


    getColor(x, y) {
        if (x < 6 && y < 9) {
            return COLORS.BLUE;
        }

        if (y > 8 && x < 9) {
            return COLORS.RED;
        }

        if (x > 8 && y < 9) {
            return COLORS.GREEN;
        }

        if (x > 5 && y < 6) {
            return COLORS.YELLOW;
        }

        return '#fff';
    }

}