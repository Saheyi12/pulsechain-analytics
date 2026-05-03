'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';

const payouts = [
  { id: '1', amount: 150.00, status: 'COMPLETED', method: 'USDC', address: '0x1234...5678', paidAt: '2024-03-01', txHash: '0xabc123...' },
  { id: '2', amount: 54.75, status: 'COMPLETED', method: 'BTC', address: 'bc1q...xyz', paidAt: '2024-02-15', txHash: '0xdef456...' },
  { id: '3', amount: 45.75, status: 'PENDING', method: 'USDC', address: '0x1234...5678', paidAt: null, txHash: null },
  { id: '4', amount: 200.00, status: 'FAILED', method: 'ETH', address: '0xabcd...', paidAt: null, txHash: null },
];

const statusBadges: Record<string, { variant: 'success' | 'warning' | 'danger'; label: string }> = {
  COMPLETED: { variant: 'success', label: 'Completed' },
  PENDING: { variant: 'warning', label: 'Pending' },
  FAILED: { variant: 'danger', label: 'Failed' },
};

export function PayoutHistory() {
  const [showRequest, setShowRequest] = useState(false);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('USDC');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRequestPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSuccess(true);
    setLoading(false);
    
    setTimeout(() => {
      setShowRequest(false);
      setSuccess(false);
      setAmount('');
      setAddress('');
    }, 2000);
  };

  const totalPaid = payouts
    .filter((p) => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payouts
    .filter((p) => p.status === 'PENDING')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Payout History</h2>
        <Button size="sm" onClick={() => setShowRequest(!showRequest)}>
          {showRequest ? 'Cancel' : 'Request Payout'}
        </Button>
      </div>

      {/* Request Payout Form */}
      {showRequest && (
        <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          {success ? (
            <div className="text-center py-4">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-sm font-medium">Payout request submitted!</p>
            </div>
          ) : (
            <form onSubmit={handleRequestPayout} className="space-y-3">
              <h3 className="text-sm font-semibold">Request Payout</h3>
              <Input
                label="Amount (USD)"
                type="number"
                min="10"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Minimum $10"
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="USDC">USDC (ERC-20)</option>
                  <option value="USDT">USDT (TRC-20)</option>
                  <option value="BTC">Bitcoin</option>
                  <option value="ETH">Ethereum</option>
                </select>
              </div>
              <Input
                label="Wallet Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={`Your ${method} address`}
                required
              />
              <Button type="submit" loading={loading} className="w-full">
                Submit Request
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Payouts are processed within 48 hours. Minimum $10.
              </p>
            </form>
          )}
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-gray-800/50 rounded-lg">
          <div className="text-xs text-gray-400">Total Paid</div>
          <div className="text-lg font-bold text-green-400">{formatCurrency(totalPaid)}</div>
        </div>
        <div className="p-3 bg-gray-800/50 rounded-lg">
          <div className="text-xs text-gray-400">Pending</div>
          <div className="text-lg font-bold text-yellow-400">{formatCurrency(pendingAmount)}</div>
        </div>
      </div>

      {/* Payouts Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Method</th>
              <th className="pb-3 font-medium">Address</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout) => (
              <tr key={payout.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                <td className="py-3">
                  <span className="text-sm font-medium">{formatCurrency(payout.amount)}</span>
                </td>
                <td className="py-3">
                  <Badge variant="default">{payout.method}</Badge>
                </td>
                <td className="py-3">
                  <span className="text-sm font-mono text-gray-400">{payout.address}</span>
                </td>
                <td className="py-3">
                  <Badge variant={statusBadges[payout.status]?.variant || 'default'}>
                    {statusBadges[payout.status]?.label || payout.status}
                  </Badge>
                </td>
                <td className="py-3 text-sm text-gray-400">
                  {payout.paidAt || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {payouts.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <div className="text-3xl mb-2">💵</div>
          <p>No payouts yet. Start earning to request your first payout!</p>
        </div>
      )}
    </Card>
  );
}