'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

const whaleMovements = [
  {
    id: '1',
    coin: 'Bitcoin',
    symbol: 'BTC',
    amount: 2500,
    value: 170_000_000,
    from: 'Unknown Wallet',
    to: 'Coinbase',
    type: 'inflow',
    timestamp: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: '2',
    coin: 'Ethereum',
    symbol: 'ETH',
    amount: 15000,
    value: 51_000_000,
    from: 'Binance',
    to: 'Unknown Wallet',
    type: 'outflow',
    timestamp: new Date(Date.now() - 900000).toISOString(),
  },
  {
    id: '3',
    coin: 'Solana',
    symbol: 'SOL',
    amount: 500000,
    value: 56_000_000,
    from: 'Unknown Wallet',
    to: 'Unknown Wallet',
    type: 'transfer',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
  },
];

const typeBadges: Record<string, { variant: 'success' | 'danger' | 'warning'; label: string }> = {
  inflow: { variant: 'danger', label: 'Exchange Inflow' },
  outflow: { variant: 'success', label: 'Exchange Outflow' },
  transfer: { variant: 'warning', label: 'Whale Transfer' },
};

export function WhaleAlertBanner() {
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (whaleMovements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % whaleMovements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!visible || whaleMovements.length === 0) return null;

  const movement = whaleMovements[currentIndex];
  const typeInfo = typeBadges[movement.type];

  return (
    <Card className="p-4 relative border-blue-500/30 bg-blue-500/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="text-2xl">🐋</div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm">{movement.coin}</span>
              <Badge variant="default">{movement.symbol}</Badge>
              <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>
            </div>
            <div className="text-sm text-gray-300">
              <span className="font-medium">
                {movement.amount.toLocaleString()} {movement.symbol}
              </span>
              <span className="text-gray-400 mx-1">•</span>
              <span>{formatCurrency(movement.value)}</span>
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              {movement.from} → {movement.to}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Time */}
          <span className="text-xs text-gray-500">
            {Math.floor((Date.now() - new Date(movement.timestamp).getTime()) / 60000)}m ago
          </span>

          {/* Close */}
          <button
            onClick={() => setVisible(false)}
            className="text-gray-500 hover:text-gray-300 transition"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Pagination dots */}
      {whaleMovements.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {whaleMovements.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition ${
                index === currentIndex ? 'bg-blue-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      )}

      {/* Auto-scroll indicator */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500/30 rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full transition-all"
          style={{
            width: `${((currentIndex + 1) / whaleMovements.length) * 100}%`,
          }}
        />
      </div>
    </Card>
  );
}