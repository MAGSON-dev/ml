
const boardLength = 20;

let players = [];
let savedPlayers = [];
const TOTAL = 500;
// Create initial players
for (let i = 0; i < TOTAL; i++) {
    players.push(new Player())
}

let generationNumber = 0;
let bestScore = 0;
let bestTotalPlayer;
let showOnlyBestTotalPlayer = false;

tf.setBackend('cpu');

setInterval(draw, 150);
function draw() {
    // Clear canvas
    ctx.fillStyle = "#263238";
    ctx.clearRect(0, 0, canv.width, canv.height);

    ctx.fillRect(0, 0, canv.width, canv.height);

    players.forEach(player => player.draw());

    if (players.length == 0) {
        nextGeneration();
    }

    let bestS = 0;
    players.forEach(player => {
        if (player.score > bestS) {
            bestS = player.score;
        }
    });
    document.getElementById('scoreText').innerHTML = 'Score: ' + Math.round(bestS) + ' | Players left: ' + players.length
        + ' | Generation: ' + generationNumber;
}

function nextGeneration() {
    generationNumber++;
    console.log('next generation');
    calculateFitness();
    const bestPlayer = findBest();
    if (bestTotalPlayer) {
        if (bestPlayer.score > bestTotalPlayer.score) {
            bestTotalPlayer = bestPlayer;
        }
    }
    else {
        bestTotalPlayer = bestPlayer;
    }
    for (let i = 0; i < TOTAL; i++) {
        let child = new Player(bestPlayer.brain);
        child.mutate();
        players[i] = child;
    }
    // Keep the best total player to prevent loss in performance
    players[0] = new Player(bestTotalPlayer.brain);
    savedPlayers.forEach(player => {
        // Dont destroy the brain of the best total player
        if (player != bestTotalPlayer) {
            player.dispose();
        }
    });
    savedPlayers = [];
}

function findBest() {
    bestFitness = 0;
    bestPlayer = null;
    savedPlayers.forEach(player => {
        if (player.fitness > bestFitness) {
            bestPlayer = player;
        }
    });
    console.log({ bestPlayer })
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

document.getElementById('killAllBtn').onclick = (evt) => {
    console.log('Kill all');
    players.forEach(player => player.gameOver());
}

