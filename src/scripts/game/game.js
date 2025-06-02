import { setupEventListeners } from './input.js';
import { startCountdown } from './ui.js';
import { spawnCoin } from './coin.js';
import { updateGame } from './engine.js';
import { updateWhiskas } from '../../whiskas.js';
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
document.addEventListener('DOMContentLoaded', () => {
  const backBtn = document.getElementById('back-to-menu');
  if (backBtn) {
    backBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      backBtn.classList.add('active');
       await new Promise(resolve => setTimeout(resolve, 300));
      await onGameOver(); // зберігаємо монети
      window.location.href = './index.html'; // переходимо назад
    });
  }
});