// ================================================
// script.js — логіка бургер-меню
// ================================================

document.addEventListener('DOMContentLoaded', () => {

  // Отримуємо посилання на всі потрібні елементи
  const openBtn     = document.querySelector('.burger-open-btn');     // кнопка ☰
  const closeBtn    = document.querySelector('.burger-close-btn');    // кнопка ×
  const menuWrapper = document.querySelector('.burger-menu-wrapper'); // панель меню
  const overlay     = document.querySelector('.burger-overlay');      // темний фон

  // --- Відкриття меню ---
  openBtn.addEventListener('click', () => {
    menuWrapper.classList.add('is-open');    // панель виїжджає (right: 20px)
    overlay.classList.add('is-visible');     // фон затемнюється
    document.body.style.overflow = 'hidden'; // забороняємо скрол сторінки
  });

  // --- Закриття кнопкою × ---
  closeBtn.addEventListener('click', closeMenu);

  // --- Закриття кліком на оверлей ---
  // (в оригіналі відсутнє — додано для зручності)
  overlay.addEventListener('click', closeMenu);

  // --- Закриття клавішею Escape ---
  // (в оригіналі відсутнє — додано для доступності)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Функція закриття — виносимо окремо, щоб не дублювати код
  function closeMenu() {
    menuWrapper.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = ''; // відновлюємо скрол
  }

});
