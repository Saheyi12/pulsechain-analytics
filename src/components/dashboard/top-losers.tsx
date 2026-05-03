import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const losers = [
  { coin: 'Dogecoin', symbol: 'DOGE', price: 0.092, change: -8.32 },
  { coin: 'Shiba Inu', symbol: 'SHIB', price: 0.000012, change: -6.21 },
  { coin: 'Litecoin', symbol: 'LTC', price: 72.15, change: -4.12 },
  { coin: 'Stellar', symbol: 'XLM', price: 0.12, change: -3.80 },
  { coin: 'Monero', symbol: 'XMR', price: 158.30, change: -2.90 },
];

export function TopLosers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📉</span> Top Losers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {losers.map((coin) => (
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
                <div className="text-sm text-red-400">{coin.change}%</div>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}