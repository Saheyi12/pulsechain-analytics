'use client';

import { useState, useEffect } from 'react';

interface Prediction {
  coinId: string;
  currentPrice: number;
  predictions: {
    date: string;
    price: number;
    lowerBound: number;
    upperBound: number;
    confidence: number;
  }[];
  summary: {
    predictedPrice: number;
    priceChange: number;
    priceChangePercent: number;
    trend: string;
    strength: string;
    confidenceScore: number;
  };
}

interface UsePredictionsReturn {
  predictions: Prediction[];
  loading: boolean;
  error: string | null;
  selectedCoin: string | null;
  setSelectedCoin: (coinId: string) => void;
  days: number;
  setDays: (days: number) => void;
}

export function usePredictions(initialDays: number = 7): UsePredictionsReturn {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const [days, setDays] = useState(initialDays);

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = selectedCoin
          ? `/api/predictions/${selectedCoin}?days=${days}`
          : `/api/predictions?limit=10`;
        
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch predictions');
        
        const data = await res.json();
        setPredictions(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load predictions');
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [selectedCoin, days]);

  return { predictions, loading, error, selectedCoin, setSelectedCoin, days, setDays };
}

export function usePrediction(coinId: string, days: number = 7) {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/predictions/${coinId}?days=${days}`);
        if (res.ok) {
          const data = await res.json();
          setPrediction(data);
        }
      } catch (err) {
        console.error('Failed to fetch prediction:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [coinId, days]);

  return { prediction, loading };
}