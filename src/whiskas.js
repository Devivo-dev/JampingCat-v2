import { supabase } from './supabase.js';

function getCurrentTgId() {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
    return window.Telegram.WebApp.initDataUnsafe.user.id.toString();
  }
  return 'guest-' + Date.now(); // fallback для тестів у браузері
}

// Зчитуємо кількість whiskas у гравця
export async function getWhiskas(tg_id = getCurrentTgId()) {
  const { data, error } = await supabase
    .from('players')
    .select('whiskas')
    .eq('tg_id', tg_id)
    .single();

  if (error && error.code === 'PGRST116') {
    await supabase.from('players').insert({
      tg_id,
      username: 'Anonymous',
      whiskas: 0,
    });
    return 0;
  }

  return data?.whiskas ?? 0;
}

// Додаємо whiskas після гри
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
