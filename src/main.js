import './scss/main.scss';
import { getWhiskas } from './whiskas.js';
import { initGame } from './scripts/game/game.js';

const tg = window.Telegram.WebApp;
const tg_id = tg.initDataUnsafe?.user?.id?.toString() || 'guest-' + Date.now();


window.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('game.html')) {
    initGame();
  }

  document.addEventListener('gesturestart', e => e.preventDefault());
  document.addEventListener('gesturechange', e => e.preventDefault());
  document.addEventListener('gestureend', e => e.preventDefault());

  const whiskasDisplay = document.querySelector('#whiskas-amount');
  const sessionCoinsDisplay = document.querySelector('.coin-collected');

  // Показати баланс whiskas з бази
  getWhiskas(tg_id).then(amount => {
    if (whiskasDisplay) whiskasDisplay.textContent = amount;
  });

  // Показати, скільки зібрано за останню гру
  const collected = localStorage.getItem('coins_collected');
  if (collected !== null && sessionCoinsDisplay) {
    sessionCoinsDisplay.textContent = collected;
    localStorage.removeItem('coins_collected');
  }
});

