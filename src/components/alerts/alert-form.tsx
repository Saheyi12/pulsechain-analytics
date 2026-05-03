'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const coinOptions = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'solana', name: 'Solana', symbol: 'SOL' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
  { id: 'avalanche-2', name: 'Avalanche', symbol: 'AVAX' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
  { id: 'chainlink', name: 'Chainlink', symbol: 'LINK' },
];

const conditionOptions = [
  { value: 'ABOVE', label: 'Price Above' },
  { value: 'BELOW', label: 'Price Below' },
  { value: 'PERCENTAGE_CHANGE', label: '% Change (24h)' },
  { value: 'VOLUME_SPIKE', label: 'Volume Spike' },
];

const notificationOptions = [
  { value: 'EMAIL', label: 'Email', icon: '📧' },
  { value: 'PUSH', label: 'Push', icon: '🔔' },
  { value: 'SMS', label: 'SMS', icon: '📱' },
];

export function AlertForm({ onClose }: { onClose?: () => void }) {
  const [coinId, setCoinId] = useState('');
  const [condition, setCondition] = useState('ABOVE');
  const [targetPrice, setTargetPrice] = useState('');
  const [notificationType, setNotificationType] = useState('EMAIL');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!coinId || !targetPrice) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const selectedCoin = coinOptions.find((c) => c.id === coinId);

    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coinId,
          coinName: selectedCoin?.name || coinId,
          symbol: selectedCoin?.symbol || coinId.toUpperCase(),
          targetPrice: parseFloat(targetPrice),
          condition,
          notificationType,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose?.();
        }, 2000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to create alert');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="p-6 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-lg font-semibold mb-1">Alert Created!</h3>
        <p className="text-gray-400 text-sm">You will be notified when conditions are met.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Create Price Alert</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Coin Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Coin</label>
          <select
            value={coinId}
            onChange={(e) => setCoinId(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
            required
          >
            <option value="">Select a coin...</option>
            {coinOptions.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Condition</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {conditionOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Target Price */}
        <Input
          label="Target Price (USD)"
          type="number"
          step="0.01"
          min="0"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          placeholder="50000"
          required
        />

        {/* Preview */}
        {coinId && targetPrice && (
          <div className="p-3 bg-gray-800/50 rounded-lg text-sm">
            <span className="text-gray-400">Alert when </span>
            <span className="text-white font-medium">
              {coinOptions.find((c) => c.id === coinId)?.name || coinId}
            </span>
            <span className="text-gray-400"> price goes </span>
            <span className="text-white font-medium">
              {condition.replace('_', ' ').toLowerCase()}
            </span>
            <span className="text-gray-400"> </span>
            <span className="text-white font-medium">${parseFloat(targetPrice).toLocaleString()}</span>
          </div>
        )}

        {/* Notification Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Notify via</label>
          <div className="grid grid-cols-3 gap-2">
            {notificationOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setNotificationType(opt.value)}
                className={`p-3 rounded-lg border text-center transition ${
                  notificationType === opt.value
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-gray-700 text-gray-400 hover:border-gray-500'
                }`}
              >
                <div className="text-lg">{opt.icon}</div>
                <div className="text-xs mt-1">{opt.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <Button type="submit" loading={loading} className="flex-1">
            Create Alert
          </Button>
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}