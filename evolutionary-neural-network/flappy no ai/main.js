let gates = [new Gate()];

let players = [new Player()];

let score = 0;
let generationNumber = 0;
let bestScore = 0;

setInterval(draw, 20);

const scoreTxt = document.getElementById('scoreTxt');

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    players.forEach(player => player.draw());

    score++;
    updateScoreTxt();
    // Create new gate
    if (score % 100 == 0) {
        gates.push(new Gate());
    }

    gates.forEach(gate => gate.draw());

    // Check for collisions
    players.forEach(player => {
        if (player.yPos + player.height >= canvas.height
            || player.yPos <= 0) {
            gameOver(player);
        }
        gates.forEach(gate => {
            if ((player.xPos + player.width > gate.x && player.xPos < gate.x + gate.width)
                && (player.yPos < gate.y
                    || player.yPos + player.height > gate.y + gate.space)) {
                console.log('hit');
                gameOver(player);
            }
        });
    });

    if (players.length == 0) {
        nextGeneration();
    }

    // Delete gates behind the canvas
    for (let i = 0; i < gates.length; i++) {
        if (gates[i].x < -30) {
            gates.splice(i, 1)
        }
    }
}

function nextGeneration() {
    score = 0;
    players = [new Player()];
}


function gameOver(player) {
    player.score = score;
    players.splice(players.indexOf(player), 1)[0];
}

function updateScoreTxt() {
    scoreTxt.innerHTML = 'Score: ' + Math.round(score / 25);
}