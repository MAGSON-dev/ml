class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    abs() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
}