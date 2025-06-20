import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://uarwpysaogctajpbqxuq.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcndweXNhb2djdGFqcGJxeHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2Njk3NzYsImV4cCI6MjA2NDI0NTc3Nn0.ADQh7TzFKYawmcfVP-PbpFaewLYpQdPTLBvvIKwb3p4'; 

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const tg = window.Telegram.WebApp;
const userId = tg.initDataUnsafe?.user?.id?.toString()  || '123456789';

// const userId = tg?.initDataUnsafe?.user?.id || '123456789';
const catSkin = [
  {
    name: 'Black Cat',
    skin_id: 'black',
    catPrice: 0,
    unlocked: true
  },
  {
    name: 'Blue Collar Cat',
    skin_id: 'blueCollar',
    catPrice: 150,
    unlocked: false
  }
];

const skins = ['black', 'blueCollar'];
let currentIndex = 0;

function updateCatSkin() {
  const container = document.getElementById('cat-image');
  const lock = document.getElementById('lock-icon');
  const buyBtn = document.getElementById('buy-btn');
  const priceAmount = document.getElementById('cat-price');
  const currentSkinClass = skins[currentIndex];
  const currentSkin = catSkin[currentIndex];

  skins.forEach(skin => {
    container.classList.remove(`shop__playercat--${skin}`);
  });

  container.classList.add(`shop__playercat--${currentSkinClass}`);

  if (currentSkin.unlocked) {
    lock.style.display = 'none';
    buyBtn.style.display = 'none';
    priceAmount.style.display = 'none';
  } else {
    lock.style.display = 'block';
    buyBtn.style.display = 'block';
    priceAmount.style.display = 'block';
    priceAmount.textContent = `${currentSkin.catPrice}`;
  }
}

async function buySkin() {
  const skin = catSkin[currentIndex];
  if (skin.unlocked) return;

  // 1. Перевірка чи вже куплений
  const { data: owned, error: ownedError } = await supabase
    .from('user_skins')
    .select('id')
    .eq('user_id', userId)
    .eq('skin_id', skin.skin_id);

  if (owned && owned.length > 0) {
    alert("Скін уже куплений.");
    return;
  }

  // 2. Отримати баланс
  const { data: userData, error: balanceError } = await supabase
    .from('players')
    .select('whiskas')
    .eq('tg_id', userId)
    .single();

  const balance = userData?.whiskas || 0;

  if (balance < skin.catPrice) {
    alert("Недостатньо монет.");
    return;
  }

  // 3. Списати монети
  const newBalance = balance - skin.catPrice;
  await supabase
    .from('players')
    .update({ whiskas: newBalance })
    .eq('tg_id', userId);

  // 4. Додати запис у user_skins
  await supabase
    .from('user_skins')
    .insert([
      {
        user_id: userId,
        skin_id: skin.skin_id,
        purchased_at: new Date().toISOString()
      }
    ]);

  // 5. Змінити локально статус на "розблоковано"
  catSkin[currentIndex].unlocked = true;
  updateCatSkin();
  alert("Скін куплено успішно!");
}

// Кнопки вперед/назад
function nextCat() {
  currentIndex = (currentIndex + 1) % skins.length;
  updateCatSkin();
}

function prevCat() {
  currentIndex = (currentIndex - 1 + skins.length) % skins.length;
  updateCatSkin();
}

// Ініціалізація
window.addEventListener('DOMContentLoaded', () => {
  updateCatSkin();
});

// Для HTML-кнопок
window.nextCat = nextCat;
window.prevCat = prevCat;
window.buySkin = buySkin;