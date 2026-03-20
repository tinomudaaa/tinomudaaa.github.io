/**
 * AU Marketplace — Finance Secretary Dashboard Logic
 * Stats, transactions table, sellers table, monthly report
 */
document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // LOAD DATA
  // ============================================================
  const transactions = Store.getTransactions();
  const lsSellers = Store.getRegisteredSellers(); // from registration form
  const allSellers = [...lsSellers, ...MOCK_SELLERS]; // merge with mock

  // ============================================================
  // STATS COMPUTATION
  // ============================================================
  const totalTxnCount = transactions.length;
  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalSRC = transactions.reduce((sum, t) => sum + t.srcCut, 0);
  const totalSellerPayout = transactions.reduce((sum, t) => sum + t.sellerShare, 0);

  // ============================================================
  // RENDER STATS CARDS
  // ============================================================
  const statsGrid = document.getElementById('stats-grid');
  if (statsGrid) {
    statsGrid.innerHTML = `
      <div class="stat-card" role="listitem">
        <div class="stat-icon green">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
        </div>
        <div class="stat-label">Total Transactions</div>
        <div class="stat-value">${totalTxnCount}</div>
        <div class="stat-sub">March 2026</div>
        <div class="stat-change">↑ All time high</div>
      </div>

      <div class="stat-card" role="listitem">
        <div class="stat-icon black">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div class="stat-label">Total Revenue Transacted</div>
        <div class="stat-value">$${totalRevenue.toFixed(2)}</div>
        <div class="stat-sub">Combined gross from all sellers</div>
        <div class="stat-change" style="color:var(--black-mid);">Sellers received $${totalSellerPayout.toFixed(2)}</div>
      </div>

      <div class="stat-card" role="listitem">
        <div class="stat-icon green">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div class="stat-label">SRC 10% Contributions</div>
        <div class="stat-value green">$${totalSRC.toFixed(2)}</div>
        <div class="stat-sub">Collected for SRC Development Fund</div>
        <div class="stat-change">From ${totalTxnCount} transactions · 10% each</div>
      </div>

      <div class="stat-card" role="listitem">
        <div class="stat-icon gray">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div class="stat-label">Registered Sellers</div>
        <div class="stat-value">${allSellers.length}</div>
        <div class="stat-sub">Active student service providers</div>
        <div class="stat-change" style="color:var(--black-mid);">Across 8 categories</div>
      </div>

      <div class="stat-card" role="listitem">
        <div class="stat-icon green">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
        </div>
        <div class="stat-label">Avg Transaction Value</div>
        <div class="stat-value">$${(totalRevenue / totalTxnCount).toFixed(2)}</div>
        <div class="stat-sub">Per booking</div>
        <div class="stat-change">Avg SRC: $${(totalSRC / totalTxnCount).toFixed(2)} per txn</div>
      </div>

      <div class="stat-card" role="listitem">
        <div class="stat-icon black">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
        <div class="stat-label">Reporting Period</div>
        <div class="stat-value" style="font-size:1.3rem;">Mar 2026</div>
        <div class="stat-sub">01 Mar – 20 Mar 2026</div>
        <div class="stat-change" style="color:var(--black-mid);">Academic Year 2025/26</div>
      </div>
    `;
  }

  // ============================================================
  // TRANSACTIONS TABLE
  // ============================================================
  const txnTbody = document.getElementById('txn-tbody');
  const txnCountBadge = document.getElementById('txn-count-badge');
  if (txnTbody) {
    const methodColor = { 'EcoCash': '#dc2626', 'InnBucks': '#1d4ed8', 'Cash': '#374151' };
    txnTbody.innerHTML = transactions.map(t => `
      <tr>
        <td><span class="ref-code">${t.id}</span></td>
        <td>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <div class="seller-dot" style="width:26px;height:26px;font-size:0.65rem;">${getInitials(t.seller)}</div>
            <span style="font-weight:500; color:var(--black-soft);">${t.seller}</span>
          </div>
        </td>
        <td>${t.service}</td>
        <td><span class="badge badge-green" style="font-size:0.68rem;">${t.category}</span></td>
        <td class="amount-cell">${formatUSD(t.amount)}</td>
        <td class="src-cell">${formatUSD(t.srcCut)}</td>
        <td>${formatUSD(t.sellerShare)}</td>
        <td>
          <span style="font-size:0.78rem; font-weight:600; color:${methodColor[t.method] || '#374151'}; background:${methodColor[t.method] || '#374151'}18; padding:0.2rem 0.5rem; border-radius:4px;">
            ${t.method}
          </span>
        </td>
        <td><span class="ref-code">${t.ref}</span></td>
        <td style="white-space:nowrap;">${formatDate(t.date)}</td>
      </tr>
    `).join('');
    if (txnCountBadge) txnCountBadge.textContent = `${transactions.length} records`;
  }

  // ============================================================
  // SELLERS TABLE
  // ============================================================
  const sellersTbody = document.getElementById('sellers-tbody');
  const sellersCountBadge = document.getElementById('sellers-count-badge');
  if (sellersTbody) {
    sellersTbody.innerHTML = allSellers.map(s => `
      <tr>
        <td><span class="ref-code">${s.id}</span></td>
        <td>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <div class="seller-dot" style="width:26px;height:26px;font-size:0.65rem;">${getInitials(s.name)}</div>
            <span style="font-weight:500; color:var(--black-soft);">${s.name}</span>
          </div>
        </td>
        <td>${s.faculty}</td>
        <td>Year ${s.year}</td>
        <td><span class="badge badge-green" style="font-size:0.68rem;">${s.category}</span></td>
        <td style="max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${s.serviceTitle}">${s.serviceTitle}</td>
        <td class="amount-cell">${formatUSD(s.price)}</td>
        <td>${s.paymentMethod}</td>
        <td style="white-space:nowrap;">${formatDate(s.dateRegistered)}</td>
      </tr>
    `).join('');
    if (sellersCountBadge) sellersCountBadge.textContent = `${allSellers.length} sellers`;
  }

  // ============================================================
  // MONTHLY REPORT PANEL
  // ============================================================
  const reportBody = document.getElementById('report-body');
  if (reportBody) {
    // Group transactions by category
    const byCat = transactions.reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = { count: 0, total: 0, src: 0 };
      acc[t.category].count++;
      acc[t.category].total += t.amount;
      acc[t.category].src += t.srcCut;
      return acc;
    }, {});

    // Group transactions by seller
    const bySeller = transactions.reduce((acc, t) => {
      if (!acc[t.seller]) acc[t.seller] = { count: 0, total: 0, src: 0 };
      acc[t.seller].count++;
      acc[t.seller].total += t.amount;
      acc[t.seller].src += t.srcCut;
      return acc;
    }, {});

    // Group by method
    const byMethod = transactions.reduce((acc, t) => {
      if (!acc[t.method]) acc[t.method] = { count: 0, total: 0 };
      acc[t.method].count++;
      acc[t.method].total += t.amount;
      return acc;
    }, {});

    reportBody.innerHTML = `
      <!-- Report Header -->
      <div style="border:2px solid var(--border); border-radius:var(--radius-md); padding:1.5rem; margin-bottom:1.5rem; background:var(--bg-secondary);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;">
          <div>
            <div style="font-family:var(--font-heading); font-size:1.25rem; font-weight:700; color:var(--black-soft);">AU Marketplace — Monthly Report</div>
            <div style="font-size:0.85rem; color:var(--muted); margin-top:0.2rem;">Africa University Student Representative Council</div>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:600; color:var(--black-soft);">March 2026</div>
            <div style="font-size:0.8rem; color:var(--muted);">01 Mar – 20 Mar 2026</div>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:1rem;">
          <div style="text-align:center; padding:1rem; background:white; border-radius:var(--radius-sm); border:1px solid var(--border);">
            <div style="font-size:1.6rem; font-family:var(--font-heading); font-weight:800; color:var(--black-soft);">${totalTxnCount}</div>
            <div style="font-size:0.75rem; color:var(--muted);">Total Transactions</div>
          </div>
          <div style="text-align:center; padding:1rem; background:white; border-radius:var(--radius-sm); border:1px solid var(--border);">
            <div style="font-size:1.6rem; font-family:var(--font-heading); font-weight:800; color:var(--black-soft);">$${totalRevenue.toFixed(2)}</div>
            <div style="font-size:0.75rem; color:var(--muted);">Gross Revenue</div>
          </div>
          <div style="text-align:center; padding:1rem; background:var(--green-light); border-radius:var(--radius-sm); border:1px solid rgba(22,163,74,0.2);">
            <div style="font-size:1.6rem; font-family:var(--font-heading); font-weight:800; color:var(--green);">$${totalSRC.toFixed(2)}</div>
            <div style="font-size:0.75rem; color:var(--green-dark);">SRC Fund Collected</div>
          </div>
          <div style="text-align:center; padding:1rem; background:white; border-radius:var(--radius-sm); border:1px solid var(--border);">
            <div style="font-size:1.6rem; font-family:var(--font-heading); font-weight:800; color:var(--black-soft);">${allSellers.length}</div>
            <div style="font-size:0.75rem; color:var(--muted);">Active Sellers</div>
          </div>
        </div>
      </div>

      <!-- By Category -->
      <div style="margin-bottom:1.5rem;">
        <h4 style="margin-bottom:1rem; color:var(--black-soft);">Revenue by Category</h4>
        <table style="min-width:0;" aria-label="Revenue by category">
          <thead><tr><th>Category</th><th>Transactions</th><th>Revenue</th><th>SRC Contribution</th></tr></thead>
          <tbody>
            ${Object.entries(byCat).map(([cat, d]) => `
              <tr>
                <td><span class="badge badge-green" style="font-size:0.7rem;">${cat}</span></td>
                <td>${d.count}</td>
                <td class="amount-cell">$${d.total.toFixed(2)}</td>
                <td class="src-cell">$${d.src.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- By Seller -->
      <div style="margin-bottom:1.5rem;">
        <h4 style="margin-bottom:1rem; color:var(--black-soft);">Revenue by Seller</h4>
        <table style="min-width:0;" aria-label="Revenue by seller">
          <thead><tr><th>Seller</th><th>Transactions</th><th>Revenue</th><th>SRC Contribution</th></tr></thead>
          <tbody>
            ${Object.entries(bySeller).sort((a,b) => b[1].total - a[1].total).map(([name, d]) => `
              <tr>
                <td>
                  <div style="display:flex;align-items:center;gap:0.5rem;">
                    <div class="seller-dot" style="width:24px;height:24px;font-size:0.62rem;">${getInitials(name)}</div>
                    ${name}
                  </div>
                </td>
                <td>${d.count}</td>
                <td class="amount-cell">$${d.total.toFixed(2)}</td>
                <td class="src-cell">$${d.src.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- By Payment Method -->
      <div>
        <h4 style="margin-bottom:1rem; color:var(--black-soft);">Payment Method Breakdown</h4>
        <table style="min-width:0;" aria-label="Payment method breakdown">
          <thead><tr><th>Method</th><th>Transactions</th><th>Total Amount</th><th>% of Revenue</th></tr></thead>
          <tbody>
            ${Object.entries(byMethod).map(([method, d]) => `
              <tr>
                <td><strong>${method}</strong></td>
                <td>${d.count}</td>
                <td class="amount-cell">$${d.total.toFixed(2)}</td>
                <td>${((d.total / totalRevenue) * 100).toFixed(1)}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div style="margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--border); font-size:0.78rem; color:var(--muted);">
        <em>Generated: ${new Date().toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' })} &bull; AU Marketplace &bull; SRC Finance Secretary Dashboard</em>
      </div>
    `;
  }

  // ============================================================
  // TAB SWITCHING
  // ============================================================
  const tabs = document.querySelectorAll('.dash-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(`panel-${tab.dataset.tab}`);
      if (panel) panel.classList.add('active');
    });
  });

});
