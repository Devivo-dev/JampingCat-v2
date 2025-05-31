import { setupEventListeners } from './input.js';
import { startCountdown } from './ui.js';
import { spawnCoin } from './coin.js';
import { updateGame } from './engine.js';
import { updateWhiskas } from './whiskas.js';
import { onGameOver } from './onGameOver.js';

export function initGame() {
  spawnCoin();
  startCountdown(() => updateGame());
  setupEventListeners();
}

const preloadImages = [
  "../../assets/img/btn-retry.png",
  "../../assets/img/btn-retry-active.png",
  "../../assets/img/EndGame.png"
];

preloadImages.forEach(src => {
  const img = new Image();
  img.src = src;
});