class Gate {

    speed = 7;

    space = 230;
    width = 50;

    x = canvas.width;
    y = Math.random() * (canvas.height - this.space);

    constructor() {

    }

    draw() {
        this.x -= this.speed;
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, 0, this.width, this.y)
        ctx.fillRect(this.x, this.y + this.space, this.width, canvas.height - this.y - this.space)
        // console.log(this.x, this.y)
    }

}