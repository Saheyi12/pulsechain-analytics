'use client';

import { cn } from '@/lib/utils';

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  data: ChartDataPoint[];
  type?: 'bar' | 'line';
  height?: number;
  showValues?: boolean;
  className?: string;
}

export function Chart({ data, type = 'bar', height = 200, showValues = true, className }: ChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={cn('w-full', className)}>
      <div
        className="flex items-end gap-2"
        style={{ height: `${height}px` }}
      >
        {data.map((point, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center justify-end h-full"
          >
            {showValues && (
              <span className="text-xs text-gray-400 mb-1">
                {point.value.toLocaleString()}
              </span>
            )}
            <div
              className={cn(
                'w-full rounded-t transition-all duration-500',
                point.color || 'bg-blue-600'
              )}
              style={{
                height: `${(point.value / maxValue) * 100}%`,
                minHeight: point.value > 0 ? '4px' : '0',
              }}
            />
            <span className="text-xs text-gray-500 mt-1 truncate w-full text-center">
              {point.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LineChartPlaceholder() {
  return (
    <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
      <div className="text-center text-gray-400">
        <div className="text-4xl mb-2">📈</div>
        <p>Chart Component</p>
        <p className="text-sm">Integrate Recharts or Chart.js here</p>
      </div>
    </div>
  );
}