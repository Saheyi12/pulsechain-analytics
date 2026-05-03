'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';

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

const demoAlerts: Alert[] = [
  {
    id: '1',
    coinId: 'bitcoin',
    coinName: 'Bitcoin',
    symbol: 'BTC',
    targetPrice: 50000,
    condition: 'ABOVE',
    notificationType: 'EMAIL',
    isActive: true,
    createdAt: '2024-03-10T10:30:00Z',
  },
  {
    id: '2',
    coinId: 'ethereum',
    coinName: 'Ethereum',
    symbol: 'ETH',
    targetPrice: 2000,
    condition: 'BELOW',
    notificationType: 'EMAIL',
    isActive: true,
    createdAt: '2024-03-08T14:15:00Z',
  },
  {
    id: '3',
    coinId: 'solana',
    coinName: 'Solana',
    symbol: 'SOL',
    targetPrice: 150,
    condition: 'ABOVE',
    notificationType: 'PUSH',
    isActive: false,
    createdAt: '2024-03-05T09:00:00Z',
  },
];

const notificationIcons: Record<string, string> = {
  EMAIL: '📧',
  PUSH: '🔔',
  SMS: '📱',
};

const conditionLabels: Record<string, string> = {
  ABOVE: 'above',
  BELOW: 'below',
  PERCENTAGE_CHANGE: 'changes by',
  VOLUME_SPIKE: 'volume spikes',
};

export function AlertList() {
  const [alerts, setAlerts] = useState<Alert[]>(demoAlerts);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const toggleAlert = (id: string) => {
    setAlerts(
      alerts.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const filtered = alerts.filter((a) => {
    if (filter === 'active') return a.isActive;
    if (filter === 'inactive') return !a.isActive;
    return true;
  });

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Your Alerts</h2>
        <div className="flex gap-1">
          {(['all', 'active', 'inactive'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs rounded transition ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <div className="text-3xl mb-2">🔔</div>
          <p>No {filter !== 'all' ? filter : ''} alerts found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border transition ${
                alert.isActive
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-gray-800/20 border-gray-700/50 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Toggle
                    pressed={alert.isActive}
                    onPressedChange={() => toggleAlert(alert.id)}
                    size="sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{alert.coinName}</span>
                      <Badge variant="default">{alert.symbol}</Badge>
                      <span className="text-sm text-gray-400">
                        {notificationIcons[alert.notificationType]}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">
                      When price goes{' '}
                      <span className="text-white">
                        {conditionLabels[alert.condition]}
                      </span>{' '}
                      <span className="text-white font-medium">
                        ${alert.targetPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {new Date(alert.createdAt).toLocaleDateString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteAlert(alert.id)}
                    className="text-gray-500 hover:text-red-400"
                  >
                    ✕
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}