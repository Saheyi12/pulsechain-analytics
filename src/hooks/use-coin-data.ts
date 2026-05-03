'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from './use-debounce';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume: number;
}

interface UseCoinDataReturn {
  coins: CoinData[];
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (value: string) => void;
  refresh: () => void;
}

export function useCoinData(limit: number = 20): UseCoinDataReturn {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const fetchCoins = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const url = debouncedSearch
        ? `/api/coins/search?q=${encodeURIComponent(debouncedSearch)}&limit=${limit}`
        : `/api/coins?limit=${limit}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch coins');
      
      const data = await res.json();
      setCoins(data.coins || data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load coins');
      setCoins([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, limit]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  return { coins, loading, error, search, setSearch, refresh: fetchCoins };
}

export function useCoinDetail(coinId: string) {
  const [coin, setCoin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!coinId) return;

    const fetchCoin = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/coins/${coinId}`);
        if (!res.ok) throw new Error('Coin not found');
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load coin');
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [coinId]);

  return { coin, loading, error };
}