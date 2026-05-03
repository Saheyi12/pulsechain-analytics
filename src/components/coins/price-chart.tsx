'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';

const periods = ['1H', '24H', '7D', '30D', '90D', '1Y', 'ALL'] as const;
type Period = (typeof periods)[number];

export function PriceChart() {
  const [activePeriod, setActivePeriod] = useState<Period>('7D');

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Price Chart</h2>
        <div className="flex gap-1">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`px-3 py-1 text-xs rounded transition ${
                activePeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      
      {/* Chart Placeholder */}
      <div className="h-80 bg-gray-800/50 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-5xl mb-3">📈</div>
          <p className="text-lg font-medium">Chart Visualization</p>
          <p className="text-sm mt-1">
            Integrate{' '}
            <a href="https://recharts.org" className="text-blue-400 hover:underline" target="_blank">
              Recharts
            </a>
            {' '}or{' '}
            <a href="https://tradingview.com" className="text-blue-400 hover:underline" target="_blank">
              TradingView
            </a>
            {' '}here
          </p>
          <div className="mt-4 grid grid-cols-3 gap-4 max-w-xs mx-auto text-left text-xs">
            <div>
              <div className="text-gray-500">Open</div>
              <div className="text-white">$67,890</div>
            </div>
            <div>
              <div className="text-gray-500">High</div>
              <div className="text-white">$69,120</div>
            </div>
            <div>
              <div className="text-gray-500">Low</div>
              <div className="text-white">$66,450</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}