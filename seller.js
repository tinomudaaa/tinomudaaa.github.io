/**
 * AU Marketplace — Seller Registration Logic
 */
document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('seller-form');
  const successState = document.getElementById('success-state');
  const submitBtn = document.getElementById('submit-btn');
  const registerAnotherBtn = document.getElementById('register-another-btn');
  const descField = document.getElementById('field-description');
  const descCount = document.getElementById('desc-count');
  const priceField = document.getElementById('field-price');
  const priceHint = document.getElementById('price-hint');

  // Character count for description
  if (descField && descCount) {
    descField.addEventListener('input', () => {
      const len = descField.value.length;
      descCount.textContent = `${len} / 40 min`;
      descCount.style.color = len >= 40 ? 'var(--green)' : 'var(--muted)';
    });
  }

  // Price hint: show 90/10 split as you type
  if (priceField && priceHint) {
    priceField.addEventListener('input', () => {
      const val = parseFloat(priceField.value);
      if (val > 0) {
        const seller = REVENUE.getSellerShare(val);
        const src = REVENUE.getSRCCut(val);
        priceHint.textContent = `You receive $${seller.toFixed(2)} · SRC gets $${src.toFixed(2)}`;
        priceHint.style.display = 'block';
        priceHint.style.color = 'var(--green)';
        priceHint.style.fontWeight = '600';
      } else {
        priceHint.style.display = 'none';
      }
    });
  }

  // Validation helpers
  const fields = {
    name: { id: 'field-name', err: 'err-name', validate: v => v.trim().length >= 2 },
    studentId: { id: 'field-student-id', err: 'err-student-id', validate: v => v.trim().length >= 4 },
    year: { id: 'field-year', err: 'err-year', validate: v => !!v },
    faculty: { id: 'field-faculty', err: 'err-faculty', validate: v => !!v },
    category: { id: 'field-category', err: 'err-category', validate: v => !!v },
    price: { id: 'field-price', err: 'err-price', validate: v => parseFloat(v) >= 0.5 },
    title: { id: 'field-title', err: 'err-title', validate: v => v.trim().length >= 4 },
    description: { id: 'field-description', err: 'err-description', validate: v => v.trim().length >= 40 },
    payment: { id: 'field-payment', err: 'err-payment', validate: v => !!v },
  };

  function validateField(key) {
    const f = fields[key];
    const el = document.getElementById(f.id);
    const errEl = document.getElementById(f.err);
    const valid = f.validate(el.value);
    errEl.classList.toggle('visible', !valid);
    el.style.borderColor = !valid ? '#dc2626' : '';
    return valid;
  }

  // Live validation on blur
  Object.keys(fields).forEach(key => {
    const el = document.getElementById(fields[key].id);
    if (el) {
      el.addEventListener('blur', () => validateField(key));
      el.addEventListener('input', () => {
        if (document.getElementById(fields[key].err).classList.contains('visible')) validateField(key);
      });
    }
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let allValid = true;
    Object.keys(fields).forEach(key => { if (!validateField(key)) allValid = false; });
    if (!allValid) {
      const firstErr = form.querySelector('.form-error.visible');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Build seller object
    const price = parseFloat(document.getElementById('field-price').value);
    const seller = {
      id: document.getElementById('field-student-id').value.trim().toUpperCase(),
      name: document.getElementById('field-name').value.trim(),
      faculty: document.getElementById('field-faculty').value,
      year: parseInt(document.getElementById('field-year').value),
      category: document.getElementById('field-category').value,
      serviceTitle: document.getElementById('field-title').value.trim(),
      description: document.getElementById('field-description').value.trim(),
      price,
      paymentMethod: document.getElementById('field-payment').value,
      dateRegistered: new Date().toISOString().split('T')[0],
      rating: 0,
      reviews: 0,
    };

    Store.addSeller(seller);

    // Animate submit button briefly
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<svg class="spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Registering…`;

    setTimeout(() => {
      form.style.display = 'none';
      successState.style.display = 'block';
      successState.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast(`${seller.name} listed on AU Marketplace!`);
    }, 900);
  });

  // Register another
  if (registerAnotherBtn) {
    registerAnotherBtn.addEventListener('click', () => {
      successState.style.display = 'none';
      form.style.display = 'block';
      form.reset();
      if (descCount) { descCount.textContent = '0 / 40 min'; descCount.style.color = 'var(--muted)'; }
      if (priceHint) priceHint.style.display = 'none';
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Register &amp; List My Service`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
