class Player {

    x = 10;
    y = 10;

    dirX = 0;
    dirY = 0;

    trail = [];
    tail = 5;

    score = 0;

    color = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
    }

    food = new Food(this);

    constructor(brain) {
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(10, 12, 4);
        }
    }

    gameOver() {
        savedPlayers.push(players.splice(players.indexOf(this), 1)[0]);
    }

    checkDistanceToDeath(dir) {
        let distance = 1;
        let x = 0;
        let y = 0;
        switch (dir) {
            case 0:
                x = -1;
                break;
            case 1:
                y = -1;
                break;
            case 2:
                x = 1;
                break;
            case 3:
                y = 1;
        }
        let crash = false;
        while (crash == false && distance < boardLength) {
            this.trail.forEach(t => {
                if (this.x + x * distance == t.x && this.y + y * distance == t.x) {
                    crash = true;
                }
            });
            distance++;
        }
        return distance;
    }

    think() {

        let inputs = [];
        inputs[0] = this.x / boardLength;
        inputs[1] = this.y / boardLength;
        inputs[2] = this.dirX;
        inputs[3] = this.dirY
        inputs[4] = this.food.x / boardLength;
        inputs[5] = this.food.y / boardLength;
        inputs[6] = this.checkDistanceToDeath(0) / boardLength;
        inputs[7] = this.checkDistanceToDeath(1) / boardLength;
        inputs[8] = this.checkDistanceToDeath(2) / boardLength;
        inputs[9] = this.checkDistanceToDeath(3) / boardLength;

        let output = this.brain.predict(inputs);
        let bestMove;
        let bestMoveProp = 0;
        output.forEach((o, i) => {
            if (o > bestMoveProp) {
                bestMove = i;
                bestMoveProp = o;
            }
        });

        switch (bestMove) {
            case 0:
                //venstre
                if (this.dirX < 1) {
                    this.dirX = -1; this.dirY = 0;
                }
                break;
            case 1:
                // opp
                if (this.dirY < 1) {
                    this.dirX = 0; this.dirY = -1;
                }
                break;
            case 2:
                // høyre
                if (this.dirX > -1) {
                    this.dirX = 1; this.dirY = 0;
                }
                break;
            case 3:
                // ned
                if (this.dirY > -1) {
                    this.dirX = 0; this.dirY = 1;
                }
                break;
        }
    }

    draw() {
        // this.score += .05;
        this.think();

        this.x += this.dirX;
        this.y += this.dirY;

        // hvis slangen går utenfor område
        if (this.x < 0) {
            // this.x = boardLength - 1;
            this.gameOver();
        }
        if (this.x > boardLength - 1) {
            // this.x = 0;
            this.gameOver();
        }
        if (this.y < 0) {
            // this.y = boardLength - 1;
            this.gameOver();
        }
        if (this.y > boardLength - 1) {
            // this.y = 0;
            this.gameOver();
        }

        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b}`;
        for (var i = 0; i < this.trail.length; i++) {
            if (this == bestTotalPlayer || showOnlyBestTotalPlayer == false) {
                ctx.fillRect(this.trail[i].x * boardLength, this.trail[i].y * boardLength, boardLength - 2, boardLength - 2);
            }
            // kræsjet i seg selv
            if (this.trail[i].x == this.x && this.trail[i].y == this.y) {
                this.gameOver();
            }
        }
        this.trail.push({ x: this.x, y: this.y });
        while (this.trail.length > this.tail) {
            this.trail.shift();
        }

        // spiste en mat
        if (this.food.x == this.x && this.food.y == this.y) {
            this.score++;
            this.tail++;
            this.food = new Food(this);
        }

        this.food.draw();
    }

    dispose() {
        this.brain.dispose();
    }

    mutate() {
        this.brain.mutate(0.05);
    }
}