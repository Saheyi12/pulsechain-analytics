import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const metrics = [
  { label: 'Total Market Cap', value: 2400000000000, change: 2.4 },
  { label: '24h Trading Volume', value: 125000000000, change: 12.7 },
  { label: 'BTC Dominance', value: 52.3, change: 0.3, suffix: '%' },
  { label: 'DeFi TVL', value: 85000000000, change: 5.8 },
  { label: 'Stablecoin Supply', value: 140000000000, change: 1.2 },
  { label: 'Active Addresses', value: 3200000, change: -3.5, suffix: '' },
];

export function GlobalMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🌍</span> Global Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="p-3 rounded-lg bg-gray-800/50">
              <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
              <div className="text-lg font-bold">
                {metric.suffix ? `${metric.value}${metric.suffix}` : formatCurrency(metric.value)}
              </div>
              <div className={`text-xs ${metric.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change >= 0 ? '+' : ''}{metric.change}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}