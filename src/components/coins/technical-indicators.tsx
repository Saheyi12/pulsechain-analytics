import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const indicators = [
  { name: 'RSI (14)', value: 62.5, signal: 'neutral', description: 'Neither overbought nor oversold' },
  { name: 'MACD', value: 75, signal: 'bullish', description: 'Bullish crossover detected' },
  { name: 'SMA 20', value: 67100, signal: 'bullish', description: 'Price above 20-day moving average' },
  { name: 'SMA 50', value: 64500, signal: 'bullish', description: 'Price above 50-day moving average' },
  { name: 'SMA 200', value: 52000, signal: 'bullish', description: 'Price well above 200-day MA' },
  { name: 'Bollinger Bands', value: 55, signal: 'neutral', description: 'Price within middle bands' },
  { name: 'Volume', value: 80, signal: 'bullish', description: 'Above average trading volume' },
  { name: 'Stochastic', value: 45, signal: 'neutral', description: 'Mid-range, no clear signal' },
];

const getSignalColor = (signal: string) => {
  switch (signal) {
    case 'bullish': return 'text-green-400';
    case 'bearish': return 'text-red-400';
    default: return 'text-yellow-400';
  }
};

const getSignalBadge = (signal: string) => {
  switch (signal) {
    case 'bullish': return 'success' as const;
    case 'bearish': return 'danger' as const;
    default: return 'warning' as const;
  }
};

export function TechnicalIndicators() {
  const bullishCount = indicators.filter((i) => i.signal === 'bullish').length;
  const bearishCount = indicators.filter((i) => i.signal === 'bearish').length;
  const neutralCount = indicators.filter((i) => i.signal === 'neutral').length;

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Technical Indicators</h2>
      
      {/* Summary */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-green-500/10 rounded-lg p-3 text-center">
          <div className="text-green-400 font-bold text-lg">{bullishCount}</div>
          <div className="text-xs text-gray-400">Bullish</div>
        </div>
        <div className="flex-1 bg-yellow-500/10 rounded-lg p-3 text-center">
          <div className="text-yellow-400 font-bold text-lg">{neutralCount}</div>
          <div className="text-xs text-gray-400">Neutral</div>
        </div>
        <div className="flex-1 bg-red-500/10 rounded-lg p-3 text-center">
          <div className="text-red-400 font-bold text-lg">{bearishCount}</div>
          <div className="text-xs text-gray-400">Bearish</div>
        </div>
      </div>

      {/* Indicators */}
      <div className="space-y-4">
        {indicators.map((ind) => (
          <div key={ind.name} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{ind.name}</span>
                <Badge variant={getSignalBadge(ind.signal)} className="text-[10px]">
                  {ind.signal.toUpperCase()}
                </Badge>
              </div>
              <span className={`text-sm ${getSignalColor(ind.signal)}`}>
                {ind.name === 'SMA 20' || ind.name === 'SMA 50' || ind.name === 'SMA 200'
                  ? `$${ind.value.toLocaleString()}`
                  : `${ind.value}%`}
              </span>
            </div>
            <Progress value={ind.value} variant={ind.signal === 'bullish' ? 'success' : ind.signal === 'bearish' ? 'danger' : 'warning'} size="sm" />
            <p className="text-xs text-gray-500">{ind.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}