// OPEN CIRCUITS — main.js
// Revelado sutil de secciones al hacer scroll.
// La clase "js" ya fue añadida por el script inline en <head>, que es lo
// único que oculta .reveal (ver utilities.css). Si algo aquí falla, el
// catch se asegura de que el contenido nunca quede invisible.

document.addEventListener('DOMContentLoaded', () => {
  try {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = document.querySelectorAll('.reveal');

    if (prefersReduced || !('IntersectionObserver' in window) || revealEls.length === 0) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 3, 2) * 80}ms`;
      observer.observe(el);
    });
  } catch (err) {
    // Salvaguarda: nunca dejar contenido invisible por un error de JS.
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }
});
