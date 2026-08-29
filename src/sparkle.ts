const COLORS = ["#ffffff", "#fdf6e8", "#cfe0bb", "#8fc9a9", "#83bdd2"];
const MIN_INTERVAL_MS = 90;

function spawnSparkle(container: HTMLElement, x: number, y: number): void {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.textContent = "✦";
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  sparkle.style.fontSize = `${9 + Math.random() * 9}px`;
  sparkle.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  container.appendChild(sparkle);

  const remove = () => sparkle.remove();
  sparkle.addEventListener("animationend", remove, { once: true });
  setTimeout(remove, 1000);
}

const landingPage = document.querySelector<HTMLElement>(".landing-page");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (landingPage && !prefersReducedMotion) {
  let lastSpawn = 0;

  landingPage.addEventListener("mousemove", (event) => {
    const now = performance.now();
    if (now - lastSpawn < MIN_INTERVAL_MS) return;
    lastSpawn = now;

    const rect = landingPage.getBoundingClientRect();
    const x = event.clientX - rect.left + (Math.random() * 12 - 6);
    const y = event.clientY - rect.top + (Math.random() * 12 - 6);
    spawnSparkle(landingPage, x, y);
  });
}
