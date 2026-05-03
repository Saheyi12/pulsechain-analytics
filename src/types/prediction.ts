export interface PredictionPoint {
  date: string;
  price: number;
  lowerBound: number;
  upperBound: number;
  confidence: number;
}

export interface PredictionSummary {
  currentPrice: number;
  predictedPrice: number;
  priceChange: number;
  priceChangePercent: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  strength: 'very_strong' | 'strong' | 'moderate' | 'weak' | 'neutral';
  volatility: number;
  confidenceScore: number;
}

export interface PricePrediction {
  coinId: string;
  symbol: string;
  currentPrice: number;
  generatedAt: string;
  days: number;
  predictions: PredictionPoint[];
  summary: PredictionSummary;
  technicalIndicators?: TechnicalIndicators;
}

export interface TechnicalIndicators {
  rsi: number;
  macd: string;
  movingAverages: {
    sma20: number;
    sma50: number;
    sma200: number;
  };
  supportLevels: number[];
  resistanceLevels: number[];
}

export interface BacktestResult {
  coinId: string;
  testDays: number;
  metrics: {
    mae: number;
    rmse: number;
    mape: number;
    accuracy: number;
  };
  actualPrices: number[];
  predictedPrices: number[];
}

export interface SentimentData {
  coinId: string;
  overallScore: number;
  sentiment: 'very_bullish' | 'bullish' | 'neutral' | 'bearish' | 'very_bearish';
  components: {
    social: { score: number; source: string };
    news: { score: number; source: string };
    technical: { score: number; source: string };
  };
  indicators: {
    signal: 'strong_buy' | 'buy' | 'hold' | 'sell' | 'strong_sell';
    confidence: 'high' | 'moderate' | 'low';
    risk: 'high' | 'moderate' | 'low';
  };
}

export interface FearGreedIndex {
  value: number;
  classification: 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed';
  timestamp: string;
}