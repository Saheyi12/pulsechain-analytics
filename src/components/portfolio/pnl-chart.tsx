'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';

const periods = ['1W', '1M', '3M', '6M', '1Y', 'ALL'] as const;
type Period = (typeof periods)[number];

const pnlData: Record<Period, number[]> = {
  '1W': [250, 180, 320, -50, 420, 580, 850],
  '1M': [250, 180, 320, -50, 420, 580, 850, 1200, 950, 1500, 1800, 2100, 1900, 2500],
  '3M': [500, 800, 300, -200, 600, 1200, 1800, 1500, 2200, 2800, 3200, 3500, 3800],
  '6M': [1000, 2500, 1500, 800, 2000, 3500, 5000, 4500, 6000, 7500, 8500, 8200],
  '1Y': [2000, 5000, 3000, 4500, 7000, 8500, 8200, 9000, 9500, 8800, 9200, 8500],
  'ALL': [1000, 3000, 5000, 7000, 8500, 8500],
};

export function PnLChart() {
  const [period, setPeriod] = useState<Period>('1M');
  const data = pnlData[period];
  const maxValue = Math.max(...data, 0);
  const minValue = Math.min(...data, 0);
  const range = maxValue - minValue || 1;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Profit & Loss</h2>
        <div className="flex gap-1">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 text-xs rounded transition ${
                period === p
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="h-48 flex items-end gap-1">
        {data.map((value, index) => {
          const height = ((value - minValue) / range) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col justify-end h-full">
              <div
                className={`w-full rounded-t transition-all ${
                  value >= 0 ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ height: `${Math.max(height, 2)}%` }}
                title={`$${value.toLocaleString()}`}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>{period === '1W' ? 'Mon' : period === '1M' ? 'Week 1' : 'Start'}</span>
        <span>Now</span>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
        <div>
          <div className="text-xs text-gray-400">Current P&L</div>
          <div className="text-lg font-bold text-green-400">+$8,500.00</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">Period Return</div>
          <div className="text-lg font-bold text-green-400">+51.5%</div>
        </div>
      </div>
    </Card>
  );
}