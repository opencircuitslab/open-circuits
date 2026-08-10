// OPEN CIRCUITS — nav.js
// Menú móvil accesible + submenú de "Nuestras Áreas" en touch

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      navLinks.setAttribute('data-open', String(!isOpen));
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Cerrar el menú al hacer click en un enlace normal
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('data-open', 'false');
        document.body.style.overflow = '';
      });
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('data-open', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  // Dropdown "Nuestras Áreas" — toggle en móvil (touch), hover en desktop vía CSS
  const dropdownItem = document.querySelector('.nav-item--dropdown');
  const dropdownToggle = document.querySelector('.dropdown-toggle');

  if (dropdownItem && dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        const isOpen = dropdownItem.getAttribute('data-mobile-open') === 'true';
        dropdownItem.setAttribute('data-mobile-open', String(!isOpen));
        dropdownToggle.setAttribute('aria-expanded', String(!isOpen));
      }
    });
  }
});
