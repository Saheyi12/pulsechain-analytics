import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const gainers = [
  { coin: 'Solana', symbol: 'SOL', price: 112.45, change: 15.23 },
  { coin: 'Avalanche', symbol: 'AVAX', price: 42.80, change: 12.15 },
  { coin: 'Cardano', symbol: 'ADA', price: 0.62, change: 8.71 },
  { coin: 'Polkadot', symbol: 'DOT', price: 8.95, change: 7.32 },
  { coin: 'Chainlink', symbol: 'LINK', price: 16.20, change: 6.54 },
];

export function TopGainers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🔥</span> Top Gainers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {gainers.map((coin) => (
            <a
              key={coin.symbol}
              href={`/coin/${coin.coin.toLowerCase()}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 transition"
            >
              <div>
                <div className="font-medium text-sm">{coin.coin}</div>
                <div className="text-xs text-gray-400">{coin.symbol}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{formatCurrency(coin.price)}</div>
                <div className="text-sm text-green-400">+{coin.change}%</div>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}