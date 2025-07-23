const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.querySelector('.matrix-bg').appendChild(canvas);

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

let speed = 33;

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = `${fontSize}px arial`;

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

let rainInterval = setInterval(draw, speed);

document.querySelector('.matrix-bg').addEventListener('mousedown', () => {
    speed = 10;
    clearInterval(rainInterval);
    rainInterval = setInterval(draw, speed);
});

document.querySelector('.matrix-bg').addEventListener('mouseup', () => {
    speed = 33;
    clearInterval(rainInterval);
    rainInterval = setInterval(draw, speed);
});
