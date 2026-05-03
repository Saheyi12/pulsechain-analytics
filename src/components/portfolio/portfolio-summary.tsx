'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatPercent } from '@/lib/utils';

const holdings = [
  { id: '1', coin: 'Bitcoin', symbol: 'BTC', amount: 0.5, buyPrice: 35000, currentPrice: 68245.50, allocation: 45 },
  { id: '2', coin: 'Ethereum', symbol: 'ETH', amount: 5, buyPrice: 2000, currentPrice: 3420.80, allocation: 28 },
  { id: '3', coin: 'Solana', symbol: 'SOL', amount: 50, buyPrice: 80, currentPrice: 112.45, allocation: 9 },
  { id: '4', coin: 'Cardano', symbol: 'ADA', amount: 2000, buyPrice: 0.40, currentPrice: 0.62, allocation: 2 },
  { id: '5', coin: 'Avalanche', symbol: 'AVAX', amount: 25, buyPrice: 35, currentPrice: 42.80, allocation: 2 },
];

export function PortfolioSummary() {
  const totalValue = holdings.reduce((sum, h) => sum + h.amount * h.currentPrice, 0);
  const totalInvested = holdings.reduce((sum, h) => sum + h.amount * h.buyPrice, 0);
  const totalPnl = totalValue - totalInvested;
  const pnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-xs text-gray-400 mb-1">Total Value</div>
          <div className="text-xl font-bold">{formatCurrency(totalValue)}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-gray-400 mb-1">Total Invested</div>
          <div className="text-xl font-bold">{formatCurrency(totalInvested)}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-gray-400 mb-1">Profit/Loss</div>
          <div className={`text-xl font-bold ${totalPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {formatCurrency(totalPnl)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-gray-400 mb-1">ROI</div>
          <div className={`text-xl font-bold ${pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {formatPercent(pnlPercent)}
          </div>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Holdings</h2>
          <Button variant="outline" size="sm">+ Add Holding</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
                <th className="pb-3 font-medium">Asset</th>
                <th className="pb-3 font-medium text-right">Amount</th>
                <th className="pb-3 font-medium text-right">Buy Price</th>
                <th className="pb-3 font-medium text-right">Current</th>
                <th className="pb-3 font-medium text-right">Value</th>
                <th className="pb-3 font-medium text-right">P&L</th>
                <th className="pb-3 font-medium text-right">Allocation</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h) => {
                const value = h.amount * h.currentPrice;
                const pnl = (h.currentPrice - h.buyPrice) * h.amount;
                const pnlPct = ((h.currentPrice - h.buyPrice) / h.buyPrice) * 100;
                
                return (
                  <tr key={h.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold">
                          {h.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{h.coin}</div>
                          <div className="text-xs text-gray-400">{h.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-right text-sm">{h.amount}</td>
                    <td className="py-3 text-right text-sm">{formatCurrency(h.buyPrice)}</td>
                    <td className="py-3 text-right text-sm">{formatCurrency(h.currentPrice)}</td>
                    <td className="py-3 text-right text-sm font-medium">{formatCurrency(value)}</td>
                    <td className="py-3 text-right text-sm">
                      <div className={pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {formatCurrency(pnl)}
                      </div>
                      <div className={`text-xs ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatPercent(pnlPct)}
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <Badge variant="primary">{h.allocation}%</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}