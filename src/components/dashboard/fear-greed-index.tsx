import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function FearGreedIndex() {
  const value = 65;

  const getLabel = (val: number) => {
    if (val >= 75) return { text: 'Extreme Greed', color: 'text-green-400', variant: 'success' as const };
    if (val >= 55) return { text: 'Greed', color: 'text-green-400', variant: 'success' as const };
    if (val >= 45) return { text: 'Neutral', color: 'text-yellow-400', variant: 'warning' as const };
    if (val >= 25) return { text: 'Fear', color: 'text-orange-400', variant: 'warning' as const };
    return { text: 'Extreme Fear', color: 'text-red-400', variant: 'danger' as const };
  };

  const { text, color, variant } = getLabel(value);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>😱</span> Fear & Greed Index
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-5xl font-bold mb-3">{value}</div>
        <div className={`text-lg font-semibold mb-4 ${color}`}>{text}</div>
        <Progress value={value} variant={variant} size="lg" />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Extreme Fear</span>
          <span>Fear</span>
          <span>Neutral</span>
          <span>Greed</span>
          <span>Extreme Greed</span>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Updated hourly based on market data
        </p>
      </CardContent>
    </Card>
  );
}