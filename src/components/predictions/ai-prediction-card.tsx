import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { formatCurrency, formatPercent } from '@/lib/utils';

interface PredictionCardProps {
  coin: string;
  symbol: string;
  currentPrice: number;
  predictedPrice: number;
  change: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  days: number;
}

export function AIPredictionCard({
  coin,
  symbol,
  currentPrice,
  predictedPrice,
  change,
  trend,
  confidence,
  days,
}: PredictionCardProps) {
  const getTrendBadge = () => {
    switch (trend) {
      case 'bullish': return <Badge variant="success">Bullish</Badge>;
      case 'bearish': return <Badge variant="danger">Bearish</Badge>;
      default: return <Badge variant="warning">Neutral</Badge>;
    }
  };

  const getConfidenceColor = (val: number) => {
    if (val >= 80) return 'text-green-400';
    if (val >= 60) return 'text-blue-400';
    if (val >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Card hover className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-lg font-bold">
            {symbol.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold">{coin}</h3>
            <span className="text-sm text-gray-400">{symbol}</span>
          </div>
        </div>
        {getTrendBadge()}
      </div>

      {/* Price Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-400 mb-1">Current Price</div>
          <div className="text-lg font-bold">{formatCurrency(currentPrice)}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400 mb-1">{days}-Day Target</div>
          <div className="text-lg font-bold">{formatCurrency(predictedPrice)}</div>
        </div>
      </div>

      {/* Change */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-800/50 rounded-lg">
        <span className="text-sm text-gray-400">Expected Change</span>
        <span className={`font-semibold ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {formatPercent(change)}
        </span>
      </div>

      {/* Confidence */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-400">Confidence</span>
          <span className={`text-xs font-medium ${getConfidenceColor(confidence)}`}>
            {confidence}%
          </span>
        </div>
        <Progress
          value={confidence}
          variant={confidence >= 70 ? 'success' : confidence >= 40 ? 'warning' : 'danger'}
          size="sm"
        />
      </div>

      {/* Action */}
      <button className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition">
        View Full Prediction
      </button>
    </Card>
  );
}