import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Chart } from '@/components/ui/chart';

const marketCapData = [
  { label: 'BTC', value: 1340, color: 'bg-orange-500' },
  { label: 'ETH', value: 410, color: 'bg-blue-500' },
  { label: 'SOL', value: 48, color: 'bg-purple-500' },
  { label: 'ADA', value: 22, color: 'bg-blue-400' },
  { label: 'AVAX', value: 15, color: 'bg-red-400' },
  { label: 'DOT', value: 12, color: 'bg-pink-500' },
  { label: 'DOGE', value: 13, color: 'bg-yellow-500' },
  { label: 'LINK', value: 9.5, color: 'bg-blue-300' },
];

export function MarketCapChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Top Coins by Market Cap</CardTitle>
          <span className="text-xs text-gray-400">In Billions USD</span>
        </div>
      </CardHeader>
      <CardContent>
        <Chart data={marketCapData} height={220} showValues />
        <div className="mt-4 space-y-2">
          {marketCapData.slice(0, 5).map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-sm ${item.color}`}></div>
                <span>{item.label}</span>
              </div>
              <span className="text-gray-400">${item.value}B</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}