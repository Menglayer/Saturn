/**
 * Saturn Airdrop Calculator - Internationalization
 */

const I18N = {
  zh: {
    title: '预估你的 $STRC 空投价值',
    subtitle: 'Saturn Gravity Points 空投计算器',
    
    // Card A
    cardA_title: '我的参数',
    currentPoints: '当前 Gravity Points',
    currentDailyPoints: '当前每日 Points',
    positions_title: '持仓详情',
    strategy: '策略类型',
    positionAmount: '持仓金额 (USD)',
    dailyPointsAuto: '每日积分',
    addPosition: '+ 添加仓位',
    removePosition: '删除',
    totalDailyFromPositions: '持仓每日总积分',
    
    // Pendle YT
    yt_title: 'YT 参数 (Pendle)',
    yt_type: 'YT 种类',
    yt_price: 'YT 单价 (USD)',
    yt_buyValue: '买入价值 (USD)',
    yt_quantity: 'YT 数量',
    yt_dailyPoints: 'YT 每日积分',
    yt_formula: '说明：YT 积分按 Season 剩余天数估算，并已扣除 Pendle 5% 积分抽水。',
    yt_totalMiles: 'YT 至结束可获 Points',
    yt_airdropValue: 'YT 预估空投价值 & ROI',
    yt_contribution: '贡献',
    
    // Card B
    cardB_title: '全网与假设',
    fdv: 'TGE 时 FDV (USD)',
    airdropPercent: '空投比例 (%)',
    dailyGrowthRate: '每日增速 (%)',
    networkCurrentDaily: '(备用) 全网当前每日 Points',
    networkCurrentDaily_hint: '仅实时总量不可用时使用',
    
    // Card C
    cardC_title: '时间与数据',
    seasonEndDate: 'Season 结束日期',
    daysRemaining: '距离今天',
    daysUnit: '天',
    seasonInfo: 'Season 1 于 2026/4/8 开始，结束于 8/8 或 TVL 达 $500M。',
    pointsFormula: '说明：每日积分 = 持仓金额 × 策略倍率。Pendle YT 需按实际 YT 数量计算。',
    
    // Results
    valuePerMillion: '1M Points 的预测价值',
    myTotalPoints: 'Season 结束时我的累计 Points',
    myTotalPoints_sub: '含当前积分 + 持仓累积',
    networkTotalPoints: '预测全网累计 (Season End)',
    networkTotalPoints_sub: '基于每日增速推算',
    myAirdropValue: '预估空投价值',
    roi: '积分 APY',
    pointsApyNote: '仅按仓位计算，不包含 YT',
    ytRoiCard: 'YT ROI',
    totalInvestment: '总投入',
    
    // Multiplier table
    multiplierTable_title: '积分倍率参考表',
    activity: '活动',
    pointsPerDay: 'Points/Day (per $1)',
    
    // Footer
    footer_version: '版本',
    footer_madeBy: '制作',
    footer_note: '本工具仅供参考，不构成投资建议。实际空投取决于项目方最终方案。',
    
    // Misc
    langSwitch: 'EN',
    showMultipliers: '查看倍率表',
    promoBanner: '速度加入 Saturn 吧',
    promoInviteLabel: '加成邀请码',
    promoHint: '邀请码使用位置：portfolio → Total Point下面 → Apply Ref',
    copyInvite: '点击复制',
    copySuccess: '复制成功',
    goPortfolio: '立即前往',
    livePoints: '当前积分总量',
    liveYtPrice: 'YT 实时价格',
    liveUpdating: '同步中',
    liveUnavailable: '暂不可用',
    fixedProtocolAssumption: '由协议假设固定',
    fixedSeasonBoundary: 'Season 结束边界固定',
  },
  
  en: {
    title: 'Estimate Your $STRC Airdrop Value',
    subtitle: 'Saturn Gravity Points Airdrop Calculator',
    
    // Card A
    cardA_title: 'My Parameters',
    currentPoints: 'Current Gravity Points',
    currentDailyPoints: 'Current Daily Points',
    positions_title: 'Position Details',
    strategy: 'Strategy Type',
    positionAmount: 'Position Amount (USD)',
    dailyPointsAuto: 'Daily Points',
    addPosition: '+ Add Position',
    removePosition: 'Remove',
    totalDailyFromPositions: 'Total Daily from Positions',
    
    // Pendle YT
    yt_title: 'YT Parameters (Pendle)',
    yt_type: 'YT Type',
    yt_price: 'YT Unit Price (USD)',
    yt_buyValue: 'Buy Value (USD)',
    yt_quantity: 'YT Quantity',
    yt_dailyPoints: 'YT Daily Points',
    yt_formula: 'Note: YT points are estimated through season end and already exclude Pendle\'s 5% points fee.',
    yt_totalMiles: 'YT Points Until Season End',
    yt_airdropValue: 'YT Est. Airdrop Value & ROI',
    yt_contribution: 'Contribution',
    
    // Card B
    cardB_title: 'Network Assumptions',
    fdv: 'FDV at TGE (USD)',
    airdropPercent: 'Airdrop Allocation (%)',
    dailyGrowthRate: 'Daily Growth Rate (%)',
    networkCurrentDaily: '(Fallback) Network Current Daily Points',
    networkCurrentDaily_hint: 'Used only if live total is unavailable',
    
    // Card C
    cardC_title: 'Time & Data',
    seasonEndDate: 'Season End Date',
    daysRemaining: 'Days Remaining',
    daysUnit: 'days',
    seasonInfo: 'Season 1 started Apr 8, 2026. Ends Aug 8 or when TVL hits $500M.',
    pointsFormula: 'Note: Daily Points = Position Amount × Strategy Multiplier. Pendle YT requires actual YT quantity.',
    
    // Results
    valuePerMillion: 'Estimated Value of 1M Points',
    myTotalPoints: 'My Total Points at Season End',
    myTotalPoints_sub: 'Including current + position accumulation',
    networkTotalPoints: 'Predicted Network Total (Season End)',
    networkTotalPoints_sub: 'Based on daily growth rate',
    myAirdropValue: 'Est. Airdrop Value',
    roi: 'Points APY',
    pointsApyNote: 'Position-only, excludes YT',
    ytRoiCard: 'YT ROI',
    totalInvestment: 'Total Investment',
    
    // Multiplier table
    multiplierTable_title: 'Points Multiplier Reference',
    activity: 'Activity',
    pointsPerDay: 'Points/Day (per $1)',
    
    // Footer
    footer_version: 'Version',
    footer_madeBy: 'Made by',
    footer_note: 'This tool is for reference only and does not constitute investment advice. Actual airdrop depends on the project\'s final plan.',
    
    // Misc
    langSwitch: '中',
    showMultipliers: 'Multiplier Table',
    promoBanner: 'Join Saturn now',
    promoInviteLabel: 'Bonus invite code',
    promoHint: 'Use it at: portfolio -> under Total Point -> Apply Ref',
    copyInvite: 'Click to copy',
    copySuccess: 'Copied',
    goPortfolio: 'Go Portfolio',
    livePoints: 'Current Total Points',
    liveYtPrice: 'Live YT Price',
    liveUpdating: 'Syncing',
    liveUnavailable: 'Unavailable',
    fixedProtocolAssumption: 'Fixed by protocol assumptions',
    fixedSeasonBoundary: 'Fixed season boundary',
  }
};

let currentLang = 'zh';

function t(key) {
  return I18N[currentLang][key] || key;
}

function toggleLang() {
  // Save current form values before re-rendering
  const savedValues = {};
  const fieldIds = ['currentPoints', 'currentDailyPoints', 'fdv', 'airdropPercent', 'dailyGrowthRate', 'networkCurrentDaily', 'seasonEndDate', 'ytType', 'ytPrice', 'ytBuyValue'];
  fieldIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) savedValues[id] = el.value;
  });

  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  renderAll();

  // Restore saved values
  fieldIds.forEach(id => {
    const el = document.getElementById(id);
    if (el && savedValues[id] !== undefined) el.value = savedValues[id];
  });

  updateResults();
}
