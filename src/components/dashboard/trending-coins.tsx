import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const trending = [
  { coin: 'Solana', symbol: 'SOL', rank: 1, reason: 'Memecoin mania driving volume' },
  { coin: 'Avalanche', symbol: 'AVAX', rank: 2, reason: 'New subnet announcements' },
  { coin: 'Render', symbol: 'RNDR', rank: 3, reason: 'AI narrative gaining traction' },
  { coin: 'Celestia', symbol: 'TIA', rank: 4, reason: 'Modular blockchain hype' },
  { coin: 'Fantom', symbol: 'FTM', rank: 5, reason: 'Sonic upgrade anticipation' },
];

export function TrendingCoins() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🔥</span> Trending Coins
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trending.map((coin) => (
            <a
              key={coin.symbol}
              href={`/coin/${coin.coin.toLowerCase()}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition"
            >
              <Badge variant="primary" className="shrink-0">#{coin.rank}</Badge>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{coin.coin}</div>
                <div className="text-xs text-gray-400 truncate">{coin.reason}</div>
              </div>
              <span className="text-xs text-gray-500">{coin.symbol}</span>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}