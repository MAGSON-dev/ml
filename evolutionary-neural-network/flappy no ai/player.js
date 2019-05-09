class Player {

    speed = 2;

    yPos = canvas.height / 2;
    yVel = 0;
    yAcc = 0;
    xPos = 50;

    height = 30;
    width = 30;

    fitness = 0;
    score = 0;

    color = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
    }

    constructor() {
        document.onkeydown = (evt) => {
            if (evt.key == " ") {
                this.flap();
            }
        }
    }


    flap() {
        this.yAcc = -.7;
        if (this.yVel > 0) {
            this.yVel = 0;
        }
    }

    draw() {

        if (this.yVel < 0) {
            this.yAcc += .05;
        } else {
            this.yAcc += .025;
        }

        if (this.yVel > 5) {
            this.yVel = 5;
        }

        this.yVel += this.yAcc;
        this.yPos += this.speed * this.yVel;


        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b}`;
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);


    }

}