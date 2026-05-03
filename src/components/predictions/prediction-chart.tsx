'use client';

import { Card } from '@/components/ui/card';
import { useState } from 'react';

interface PredictionData {
  date: string;
  price: number;
  lowerBound: number;
  upperBound: number;
  confidence: number;
}

interface PredictionChartProps {
  coin: string;
  symbol: string;
  predictions: PredictionData[];
}

export function PredictionChart({ coin, symbol, predictions }: PredictionChartProps) {
  const [showConfidence, setShowConfidence] = useState(true);

  const maxPrice = Math.max(...predictions.map((p) => p.upperBound));
  const minPrice = Math.min(...predictions.map((p) => p.lowerBound));
  const range = maxPrice - minPrice;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{symbol} Price Prediction</h2>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-gray-400">
            <input
              type="checkbox"
              checked={showConfidence}
              onChange={(e) => setShowConfidence(e.target.checked)}
              className="rounded"
            />
            Show confidence interval
          </label>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 relative">
        <div className="absolute inset-0 flex items-end gap-2">
          {predictions.map((point, index) => {
            const height = ((point.price - minPrice) / range) * 100;
            const lowerHeight = ((point.lowerBound - minPrice) / range) * 100;
            const upperHeight = ((point.upperBound - minPrice) / range) * 100;

            return (
              <div key={index} className="flex-1 flex flex-col justify-end h-full">
                {/* Confidence Interval */}
                {showConfidence && (
                  <div
                    className="w-full bg-blue-500/10 border border-blue-500/30 border-dashed relative"
                    style={{
                      height: `${upperHeight - lowerHeight}%`,
                      marginBottom: `${lowerHeight}%`,
                    }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-gray-500">
                      ±
                    </div>
                  </div>
                )}

                {/* Predicted Price Bar */}
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t relative group"
                  style={{ height: `${height}%` }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 border border-gray-700 rounded-lg px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                    <div className="text-white font-medium">${point.price.toLocaleString()}</div>
                    <div className="text-gray-400">{point.confidence}% confidence</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
          <span>${maxPrice.toLocaleString()}</span>
          <span>${Math.round((maxPrice + minPrice) / 2).toLocaleString()}</span>
          <span>${minPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        {predictions.map((point, index) => (
          <span key={index} className="flex-1 text-center">
            {new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-800">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          Predicted Price
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-3 h-3 border border-dashed border-blue-500/30 bg-blue-500/10 rounded"></div>
          Confidence Interval
        </div>
      </div>
    </Card>
  );
}