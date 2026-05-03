'use client';

import { useState, useEffect, useCallback } from 'react';

interface Holding {
  id: string;
  coinId: string;
  coinName: string;
  symbol: string;
  amount: number;
  buyPrice: number;
  currentPrice: number;
  currentValue: number;
  invested: number;
  pnl: number;
  pnlPercent: number;
}

interface PortfolioData {
  holdings: Holding[];
  summary: {
    totalValue: number;
    totalInvested: number;
    totalPnl: number;
    totalPnlPercent: number;
    totalHoldings: number;
  };
}

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const data = await res.json();
        setPortfolio(data);
      }
    } catch (err) {
      setError('Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const addHolding = async (data: {
    coinId: string;
    coinName: string;
    symbol: string;
    amount: number;
    buyPrice: number;
  }) => {
    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      await fetchPortfolio();
      return res.json();
    }
    throw new Error('Failed to add holding');
  };

  const removeHolding = async (id: string) => {
    const res = await fetch(`/api/portfolio?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      await fetchPortfolio();
    }
  };

  return { portfolio, loading, error, addHolding, removeHolding, refresh: fetchPortfolio };
}