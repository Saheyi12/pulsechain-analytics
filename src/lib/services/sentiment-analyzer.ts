interface SentimentResult {
  coinId: string;
  overallScore: number;
  sentiment: string;
  components: {
    social: { score: number; source: string };
    news: { score: number; source: string };
    technical: { score: number; source: string };
  };
  indicators: {
    signal: string;
    confidence: string;
    risk: string;
  };
}

export async function analyzeSentiment(coinId: string): Promise<SentimentResult> {
  const socialScore = 0.4 + Math.random() * 0.5;
  const newsScore = 0.3 + Math.random() * 0.5;
  const technicalScore = 0.35 + Math.random() * 0.5;
  const overallScore = (socialScore * 0.4 + newsScore * 0.35 + technicalScore * 0.25);

  return {
    coinId,
    overallScore: Math.round(overallScore * 1000) / 1000,
    sentiment: classifySentiment(overallScore),
    components: {
      social: { score: Math.round(socialScore * 100) / 100, source: 'social_media' },
      news: { score: Math.round(newsScore * 100) / 100, source: 'news' },
      technical: { score: Math.round(technicalScore * 100) / 100, source: 'technical' },
    },
    indicators: getTradingSignal(overallScore),
  };
}

function classifySentiment(score: number): string {
  if (score >= 0.7) return 'very_bullish';
  if (score >= 0.55) return 'bullish';
  if (score >= 0.45) return 'neutral';
  if (score >= 0.3) return 'bearish';
  return 'very_bearish';
}

function getTradingSignal(score: number): { signal: string; confidence: string; risk: string } {
  if (score >= 0.7) return { signal: 'strong_buy', confidence: 'high', risk: 'low' };
  if (score >= 0.55) return { signal: 'buy', confidence: 'moderate', risk: 'moderate' };
  if (score >= 0.45) return { signal: 'hold', confidence: 'low', risk: 'high' };
  if (score >= 0.3) return { signal: 'sell', confidence: 'moderate', risk: 'moderate' };
  return { signal: 'strong_sell', confidence: 'high', risk: 'low' };
}

export function calculateFearGreedIndex(marketData: {
  volatility: number;
  momentum: number;
  socialVolume: number;
  dominance: number;
}): { value: number; classification: string } {
  const volatilityScore = Math.max(0, Math.min(100, (1 - marketData.volatility * 10) * 100));
  const momentumScore = Math.max(0, Math.min(100, 50 + marketData.momentum * 100));
  const socialScore = Math.max(0, Math.min(100, marketData.socialVolume * 100));
  const dominanceScore = Math.max(0, Math.min(100, (1 - (marketData.dominance - 0.4) / 0.3) * 100));

  const value = (volatilityScore * 0.25 + momentumScore * 0.35 + socialScore * 0.25 + dominanceScore * 0.15);

  let classification: string;
  if (value >= 75) classification = 'Extreme Greed';
  else if (value >= 55) classification = 'Greed';
  else if (value >= 45) classification = 'Neutral';
  else if (value >= 25) classification = 'Fear';
  else classification = 'Extreme Fear';

  return { value: Math.round(value), classification };
}