const header = document.querySelector('[data-header]');
const nav = document.querySelector('#main-nav');
const menuToggle = document.querySelector('.menu-toggle');
const progress = document.querySelector('.reading-progress span');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const syncMobileNavigation = () => {
  const mobile = window.innerWidth <= 640;
  const mobileNav = document.querySelector('.mobile-nav');
  if (nav) nav.style.display = mobile ? 'none' : '';
  if (mobileNav) mobileNav.style.display = mobile ? 'block' : 'none';
};
syncMobileNavigation();
window.addEventListener('resize', syncMobileNavigation, { passive: true });

const updateChrome = () => {
  header?.classList.toggle('scrolled', window.scrollY > 15);
  if (progress) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  }
};
updateChrome();
window.addEventListener('scroll', updateChrome, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('open') ?? false;
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll('.reveal').forEach((element) => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('is-visible');
});

if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const stage = document.querySelector('[data-depth-stage]');
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;

  const paintDepth = () => {
    frame = 0;
    stage?.style.setProperty('--mx', pointerX.toFixed(3));
    stage?.style.setProperty('--my', pointerY.toFixed(3));
  };

  stage?.addEventListener('pointermove', (event) => {
    const bounds = stage.getBoundingClientRect();
    pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    if (!frame) frame = requestAnimationFrame(paintDepth);
  });

  stage?.addEventListener('pointerleave', () => {
    pointerX = 0;
    pointerY = 0;
    if (!frame) frame = requestAnimationFrame(paintDepth);
  });

  document.querySelectorAll('.magnetic').forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      const bounds = button.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
      button.style.transform = `translate(${x}px, ${y}px)`;
    });
    button.addEventListener('pointerleave', () => { button.style.transform = ''; });
  });
}
