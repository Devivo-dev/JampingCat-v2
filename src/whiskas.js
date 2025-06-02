import { supabase } from './supabase.js';

// 🔧 1. Отримуємо Telegram ID
function getCurrentTgId() {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
    return window.Telegram.WebApp.initDataUnsafe.user.id.toString();
  }
  return 'guest-' + Date.now();
}

// 🔧 2. Отримуємо Telegram username
function getCurrentUsername() {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user?.username) {
    return window.Telegram.WebApp.initDataUnsafe.user.username;
  }
  return 'Anonymous';
}

// ✅ Зчитуємо кількість whiskas у гравця
export async function getWhiskas(tg_id = getCurrentTgId()) {
  const { data, error } = await supabase
    .from('players')
    .select('whiskas')
    .eq('tg_id', tg_id)
    .single();

  // 🟢 Якщо гравця ще немає — додаємо його з username
  if (error && error.code === 'PGRST116') {
    await supabase.from('players').insert({
      tg_id,
      username: getCurrentUsername(),
      whiskas: 0,
    });
    return 0;
  }

  return data?.whiskas ?? 0;
}

// ✅ Додаємо whiskas після гри
export async function updateWhiskas(addAmount) {
  const tg_id = getCurrentTgId();
  const current = await getWhiskas(tg_id); // тут вже username додасться, якщо треба
  const newTotal = current + addAmount;

  await supabase
    .from('players')
    .update({ whiskas: newTotal })
    .eq('tg_id', tg_id);

  console.log('🟢 updateWhiskas()', tg_id, addAmount);
  return newTotal;
}