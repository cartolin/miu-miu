const kitty = document.getElementById('kitty');
const mouse = document.getElementById('mouse');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');

let score = 0;
let mouseSpeed = 1000; // Intervalo inicial para el movimiento del ratón

function getRandomPosition() {
    const x = Math.floor(Math.random() * (gameContainer.offsetWidth - mouse.offsetWidth));
    const y = Math.floor(Math.random() * (gameContainer.offsetHeight - mouse.offsetHeight));
    return { x, y };
}

function moveMouse() {
    const newPosition = getRandomPosition();
    mouse.style.left = newPosition.x + 'px';
    mouse.style.top = newPosition.y + 'px';
}

function increaseScore() {
    score++;
    scoreDisplay.innerText = `Puntuación: ${score}`;
    progressBar.value = score;

    if (score === 100) {
        mouseSpeed = 500; // Aumentar la velocidad del ratón cuando se alcanza una puntuación de 100
    } else if (score === 200) {
        alert('Miau Miau! ¡Llegaste a la meta!');
        resetGame(); // Reiniciar el juego cuando se alcanza una puntuación de 200
    }
}

function checkCollision() {
    const kittyRect = kitty.getBoundingClientRect();
    const mouseRect = mouse.getBoundingClientRect();
    return !(kittyRect.right < mouseRect.left ||
        kittyRect.left > mouseRect.right ||
        kittyRect.bottom < mouseRect.top ||
        kittyRect.top > mouseRect.bottom);
}

function resetGame() {
    score = 0;
    scoreDisplay.innerText = `Puntuación: ${score}`;
    progressBar.value = score;
    mouseSpeed = 1000;
    moveMouse(); // Colocar al ratón en una posición inicial aleatoria
    kitty.style.left = (gameContainer.offsetWidth / 2 - kitty.offsetWidth / 2) + 'px';
    kitty.style.top = (gameContainer.offsetHeight / 2 - kitty.offsetHeight / 2) + 'px';
}

gameContainer.addEventListener('mousemove', function (event) {
    const mouseX = event.clientX - gameContainer.offsetLeft - kitty.offsetWidth / 2;
    const mouseY = event.clientY - gameContainer.offsetTop - kitty.offsetHeight / 2;
    kitty.style.left = mouseX + 'px';
    kitty.style.top = mouseY + 'px';

    if (checkCollision()) {
        increaseScore();
        moveMouse();
    }
});

setInterval(moveMouse, mouseSpeed); // Movimiento continuo del ratón con la velocidad inicial
