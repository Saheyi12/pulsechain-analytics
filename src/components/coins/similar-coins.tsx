import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { formatCurrency, formatPercent } from '@/lib/utils';

const similarCoins = [
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3420.80, change24h: 1.87, similarity: 'Layer 1 Blockchain' },
  { id: 'solana', name: 'Solana', symbol: 'SOL', price: 112.45, change24h: 15.23, similarity: 'High-performance L1' },
  { id: 'avalanche-2', name: 'Avalanche', symbol: 'AVAX', price: 42.80, change24h: 12.15, similarity: 'Scalable L1 Platform' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.62, change24h: 8.71, similarity: 'Proof-of-Stake L1' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', price: 8.95, change24h: 7.32, similarity: 'Multi-chain Protocol' },
];

export function SimilarCoins() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Similar Coins</h2>
      <div className="space-y-3">
        {similarCoins.map((coin) => (
          <Link
            key={coin.id}
            href={`/coin/${coin.id}`}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-sm font-bold">
                {coin.symbol.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-sm">{coin.name}</div>
                <div className="text-xs text-gray-500">{coin.similarity}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{formatCurrency(coin.price)}</div>
              <div className={coin.change24h >= 0 ? 'text-green-400 text-xs' : 'text-red-400 text-xs'}>
                {formatPercent(coin.change24h)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}