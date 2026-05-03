import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface BacktestResultsProps {
  coin: string;
  symbol: string;
  testDays: number;
  metrics: {
    mae: number;
    rmse: number;
    mape: number;
    accuracy: number;
  };
  actualPrices?: number[];
  predictedPrices?: number[];
}

export function BacktestResults({
  coin,
  symbol,
  testDays,
  metrics,
}: BacktestResultsProps) {
  const getAccuracyBadge = (accuracy: number) => {
    if (accuracy >= 90) return <Badge variant="success">Excellent</Badge>;
    if (accuracy >= 80) return <Badge variant="success">Good</Badge>;
    if (accuracy >= 70) return <Badge variant="warning">Fair</Badge>;
    return <Badge variant="danger">Poor</Badge>;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Model Backtest Results</h2>
        {getAccuracyBadge(metrics.accuracy)}
      </div>

      <p className="text-sm text-gray-400 mb-6">
        Testing {symbol} prediction model against {testDays} days of historical data.
      </p>

      {/* Accuracy */}
      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-blue-400">{metrics.accuracy.toFixed(1)}%</div>
        <div className="text-sm text-gray-400 mt-1">Prediction Accuracy</div>
        <Progress value={metrics.accuracy} variant="success" size="lg" className="mt-3 max-w-xs mx-auto" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 bg-gray-800/50 rounded-lg text-center">
          <div className="text-xs text-gray-400">MAE</div>
          <div className="text-lg font-bold">${metrics.mae.toFixed(2)}</div>
          <div className="text-[10px] text-gray-500">Mean Absolute Error</div>
        </div>
        <div className="p-3 bg-gray-800/50 rounded-lg text-center">
          <div className="text-xs text-gray-400">RMSE</div>
          <div className="text-lg font-bold">${metrics.rmse.toFixed(2)}</div>
          <div className="text-[10px] text-gray-500">Root Mean Square Error</div>
        </div>
        <div className="p-3 bg-gray-800/50 rounded-lg text-center">
          <div className="text-xs text-gray-400">MAPE</div>
          <div className="text-lg font-bold">{metrics.mape.toFixed(1)}%</div>
          <div className="text-[10px] text-gray-500">Mean Abs % Error</div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 bg-gray-800/50 rounded-lg">
        <h3 className="text-sm font-semibold mb-2">Summary</h3>
        <ul className="space-y-1 text-sm text-gray-400">
          <li>• Model trained on historical price data</li>
          <li>• Tested over {testDays}-day period</li>
          <li>• Average prediction error: ${metrics.mae.toFixed(2)}</li>
          <li>
            • Model is{' '}
            {metrics.accuracy >= 80
              ? 'reliable for short-term predictions'
              : metrics.accuracy >= 70
              ? 'moderately accurate, use with caution'
              : 'not recommended for trading decisions'}
          </li>
        </ul>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 mt-4">
        Past performance does not guarantee future results. Always conduct your own research
        before making trading decisions.
      </p>
    </Card>
  );
}