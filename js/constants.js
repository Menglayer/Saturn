/**
 * Saturn Airdrop Calculator - Constants
 * Gravity Points multipliers, defaults, and configuration
 */

const STRATEGIES = [
  { id: 'hold_usdat',        label_zh: '持有 USDat',                        label_en: 'Hold USDat',                        multiplier: 7,  category: 'hold' },
  { id: 'hold_susdat',       label_zh: '持有 sUSDat',                       label_en: 'Hold sUSDat',                       multiplier: 1,  category: 'hold' },
  { id: 'curve_usdc_usdat',  label_zh: 'Curve LP - USDC/USDat',             label_en: 'Curve LP - USDC/USDat',             multiplier: 20, category: 'curve' },
  { id: 'curve_usdc_susdat', label_zh: 'Curve LP - USDC/sUSDat',            label_en: 'Curve LP - USDC/sUSDat',            multiplier: 18, category: 'curve' },
  { id: 'pendle_lp_usdat',   label_zh: 'Pendle LP - USDat',                 label_en: 'Pendle LP - USDat',                 multiplier: 15, category: 'pendle' },
  { id: 'pendle_lp_susdat',  label_zh: 'Pendle LP - sUSDat',                label_en: 'Pendle LP - sUSDat',                multiplier: 5,  category: 'pendle' },
  { id: 'morpho_supply',     label_zh: 'Morpho Supply sUSDat (Flowdesk)',    label_en: 'Morpho Supply sUSDat (Flowdesk)',    multiplier: 2,  category: 'morpho' },
  { id: 'morpho_lend',       label_zh: 'Morpho Lend AUSD (Flowdesk RWA)',   label_en: 'Morpho Lend AUSD (Flowdesk RWA)',   multiplier: 1,  category: 'morpho' },
];

const DEFAULTS = {
  currentPoints: 0,
  currentDailyPoints: 0,
  positionAmount: 1000,
  fdv: 200_000_000,
  airdropPercent: 5,
  dailyGrowthRate: 2.5,
  networkCurrentDaily: 0,
  seasonEndDate: '2026-08-08',
  seasonStartDate: '2026-04-08',
};

const CATEGORY_COLORS = {
  hold:   '#f0b90b',
  curve:  '#00d4aa',
  pendle: '#5b7dff',
  morpho: '#a855f7',
};
