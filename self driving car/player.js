class Player {

    x = 100;
    y = 100;
    rotation = 0;

    width = 30;
    height = 60;

    steeringDirection = 0; // 
    velocity = 0;
    acceleration = 0;

    constructor() {
        document.onkeydown = (evt) => {
            switch (evt.key) {
                case 'ArrowUp':
                    this.acceleration = -1;
                    break;
                case 'ArrowDown':
                    this.acceleration = 1;
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
                this.acceleration = 0;
            } else if (evt.key == 'ArrowLeft' || evt.key == 'ArrowRight') {
                this.steeringDirection = 0;
                console.log('æ')
            }
        }
    }

    draw() {
        ctx.translate((this.x + this.x + this.width) / 2, (this.y + this.y + this.height) / 2);
        ctx.rotate((this.rotation / 180) * Math.PI);
        ctx.translate(-(this.x + this.x + this.width) / 2, -(this.y + this.y + this.height) / 2);

        ctx.fillRect(this.x, this.y, this.width, this.height);


        this.velocity += this.acceleration;
        this.y += this.velocity;

        this.rotation += this.steeringDirection;

        if (this.velocity > 2) {
            this.velocity = 2;
        }
    }
}