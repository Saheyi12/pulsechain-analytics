'use client';

import { useState } from 'react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([
    { id: 1, coin: 'Bitcoin', symbol: 'BTC', condition: 'Above', target: '$50,000', active: true },
    { id: 2, coin: 'Ethereum', symbol: 'ETH', condition: 'Below', target: '$2,000', active: true },
    { id: 3, coin: 'Solana', symbol: 'SOL', condition: 'Above', target: '$150', active: false },
  ]);

  const toggleAlert = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Price Alerts</h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition">
          + New Alert
        </button>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full ${alert.active ? 'bg-green-400' : 'bg-gray-600'}`}></div>
              <div>
                <div className="font-medium">{alert.coin} ({alert.symbol})</div>
                <div className="text-sm text-gray-400">
                  When price goes <span className="text-white">{alert.condition}</span> {alert.target}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleAlert(alert.id)}
                className={`px-3 py-1 rounded text-sm ${alert.active ? 'bg-gray-700 text-gray-300' : 'bg-green-600 text-white'}`}
              >
                {alert.active ? 'Pause' : 'Resume'}
              </button>
              <button
                onClick={() => deleteAlert(alert.id)}
                className="px-3 py-1 bg-red-600/20 text-red-400 rounded text-sm hover:bg-red-600/30"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-4">🔔</div>
          <p>No alerts set. Create your first alert to get started.</p>
        </div>
      )}
    </div>
  );
}