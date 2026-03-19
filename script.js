// ================================================
// script.js — бургер-меню + скрол-поведінка
// ================================================

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------
  // 1. ЕЛЕМЕНТИ DOM
  // ------------------------------------------------
  const trigger     = document.querySelector('.page-menu-trigger');
  const closeBtn    = document.querySelector('.burger-close-btn');
  const menuWrapper = document.querySelector('.burger-menu-wrapper');
  const overlay     = document.querySelector('.burger-overlay');
  const menuLinks   = document.querySelectorAll('.menu-item a');

  if (!trigger || !closeBtn || !menuWrapper || !overlay) {
    console.warn('[BurgerMenu] Елемент не знайдено. Перевір HTML.');
    return;
  }

  // ------------------------------------------------
  // 2. СТАН
  // ------------------------------------------------
  let isOpen     = false;
  let isScrolled = false; // чи тригер зараз у scrolled-позиції

  // ------------------------------------------------
  // 3. ВІДКРИТТЯ
  // ------------------------------------------------
  function openMenu() {
    isOpen = true;
    menuWrapper.classList.add('is-open');

    // Якщо тригер зміщений до правого краю —
    // меню теж відкривається у правому краї
    if (isScrolled) {
      menuWrapper.classList.add('scrolled-pos');
    } else {
      menuWrapper.classList.remove('scrolled-pos');
    }

    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    trigger.setAttribute('aria-expanded', 'true');

    // Піднімаємо тригер над оверлеєм (z-index 900)
    trigger.style.zIndex = '1100';
    closeBtn.focus();
  }

  // ------------------------------------------------
  // 4. ЗАКРИТТЯ
  // ------------------------------------------------
  function closeMenu() {
    isOpen = false;
    menuWrapper.classList.remove('is-open');
    menuWrapper.classList.remove('scrolled-pos');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.style.zIndex = '';
    trigger.focus();
  }

  // ------------------------------------------------
  // 5. ОБРОБНИКИ ПОДІЙ
  // ------------------------------------------------
  trigger.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // ------------------------------------------------
  // 6. СКРОЛ-ПОВЕДІНКА
  //
  // При scrollY > SCROLL_THRESHOLD:
  //   — додає .is-scrolled на тригер
  //   — CSS анімує right: 200px → 20px (до правого краю)
  //   — CSS анімує top: 100px → 50vh (центр по вертикалі)
  //   — текст «Меню» плавно зникає через max-width + opacity
  //
  // DOM оновлюється лише при зміні стану — не кожен кадр.
  // { passive: true } — браузер оптимізує обробку скролу.
  // ------------------------------------------------
  const SCROLL_THRESHOLD = 60;
  let wasScrolled = false;

  function handleScroll() {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;

    if (scrolled !== wasScrolled) {
      isScrolled = scrolled;
      trigger.classList.toggle('is-scrolled', scrolled);
      wasScrolled = scrolled;

      // Якщо меню відкрите і стан змінився —
      // синхронізуємо позицію панелі меню
      if (isOpen) {
        if (scrolled) {
          menuWrapper.classList.add('scrolled-pos');
        } else {
          menuWrapper.classList.remove('scrolled-pos');
        }
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Перевірка одразу при завантаженні
  handleScroll();

});
