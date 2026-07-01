/**
 * Saturn Airdrop Calculator - Multi-Position Management
 */

let positions = [];
let positionIdCounter = 0;

function addPosition(strategyId = 'hold_usdat_eth', amount = 1000) {
  const id = ++positionIdCounter;
  positions.push({ id, strategyId, amount });
  renderPositions();
  updateResults();
}

function removePosition(id) {
  positions = positions.filter(p => p.id !== id);
  renderPositions();
  updateResults();
}

function updatePositionStrategy(id, strategyId) {
  const pos = positions.find(p => p.id === id);
  if (pos) {
    pos.strategyId = strategyId;
    renderPositions();
    updateResults();
  }
}

function updatePositionAmount(id, amount) {
  const pos = positions.find(p => p.id === id);
  if (pos) {
    pos.amount = parseFloat(amount) || 0;
    // Update the daily points display for this position without full re-render
    const strategy = STRATEGIES.find(s => s.id === pos.strategyId);
    const dailyEl = document.getElementById(`pos_daily_${id}`);
    if (dailyEl && strategy) {
      const daily = pos.amount * strategy.multiplier;
      dailyEl.textContent = formatNumber(daily, 0);
    }
    // Update total
    updatePositionsTotalDisplay();
    updateResults();
  }
}

function getPositionsDailyTotal() {
  return positions.reduce((sum, pos) => {
    const strategy = STRATEGIES.find(s => s.id === pos.strategyId);
    return sum + (strategy ? pos.amount * strategy.multiplier : 0);
  }, 0);
}

function getPositionsTotalInvestment() {
  return positions.reduce((sum, pos) => sum + pos.amount, 0);
}

function updatePositionsTotalDisplay() {
  const totalEl = document.getElementById('positionsDailyTotal');
  if (totalEl) {
    totalEl.textContent = formatNumber(getPositionsDailyTotal(), 0);
  }
}

function renderPositions() {
  const container = document.getElementById('positionsContainer');
  if (!container) return;

  const lang = currentLang;

  container.innerHTML = positions.map((pos, index) => {
    const strategy = STRATEGIES.find(s => s.id === pos.strategyId);
    const daily = strategy ? pos.amount * strategy.multiplier : 0;
    const categoryColor = strategy ? CATEGORY_COLORS[strategy.category] : '#666';

    return `
      <div class="position-item" data-id="${pos.id}">
        <div class="position-header">
          <span class="position-index">#${index + 1}</span>
          <button class="btn-remove" onclick="removePosition(${pos.id})" title="${t('removePosition')}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="position-fields">
          <div class="field">
            <label>${t('strategy')}</label>
            <select id="pos_strategy_${pos.id}" onchange="updatePositionStrategy(${pos.id}, this.value)">
              ${STRATEGIES.map(s => `
                <option value="${s.id}" ${s.id === pos.strategyId ? 'selected' : ''}>
                  ${lang === 'zh' ? s.label_zh : s.label_en} (${s.multiplier}x)
                </option>
              `).join('')}
            </select>
          </div>
          <div class="field">
            <label>${t('positionAmount')}</label>
            <input type="number" id="pos_amount_${pos.id}" value="${pos.amount}"
              oninput="updatePositionAmount(${pos.id}, this.value)" min="0" step="100">
          </div>
          <div class="field field-readonly">
            <label>${t('dailyPointsAuto')}</label>
            <div class="daily-points-display">
              <span class="category-dot" style="background:${categoryColor}"></span>
              <span id="pos_daily_${pos.id}" class="daily-value">${formatNumber(daily, 0)}</span>
              <span class="daily-unit">pts/day</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  updatePositionsTotalDisplay();
}
