/**
 * Saturn Airdrop Calculator - Constants
 * Gravity Points multipliers, defaults, and configuration
 */

const STRATEGIES = [
  { id: 'hold_usdat_eth',             label_zh: '持有 USDat (Ethereum)',                     label_en: 'Hold USDat (Ethereum)',                     multiplier: 7,   category: 'saturn' },
  { id: 'hold_susdat_eth',            label_zh: '持有 sUSDat (Ethereum)',                    label_en: 'Hold sUSDat (Ethereum)',                    multiplier: 1,   category: 'saturn' },
  { id: 'hold_usdat_bnb',             label_zh: '持有 USDat (BNB Chain)',                    label_en: 'Hold USDat (BNB Chain)',                    multiplier: 9,   category: 'saturn' },
  { id: 'hold_susdat_bnb',            label_zh: '持有 sUSDat (BNB Chain)',                   label_en: 'Hold sUSDat (BNB Chain)',                   multiplier: 1.2, category: 'saturn' },
  { id: 'hold_usdat_monad',           label_zh: '持有 USDat (Monad)',                        label_en: 'Hold USDat (Monad)',                        multiplier: 9,   category: 'saturn' },
  { id: 'hold_susdat_monad',          label_zh: '持有 sUSDat (Monad)',                       label_en: 'Hold sUSDat (Monad)',                       multiplier: 1.2, category: 'saturn' },

  { id: 'curve_lp_usdc_usdat',        label_zh: 'Curve LP - USDC/USDat',                     label_en: 'Curve LP - USDC/USDat',                     multiplier: 20,  category: 'curve' },
  { id: 'curve_stake_usdat',          label_zh: 'Stake Curve LP - USDC/USDat',               label_en: 'Stake Curve LP - USDC/USDat',               multiplier: 20,  category: 'curve' },
  { id: 'curve_lp_usdc_susdat',       label_zh: 'Curve LP - USDC/sUSDat',                    label_en: 'Curve LP - USDC/sUSDat',                    multiplier: 18,  category: 'curve' },
  { id: 'curve_stake_susdat',         label_zh: 'Stake Curve LP - USDC/sUSDat',              label_en: 'Stake Curve LP - USDC/sUSDat',              multiplier: 18,  category: 'curve' },

  { id: 'pcs_lp_usdt_usdat',          label_zh: 'Pancakeswap LP - USDT/USDat',               label_en: 'Pancakeswap LP - USDT/USDat',               multiplier: 24,  category: 'pancakeswap' },
  { id: 'pcs_lp_usdt_susdat',         label_zh: 'Pancakeswap LP - USDT/sUSDat',              label_en: 'Pancakeswap LP - USDT/sUSDat',              multiplier: 24,  category: 'pancakeswap' },

  { id: 'pendle_lp_usdat',            label_zh: 'Pendle LP - USDat (Ethereum)',              label_en: 'Pendle LP - USDat (Ethereum)',              multiplier: 15,  category: 'pendle' },
  { id: 'pendle_yt_usdat',            label_zh: 'Pendle 持有 YT-USDat (Ethereum)',            label_en: 'Pendle Hold YT-USDat (Ethereum)',           multiplier: 30,  category: 'pendle' },
  { id: 'pendle_lp_susdat',           label_zh: 'Pendle LP - sUSDat (Ethereum)',             label_en: 'Pendle LP - sUSDat (Ethereum)',             multiplier: 5,   category: 'pendle' },
  { id: 'pendle_yt_susdat',           label_zh: 'Pendle 持有 YT-sUSDat (Ethereum)',           label_en: 'Pendle Hold YT-sUSDat (Ethereum)',          multiplier: 10,  category: 'pendle' },
  { id: 'pendle_lp_srusdat',          label_zh: 'Pendle LP - srUSDat (Ethereum)',            label_en: 'Pendle LP - srUSDat (Ethereum)',            multiplier: 7.5, category: 'pendle' },
  { id: 'pendle_yt_srusdat',          label_zh: 'Pendle 持有 YT-srUSDat (Ethereum)',          label_en: 'Pendle Hold YT-srUSDat (Ethereum)',         multiplier: 15,  category: 'pendle' },
  { id: 'pendle_lp_jrusdat',          label_zh: 'Pendle LP - jrUSDat (Ethereum)',            label_en: 'Pendle LP - jrUSDat (Ethereum)',            multiplier: 5,   category: 'pendle' },
  { id: 'pendle_yt_jrusdat',          label_zh: 'Pendle 持有 YT-jrUSDat (Ethereum)',          label_en: 'Pendle Hold YT-jrUSDat (Ethereum)',         multiplier: 10,  category: 'pendle' },
  { id: 'pendle_lp_usdat_bnb',        label_zh: 'Pendle LP - USDat (BNB Chain)',             label_en: 'Pendle LP - USDat (BNB Chain)',             multiplier: 18,  category: 'pendle' },
  { id: 'pendle_yt_usdat_bnb',        label_zh: 'Pendle 持有 YT-USDat (BNB Chain)',           label_en: 'Pendle Hold YT-USDat (BNB Chain)',          multiplier: 36,  category: 'pendle' },
  { id: 'pendle_lp_susdat_bnb',       label_zh: 'Pendle LP - sUSDat (BNB Chain)',            label_en: 'Pendle LP - sUSDat (BNB Chain)',            multiplier: 6,   category: 'pendle' },
  { id: 'pendle_yt_susdat_bnb',       label_zh: 'Pendle 持有 YT-sUSDat (BNB Chain)',          label_en: 'Pendle Hold YT-sUSDat (BNB Chain)',         multiplier: 12,  category: 'pendle' },
  { id: 'pendle_lp_usdat_monad',      label_zh: 'Pendle LP - USDat (Monad)',                 label_en: 'Pendle LP - USDat (Monad)',                 multiplier: 19,  category: 'pendle' },
  { id: 'pendle_yt_usdat_monad',      label_zh: 'Pendle 持有 YT-USDat (Monad)',               label_en: 'Pendle Hold YT-USDat (Monad)',              multiplier: 38,  category: 'pendle' },

  { id: 'morpho_supply',              label_zh: 'Morpho 抵押 sUSDat',                        label_en: 'Morpho Supply sUSDat as Collateral',        multiplier: 2,   category: 'morpho' },
  { id: 'morpho_lend',                label_zh: 'Morpho 出借 AUSD (Flowdesk Vault)',          label_en: 'Morpho Lend AUSD (Flowdesk Vault)',         multiplier: 1,   category: 'morpho' },
  { id: 'morpho_lend_usdc_saturn',    label_zh: 'Morpho 出借 USDC (Saturn Vault)',            label_en: 'Morpho Lend USDC (Saturn Vault)',           multiplier: 1,   category: 'morpho' },

  { id: 'strata_hold_srusdat',        label_zh: '持有 srUSDat (Strata)',                      label_en: 'Hold srUSDat (Strata)',                     multiplier: 1,   category: 'strata' },
  { id: 'strata_hold_jrusdat',        label_zh: '持有 jrUSDat (Strata)',                      label_en: 'Hold jrUSDat (Strata)',                     multiplier: 3,   category: 'strata' },
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
    label: 'YT-USDat (Ethereum)',
    multiplier: 30,
    chainId: 1,
    hasBaseYield: false,
    expiry: '2026-08-27T00:00:00.000Z',
    market: '0x9afe7a057a09cf5da748d952078c9c99938b4329',
  },
  yt_susdat: {
    label: 'YT-sUSDat (Ethereum)',
    multiplier: 10,
    chainId: 1,
    hasBaseYield: true,
    baseApyFallback: 0.1374,
    expiry: '2026-08-27T00:00:00.000Z',
    market: '0x91bc86899c8391b6caaf26535b9cd82efe49a189',
  },
  yt_jrusdat: {
    label: 'YT-jrUSDat (Ethereum)',
    multiplier: 10,
    chainId: 1,
    hasBaseYield: true,
    baseApyFallback: 0.1847,
    expiry: '2026-08-27T00:00:00.000Z',
    market: '0x8cef2919a8cb98ad74e1e12392bc9f9fc4e3270a',
  },
  yt_srusdat: {
    label: 'YT-srUSDat (Ethereum)',
    multiplier: 15,
    chainId: 1,
    hasBaseYield: true,
    baseApyFallback: 0.05,
    expiry: '2026-08-27T00:00:00.000Z',
    market: '0x4237a8acbd0b5a2dec4aa83b1fd83f20162d02b8',
  },
  yt_usdat_bnb: {
    label: 'YT-USDat (BNB Chain)',
    multiplier: 36,
    chainId: 56,
    hasBaseYield: false,
    expiry: '2026-08-27T00:00:00.000Z',
    market: '0x9757834d0b31aa820b85f68705117691207152d9',
  },
  yt_susdat_bnb: {
    label: 'YT-sUSDat (BNB Chain)',
    multiplier: 12,
    chainId: 56,
    hasBaseYield: true,
    baseApyFallback: 0.1374,
    expiry: '2026-08-27T00:00:00.000Z',
    market: '0x1017e73ce9c219164ce841a980136eb023c55387',
  },
  yt_usdat_monad: {
    label: 'YT-USDat (Monad)',
    multiplier: 38,
    chainId: 143,
    hasBaseYield: false,
    expiry: '2026-08-27T00:00:00.000Z',
    market: '0x1519fb0d8885020387fcd6a67bc888a168a40afa',
  },
};

const ASPECTA_PREMARKET = {
  projectUrl: 'https://trade.aspecta.ai/projects/usdt/Saturn',
  assetApi: 'https://aspecta.ai/api/hermes/trading/assets?current_page=1&page_size=20&project_name=Saturn&visible=true',
  rpcUrls: [
    'https://bsc-rpc.publicnode.com',
    'https://bsc-dataseed.binance.org/',
    'https://1rpc.io/bnb',
    'https://bsc-mainnet.public.blastapi.io',
  ],
  fallbackAsset: {
    poolAddress: '0xa71F986F89Eb28A232AdDFd64dE29A7A0485f6e7',
    paymentTokenAddress: '0x55d398326f99059fF775485246999027B3197955',
    paymentTokenDecimals: 18,
    assetDecimals: 2,
  },
  selectors: {
    decimals: '0x313ce567',
    getCurrentPrice: '0xeb91d37e',
    getSettlementInfo: '0xe805156e',
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
