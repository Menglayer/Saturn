/**
 * Saturn Airdrop Calculator - Calculation Engine
 */

function calculateResults() {
  const currentPoints = parseFloat(document.getElementById('currentPoints')?.value) || 0;
  const fdv = parseFloat(document.getElementById('fdv')?.value) || 0;
  const airdropPercent = parseFloat(document.getElementById('airdropPercent')?.value) || 0;
  const dailyGrowthRate = parseFloat(document.getElementById('dailyGrowthRate')?.value) || 0;
  const networkCurrentDaily = parseFloat(document.getElementById('networkCurrentDaily')?.value) || 0;
  const seasonEndDate = document.getElementById('seasonEndDate')?.value || DEFAULTS.seasonEndDate;

  // Pendle YT parameters
  const ytType = document.getElementById('ytType')?.value || 'yt_usdat';
  const ytPrice = parseFloat(document.getElementById('ytPrice')?.value) || 0;
  const ytBuyValue = parseFloat(document.getElementById('ytBuyValue')?.value) || 0;

  // YT multiplier
  let ytMultiplier = 10;
  if (ytType === 'yt_usdat') ytMultiplier = 30;
  if (ytType === 'yt_susdat') ytMultiplier = 10;
  if (ytType === 'yt_jrusdat') ytMultiplier = 10;
  if (ytType === 'yt_srusdat') ytMultiplier = 15;

  // Calculate remaining days
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endDate = new Date(seasonEndDate);
  endDate.setHours(0, 0, 0, 0);
  const remainingDays = Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));

  // YT effective end date = min(YT expiry, season end)
  const ytExpiryRaw = (typeof LIVE !== 'undefined' && LIVE.ytExpiryByType)
    ? LIVE.ytExpiryByType[ytType]
    : null;
  let ytRemainingDays = remainingDays;
  if (ytExpiryRaw) {
    const ytExpiryDate = new Date(ytExpiryRaw);
    ytExpiryDate.setHours(0, 0, 0, 0);
    const ytDays = Math.max(0, Math.ceil((ytExpiryDate - today) / (1000 * 60 * 60 * 24)));
    ytRemainingDays = Math.min(remainingDays, ytDays);
  }

  // Update days remaining display
  const daysEl = document.getElementById('daysRemaining');
  if (daysEl) {
    daysEl.textContent = `${remainingDays} ${t('daysUnit')}`;
  }

  // YT calculations
  // YT quantity = buy value / YT price
  const ytQuantity = ytPrice > 0 ? ytBuyValue / ytPrice : 0;
  // YT daily points = YT quantity × (daily points per token / 24) × 24 simplified:
  // Points formula: YT points = YT quantity × holding hours × (daily_points_per_token / 24) × multiplier
  // Simplified for full-day holding: YT daily points = YT quantity × multiplier
  const ytDailyPoints = ytQuantity * ytMultiplier;
  // Total YT points until season end
  const ytTotalPoints = ytDailyPoints * ytRemainingDays;

  // Calculate total daily points from positions + YT only
  const positionDailyTotal = getPositionsDailyTotal();
  const totalDailyPoints = positionDailyTotal + ytDailyPoints;

  const currentDailyInput = document.getElementById('currentDailyPoints');
  if (currentDailyInput) {
    currentDailyInput.value = totalDailyPoints.toFixed(0);
  }

  // Calculate total investment (positions + YT buy value)
  const totalInvestment = getPositionsTotalInvestment() + ytBuyValue;

  // My total points at season end
  const nonYtPointsToEnd = positionDailyTotal * remainingDays;
  const ytPointsToEnd = ytDailyPoints * ytRemainingDays;
  const myTotalPoints = currentPoints + nonYtPointsToEnd + ytPointsToEnd;

  // Network total points at season end:
  // when live total exists, compound it by daily growth until season end
  const liveNetworkPoints = (typeof LIVE !== 'undefined' && typeof LIVE.points === 'number') ? LIVE.points : null;
  const growthRate = Math.max(0, dailyGrowthRate) / 100;

  let networkIncrementalPoints = 0;
  if (networkCurrentDaily > 0 && dailyGrowthRate > 0) {
    const r = 1 + dailyGrowthRate / 100;
    networkIncrementalPoints = networkCurrentDaily * (Math.pow(r, remainingDays) - 1) / (r - 1);
  } else if (networkCurrentDaily > 0) {
    networkIncrementalPoints = networkCurrentDaily * remainingDays;
  }

  let networkTotalPoints = 0;
  if (liveNetworkPoints !== null) {
    networkTotalPoints = liveNetworkPoints * Math.pow(1 + growthRate, remainingDays);
  } else if (networkIncrementalPoints > 0) {
    networkTotalPoints = networkIncrementalPoints;
  } else {
    networkTotalPoints = myTotalPoints * 100;
  }

  // Airdrop pool value
  const airdropPool = fdv * (airdropPercent / 100);

  // Value per 1M points
  const valuePerMillion = networkTotalPoints > 0
    ? (airdropPool / networkTotalPoints) * 1_000_000
    : 0;

  // My airdrop value
  const myAirdropValue = networkTotalPoints > 0
    ? airdropPool * (myTotalPoints / networkTotalPoints)
    : 0;

  // APY based on profit and remaining time to season end
  const profitRate = totalInvestment > 0 ? (myAirdropValue / totalInvestment) : 0;
  const annualFactor = remainingDays > 0 ? (365 / remainingDays) : 0;
  const roi = (totalInvestment > 0 && remainingDays > 0)
    ? (Math.pow(1 + profitRate, annualFactor) - 1) * 100
    : 0;

  // YT-specific airdrop value
  const ytAirdropValue = networkTotalPoints > 0
    ? airdropPool * (ytTotalPoints / networkTotalPoints)
    : 0;

  // YT ROI
  const ytProfitRate = ytBuyValue > 0 ? (ytAirdropValue / ytBuyValue) : 0;
  const ytRoi = (ytBuyValue > 0 && remainingDays > 0)
    ? (Math.pow(1 + ytProfitRate, annualFactor) - 1) * 100
    : 0;

  return {
    remainingDays,
    positionDailyTotal,
    totalDailyPoints,
    totalInvestment,
    myTotalPoints,
    networkTotalPoints,
    airdropPool,
    valuePerMillion,
    myAirdropValue,
    roi,
    // YT specific
    ytQuantity,
    ytDailyPoints,
    ytTotalPoints,
    ytAirdropValue,
    ytRoi,
  };
}

function updateResults() {
  const r = calculateResults();

  if (typeof renderLiveMetrics === 'function') {
    renderLiveMetrics();
  }

  animateValue('result_valuePerMillion', r.valuePerMillion, 'currency');
  animateValue('result_myTotalPoints', r.myTotalPoints, 'number');
  animateValue('result_networkTotalPoints', r.networkTotalPoints, 'number');
  animateValue('result_myAirdropValue', r.myAirdropValue, 'currency');
  animateValue('result_roi', r.roi, 'percent');

  // YT result cards
  animateValue('result_ytTotalPoints', r.ytTotalPoints, 'number');
  animateValue('result_ytAirdropValue', r.ytAirdropValue, 'currency');

  // Update sub-info
  const investEl = document.getElementById('result_totalInvestment');
  if (investEl) {
    investEl.textContent = `${t('totalInvestment')}: $${formatNumber(r.totalInvestment, 0)}`;
  }

  const ytContribEl = document.getElementById('result_ytContribution');
  if (ytContribEl) {
    ytContribEl.textContent = `YT ${t('yt_contribution')}: ${formatNumber(r.ytTotalPoints, 0)}`;
  }

  const ytRoiEl = document.getElementById('result_ytRoi');
  if (ytRoiEl) {
    ytRoiEl.textContent = `APY: ${formatNumber(r.ytRoi)}%`;
  }

  // Update YT display fields in the input section
  const ytQuantityEl = document.getElementById('ytQuantity');
  if (ytQuantityEl) {
    ytQuantityEl.textContent = formatNumber(r.ytQuantity, 4);
  }
  const ytDailyEl = document.getElementById('ytDailyPoints');
  if (ytDailyEl) {
    ytDailyEl.textContent = formatNumber(r.ytDailyPoints, 0);
  }
}

// Number formatting
function formatNumber(num, decimals = 2) {
  if (num === undefined || num === null || isNaN(num)) return '0';
  if (Math.abs(num) >= 1e12) {
    return (num / 1e12).toFixed(2) + 'T';
  }
  if (Math.abs(num) >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  }
  if (Math.abs(num) >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  }
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatDisplay(value, type) {
  switch (type) {
    case 'currency':
      return `≈ $${formatNumber(value)}`;
    case 'number':
      return formatNumber(value, 0);
    case 'percent':
      return `${formatNumber(value)}%`;
    default:
      return formatNumber(value);
  }
}

// Animation for number changes
const animationFrames = {};

function animateValue(elementId, targetValue, type) {
  const el = document.getElementById(elementId);
  if (!el) return;

  // Cancel previous animation
  if (animationFrames[elementId]) {
    cancelAnimationFrame(animationFrames[elementId]);
  }

  const startValue = parseFloat(el.dataset.currentValue) || 0;
  const diff = targetValue - startValue;

  if (Math.abs(diff) < 0.01) {
    el.textContent = formatDisplay(targetValue, type);
    el.dataset.currentValue = targetValue;
    return;
  }

  const duration = 600; // ms
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentValue = startValue + diff * eased;

    el.textContent = formatDisplay(currentValue, type);

    if (progress < 1) {
      animationFrames[elementId] = requestAnimationFrame(step);
    } else {
      el.textContent = formatDisplay(targetValue, type);
      el.dataset.currentValue = targetValue;
    }
  }

  animationFrames[elementId] = requestAnimationFrame(step);
}
