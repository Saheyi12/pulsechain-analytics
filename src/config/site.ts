export const siteConfig = {
  name: 'PulseChain Analytics',
  shortName: 'PulseChain',
  description: 'AI-powered cryptocurrency analytics platform with price predictions, portfolio tracking, and automated market insights.',
  url: 'https://pulsechain-analytics.vercel.app',
  ogImage: '/og-image.png',
  twitter: '@pulsechain',
  email: 'hello@pulsechain.ai',
  keywords: [
    'crypto analytics',
    'bitcoin price prediction',
    'cryptocurrency tracker',
    'AI crypto predictions',
    'crypto portfolio tracker',
    'crypto alerts',
    'defi analytics',
  ],
  creator: 'PulseChain Analytics',
  publisher: 'PulseChain Analytics',
  locale: 'en_US',
  themeColor: '#0F172A',
  accentColor: '#3B82F6',
};

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  aiServiceUrl: process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8000',
  coingeckoApiKey: process.env.COINGECKO_API_KEY || '',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  resendApiKey: process.env.RESEND_API_KEY || '',
};

export const limits = {
  maxAlerts: 20,
  maxWatchlist: 50,
  maxPortfolioHoldings: 100,
  blogPostsPerPage: 9,
  coinsPerPage: 50,
  predictionsPerPage: 10,
  rateLimit: 100,
  rateLimitAuth: 300,
};

export const cacheConfig = {
  priceTTL: 30,
  historicalTTL: 300,
  marketTTL: 60,
  trendingTTL: 300,
  globalTTL: 60,
  predictionTTL: 3600,
  sentimentTTL: 300,
};