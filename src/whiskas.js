import { supabase } from './supabase.js';

// ✅ Отримуємо Telegram ID + username
function getCurrentUser() {
  if (typeof window !== 'undefined') {
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    return {
      tg_id: user?.id?.toString() || 'guest-' + Date.now(),
      username: user?.username || user?.first_name || 'Anonymous'
    };
  }
  return {
    tg_id: 'guest-' + Date.now(),
    username: 'Anonymous'
  };
}

// ✅ Зчитуємо або створюємо гравця
export async function getWhiskas() {
  const { tg_id, username } = getCurrentUser();

  // 🟢 Завжди оновлюємо або створюємо користувача
  await supabase.from('players').upsert(
    { tg_id, username },
    { onConflict: ['tg_id'] }
  );

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
  const { tg_id } = getCurrentUser();
  const current = await getWhiskas(); // викликає всередині getCurrentUser
  const newTotal = current + addAmount;

  await supabase
    .from('players')
    .update({ whiskas: newTotal })
    .eq('tg_id', tg_id);

  console.log('🟢 updateWhiskas()', tg_id, addAmount);
  return newTotal;
}
