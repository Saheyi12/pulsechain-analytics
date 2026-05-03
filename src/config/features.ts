export const FeatureFlags = {
  // Phase 1: Core (Always ON)
  CORE_DASHBOARD: { enabled: true, description: 'Main dashboard with market overview' },
  COIN_TRACKING: { enabled: true, description: 'Real-time coin price tracking' },
  BASIC_SEARCH: { enabled: true, description: 'Coin search functionality' },
  PRICE_CHARTS: { enabled: true, description: 'Interactive price charts' },
  
  // Phase 1: Differentiation
  AI_PREDICTIONS: { enabled: true, description: 'AI-powered price predictions' },
  PERSONALIZED_ALERTS: { enabled: true, description: 'Custom price alerts' },
  PORTFOLIO_TRACKER: { enabled: true, description: 'Portfolio management' },
  WATCHLIST: { enabled: true, description: 'Coin watchlist' },
  
  // Phase 2: Growth
  BLOG_AUTOMATION: { enabled: true, description: 'AI-generated blog posts' },
  AFFILIATE_PROGRAM: { enabled: true, description: 'Referral and commission system' },
  NEWSLETTER: { enabled: false, description: 'Email newsletter subscription' },
  SOCIAL_LOGIN: { enabled: false, description: 'Google/GitHub OAuth login' },
  
  // Phase 3: Advanced
  WALLET_SYNC: { enabled: false, description: 'Read-only wallet portfolio sync' },
  WHALE_TRACKING: { enabled: false, description: 'Large transaction monitoring' },
  CROSS_CHAIN_SWAP: { enabled: false, description: 'Cross-chain swap widget' },
  TAX_REPORTS: { enabled: false, description: 'Tax document generation' },
  
  // Phase 4: Premium
  MCP_SERVER: { enabled: false, description: 'Model Context Protocol for AI agents' },
  COPY_TRADING: { enabled: false, description: 'Social trading signals' },
  API_MARKETPLACE: { enabled: false, description: 'Developer API marketplace' },
  GAMIFICATION: { enabled: false, description: 'Learning rewards system' },
  
  // Monetization
  SHOW_AFFILIATE_LINKS: { enabled: true, description: 'Display affiliate links' },
  PREMIUM_FEATURES: { enabled: false, description: 'Paid tier features' },
  ADS_ENABLED: { enabled: false, description: 'Display advertisements' },
} as const;

export type FeatureName = keyof typeof FeatureFlags;

export function isEnabled(feature: FeatureName): boolean {
  const flag = FeatureFlags[feature];
  if (!flag) return false;
  
  if (typeof window !== 'undefined') {
    const override = localStorage.getItem(`feature:${feature}`);
    if (override !== null) return override === 'true';
  }
  
  return flag.enabled;
}

export function getFeatureDescription(feature: FeatureName): string {
  return FeatureFlags[feature]?.description || 'No description available';
}

export function getAllFeatures() {
  return Object.entries(FeatureFlags).map(([key, value]) => ({
    name: key,
    enabled: isEnabled(key as FeatureName),
    description: value.description,
  }));
}