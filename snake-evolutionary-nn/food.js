class Food {

    constructor(player) {
        this.player = player;
        this.setPos();
    }

    setPos() {
        this.x = Math.floor(Math.random() * boardLength);
        this.y = Math.floor(Math.random() * boardLength);

        let overlapping = false;
        // Check that food is not placed on snake
        this.player.trail.forEach(t => {
            if (t.x == this.x && t.y == this.y) {
                overlapping = true;
            }
        });
        if (overlapping) {
            this.setPos();
        }
    }

    draw() {
        if (this == bestTotalPlayer || showOnlyBestTotalPlayer == false) {
            ctx.strokeStyle = `rgb(${this.player.color.r}, ${this.player.color.g}, ${this.player.color.b}`;
            ctx.strokeRect(this.x * boardLength, this.y * boardLength, boardLength - 2, boardLength - 2);
            // ctx.stroke();
        }
    }
}