import { supabase } from './supabase.js';

// Отримуємо Telegram ID
function getCurrentTgId() {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
    return window.Telegram.WebApp.initDataUnsafe.user.id.toString();
  }
  return 'guest-' + Date.now(); // fallback
}

// Отримуємо Telegram username
function getCurrentUsername() {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user?.username) {
    return window.Telegram.WebApp.initDataUnsafe.user.username;
  }
  return 'Anonymous';
}

// ✅ Зчитуємо або створюємо гравця
export async function getWhiskas(tg_id = getCurrentTgId()) {
  const username = getCurrentUsername();

  // 🟢 Завжди оновлюємо або створюємо користувача
  await supabase.from('players').upsert({
    tg_id,
    username,
  }, { onConflict: ['tg_id'] });

  const { data, error } = await supabase
    .from('players')
    .select('whiskas')
    .eq('tg_id', tg_id)
    .single();

  if (error) {
    console.warn('❌ Помилка при getWhiskas():', error);
    return 0;
  }

  return data?.whiskas ?? 0;
}

// ✅ Додаємо whiskas після гри
export async function updateWhiskas(addAmount) {
  const tg_id = getCurrentTgId();
  const current = await getWhiskas(tg_id);
  const newTotal = current + addAmount;

  await supabase
    .from('players')
    .update({ whiskas: newTotal })
    .eq('tg_id', tg_id);

  console.log('🟢 updateWhiskas()', tg_id, addAmount);
  return newTotal;
}
