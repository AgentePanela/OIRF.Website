// countdown and confetti
const countdownElement = document.getElementById("countdown");
const targetDate = new Date("2025-07-30T00:00:00Z").getTime();
let playtest = false;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        countdownElement.innerHTML = `
            <a href="https://discord.gg/AwZkzHt8he" id="countdownEnded" class="countdown rainbow"> PLAYTEST STARTED! </a>`;
        startConfetti();
        clearInterval(interval);
        playtest = true;
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerText = 
        `${String(days).padStart(2, '0')}d `
      + `${String(hours).padStart(2, '0')}h `
      + `${String(minutes).padStart(2, '0')}m `
      + `${String(seconds).padStart(2, '0')}s`;
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();

function startConfetti() {
    const colors = ['#ff0', '#f0f', '#0ff', '#f00', '#0f0', '#00f'];

    const interval = setInterval(() => {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        const size = Math.floor(Math.random() * 8) + 4;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;

        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }, 25);
}
