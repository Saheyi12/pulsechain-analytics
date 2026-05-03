export const FeatureFlags = {
  CORE_DASHBOARD: true,
  COIN_TRACKING: true,
  BASIC_SEARCH: true,
  PRICE_CHARTS: true,
  AI_PREDICTIONS: true,
  PERSONALIZED_ALERTS: true,
  PORTFOLIO_TRACKER: true,
  WATCHLIST: true,
  BLOG_AUTOMATION: true,
  AFFILIATE_PROGRAM: true,
  NEWSLETTER: false,
  SOCIAL_LOGIN: false,
  WALLET_SYNC: false,
  WHALE_TRACKING: false,
  CROSS_CHAIN_SWAP: false,
  TAX_REPORTS: false,
  MCP_SERVER: false,
  COPY_TRADING: false,
  API_MARKETPLACE: false,
  GAMIFICATION: false,
  SHOW_AFFILIATE_LINKS: true,
  PREMIUM_FEATURES: false,
  ADS_ENABLED: false,
} as const;

export type FeatureFlag = keyof typeof FeatureFlags;

export function isFeatureEnabled(feature: FeatureFlag): boolean {
  if (typeof window !== 'undefined') {
    const override = localStorage.getItem(`feature:${feature}`);
    if (override !== null) return override === 'true';
  }
  return FeatureFlags[feature] ?? false;
}

export function enableFeature(feature: FeatureFlag): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`feature:${feature}`, 'true');
  }
}

export function disableFeature(feature: FeatureFlag): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`feature:${feature}`, 'false');
  }
}

export function getAllFeatures(): Record<FeatureFlag, boolean> {
  const flags = {} as Record<FeatureFlag, boolean>;
  for (const key of Object.keys(FeatureFlags) as FeatureFlag[]) {
    flags[key] = isFeatureEnabled(key);
  }
  return flags;
}