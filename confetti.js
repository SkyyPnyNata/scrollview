// Confetti effect
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiParticles = [];

function createConfettiParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 30 + 10,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    tilt: Math.floor(Math.random() * 10) - 10,
    tiltAngleIncremental: Math.random() * 0.07 + 0.05,
    tiltAngle: 0
  };
}

function startConfetti() {
  for (let i = 0; i < 100; i++) {
    confettiParticles.push(createConfettiParticle());
  }
  requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiParticles.forEach((particle, index) => {
    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 1 + particle.r / 2) / 2;
    particle.x += Math.sin(particle.d);

    ctx.beginPath();
    ctx.lineWidth = particle.r;
    ctx.strokeStyle = particle.color;
    ctx.moveTo(particle.x + particle.tilt + particle.r / 3, particle.y);
    ctx.lineTo(particle.x + particle.tilt, particle.y + particle.tilt + particle.r / 5);
    ctx.stroke();

    if (particle.y > canvas.height) {
      confettiParticles[index] = createConfettiParticle();
      confettiParticles[index].y = -Math.random() * canvas.height;
    }
  });

  requestAnimationFrame(updateConfetti);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
