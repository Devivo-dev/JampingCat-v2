import './scss/main.scss';
import { getWhiskas } from './whiskas.js';
if (window.location.pathname.includes('game.html')) {
  initGame();
}
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});
document.addEventListener('gesturechange', function (e) {
  e.preventDefault();
});
document.addEventListener('gestureend', function (e) {
  e.preventDefault();
});
const tg_id = 'test-player-001' // пізніше замінимо на Telegram ID

const whiskasDisplay = document.querySelector('#whiskas-amount')
const sessionCoinsDisplay = document.querySelector('.coin-collected')

// Показати баланс whiskas з бази
getWhiskas(tg_id).then(amount => {
  whiskasDisplay.textContent = amount
})

// Показати, скільки зібрано за останню гру
const collected = localStorage.getItem('coins_collected')
if (collected !== null) {
  sessionCoinsDisplay.textContent = collected
  localStorage.removeItem('coins_collected') // очищаємо після показу
}