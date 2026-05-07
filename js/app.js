/**
 * Saturn Airdrop Calculator - Main Application
 */

const LIVE = {
  points: null,
  ytPriceByType: {
    yt_usdat: null,
    yt_susdat: null,
  },
};

function renderAll() {
  renderHeader();
  renderInputCards();
  renderPositions();
  renderResultCards();
  renderMultiplierTable();
  renderFooter();
  updateResults();
}

function renderHeader() {
  const header = document.getElementById('appHeader');
  if (!header) return;
  header.innerHTML = `
    <div class="header-content">
      <div class="header-left">
        <div class="logo">
          <div class="logo-ring"></div>
          <span class="logo-text">S</span>
        </div>
        <div class="header-titles">
          <h1>${t('title')}</h1>
          <p class="subtitle">${t('subtitle')}</p>
        </div>
      </div>
      <div class="header-right">
        <div class="live-badges">
          <div class="live-badge">
            <span class="live-label">${t('livePoints')}</span>
            <span class="live-value" id="livePointsValue">${t('liveUpdating')}...</span>
          </div>
        </div>
        <button class="btn-pill" onclick="toggleLang()" id="langBtn">${t('langSwitch')}</button>
        <button class="btn-pill btn-accent" onclick="toggleMultiplierModal()" id="multiplierBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
          </svg>
          ${t('showMultipliers')}
        </button>
      </div>
    </div>
  `;
}

function renderInputCards() {
  const container = document.getElementById('inputCards');
  if (!container) return;

  container.innerHTML = `
    <!-- Card A: My Parameters -->
    <div class="card card-input">
      <h2 class="card-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        ${t('cardA_title')}
      </h2>
      <div class="field">
        <label for="currentPoints">${t('currentPoints')}</label>
        <input type="number" id="currentPoints" value="${DEFAULTS.currentPoints}" min="0" oninput="updateResults()">
      </div>
      <div class="field">
        <label for="currentDailyPoints">${t('currentDailyPoints')}</label>
        <input type="number" id="currentDailyPoints" value="0" min="0" disabled>
        <div class="field-hint">${t('dailyPointsAuto')}</div>
      </div>
      <div class="section-divider">
        <span>${t('positions_title')}</span>
      </div>
      <div id="positionsContainer"></div>
      <button class="btn-add" onclick="addPosition()">
        ${t('addPosition')}
      </button>
      <div class="positions-total">
        <span>${t('totalDailyFromPositions')}</span>
        <span id="positionsDailyTotal" class="total-value">0</span>
      </div>

      <!-- Pendle YT Section -->
      <div class="section-divider">
        <span>${t('yt_title')}</span>
      </div>
      <div class="field">
        <label for="ytType">${t('yt_type')}</label>
        <select id="ytType" onchange="onYtTypeChange()">
          <option value="yt_usdat">YT-USDat (30x)</option>
          <option value="yt_susdat">YT-sUSDat (10x)</option>
        </select>
      </div>
      <div class="field">
        <label for="ytPrice">${t('yt_price')}</label>
        <input type="number" id="ytPrice" value="0" min="0" step="0.0001" oninput="updateResults()">
        <div class="field-hint" id="ytLivePriceInline">${t('liveYtPrice')}: ${t('liveUpdating')}...</div>
      </div>
      <div class="field">
        <label for="ytBuyValue">${t('yt_buyValue')}</label>
        <input type="number" id="ytBuyValue" value="0" min="0" step="100" oninput="updateResults()">
      </div>
      <div class="field field-readonly">
        <label>${t('yt_quantity')}</label>
        <div class="daily-points-display">
          <span class="category-dot" style="background:var(--accent-blue)"></span>
          <span id="ytQuantity" class="daily-value">0</span>
        </div>
      </div>
      <div class="field field-readonly">
        <label>${t('yt_dailyPoints')}</label>
        <div class="daily-points-display">
          <span class="category-dot" style="background:var(--accent-purple)"></span>
          <span id="ytDailyPoints" class="daily-value">0</span>
          <span class="daily-unit">pts/day</span>
        </div>
      </div>
      <div class="info-box info-formula">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
        <p>${t('yt_formula')}</p>
      </div>
    </div>

    <!-- Card B: Network Assumptions -->
    <div class="card card-input">
      <h2 class="card-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        ${t('cardB_title')}
      </h2>
      <div class="field">
        <label for="fdv">${t('fdv')}</label>
        <input type="number" id="fdv" value="${DEFAULTS.fdv}" min="0" step="1000000" oninput="updateResults()">
      </div>
      <div class="field">
        <label for="airdropPercent">${t('airdropPercent')}</label>
        <input type="number" id="airdropPercent" value="${DEFAULTS.airdropPercent}" min="0" max="100" step="0.5" disabled>
        <div class="field-hint">${t('fixedProtocolAssumption')}</div>
      </div>
      <div class="field">
        <label for="dailyGrowthRate">${t('dailyGrowthRate')}</label>
        <input type="number" id="dailyGrowthRate" value="${DEFAULTS.dailyGrowthRate}" min="0" max="100" step="0.1" oninput="updateResults()">
      </div>
      <div class="field">
        <label for="networkCurrentDaily">${t('networkCurrentDaily')}</label>
        <input type="number" id="networkCurrentDaily" value="${DEFAULTS.networkCurrentDaily}" min="0" oninput="updateResults()"
          placeholder="${t('networkCurrentDaily_hint')}">
      </div>
    </div>

    <!-- Card C: Time & Data -->
    <div class="card card-input">
      <h2 class="card-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        ${t('cardC_title')}
      </h2>
      <div class="field">
        <label for="seasonEndDate">${t('seasonEndDate')}</label>
        <input type="date" id="seasonEndDate" value="${DEFAULTS.seasonEndDate}" disabled>
        <div class="field-hint">${t('fixedSeasonBoundary')}</div>
      </div>
      <div class="days-remaining-display">
        <span class="days-label">${t('daysRemaining')}</span>
        <span id="daysRemaining" class="days-value">--</span>
      </div>
      <div class="info-box">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <p>${t('seasonInfo')}</p>
      </div>
      <div class="info-box info-formula">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
        <p>${t('pointsFormula')}</p>
      </div>
    </div>
  `;
}

function renderResultCards() {
  const container = document.getElementById('resultCards');
  if (!container) return;

  container.innerHTML = `
    <div class="card card-result card-highlight">
      <div class="result-label">${t('valuePerMillion')}</div>
      <div class="result-value" id="result_valuePerMillion" data-current-value="0">≈ $0.00</div>
    </div>
    <div class="card card-result card-highlight-gold">
      <div class="result-label">${t('myAirdropValue')}</div>
      <div class="result-value result-big" id="result_myAirdropValue" data-current-value="0">≈ $0.00</div>
      <div class="result-sub" id="result_totalInvestment">${t('totalInvestment')}: $0</div>
    </div>
    <div class="card card-result card-kpi">
      <div class="result-label">${t('roi')}</div>
      <div class="result-value" id="result_roi" data-current-value="0">0.00%</div>
    </div>
    <div class="card card-result">
      <div class="result-label">${t('myTotalPoints')}</div>
      <div class="result-value" id="result_myTotalPoints" data-current-value="0">0</div>
      <div class="result-sub">${t('myTotalPoints_sub')}</div>
    </div>
    <div class="card card-result">
      <div class="result-label">${t('networkTotalPoints')}</div>
      <div class="result-value" id="result_networkTotalPoints" data-current-value="0">0</div>
      <div class="result-sub">${t('networkTotalPoints_sub')}</div>
    </div>
    <div class="card card-result card-yt">
      <div class="result-label">${t('yt_totalMiles')}</div>
      <div class="result-value" id="result_ytTotalPoints" data-current-value="0">0</div>
      <div class="result-sub" id="result_ytContribution">YT ${t('yt_contribution')}: 0</div>
    </div>
    <div class="card card-result card-yt">
      <div class="result-label">${t('yt_airdropValue')}</div>
      <div class="result-value" id="result_ytAirdropValue" data-current-value="0">≈ $0.00</div>
      <div class="result-sub" id="result_ytRoi">ROI: 0.00%</div>
    </div>
  `;
}

function renderMultiplierTable() {
  const modal = document.getElementById('multiplierModal');
  if (!modal) return;

  const lang = currentLang;
  const rows = STRATEGIES.map(s => {
    const color = CATEGORY_COLORS[s.category];
    return `
      <tr>
        <td>
          <span class="category-dot" style="background:${color}"></span>
          ${lang === 'zh' ? s.label_zh : s.label_en}
        </td>
        <td class="multiplier-value">${s.multiplier}x</td>
      </tr>
    `;
  }).join('');

  modal.innerHTML = `
    <div class="modal-backdrop" onclick="toggleMultiplierModal()"></div>
    <div class="modal-content card">
      <div class="modal-header">
        <h3>${t('multiplierTable_title')}</h3>
        <button class="btn-close" onclick="toggleMultiplierModal()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <table class="multiplier-table">
        <thead>
          <tr>
            <th>${t('activity')}</th>
            <th>${t('pointsPerDay')}</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

function toggleMultiplierModal() {
  const modal = document.getElementById('multiplierModal');
  if (modal) {
    modal.classList.toggle('active');
    document.body.classList.toggle('modal-open');
  }
}

function renderFooter() {
  const footer = document.getElementById('appFooter');
  if (!footer) return;
  footer.innerHTML = `
    <p class="footer-disclaimer">${t('footer_note')}</p>
    <p class="footer-credit">
      v1.0.0 · made by
      <a href="https://x.com/MengLayer" target="_blank" rel="noopener">X: @MengLayer</a> ·
      <a href="https://app.saturn.credit/" target="_blank" rel="noopener">Saturn App</a> ·
      <a href="https://saturncredit.gitbook.io/saturn-docs" target="_blank" rel="noopener">Docs</a>
    </p>
  `;
}

function parseJsonSafe(text) {
  try {
    return JSON.parse(text);
  } catch (_) {
    return null;
  }
}

function findPendleMarketPrice(markets, symbolKeyword) {
  if (!markets || !Array.isArray(markets.results)) return null;
  const loweredKeyword = symbolKeyword.toLowerCase();
  const market = markets.results.find(item => {
    const ytSymbol = item?.yt?.symbol || '';
    return ytSymbol.toLowerCase().includes(loweredKeyword);
  });
  return market?.yt?.price?.usd ?? null;
}

function extractYtPriceFromMarket(payload) {
  const data = typeof payload === 'string' ? parseJsonSafe(payload) : payload;
  return data?.yt?.price?.usd ?? null;
}

function parseMerklAmountToNumber(amountStr, decimals = 18) {
  if (!amountStr || !/^\d+$/.test(amountStr)) return null;
  const normalized = amountStr.replace(/^0+/, '') || '0';
  if (normalized === '0') return 0;

  let valueText;
  if (normalized.length <= decimals) {
    const padded = normalized.padStart(decimals, '0');
    valueText = `0.${padded.slice(0, 6)}`;
  } else {
    const intPart = normalized.slice(0, normalized.length - decimals);
    const fracPart = normalized.slice(normalized.length - decimals, normalized.length - decimals + 6);
    valueText = fracPart ? `${intPart}.${fracPart}` : intPart;
  }

  const num = Number(valueText);
  return Number.isFinite(num) ? num : null;
}

function getSelectedYtType() {
  return document.getElementById('ytType')?.value || 'yt_usdat';
}

function syncYtPriceInputByType() {
  const ytPriceInput = document.getElementById('ytPrice');
  if (!ytPriceInput) return;
  const selectedType = getSelectedYtType();
  const selectedPrice = LIVE.ytPriceByType[selectedType];
  if (selectedPrice !== null) {
    ytPriceInput.value = selectedPrice.toFixed(4);
  }
}

function onYtTypeChange() {
  syncYtPriceInputByType();
  renderLiveMetrics();
  updateResults();
}

function renderLiveMetrics() {
  const pointsEl = document.getElementById('livePointsValue');
  const ytInlineEl = document.getElementById('ytLivePriceInline');
  if (!pointsEl) return;

  if (LIVE.points === null) {
    pointsEl.textContent = `${t('liveUnavailable')}`;
  } else {
    pointsEl.textContent = formatNumber(LIVE.points, 1);
  }

  const selectedType = getSelectedYtType();
  const ytPrice = LIVE.ytPriceByType[selectedType];

  if (ytInlineEl) {
    ytInlineEl.textContent = ytPrice === null
      ? `${t('liveYtPrice')}: ${t('liveUnavailable')}`
      : `${t('liveYtPrice')}: $${formatNumber(ytPrice, 4)}`;
  }
}

async function fetchLiveMetrics() {
  const merklDirect = 'https://api.merkl.xyz/v4/rewards/token/total?chainId=1&address=0xD223bbdd0421E394C0df9dFfe568f1dADfFd6f85';
  const merklProxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(merklDirect)}`;

  async function fetchTextWithFallback(urls) {
    for (const url of urls) {
      try {
        const resp = await fetch(url, { cache: 'no-store' });
        if (resp.ok) {
          const text = await resp.text();
          if (text) return text;
        }
      } catch (_) {
      }
    }
    return '';
  }

  async function fetchPendleMarketYtPrice(marketAddress) {
    const direct = `https://api-v2.pendle.finance/core/v1/1/markets/${marketAddress}`;
    const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(direct)}`;
    const raw = await fetchTextWithFallback([direct, proxy]);
    if (!raw) return null;
    return extractYtPriceFromMarket(raw);
  }

  const [merklRaw, ytUsdatPrice, ytSusdatPrice] = await Promise.all([
    fetchTextWithFallback([merklDirect, merklProxy]),
    fetchPendleMarketYtPrice('0x9afe7a057a09cf5da748d952078c9c99938b4329'),
    fetchPendleMarketYtPrice('0x91bc86899c8391b6caaf26535b9cd82efe49a189'),
  ]);

  const merklData = parseJsonSafe(merklRaw);
  LIVE.points = parseMerklAmountToNumber(merklData?.amount, 18);

  LIVE.ytPriceByType.yt_usdat = ytUsdatPrice;
  LIVE.ytPriceByType.yt_susdat = ytSusdatPrice;

  syncYtPriceInputByType();

  renderLiveMetrics();
  updateResults();
}

// Particle background
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const count = 80;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 185, 11, ${p.opacity})`;
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(240, 185, 11, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  renderAll();
  // Add a default position
  addPosition('hold_usdat', 1000);
  fetchLiveMetrics();
  setInterval(fetchLiveMetrics, 60 * 1000);
});
