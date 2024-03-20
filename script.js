const kitty = document.getElementById('kitty');
const mouse = document.getElementById('mouse');
const gameContainer = document.getElementById('game-container');

let score = 0;

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
    document.getElementById('score').innerText = `Puntuación: ${score}`;
}

function checkCollision() {
    const kittyRect = kitty.getBoundingClientRect();
    const mouseRect = mouse.getBoundingClientRect();
    return !(kittyRect.right < mouseRect.left ||
        kittyRect.left > mouseRect.right ||
        kittyRect.bottom < mouseRect.top ||
        kittyRect.top > mouseRect.bottom);
}

kitty.addEventListener('mousemove', function (event) {
    const mouseX = event.clientX - gameContainer.offsetLeft - kitty.offsetWidth / 2;
    const mouseY = event.clientY - gameContainer.offsetTop - kitty.offsetHeight / 2;
    kitty.style.left = mouseX + 'px';
    kitty.style.top = mouseY + 'px';

    if (checkCollision()) {
        increaseScore();
        moveMouse();
    }
});

moveMouse();
