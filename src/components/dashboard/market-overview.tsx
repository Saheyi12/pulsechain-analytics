'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercent } from '@/lib/utils';

const marketData = [
  { coin: 'Bitcoin', symbol: 'BTC', price: 68245.50, change24h: 2.45, marketCap: 1340000000000, volume: 32500000000 },
  { coin: 'Ethereum', symbol: 'ETH', price: 3420.80, change24h: 1.87, marketCap: 410000000000, volume: 18200000000 },
  { coin: 'Solana', symbol: 'SOL', price: 112.45, change24h: 15.23, marketCap: 48000000000, volume: 3200000000 },
  { coin: 'Cardano', symbol: 'ADA', price: 0.62, change24h: 8.71, marketCap: 22000000000, volume: 890000000 },
  { coin: 'Avalanche', symbol: 'AVAX', price: 42.80, change24h: 12.15, marketCap: 15000000000, volume: 950000000 },
];

export function MarketOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
                <th className="pb-3 font-medium">#</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium text-right">Price</th>
                <th className="pb-3 font-medium text-right">24h Change</th>
                <th className="pb-3 font-medium text-right hidden md:table-cell">Market Cap</th>
                <th className="pb-3 font-medium text-right hidden lg:table-cell">Volume</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((coin, index) => (
                <tr key={coin.symbol} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                  <td className="py-3 text-gray-400">{index + 1}</td>
                  <td className="py-3">
                    <a href={`/coin/${coin.coin.toLowerCase()}`} className="hover:text-blue-400 transition">
                      <div className="font-medium">{coin.coin}</div>
                      <div className="text-sm text-gray-400">{coin.symbol}</div>
                    </a>
                  </td>
                  <td className="py-3 text-right font-medium">{formatCurrency(coin.price)}</td>
                  <td className="py-3 text-right">
                    <span className={coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {formatPercent(coin.change24h)}
                    </span>
                  </td>
                  <td className="py-3 text-right text-gray-400 hidden md:table-cell">
                    {formatCurrency(coin.marketCap)}
                  </td>
                  <td className="py-3 text-right text-gray-400 hidden lg:table-cell">
                    {formatCurrency(coin.volume)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}