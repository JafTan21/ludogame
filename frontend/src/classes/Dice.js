export default class Dice {
    constructor({ ctx, size }) {
        this.ctx = ctx;
        this.size = size;
        this.draw(this.getRandomDice());
    }

    getRandomDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    draw(num) {
        const ctx = this.ctx;
        const img = new Image()
        img.onload = () => {
            // ctx.clearRect(0, 0, this.size, this.size);
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, this.size, this.size);
            ctx.drawImage(img, 0, 0, this.size, this.size);
        }
        img.src = `/dice/dice-${num}.svg`;

    }

    toss() {
        const result = this.getRandomDice();
        this.animate(result);
        return result;
    }

    animate(result) {
        console.log('animate', result)
        const interval = setInterval(() => {
            this.draw(this.getRandomDice());
        }, 1200 / 100);
        setTimeout(() => {
            clearInterval(interval);
            this.draw(result);
        }, 1200);
    }
}