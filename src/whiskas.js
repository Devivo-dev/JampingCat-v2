import { supabase } from './supabase.js'

// Зчитуємо кількість whiskas у гравця
export async function getWhiskas(tg_id) {
  const { data, error } = await supabase
    .from('players')
    .select('whiskas')
    .eq('tg_id', tg_id)
    .single()

  if (error && error.code === 'PGRST116') {
    // Якщо гравця ще немає в базі — створюємо
    await supabase.from('players').insert({
      tg_id,
      username: 'Anonymous',
      whiskas: 0
    })
    return 0
  }

  return data?.whiskas ?? 0
}

// Додаємо whiskas після гри
export async function updateWhiskas(tg_id, addAmount) {
  const current = await getWhiskas(tg_id)
  const newTotal = current + addAmount

  await supabase
    .from('players')
    .update({ whiskas: newTotal })
    .eq('tg_id', tg_id)

  return newTotal
}