/**
 * Saturn Airdrop Calculator - Constants
 * Gravity Points multipliers, defaults, and configuration
 */

const STRATEGIES = [
  { id: 'hold_usdat_eth',      label_zh: '持有 USDat (Ethereum)',                     label_en: 'Hold USDat (Ethereum)',                     multiplier: 7,   category: 'saturn' },
  { id: 'hold_susdat_eth',     label_zh: '持有 sUSDat (Ethereum)',                    label_en: 'Hold sUSDat (Ethereum)',                    multiplier: 1,   category: 'saturn' },
  { id: 'hold_usdat_bnb',      label_zh: '持有 USDat (BNB Chain)',                    label_en: 'Hold USDat (BNB Chain)',                    multiplier: 9,   category: 'saturn' },
  { id: 'hold_susdat_bnb',     label_zh: '持有 sUSDat (BNB Chain)',                   label_en: 'Hold sUSDat (BNB Chain)',                   multiplier: 1.2, category: 'saturn' },

  { id: 'curve_lp_usdc_usdat', label_zh: 'Curve LP - USDC/USDat',                      label_en: 'Curve LP - USDC/USDat',                      multiplier: 20,  category: 'curve' },
  { id: 'curve_stake_usdat',   label_zh: 'Stake Curve LP - USDC/USDat',                label_en: 'Stake Curve LP - USDC/USDat',                multiplier: 20,  category: 'curve' },
  { id: 'curve_lp_usdc_susdat',label_zh: 'Curve LP - USDC/sUSDat',                     label_en: 'Curve LP - USDC/sUSDat',                     multiplier: 18,  category: 'curve' },
  { id: 'curve_stake_susdat',  label_zh: 'Stake Curve LP - USDC/sUSDat',               label_en: 'Stake Curve LP - USDC/sUSDat',               multiplier: 18,  category: 'curve' },

  { id: 'pcs_lp_usdt_usdat',   label_zh: 'Pancake LP - USDT/USDat (仅 USDat)',          label_en: 'Pancake LP - USDT/USDat (USDat only)',        multiplier: 48,  category: 'pancakeswap' },
  { id: 'pcs_lp_usdt_susdat',  label_zh: 'Pancake LP - USDT/sUSDat (仅 sUSDat)',        label_en: 'Pancake LP - USDT/sUSDat (sUSDat only)',      multiplier: 48,  category: 'pancakeswap' },

  { id: 'pendle_lp_usdat',     label_zh: 'Pendle LP - USDat',                          label_en: 'Pendle LP - USDat',                          multiplier: 15,  category: 'pendle' },
  { id: 'pendle_yt_usdat',     label_zh: 'Pendle 持有 YT-USDat',                        label_en: 'Pendle Hold YT-USDat',                       multiplier: 30,  category: 'pendle' },
  { id: 'pendle_lp_susdat',    label_zh: 'Pendle LP - sUSDat',                         label_en: 'Pendle LP - sUSDat',                         multiplier: 5,   category: 'pendle' },
  { id: 'pendle_yt_susdat',    label_zh: 'Pendle 持有 YT-sUSDat',                       label_en: 'Pendle Hold YT-sUSDat',                      multiplier: 10,  category: 'pendle' },
  { id: 'pendle_lp_srusdat',   label_zh: 'Pendle LP - srUSDat',                         label_en: 'Pendle LP - srUSDat',                        multiplier: 7.5, category: 'pendle' },
  { id: 'pendle_yt_srusdat',   label_zh: 'Pendle 持有 YT-srUSDat',                      label_en: 'Pendle Hold YT-srUSDat',                     multiplier: 15,  category: 'pendle' },
  { id: 'pendle_lp_jrusdat',   label_zh: 'Pendle LP - jrUSDat',                         label_en: 'Pendle LP - jrUSDat',                        multiplier: 5,   category: 'pendle' },
  { id: 'pendle_yt_jrusdat',   label_zh: 'Pendle 持有 YT-jrUSDat',                      label_en: 'Pendle Hold YT-jrUSDat',                     multiplier: 10,  category: 'pendle' },

  { id: 'morpho_supply',       label_zh: 'Morpho 抵押 sUSDat',                          label_en: 'Morpho Supply sUSDat as Collateral',         multiplier: 2,   category: 'morpho' },
  { id: 'morpho_lend',         label_zh: 'Morpho 出借 AUSD',                            label_en: 'Morpho Lend AUSD',                           multiplier: 1,   category: 'morpho' },

  { id: 'strata_hold_srusdat', label_zh: '持有 srUSDat (Strata)',                        label_en: 'Hold srUSDat (Strata)',                      multiplier: 1,   category: 'strata' },
  { id: 'strata_hold_jrusdat', label_zh: '持有 jrUSDat (Strata)',                        label_en: 'Hold jrUSDat (Strata)',                      multiplier: 3,   category: 'strata' },
];

const DEFAULTS = {
  currentPoints: 0,
  currentDailyPoints: 0,
  positionAmount: 1000,
  fdv: 200_000_000,
  airdropPercent: 5,
  dailyGrowthRate: 3,
  networkCurrentDaily: 0,
  seasonEndDate: '2026-08-08',
  seasonStartDate: '2026-04-08',
};

const YT_MARKETS = {
  yt_usdat: {
    label: 'YT-USDat',
    multiplier: 30,
    market: '0x9afe7a057a09cf5da748d952078c9c99938b4329',
  },
  yt_susdat: {
    label: 'YT-sUSDat',
    multiplier: 10,
    market: '0x91bc86899c8391b6caaf26535b9cd82efe49a189',
  },
  yt_jrusdat: {
    label: 'YT-jrUSDat',
    multiplier: 10,
    market: '0x8cef2919a8cb98ad74e1e12392bc9f9fc4e3270a',
  },
  yt_srusdat: {
    label: 'YT-srUSDat',
    multiplier: 15,
    market: '0x4237a8acbd0b5a2dec4aa83b1fd83f20162d02b8',
  },
};

const CATEGORY_COLORS = {
  saturn:      '#f0b90b',
  curve:       '#00d4aa',
  pancakeswap: '#f97316',
  pendle:      '#5b7dff',
  morpho:      '#a855f7',
  strata:      '#22c55e',
};
