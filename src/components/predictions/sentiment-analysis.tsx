import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface SentimentData {
  source: string;
  score: number;
  confidence: number;
  key_themes?: string[];
}

interface SentimentAnalysisProps {
  coin: string;
  overallScore: number;
  sentiment: string;
  components: SentimentData[];
  indicators: {
    signal: string;
    confidence: string;
    risk: string;
  };
}

export function SentimentAnalysis({
  coin,
  overallScore,
  sentiment,
  components,
  indicators,
}: SentimentAnalysisProps) {
  const getSentimentColor = (score: number) => {
    if (score >= 0.7) return 'text-green-400';
    if (score >= 0.55) return 'text-blue-400';
    if (score >= 0.45) return 'text-yellow-400';
    if (score >= 0.3) return 'text-orange-400';
    return 'text-red-400';
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'very_bullish': return <Badge variant="success">Very Bullish</Badge>;
      case 'bullish': return <Badge variant="success">Bullish</Badge>;
      case 'neutral': return <Badge variant="warning">Neutral</Badge>;
      case 'bearish': return <Badge variant="danger">Bearish</Badge>;
      case 'very_bearish': return <Badge variant="danger">Very Bearish</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  const getSignalBadge = (signal: string) => {
    switch (signal) {
      case 'strong_buy': return <Badge variant="success">Strong Buy</Badge>;
      case 'buy': return <Badge variant="success">Buy</Badge>;
      case 'hold': return <Badge variant="warning">Hold</Badge>;
      case 'sell': return <Badge variant="danger">Sell</Badge>;
      case 'strong_sell': return <Badge variant="danger">Strong Sell</Badge>;
      default: return <Badge>Neutral</Badge>;
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Sentiment Analysis</h2>

      {/* Overall Score */}
      <div className="text-center mb-6 p-4 bg-gray-800/50 rounded-xl">
        <div className={`text-4xl font-bold ${getSentimentColor(overallScore)}`}>
          {(overallScore * 100).toFixed(0)}%
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          {getSentimentBadge(sentiment)}
        </div>
      </div>

      {/* Components */}
      <div className="space-y-4 mb-6">
        {components.map((comp) => (
          <div key={comp.source}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm capitalize">{comp.source.replace('_', ' ')}</span>
              <span className={`text-sm font-medium ${getSentimentColor(comp.score)}`}>
                {(comp.score * 100).toFixed(0)}%
              </span>
            </div>
            <Progress
              value={comp.score * 100}
              variant={comp.score >= 0.6 ? 'success' : comp.score >= 0.4 ? 'warning' : 'danger'}
              size="sm"
            />
            {comp.key_themes && comp.key_themes.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {comp.key_themes.map((theme, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.5 bg-gray-800 rounded text-gray-400">
                    {theme}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Trading Signal */}
      <div className="border-t border-gray-800 pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">Trading Signal</span>
          {getSignalBadge(indicators.signal)}
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between p-2 bg-gray-800/50 rounded">
            <span className="text-gray-400">Confidence</span>
            <span className="capitalize">{indicators.confidence}</span>
          </div>
          <div className="flex justify-between p-2 bg-gray-800/50 rounded">
            <span className="text-gray-400">Risk Level</span>
            <span className="capitalize">{indicators.risk}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}