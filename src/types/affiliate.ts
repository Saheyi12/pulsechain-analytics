export type AffiliateTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
export type ReferralStatus = 'ACTIVE' | 'PENDING' | 'CHURNED';
export type PayoutStatus = 'COMPLETED' | 'PENDING' | 'FAILED';
export type PayoutMethod = 'USDC' | 'USDT' | 'BTC' | 'ETH';

export interface AffiliateProfile {
  referralCode: string;
  referralLink: string;
  tier: AffiliateTier;
  commissionRate: number;
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  thisMonth: number;
  lastMonth: number;
}

export interface ReferralRecord {
  id: string;
  email: string;
  status: ReferralStatus;
  commission: number;
  joinedAt: string;
  trades: number;
}

export interface AffiliateEarnings {
  totalEarnings: number;
  pendingEarnings: number;
  paidEarnings: number;
  thisMonth: number;
  lastMonth: number;
  tier: AffiliateTier;
  commissionRate: number;
  referrals: ReferralRecord[];
  history: MonthlyEarning[];
}

export interface MonthlyEarning {
  month: string;
  referrals: number;
  earnings: number;
}

export interface Payout {
  id: string;
  amount: number;
  status: PayoutStatus;
  method: PayoutMethod;
  address: string;
  paidAt: string | null;
  txHash: string | null;
}

export interface PayoutRequest {
  amount: number;
  method: PayoutMethod;
  address: string;
}

export interface TierInfo {
  name: AffiliateTier;
  icon: string;
  rate: number;
  requirement: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface TierProgress {
  currentTier: AffiliateTier;
  nextTier: AffiliateTier | 'MAX';
  currentRefs: number;
  needed: number;
  progress: number;
}