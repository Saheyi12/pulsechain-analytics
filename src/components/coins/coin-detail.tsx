import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercent } from '@/lib/utils';

interface CoinDetailProps {
  coin: {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    change7d: number;
    change30d: number;
    marketCap: number;
    volume24h: number;
    circulatingSupply: number;
    totalSupply: number;
    ath: number;
    athDate: string;
    description: string;
  };
}

export function CoinDetail({ coin }: CoinDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-2xl font-bold">
          {coin.symbol.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{coin.name}</h1>
            <Badge variant="primary">{coin.symbol}</Badge>
          </div>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-3xl font-bold">{formatCurrency(coin.price)}</span>
            <span className={coin.change24h >= 0 ? 'text-green-400 font-medium' : 'text-red-400 font-medium'}>
              {formatPercent(coin.change24h)}
            </span>
          </div>
        </div>
      </div>

      {/* Price Changes */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '24h', value: coin.change24h },
          { label: '7d', value: coin.change7d },
          { label: '30d', value: coin.change30d },
        ].map((period) => (
          <Card key={period.label} className="p-4 text-center">
            <div className="text-sm text-gray-400">{period.label} Change</div>
            <div className={`text-lg font-semibold ${period.value >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatPercent(period.value)}
            </div>
          </Card>
        ))}
      </div>

      {/* Market Stats */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Market Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Market Cap', value: formatCurrency(coin.marketCap) },
            { label: '24h Volume', value: formatCurrency(coin.volume24h) },
            { label: 'Circulating Supply', value: coin.circulatingSupply.toLocaleString() },
            { label: 'Total Supply', value: coin.totalSupply.toLocaleString() },
            { label: 'All-Time High', value: formatCurrency(coin.ath) },
            { label: 'ATH Date', value: coin.athDate },
          ].map((stat) => (
            <div key={stat.label} className="flex justify-between py-2 border-b border-gray-800/50">
              <span className="text-gray-400 text-sm">{stat.label}</span>
              <span className="text-sm font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Description */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">About {coin.name}</h2>
        <p className="text-gray-400 leading-relaxed">{coin.description}</p>
      </Card>
    </div>
  );
}