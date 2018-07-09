const canv = document.getElementById("gc");
const ctx = canv.getContext("2d");
document.addEventListener("keydown", keyPush);
setInterval(game, 100);


// The snake is in a 19 x 19 boxes

let snakeX = snakeY = 10;
const boardLength = 20;
let foodX = foodY = 15;
let snakeDirectionX = snakeDirectionY = 0;
let trail = []; // 
let tail = 5; // the length of the snake
let score = 0;
let running = false;
function game() {
    // move snake
    snakeX += snakeDirectionX;
    snakeY += snakeDirectionY;
    // if the snake go out of the canvas
    if (snakeX < 0) {
        snakeX = boardLength - 1;
    }
    if (snakeX > boardLength - 1) {
        snakeX = 0;
    }
    if (snakeY < 0) {
        snakeY = boardLength - 1;
    }
    if (snakeY > boardLength - 1) {
        snakeY = 0;
    }

    for (var i = 0; i < trail.length; i++) {
        // if the snake hits itself
        if ((trail[i].x == snakeX && trail[i].y == snakeY) && running == true) {
            reset();
        }
    }

    trail.push({ x: snakeX, y: snakeY });
    // remove old point
    while (trail.length > tail) {
        trail.shift();
    }

    // if the snake hits food
    if (foodX == snakeX && foodY == snakeY) {
        updateScore();
        tail++;
        foodX = Math.floor(Math.random() * boardLength);
        foodY = Math.floor(Math.random() * boardLength);
        console.log("food");
    }

    draw();
}

function draw() {
    ctx.fillStyle = "#263238";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.fillStyle = "#039386";

    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * boardLength, trail[i].y * boardLength, boardLength - 2, boardLength - 2);
    }

    ctx.fillStyle = "white";
    ctx.fillRect(foodX * boardLength, foodY * boardLength, boardLength - 2, boardLength - 2);

}

function keyPush(evt) {
    running = true;
    switch (evt.keyCode) {
        case 37:
            // left key pushed
            if (snakeDirectionX < 1) {
                snakeDirectionX = -1; snakeDirectionY = 0;
            }
            break;
        case 38:
            // up key pushed
            if (snakeDirectionY < 1) {
                snakeDirectionX = 0; snakeDirectionY = -1;
            }
            break;
        case 39:
            // right key pushed
            if (snakeDirectionX > -1) {
                snakeDirectionX = 1; snakeDirectionY = 0;
            }
            break;
        case 40:
            // down key pushed
            if (snakeDirectionY > -1) {
                snakeDirectionX = 0; snakeDirectionY = 1;
            }
            break;
    }
}
function updateScore() {
    score++;
    document.getElementById("scoreText").innerHTML = "Score: " + score;
}
function reset() {
    alert("Game over - Score: " + score);

    // reset all variables
    snakeX = snakeY = 10;
    foodX = foodY = 15;
    snakeDirectionX = snakeDirectionY = 0;
    trail = []; // 
    tail = 5; // the length of the snake
    score = 0;
    running = false;

    document.getElementById("scoreText").innerHTML = "Score: " + score;
}