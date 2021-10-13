
export default class Player {



    constructor({ ctx, color }) {
        this.ctx = ctx;
        this.color = color;
    }

    draw() {
        const ctx = this.ctx;

        console.log('drawing: ', this)
        const img = new Image();
        img.onload = function () {
            ctx.drawImage(
                img,
                0, 0
            );
            img.src = `/red.jpg`;
        }

    }
}