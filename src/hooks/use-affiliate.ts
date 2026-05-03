'use client';

import { useState, useEffect } from 'react';

interface AffiliateData {
  referralCode: string;
  referralLink: string;
  tier: string;
  commissionRate: number;
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
}

interface EarningsData {
  totalEarnings: number;
  pendingEarnings: number;
  thisMonth: number;
  lastMonth: number;
  referrals: any[];
  history: any[];
}

export function useAffiliate() {
  const [affiliate, setAffiliate] = useState<AffiliateData | null>(null);
  const [earnings, setEarnings] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [linkRes, earningsRes] = await Promise.all([
          fetch('/api/affiliate/link'),
          fetch('/api/affiliate/earnings'),
        ]);

        if (linkRes.ok) setAffiliate(await linkRes.json());
        if (earningsRes.ok) setEarnings(await earningsRes.json());
      } catch (err) {
        console.error('Failed to load affiliate data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const requestPayout = async (amount: number, method: string, address: string) => {
    const res = await fetch('/api/affiliate/payout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, method, address }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Payout request failed');
    }

    return res.json();
  };

  return { affiliate, earnings, loading, requestPayout };
}