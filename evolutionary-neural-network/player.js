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

    constructor(brain) {
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(5, 8, 2);
        }
    }

    think() {
        // Find the closest pipe
        let closest = null;
        let closestD = Infinity;
        gates.forEach(gate => {
            let d = gate.x + gate.width - this.xPos;
            if (d < closestD && d > 0) {
                closest = gate;
                closestD = d;
            }
        });

        let inputs = [];
        inputs[0] = this.yPos / canvas.height;
        inputs[1] = closest.y / canvas.height;
        inputs[2] = (closest.y + closest.space) / canvas.height;
        inputs[3] = closest.x / canvas.width;
        inputs[4] = this.yVel / 10;
        let output = this.brain.predict(inputs);
        //if (output[0] > output[1] && this.velocity >= 0) {
        if (output[0] > output[1]) {
            this.flap();
        }
    }

    flap() {
        this.yAcc = -.7;
        if (this.yVel > 0) {
            this.yVel = 0;
        }
    }

    draw() {
        this.think();

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

    dispose() {
        this.brain.dispose();
    }

    mutate() {
        this.brain.mutate(0.05);
    }
}