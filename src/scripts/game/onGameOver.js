import { updateWhiskas } from '../../whiskas.js';
import { state } from './state.js';

export async function onGameOver() {
  const coinsCollected = state.coins;
  localStorage.setItem('whiskas-amount', coinsCollected.toString());
  await updateWhiskas(coinsCollected); 
}
console.log('🟡 onGameOver() викликано');