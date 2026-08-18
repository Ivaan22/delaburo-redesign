const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

const setHeaderState = () => header?.classList.toggle('scrolled', window.scrollY > 12);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const visual = document.querySelector('.hero-visual');
  visual?.addEventListener('pointermove', (event) => {
    const box = visual.getBoundingClientRect();
    visual.style.setProperty('--mx', `${((event.clientX - box.left) / box.width - 0.5) * 2}`);
    visual.style.setProperty('--my', `${((event.clientY - box.top) / box.height - 0.5) * 2}`);
  });
  visual?.addEventListener('pointerleave', () => {
    visual.style.setProperty('--mx', '0');
    visual.style.setProperty('--my', '0');
  });
}
