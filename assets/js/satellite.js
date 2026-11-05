(() => {
  const buttons = document.querySelectorAll('.theme-toggle');
  const update = () => buttons.forEach(button => button.setAttribute('aria-pressed', String(document.body.classList.contains('dark-theme'))));
  buttons.forEach(button => button.addEventListener('click', () => {
    const dark = document.body.classList.toggle('dark-theme');
    try { localStorage.setItem('satellite-theme', dark ? 'dark' : 'light'); } catch (error) {}
    update();
  }));
  update();
  const menu = document.getElementById('menu-toggle');
  menu.addEventListener('click', () => {
    const open = document.getElementById('navigation').classList.toggle('menu-open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  });
})();
