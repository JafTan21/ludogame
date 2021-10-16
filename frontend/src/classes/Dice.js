class Dice {
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
        ctx.clearRect(0, 0, this.size, this.size);
        const img = new Image()
        img.onload = () => {
            ctx.drawImage(img, 0, 0, this.size, this.size);
        }
        img.src = `/dice/dice-${num}.svg`;
    }

    toss() {
        const result = this.getRandomDice();
        const interval = setInterval(() => {
            this.draw(this.getRandomDice());
        }, 1000 / 20);
        setTimeout(() => {
            this.draw(result);
            clearInterval(interval);
        }, 1000);
        return result;
    }
}


module.exports = { Dice }