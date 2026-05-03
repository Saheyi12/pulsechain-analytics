export const pricingTiers = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'For casual crypto enthusiasts',
    features: [
      'Real-time price tracking',
      'Basic portfolio tracker',
      '5 price alerts',
      '10 watchlist coins',
      'Basic charts',
      'Community support',
    ],
    limitations: [
      'No AI predictions',
      'No wallet sync',
      'Limited alerts',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: 9.99,
    period: 'month',
    description: 'For serious traders and investors',
    features: [
      'Everything in Free',
      'AI price predictions',
      'Unlimited alerts',
      'Portfolio analytics',
      'Whale tracking',
      'Wallet sync (read-only)',
      'Priority support',
    ],
    limitations: [],
    cta: 'Start Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 49.99,
    period: 'month',
    description: 'For professional traders and teams',
    features: [
      'Everything in Pro',
      'Custom AI models',
      'API access (1000 req/min)',
      'Tax report generation',
      'Cross-chain swaps',
      'Dedicated account manager',
      'White-label options',
      'SLA guarantee',
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false,
  },
];

export const affiliateTiers = [
  {
    name: 'BRONZE',
    icon: '🥉',
    rate: 20,
    minRefs: 0,
    maxRefs: 10,
    color: 'from-amber-600 to-amber-400',
  },
  {
    name: 'SILVER',
    icon: '🥈',
    rate: 30,
    minRefs: 11,
    maxRefs: 50,
    color: 'from-gray-400 to-gray-300',
  },
  {
    name: 'GOLD',
    icon: '🥇',
    rate: 40,
    minRefs: 51,
    maxRefs: 100,
    color: 'from-yellow-500 to-yellow-300',
  },
  {
    name: 'PLATINUM',
    icon: '💎',
    rate: 50,
    minRefs: 101,
    maxRefs: Infinity,
    color: 'from-purple-500 to-purple-300',
  },
];

export function getAffiliateTier(referralCount: number) {
  for (let i = affiliateTiers.length - 1; i >= 0; i--) {
    if (referralCount >= affiliateTiers[i].minRefs) {
      return affiliateTiers[i];
    }
  }
  return affiliateTiers[0];
}

export function getNextTier(referralCount: number) {
  for (const tier of affiliateTiers) {
    if (referralCount < tier.minRefs) {
      return tier;
    }
  }
  return null;
}