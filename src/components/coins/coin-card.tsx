import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercent } from '@/lib/utils';

interface CoinCardProps {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume?: number;
}

export function CoinCard({ id, name, symbol, price, change24h, marketCap, volume }: CoinCardProps) {
  return (
    <Link href={`/coin/${id}`}>
      <Card hover className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-sm">
              {symbol.charAt(0)}
            </div>
            <div>
              <div className="font-medium text-sm">{name}</div>
              <div className="text-xs text-gray-400">{symbol}</div>
            </div>
          </div>
          <Badge variant={change24h >= 0 ? 'success' : 'danger'}>
            {formatPercent(change24h)}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Price</span>
            <span className="text-sm font-medium">{formatCurrency(price)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Market Cap</span>
            <span className="text-sm">{formatCurrency(marketCap)}</span>
          </div>
          {volume && (
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Volume</span>
              <span className="text-sm">{formatCurrency(volume)}</span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}