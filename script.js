document.addEventListener('DOMContentLoaded', () => {
  const trigger     = document.querySelector('.page-menu-trigger');
  const closeBtn    = document.querySelector('.burger-close-btn');
  const menuWrapper = document.querySelector('.burger-menu-wrapper');
  const overlay     = document.querySelector('.burger-overlay');
  const menuLinks   = document.querySelectorAll('.menu-item a');

  if (!trigger || !closeBtn || !menuWrapper || !overlay) {
    console.warn('[BurgerMenu] Елемент не знайдено. Перевір HTML.');
    return;
  }

  let isOpen     = false;
  let isScrolled = false;
  let savedScrollY = 0;

  /* ---- iOS scroll-lock ---- */
  function lockScroll() {
    savedScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top      = `-${savedScrollY}px`;
    document.body.style.left     = '0';
    document.body.style.right    = '0';
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    // Спочатку знімаємо фікс — без scrollTo щоб не було стрибка
    document.body.style.position = '';
    document.body.style.top      = '';
    document.body.style.left     = '';
    document.body.style.right    = '';
    document.body.style.overflow = '';
    // Потім відновлюємо позицію синхронно
    window.scrollTo({ top: savedScrollY, behavior: 'instant' });
  }

  /* ---- Open / Close ---- */
  function openMenu() {
    isOpen = true;
    menuWrapper.classList.add('is-open');
    menuWrapper.classList.toggle('scrolled-pos', isScrolled);
    overlay.classList.add('is-visible');
    lockScroll();
    trigger.setAttribute('aria-expanded', 'true');
    trigger.style.zIndex = '1100';
    closeBtn.focus();
  }

  function closeMenu() {
    isOpen = false;
    menuWrapper.classList.remove('is-open', 'scrolled-pos');
    overlay.classList.remove('is-visible');
    unlockScroll();
    trigger.setAttribute('aria-expanded', 'false');
    trigger.style.zIndex = '';
    trigger.focus();
  }

  trigger.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  /* ---- Scroll handler ---- */
  const SCROLL_THRESHOLD = 60;
  let wasScrolled = false;

  function handleScroll() {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    if (scrolled !== wasScrolled) {
      isScrolled = scrolled;
      trigger.classList.toggle('is-scrolled', scrolled);
      wasScrolled = scrolled;
      if (isOpen) {
        menuWrapper.classList.toggle('scrolled-pos', scrolled);
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});
