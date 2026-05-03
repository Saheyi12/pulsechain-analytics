'use client';

import { useState } from 'react';

export default function WatchlistPage() {
  const [coins, setCoins] = useState([
    { id: 1, name: 'Bitcoin', symbol: 'BTC', price: '$68,000', change: '+2.4%' },
    { id: 2, name: 'Ethereum', symbol: 'ETH', price: '$3,400', change: '+1.8%' },
    { id: 3, name: 'Solana', symbol: 'SOL', price: '$112', change: '+15.2%' },
    { id: 4, name: 'Cardano', symbol: 'ADA', price: '$0.62', change: '+8.7%' },
    { id: 5, name: 'Avalanche', symbol: 'AVAX', price: '$42.80', change: '+12.1%' },
  ]);

  const removeCoin = (id: number) => {
    setCoins(coins.filter(c => c.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Watchlist</h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition">
          + Add Coin
        </button>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        {coins.map((coin, index) => (
          <div
            key={coin.id}
            className={`flex items-center justify-between p-4 ${
              index !== coins.length - 1 ? 'border-b border-gray-800' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-gray-400">{index + 1}</span>
              <div>
                <div className="font-medium">{coin.name}</div>
                <div className="text-sm text-gray-400">{coin.symbol}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-medium">{coin.price}</div>
                <div className="text-green-400 text-sm">{coin.change}</div>
              </div>
              <button
                onClick={() => removeCoin(coin.id)}
                className="text-gray-600 hover:text-red-400 transition"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {coins.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-4">⭐</div>
          <p>Your watchlist is empty. Add coins to track their prices.</p>
        </div>
      )}
    </div>
  );
}