/**
 * AU Marketplace — Homepage Logic
 * Category filter, search, listings grid, favourites, detail modal
 */

const CATEGORIES = ['All', 'Food', 'Photography', 'Design', 'Tech', 'Academic', 'Beauty', 'Entertainment', 'Fashion'];

let activeCategory = 'All';
let searchQuery = '';
let activeModal = null;

// ============================================================
// CATEGORY IMAGE BACKGROUNDS (CSS gradient per category)
// ============================================================
const CARD_GRADIENTS = {
  'Food':          'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
  'Photography':   'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
  'Design':        'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
  'Tech':          'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
  'Academic':      'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
  'Beauty':        'linear-gradient(135deg, #fef2f2 0%, #fed7d7 100%)',
  'Entertainment': 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)',
  'Fashion':       'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
};

const CARD_ICONS_BIG = {
  'Food':          `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`,
  'Photography':   `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
  'Design':        `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="#dc2626"/><circle cx="17.5" cy="10.5" r=".5" fill="#dc2626"/><circle cx="8.5" cy="7.5" r=".5" fill="#dc2626"/><circle cx="6.5" cy="12.5" r=".5" fill="#dc2626"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  'Tech':          `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  'Academic':      `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  'Beauty':        `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`,
  'Entertainment': `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  'Fashion':       `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg>`,
};


// ============================================================
// RENDER NAVBAR ICONS
// ============================================================
function initNavbar() {
  const searchIconEl = document.getElementById('navbar-search-icon');
  if (searchIconEl) searchIconEl.innerHTML = ICONS.search;
  const mobileSearchIconEl = document.getElementById('mobile-search-icon');
  if (mobileSearchIconEl) mobileSearchIconEl.innerHTML = ICONS.search;
  const userAvatarEl = document.getElementById('user-avatar-icon');
  if (userAvatarEl) userAvatarEl.innerHTML = ICONS.user;
  const sellIconEl = document.getElementById('sell-icon');
  if (sellIconEl) sellIconEl.innerHTML = ICONS.plus;
  const menuIconEl = document.getElementById('menu-icon');
  if (menuIconEl) menuIconEl.innerHTML = ICONS.menu;
}

// ============================================================
// RENDER CATEGORY FILTER BAR
// ============================================================
function renderCategoryBar() {
  const bar = document.getElementById('category-bar');
  if (!bar) return;
  bar.innerHTML = CATEGORIES.map(cat => `
    <button class="cat-chip ${activeCategory === cat ? 'active' : ''}" 
            data-cat="${cat}" 
            aria-label="Filter by ${cat}">
      ${getCategoryIcon(cat)}
      ${cat}
    </button>
  `).join('');
  bar.querySelectorAll('.cat-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      renderCategoryBar();
      renderListings();
    });
  });
}

// ============================================================
// RENDER SERVICE CARD
// ============================================================
function renderCard(listing) {
  const isFav = Store.isFavourite(listing.id);
  const gradient = CARD_GRADIENTS[listing.category] || '#f3f4f6';
  const bigIcon = CARD_ICONS_BIG[listing.category] || '';
  return `
    <article class="service-card card-animate" data-id="${listing.id}" tabindex="0" role="button" aria-label="View ${listing.title}">
      <div class="card-img-wrap">
        <div class="card-img" style="background: ${gradient}; display:flex; align-items:center; justify-content:center; height:180px;">
          ${bigIcon}
        </div>
        <button class="card-fav ${isFav ? 'active' : ''}" 
                data-id="${listing.id}" 
                aria-label="${isFav ? 'Remove from favourites' : 'Add to favourites'}"
                title="${isFav ? 'Remove from favourites' : 'Add to favourites'}">
          ${ICONS.heart}
        </button>
      </div>
      <div class="card-body">
        <div class="card-cat-row">
          <span class="badge badge-green">${getCategoryIcon(listing.category)} ${listing.category}</span>
          <span style="font-size:0.75rem; color:var(--muted);">${listing.reviews} reviews</span>
        </div>
        <h3 class="card-title">${listing.title}</h3>
        <div class="card-seller">
          <span class="seller-dot">${getInitials(listing.seller)}</span>
          ${listing.seller} &bull; Yr ${listing.year}
        </div>
        <div class="card-rating">
          ${renderStars(listing.rating)}
          <span style="font-weight:600; color:var(--black-soft);">${listing.rating}</span>
          <span>(${listing.reviews})</span>
        </div>
        <div class="card-footer">
          <div class="card-price">${formatUSD(listing.price)} <span>/ service</span></div>
          <button class="card-book-btn" data-id="${listing.id}" aria-label="Book ${listing.title}">
            Book Now
          </button>
        </div>
      </div>
    </article>
  `;
}

// ============================================================
// RENDER LISTINGS GRID
// ============================================================
function renderListings() {
  const grid = document.getElementById('listings-grid');
  const countEl = document.getElementById('results-count');
  if (!grid) return;

  const filtered = LISTINGS.filter(l => {
    const catMatch = activeCategory === 'All' || l.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const searchMatch = !q || l.title.toLowerCase().includes(q) || l.seller.toLowerCase().includes(q) || l.category.toLowerCase().includes(q);
    return catMatch && searchMatch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        ${ICONS.search}
        <h3 style="margin-bottom:0.5rem;">No services found</h3>
        <p>Try a different category or search term</p>
      </div>
    `;
  } else {
    grid.innerHTML = filtered.map(renderCard).join('');
    // Attach fav listeners
    grid.querySelectorAll('.card-fav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        const nowFav = Store.toggleFavourite(id);
        btn.classList.toggle('active', nowFav);
        btn.setAttribute('aria-label', nowFav ? 'Remove from favourites' : 'Add to favourites');
        showToast(nowFav ? 'Added to favourites!' : 'Removed from favourites');
      });
    });
    // Attach card open modal listeners
    grid.querySelectorAll('.service-card').forEach(card => {
      ['click', 'keydown'].forEach(evt => {
        card.addEventListener(evt, (e) => {
          if (evt === 'keydown' && e.key !== 'Enter') return;
          if (e.target.classList.contains('card-fav') || e.target.closest('.card-fav')) return;
          if (e.target.classList.contains('card-book-btn') || e.target.closest('.card-book-btn')) {
            e.stopPropagation();
            const id = parseInt(card.dataset.id);
            openModal(id);
            return;
          }
          const id = parseInt(card.dataset.id);
          openModal(id);
        });
      });
    });
    // Attach book btn listeners (separate)
    grid.querySelectorAll('.card-book-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        openModal(id);
      });
    });
  }

  if (countEl) countEl.textContent = `${filtered.length} service${filtered.length !== 1 ? 's' : ''} found`;
}

// ============================================================
// DETAIL MODAL
// ============================================================
function openModal(id) {
  const listing = LISTINGS.find(l => l.id === id);
  if (!listing) return;
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  const isFav = Store.isFavourite(listing.id);
  const gradient = CARD_GRADIENTS[listing.category] || '#f3f4f6';
  const bigIcon = CARD_ICONS_BIG[listing.category] || '';

  content.innerHTML = `
    <div class="modal-header-wrap">
      <div style="width:100%; height:240px; background:${gradient}; display:flex; align-items:center; justify-content:center; border-radius: 24px 24px 0 0; overflow:hidden;">
        <div style="transform: scale(1.8);">${bigIcon}</div>
      </div>
      <button class="modal-close" id="modal-close-btn" aria-label="Close">
        ${ICONS.x}
      </button>
    </div>
    <div class="modal-body">
      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:1rem; flex-wrap:wrap; margin-bottom:1rem;">
        <div>
          <span class="badge badge-green" style="margin-bottom:0.5rem;">${getCategoryIcon(listing.category)} ${listing.category}</span>
          <h2 style="font-size:1.35rem; line-height:1.3; color:var(--black-soft);">${listing.title}</h2>
        </div>
        <div style="text-align:right; flex-shrink:0;">
          <div style="font-family:var(--font-heading); font-size:1.7rem; font-weight:800; color:var(--black-soft);">${formatUSD(listing.price)}</div>
          <div style="font-size:0.78rem; color:var(--muted);">per service</div>
        </div>
      </div>

      <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.25rem; flex-wrap:wrap;">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <div class="seller-dot">${getInitials(listing.seller)}</div>
          <div>
            <div style="font-weight:600; font-size:0.9rem; color:var(--black-soft);">${listing.seller}</div>
            <div style="font-size:0.75rem; color:var(--muted);">${listing.faculty} &bull; Year ${listing.year}</div>
          </div>
        </div>
        <div class="card-rating" style="margin-bottom:0;">
          ${renderStars(listing.rating)}
          <span style="font-weight:600; color:var(--black-soft);">${listing.rating}</span>
          <span style="color:var(--muted);">(${listing.reviews} reviews)</span>
        </div>
      </div>

      <div class="divider"></div>

      <div style="margin-bottom:1.5rem;">
        <h4 style="margin-bottom:0.6rem; color:var(--black-soft);">About this Service</h4>
        <p style="font-size:0.9rem; line-height:1.7; color:var(--black-mid);">${listing.description}</p>
      </div>

      <div style="background:var(--bg-secondary); border-radius:var(--radius-md); padding:1rem; margin-bottom:1.5rem; display:flex; gap:1.5rem; flex-wrap:wrap;">
        <div>
          <div style="font-size:0.72rem; font-weight:600; color:var(--muted); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.2rem;">Payment</div>
          <div style="font-size:0.875rem; font-weight:600; color:var(--black-soft);">${listing.paymentMethod}</div>
        </div>
        <div>
          <div style="font-size:0.72rem; font-weight:600; color:var(--muted); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.2rem;">Student ID</div>
          <div style="font-size:0.875rem; font-weight:600; color:var(--black-soft); font-family:monospace;">${listing.sellerId}</div>
        </div>
        <div>
          <div style="font-size:0.72rem; font-weight:600; color:var(--muted); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.2rem;">SRC Contribution</div>
          <div style="font-size:0.875rem; font-weight:600; color:var(--green);">${formatUSD(REVENUE.getSRCCut(listing.price))} (10%)</div>
        </div>
      </div>

      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <button class="btn btn-primary btn-lg" style="flex:1; min-width:140px;" id="modal-book-btn">
          ${ICONS.shoppingBag} Book Now
        </button>
        <button class="btn btn-outline btn-lg" style="flex:1; min-width:140px;" id="modal-msg-btn">
          ${ICONS.messageCircle} Message Seller
        </button>
        <button class="card-fav ${isFav ? 'active' : ''}" id="modal-fav-btn" data-id="${listing.id}" 
                style="width:52px; height:52px; border-radius:var(--radius-md); border:2px solid var(--border);"
                aria-label="${isFav ? 'Remove from favourites' : 'Save to favourites'}">
          ${ICONS.heart}
        </button>
      </div>
    </div>
  `;

  // Bind modal actions
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  document.getElementById('modal-book-btn').addEventListener('click', () => {
    closeModal();
    showToast(`Booking request sent to ${listing.seller}!`);
  });
  document.getElementById('modal-msg-btn').addEventListener('click', () => {
    showToast(`Opening chat with ${listing.seller}...`);
  });
  const modalFavBtn = document.getElementById('modal-fav-btn');
  modalFavBtn.addEventListener('click', () => {
    const nowFav = Store.toggleFavourite(listing.id);
    modalFavBtn.classList.toggle('active', nowFav);
    showToast(nowFav ? 'Added to favourites!' : 'Removed from favourites');
    renderListings(); // refresh card state
  });

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  activeModal = id;
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  activeModal = null;
}

// ============================================================
// SEARCH HANDLER
// ============================================================
function initSearch() {
  const searchInputs = ['navbar-search-input', 'mobile-search-input'].map(id => document.getElementById(id)).filter(Boolean);
  searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      searchInputs.forEach(el => { if (el !== input) el.value = searchQuery; });
      renderListings();
    });
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderCategoryBar();
  renderListings();
  initSearch();

  // Modal overlay click to close
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) closeModal();
  });
});
