export const SITE = {
  name: 'PulseChain Analytics',
  shortName: 'PulseChain',
  description: 'AI-powered cryptocurrency analytics with price predictions and market insights.',
  url: 'https://pulsechain-analytics.vercel.app',
  twitter: '@pulsechain',
  email: 'hello@pulsechain.ai',
} as const;

export const API = {
  COINGECKO_BASE: 'https://api.coingecko.com/api/v3',
  COINGECKO_DEMO: 'https://api.coingecko.com/api/v3',
  CACHE_TTL: 30,
  RATE_LIMIT: 100,
  RATE_LIMIT_AUTH: 300,
} as const;

export const CRYPTO = {
  TOP_COINS_LIMIT: 100,
  DEFAULT_CURRENCY: 'usd',
  REFRESH_INTERVAL: 30000,
  CHART_PERIODS: ['1H', '24H', '7D', '30D', '90D', '1Y', 'ALL'] as const,
} as const;

export const AFFILIATE = {
  MIN_PAYOUT: 10,
  PROCESSING_TIME: '48 hours',
  TIERS: [
    { name: 'BRONZE', minRefs: 0, rate: 20 },
    { name: 'SILVER', minRefs: 11, rate: 30 },
    { name: 'GOLD', minRefs: 51, rate: 40 },
    { name: 'PLATINUM', minRefs: 101, rate: 50 },
  ],
} as const;

export const BLOG = {
  POSTS_PER_PAGE: 9,
  AUTO_GENERATE_TIME: '00:00 UTC',
  CATEGORIES: [
    'MARKET_ANALYSIS',
    'TECHNICAL_ANALYSIS',
    'DEFI',
    'NFT',
    'TUTORIAL',
    'NEWS',
    'PREDICTION',
  ] as const,
} as const;

export const NAVIGATION = {
  main: [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/predictions', label: 'Predictions' },
    { href: '/blog', label: 'Blog' },
    { href: '/affiliate', label: 'Affiliate' },
  ],
  dashboard: [
    { href: '/dashboard', label: 'Overview', icon: '📊' },
    { href: '/dashboard/portfolio', label: 'Portfolio', icon: '💼' },
    { href: '/dashboard/predictions', label: 'Predictions', icon: '🤖' },
    { href: '/dashboard/alerts', label: 'Alerts', icon: '🔔' },
    { href: '/dashboard/watchlist', label: 'Watchlist', icon: '⭐' },
    { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  ],
} as const;