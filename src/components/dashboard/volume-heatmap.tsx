import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const volumeData = [
  { exchange: 'Binance', volume: 18_500_000_000, change: 5.2, intensity: 95 },
  { exchange: 'Coinbase', volume: 8_200_000_000, change: 3.8, intensity: 75 },
  { exchange: 'Kraken', volume: 3_500_000_000, change: -2.1, intensity: 55 },
  { exchange: 'Bybit', volume: 4_800_000_000, change: 8.5, intensity: 68 },
  { exchange: 'OKX', volume: 5_100_000_000, change: 1.4, intensity: 72 },
  { exchange: 'Uniswap', volume: 2_900_000_000, change: 12.3, intensity: 48 },
  { exchange: 'KuCoin', volume: 1_800_000_000, change: -5.6, intensity: 35 },
  { exchange: 'Gate.io', volume: 2_100_000_000, change: 4.7, intensity: 42 },
];

export function VolumeHeatmap() {
  const maxVolume = Math.max(...volumeData.map((v) => v.volume));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📊</span> Exchange Volume Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {volumeData.map((item) => (
            <div key={item.exchange} className="flex items-center gap-3">
              <div className="w-20 text-sm font-medium shrink-0">{item.exchange}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className="h-6 rounded"
                    style={{
                      width: `${(item.volume / maxVolume) * 100}%`,
                      backgroundColor: `rgba(59, 130, 246, ${item.intensity / 100})`,
                      minWidth: '4px',
                    }}
                  />
                </div>
              </div>
              <div className="w-32 text-right shrink-0">
                <div className="text-sm font-medium">{formatCurrency(item.volume)}</div>
                <div className={`text-xs ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change >= 0 ? '+' : ''}{item.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}