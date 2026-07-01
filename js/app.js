/**
 * Saturn Airdrop Calculator - Main Application
 */

const LIVE = {
  points: null,
  ytPriceByType: Object.fromEntries(Object.keys(YT_MARKETS).map(type => [type, null])),
  aspectaFdv: null,
  aspectaKeyPrice: null,
  aspectaStatus: 'syncing',
};

function renderAll() {
  renderHeader();
  renderPromoBanner();
  renderInputCards();
  renderPositions();
  renderResultCards();
  renderMultiplierTable();
  renderFooter();
  updateResults();
}

function renderPromoBanner() {
  const header = document.getElementById('appHeader');
  if (!header) return;

  const existing = document.getElementById('promoBanner');
  if (existing) existing.remove();

  const wrap = document.createElement('div');
  wrap.id = 'promoBanner';
  wrap.className = 'promo-banner card';
  wrap.innerHTML = `
    <a class="promo-link" href="https://app.saturn.credit/portfolio" target="_blank" rel="noopener">
    <div class="promo-main">
      <span class="promo-title">${t('promoBanner')}</span>
      <div class="promo-invite-wrap">
        <span class="promo-invite-label">${t('promoInviteLabel')}</span>
        <button class="invite-code-btn" id="inviteCodeBtn" onclick="copyInviteCode(event)" title="${t('copyInvite')}">
          SAT-CFF53D3C
        </button>
      </div>
    </div>
    <div class="promo-sub">${t('promoHint')}</div>
    <div class="promo-cta">${t('goPortfolio')} -></div>
    </a>
    <div class="promo-toast" id="copyToast">${t('copySuccess')}</div>
  `;

  header.insertAdjacentElement('afterend', wrap);
}

function copyInviteCode(event) {
  const code = 'SAT-CFF53D3C';
  const toast = document.getElementById('copyToast');
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const showToast = () => {
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1400);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(showToast).catch(() => {
      const input = document.createElement('input');
      input.value = code;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      showToast();
    });
    return;
  }

  const input = document.createElement('input');
  input.value = code;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  showToast();
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
          <div class="live-badge">
            <span class="live-label">${t('liveFdv')}</span>
            <span class="live-value" id="liveFdvValue">${t('liveUpdating')}...</span>
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
          ${Object.entries(YT_MARKETS).map(([type, config]) => `
            <option value="${type}">${config.label} (${config.multiplier}x)</option>
          `).join('')}
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
        <div class="field-hint" id="fdvLiveInline">${t('fdvAutoHint')}</div>
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
      <div class="result-sub">${t('pointsApyNote')}</div>
    </div>
    <div class="card card-result card-ytroi">
      <div class="result-label">${t('ytRoiCard')}</div>
      <div class="result-value" id="result_ytOnlyRoi" data-current-value="0">0.00%</div>
      <div class="result-sub">YT only</div>
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
      <div class="result-sub" id="result_ytRoi">YT APY: 0.00%</div>
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

function formatUnits(value, decimals = 18) {
  const amount = typeof value === 'bigint' ? value : BigInt(value);
  if (decimals === 0) return amount.toString();

  const negative = amount < 0n;
  const raw = (negative ? -amount : amount).toString().padStart(decimals + 1, '0');
  const integer = raw.slice(0, raw.length - decimals) || '0';
  const fraction = raw.slice(raw.length - decimals).replace(/0+$/, '');
  return `${negative ? '-' : ''}${integer}${fraction ? `.${fraction}` : ''}`;
}

function unitsToNumber(value, decimals = 18) {
  const num = Number(formatUnits(value, decimals));
  return Number.isFinite(num) ? num : null;
}

function decodeUint256Word(data, index = 0) {
  const clean = String(data || '').replace(/^0x/, '');
  const word = clean.slice(index * 64, index * 64 + 64);
  return word ? BigInt(`0x${word}`) : 0n;
}

function normalizeAddress(value) {
  return typeof value === 'string' && /^0x[a-fA-F0-9]{40}$/.test(value) ? value : null;
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
  if (typeof AbortController === 'undefined') {
    return fetch(url, options);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeAspectaAsset(rawAsset = {}) {
  const source = rawAsset || {};
  const fallback = ASPECTA_PREMARKET.fallbackAsset;
  const assetDecimals = Number(source.decimals);
  const paymentTokenDecimals = Number(source.payment_token_decimals);

  return {
    poolAddress: normalizeAddress(source.pool_address) || fallback.poolAddress,
    paymentTokenAddress: normalizeAddress(source.payment_token_address) || fallback.paymentTokenAddress,
    assetDecimals: Number.isFinite(assetDecimals) ? assetDecimals : fallback.assetDecimals,
    paymentTokenDecimals: Number.isFinite(paymentTokenDecimals)
      ? paymentTokenDecimals
      : fallback.paymentTokenDecimals,
  };
}

async function fetchAspectaAssetMetadata() {
  try {
    const resp = await fetchWithTimeout(ASPECTA_PREMARKET.assetApi, { cache: 'no-store' }, 6000);
    if (!resp.ok) throw new Error('Aspecta metadata unavailable');
    const payload = await resp.json();
    const rows = Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.data?.list)
        ? payload.data.list
        : [];
    const saturn = rows.find(item => item?.project_data?.title === 'Saturn' || item?.wallet_address === 'Saturn') || rows[0];
    return normalizeAspectaAsset(saturn);
  } catch (_) {
    return normalizeAspectaAsset();
  }
}

async function fetchBscRpcCall(to, data) {
  for (const rpcUrl of ASPECTA_PREMARKET.rpcUrls) {
    try {
      const resp = await fetchWithTimeout(rpcUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: Date.now(),
          method: 'eth_call',
          params: [{ to, data }, 'latest'],
        }),
      }, 7000);
      if (!resp.ok) continue;
      const payload = await resp.json();
      if (payload?.result && payload.result !== '0x') return payload.result;
    } catch (_) {
    }
  }
  return null;
}

async function fetchTokenDecimals(tokenAddress, fallbackDecimals) {
  const raw = await fetchBscRpcCall(tokenAddress, ASPECTA_PREMARKET.selectors.decimals);
  if (!raw) return fallbackDecimals;

  const decimals = Number(decodeUint256Word(raw, 0));
  return Number.isFinite(decimals) && decimals >= 0 && decimals <= 36
    ? decimals
    : fallbackDecimals;
}

async function fetchAspectaPremarketFdv() {
  const asset = await fetchAspectaAssetMetadata();
  const [currentPriceRaw, settlementRaw, paymentTokenDecimals] = await Promise.all([
    fetchBscRpcCall(asset.poolAddress, ASPECTA_PREMARKET.selectors.getCurrentPrice),
    fetchBscRpcCall(asset.poolAddress, ASPECTA_PREMARKET.selectors.getSettlementInfo),
    fetchTokenDecimals(asset.paymentTokenAddress, asset.paymentTokenDecimals),
  ]);

  if (!currentPriceRaw || !settlementRaw) return null;

  const currentPrice = decodeUint256Word(currentPriceRaw, 0);
  const redeemRatioRaw = decodeUint256Word(settlementRaw, 2);
  const keyPriceUsd = unitsToNumber(currentPrice, paymentTokenDecimals);
  const redeemRatio = unitsToNumber(redeemRatioRaw, 18);
  const fdvUsd = keyPriceUsd && redeemRatio ? keyPriceUsd / redeemRatio : null;

  return fdvUsd && fdvUsd > 0
    ? { fdvUsd, keyPriceUsd, redeemRatio }
    : null;
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

function syncFdvInputFromAspecta() {
  const fdvInput = document.getElementById('fdv');
  if (fdvInput && LIVE.aspectaFdv !== null) {
    fdvInput.value = Math.round(LIVE.aspectaFdv);
  }
}

function onYtTypeChange() {
  syncYtPriceInputByType();
  renderLiveMetrics();
  updateResults();
}

function renderLiveMetrics() {
  const pointsEl = document.getElementById('livePointsValue');
  const fdvEl = document.getElementById('liveFdvValue');
  const fdvInlineEl = document.getElementById('fdvLiveInline');
  const ytInlineEl = document.getElementById('ytLivePriceInline');

  if (pointsEl && LIVE.points === null) {
    pointsEl.textContent = `${t('liveUnavailable')}`;
  } else if (pointsEl) {
    pointsEl.textContent = formatNumber(LIVE.points, 1);
  }

  const fdvText = LIVE.aspectaStatus === 'syncing'
    ? `${t('liveUpdating')}...`
    : LIVE.aspectaFdv === null
      ? t('liveUnavailable')
      : `$${formatNumber(LIVE.aspectaFdv, 0)}`;

  if (fdvEl) {
    fdvEl.textContent = fdvText;
  }

  if (fdvInlineEl) {
    if (LIVE.aspectaStatus === 'syncing') {
      fdvInlineEl.textContent = `${t('liveFdv')}: ${t('liveUpdating')}...`;
    } else if (LIVE.aspectaFdv === null) {
      fdvInlineEl.textContent = `${t('liveFdv')}: ${t('liveUnavailable')} · ${t('fdvAutoHint')}`;
    } else {
      fdvInlineEl.textContent = `${t('liveFdv')}: $${formatNumber(LIVE.aspectaFdv, 0)} · ${t('liveAspectaKeyPrice')}: $${formatNumber(LIVE.aspectaKeyPrice, 4)}`;
    }
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
  const merklRecipientDirect = 'https://api.merkl.xyz/v4/rewards/token/?chainId=1&address=0xD223bbdd0421E394C0df9dFfe568f1dADfFd6f85&recipient=0x80c6a512b548229226c0676d6fdbaff81d325990';
  const merklRecipientProxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(merklRecipientDirect)}`;
  const merklDirect = 'https://api.merkl.xyz/v4/rewards/token/total?chainId=1&address=0xD223bbdd0421E394C0df9dFfe568f1dADfFd6f85';
  const merklProxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(merklDirect)}`;

  async function fetchTextWithFallback(urls) {
    for (const url of urls) {
      try {
        const resp = await fetchWithTimeout(url, { cache: 'no-store' }, 8000);
        if (resp.ok) {
          const text = await resp.text();
          if (text) return text;
        }
      } catch (_) {
      }
    }
    return '';
  }

  async function fetchPendleMarketYtPrice(config) {
    const direct = `https://api-v2.pendle.finance/core/v1/${config.chainId || 1}/markets/${config.market}`;
    const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(direct)}`;
    const raw = await fetchTextWithFallback([direct, proxy]);
    if (!raw) return null;
    return extractYtPriceFromMarket(raw);
  }

  const marketConfigs = Object.values(YT_MARKETS);
  const [merklRecipientRaw, merklRaw, aspectaResult, ...ytPrices] = await Promise.all([
    fetchTextWithFallback([merklRecipientDirect, merklRecipientProxy]),
    fetchTextWithFallback([merklDirect, merklProxy]),
    fetchAspectaPremarketFdv().catch(() => null),
    ...marketConfigs.map(config => fetchPendleMarketYtPrice(config)),
  ]);

  const merklRecipientData = parseJsonSafe(merklRecipientRaw);
  const merklRecipientAmount = Array.isArray(merklRecipientData)
    ? merklRecipientData[0]?.amount
    : merklRecipientData?.amount;
  const merklRecipientPoints = parseMerklAmountToNumber(merklRecipientAmount, 18);
  const merklData = parseJsonSafe(merklRaw);
  const merklPoints = parseMerklAmountToNumber(merklData?.amount, 18);
  LIVE.points = (merklRecipientPoints === null && merklPoints === null)
    ? null
    : Math.max(0, (merklPoints || 0) - (merklRecipientPoints || 0));

  Object.keys(YT_MARKETS).forEach((type, index) => {
    LIVE.ytPriceByType[type] = ytPrices[index];
  });

  if (aspectaResult) {
    LIVE.aspectaFdv = aspectaResult.fdvUsd;
    LIVE.aspectaKeyPrice = aspectaResult.keyPriceUsd;
    LIVE.aspectaStatus = 'ready';
    syncFdvInputFromAspecta();
  } else if (LIVE.aspectaFdv === null) {
    LIVE.aspectaStatus = 'unavailable';
  }

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
  addPosition('hold_usdat_eth', 1000);
  fetchLiveMetrics();
  setInterval(fetchLiveMetrics, 60 * 1000);
});
