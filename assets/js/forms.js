// OPEN CIRCUITS — forms.js
// Validación básica del formulario de contacto (sin backend conectado aún)

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const status = form.querySelector('.form-status');

  const validators = {
    name: (v) => v.trim().length >= 2,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: (v) => v.trim().length >= 10,
  };

  const messages = {
    name: 'Ingresa tu nombre (mínimo 2 caracteres).',
    email: 'Ingresa un correo electrónico válido.',
    message: 'Cuéntanos un poco más (mínimo 10 caracteres).',
  };

  function validateField(field) {
    const name = field.name;
    if (!validators[name]) return true;

    const wrapper = field.closest('.field');
    const valid = validators[name](field.value);

    if (wrapper) {
      wrapper.classList.toggle('has-error', !valid);
      const errorEl = wrapper.querySelector('.field-error');
      if (errorEl) errorEl.textContent = valid ? '' : messages[name];
    }
    return valid;
  }

  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    form.querySelectorAll('input[required], textarea[required]').forEach((field) => {
      if (!validateField(field)) allValid = false;
    });

    if (!allValid) {
      const firstError = form.querySelector('.has-error input, .has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    // No hay backend conectado todavía: se simula el envío.
    // [POR DEFINIR]: conectar a un endpoint real (email, CRM, etc.)
    if (status) {
      status.textContent = 'Mensaje listo para enviar. Falta conectar este formulario a un destino real. [POR DEFINIR]';
      status.classList.add('is-visible', 'form-status--success');
    }
    form.reset();
  });
});
