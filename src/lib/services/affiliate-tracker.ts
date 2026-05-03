interface AffiliateStats {
  referralCode: string;
  referralLink: string;
  tier: string;
  commissionRate: number;
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
}

interface ReferralRecord {
  id: string;
  email: string;
  status: 'ACTIVE' | 'PENDING' | 'CHURNED';
  commission: number;
  joinedAt: string;
  trades: number;
}

export async function getAffiliateStats(userId: string): Promise<AffiliateStats> {
  return {
    referralCode: 'DEMO2024',
    referralLink: `https://pulsechain-analytics.vercel.app/?ref=DEMO2024`,
    tier: 'SILVER',
    commissionRate: 30,
    totalReferrals: 25,
    activeReferrals: 18,
    totalEarnings: 250.50,
    pendingEarnings: 45.75,
  };
}

export async function getReferrals(userId: string): Promise<ReferralRecord[]> {
  return [
    { id: '1', email: 'trader1@email.com', status: 'ACTIVE', commission: 12.50, joinedAt: '2024-03-10', trades: 15 },
    { id: '2', email: 'investor2@email.com', status: 'ACTIVE', commission: 8.75, joinedAt: '2024-03-08', trades: 8 },
    { id: '3', email: 'crypto3@email.com', status: 'PENDING', commission: 0, joinedAt: '2024-03-12', trades: 0 },
    { id: '4', email: 'trader4@email.com', status: 'ACTIVE', commission: 25.00, joinedAt: '2024-03-05', trades: 32 },
  ];
}

export function calculateTier(referralCount: number): { tier: string; rate: number } {
  if (referralCount >= 101) return { tier: 'PLATINUM', rate: 50 };
  if (referralCount >= 51) return { tier: 'GOLD', rate: 40 };
  if (referralCount >= 11) return { tier: 'SILVER', rate: 30 };
  return { tier: 'BRONZE', rate: 20 };
}

export function getTierProgress(currentRefs: number, currentTier: string): { nextTier: string; needed: number; progress: number } {
  const tiers = [
    { name: 'BRONZE', min: 0 },
    { name: 'SILVER', min: 11 },
    { name: 'GOLD', min: 51 },
    { name: 'PLATINUM', min: 101 },
  ];

  const currentIndex = tiers.findIndex((t) => t.name === currentTier);
  if (currentIndex >= tiers.length - 1) {
    return { nextTier: 'MAX', needed: 0, progress: 100 };
  }

  const nextTier = tiers[currentIndex + 1];
  const currentMin = tiers[currentIndex].min;
  const needed = nextTier.min - currentRefs;
  const progress = ((currentRefs - currentMin) / (nextTier.min - currentMin)) * 100;

  return {
    nextTier: nextTier.name,
    needed,
    progress: Math.min(Math.max(progress, 0), 100),
  };
}

export function generateReferralCode(userId: string): string {
  const prefix = 'PULSE';
  const hash = userId.substring(0, 6).toUpperCase();
  return `${prefix}${hash}`;
}