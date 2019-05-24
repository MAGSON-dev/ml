class Player {

    position = new Vector(100, 100);
    rotation = 0;

    width = 30;
    height = 60;

    steeringDirection = 0; //
    velocity = 0;

    color = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
    }

    constructor() {
        document.onkeydown = (evt) => {
            switch (evt.key) {
                case 'ArrowUp':
                    this.velocity = -1;
                    break;
                case 'ArrowDown':
                    this.velocity = 1;
                    break;
                case 'ArrowLeft':
                    this.steeringDirection = -1;
                    break;
                case 'ArrowRight':
                    this.steeringDirection = 1;
                    break;
            }

        }

        document.onkeyup = (evt) => {
            if (evt.key == 'ArrowUp' || evt.key == 'ArrowDown') {
                this.velocity = 0;
            } else if (evt.key == 'ArrowLeft' || evt.key == 'ArrowRight') {
                this.steeringDirection = 0;
                console.log('æ')
            }
        }
    }

    draw() {
        ctx.save();
        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b}`;
        ctx.translate((this.position.x + this.position.x + this.width) / 2, (this.position.y + this.position.y + this.height) / 2);
        ctx.rotate((this.rotation / 180) * Math.PI);
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        ctx.restore();

        const velocityVector = new Vector(
            -this.velocity * 5 * Math.sin((this.rotation / 180) * Math.PI),
            this.velocity * 5 * Math.cos((this.rotation / 180) * Math.PI)
        );

        console.log(this.position);

        this.position.add(velocityVector);
        this.rotation += this.steeringDirection * 3;

        if (this.rotation > 360) {
            this.rotation = 0;
        } else if (this.rotation < 0) {
            this.rotation = 360;
        }
    }
}