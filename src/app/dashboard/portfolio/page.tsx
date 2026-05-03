'use client';

import { useState } from 'react';

export default function PortfolioPage() {
  const [holdings] = useState([
    { coin: 'Bitcoin', symbol: 'BTC', amount: 0.5, buyPrice: 35000, currentPrice: 68000 },
    { coin: 'Ethereum', symbol: 'ETH', amount: 5, buyPrice: 2000, currentPrice: 3400 },
    { coin: 'Solana', symbol: 'SOL', amount: 50, buyPrice: 80, currentPrice: 112 },
    { coin: 'Cardano', symbol: 'ADA', amount: 2000, buyPrice: 0.4, currentPrice: 0.62 },
  ]);

  const totalValue = holdings.reduce((sum, h) => sum + h.amount * h.currentPrice, 0);
  const totalInvested = holdings.reduce((sum, h) => sum + h.amount * h.buyPrice, 0);
  const totalPnl = totalValue - totalInvested;
  const pnlPercent = ((totalPnl / totalInvested) * 100).toFixed(2);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition">
          + Add Holding
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">Total Value</div>
          <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">Total Invested</div>
          <div className="text-2xl font-bold">${totalInvested.toLocaleString()}</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">Profit/Loss</div>
          <div className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ${totalPnl.toLocaleString()}
            <span className="text-sm ml-1">({pnlPercent}%)</span>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left p-4 text-sm text-gray-400">Asset</th>
              <th className="text-right p-4 text-sm text-gray-400">Amount</th>
              <th className="text-right p-4 text-sm text-gray-400">Buy Price</th>
              <th className="text-right p-4 text-sm text-gray-400">Current</th>
              <th className="text-right p-4 text-sm text-gray-400">P&L</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => {
              const value = h.amount * h.currentPrice;
              const pnl = (h.currentPrice - h.buyPrice) * h.amount;
              const pnlPct = ((h.currentPrice - h.buyPrice) / h.buyPrice * 100).toFixed(2);
              return (
                <tr key={h.symbol} className="border-t border-gray-800">
                  <td className="p-4">
                    <div className="font-medium">{h.coin}</div>
                    <div className="text-sm text-gray-400">{h.symbol}</div>
                  </td>
                  <td className="p-4 text-right">{h.amount}</td>
                  <td className="p-4 text-right">${h.buyPrice}</td>
                  <td className="p-4 text-right">${h.currentPrice}</td>
                  <td className={`p-4 text-right ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${pnl.toFixed(2)} ({pnlPct}%)
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}