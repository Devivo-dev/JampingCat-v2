import { updateWhiskas } from './whiskas.js'

export async function onGameOver(scoreAmount) {
  const coinsCollected = scoreAmount;
  localStorage.setItem('coins_collected', coinsCollected.toString());
  await updateWhiskas('test-player-001', coinsCollected);
}