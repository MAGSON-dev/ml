let asteroids = [new Asteroid()];

let players = [];
let savedPlayers = [];
const TOTAL = 250;
// Create initial players
for (let i = 0; i < TOTAL; i++) {
    players.push(new Player())
}
console.log('created ' + players.length + ' players');

let score = 0;
let generationNumber = 0;
let bestScore = 0;

setInterval(draw, 5);

const scoreTxt = document.getElementById('scoreTxt');

tf.setBackend('cpu');

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    players.forEach(player => player.draw());

    score++;
    updateScoreTxt();
    // Create new gate
    if (score % 100 == 0) {
        asteroids.push(new Asteroid());
    }

    asteroids.forEach(gate => gate.draw());

    // Check for collisions
    players.forEach(player => {
        if (player.yPos + player.height >= canvas.height
            || player.yPos <= 0) {
            gameOver(player);
        }
        asteroids.forEach(gate => {
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
    for (let i = 0; i < asteroids.length; i++) {
        if (asteroids[i].x < -30) {
            asteroids.splice(i, 1)
        }
    }
}

function nextGeneration() {
    generationNumber++;
    console.log('next generation');
    calculateFitness();
    const bestPlayer = findBest();
    for (let i = 0; i < TOTAL; i++) {
        let child = new Player(bestPlayer.brain);
        child.mutate();
        players[i] = child;
    }
    savedPlayers.forEach(player => player.dispose());
    savedPlayers = [];
    asteroids = [new Asteroid()];
    score = 0;
}

function findBest() {
    bestFitness = 0;
    bestPlayer = null;
    savedPlayers.forEach(player => {
        if (player.fitness > bestFitness) {
            bestPlayer = player;
        }
    });
    console.log({bestPlayer})
    if (bestScore < bestPlayer.score) {
        bestScore = bestPlayer.score;
    }
    return bestPlayer;
}

function calculateFitness() {
    let sum = 0;
    savedPlayers.forEach(player => {
        sum += player.score;
    });
    savedPlayers.forEach(player => {
        player.fitness = player.score / sum;
    });
}

function gameOver(player) {
    player.score = score;
    savedPlayers.push(players.splice(players.indexOf(player), 1)[0]);
}

function updateScoreTxt() {
    scoreTxt.innerHTML = 'Score: ' + Math.round(score / 25) + ' | Gen: ' + generationNumber + ' | Players left: ' + players.length + ' | Bestscore: ' + Math.round(bestScore / 25);
}