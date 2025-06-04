import { updateWhiskas } from '../../whiskas.js';
import { state } from './state.js';

// 🔽 Функція — перед використанням
function formatCoins(number) {
  if (number >= 1_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + 'B';
  }
  if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1) + 'M';
  }
  if (number >= 1_000) {
    return (number / 1_000).toFixed(1) + 'k';
  }
  return number.toString();
}

document.getElementById('whiskas-amount').textContent = formatCoins(state.coins);

export async function onGameOver() {
  const coinsCollected = state.coins;

  localStorage.setItem('whiskas-amount', coinsCollected.toString());
  document.getElementById('whiskas-amount').textContent = formatCoins(coinsCollected);

  await updateWhiskas(coinsCollected); 
}

console.log('🟡 onGameOver() викликано');
