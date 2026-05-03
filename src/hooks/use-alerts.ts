'use client';

import { useState, useEffect, useCallback } from 'react';

interface Alert {
  id: string;
  coinId: string;
  coinName: string;
  symbol: string;
  targetPrice: number;
  condition: string;
  notificationType: string;
  isActive: boolean;
  createdAt: string;
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/alerts');
      if (res.ok) {
        const data = await res.json();
        setAlerts(data.alerts || []);
      }
    } catch (err) {
      setError('Failed to load alerts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const createAlert = async (data: {
    coinId: string;
    coinName: string;
    symbol: string;
    targetPrice: number;
    condition: string;
    notificationType: string;
  }) => {
    const res = await fetch('/api/alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const result = await res.json();
      setAlerts((prev) => [result.alert, ...prev]);
      return result;
    }
    throw new Error('Failed to create alert');
  };

  const toggleAlert = async (id: string) => {
    const alert = alerts.find((a) => a.id === id);
    if (!alert) return;

    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
  };

  const deleteAlert = async (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));

    try {
      await fetch(`/api/alerts/${id}`, { method: 'DELETE' });
    } catch {
      fetchAlerts();
    }
  };

  return { alerts, loading, error, createAlert, toggleAlert, deleteAlert, refresh: fetchAlerts };
}