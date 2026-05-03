import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { coinId: string } }
) {
  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get('days') || '7');

  // Generate prediction based on coinId
  const prediction = {
    coin: params.coinId,
    symbol: params.coinId.substring(0, 3).toUpperCase(),
    currentPrice: 68245.50,
    generatedAt: new Date().toISOString(),
    days,
    predictions: Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() + (i + 1) * 86400000).toISOString().split('T')[0],
      price: 68245.50 + (Math.random() * 10000 - 2000) * (i + 1),
      lowerBound: 66245.50 + (Math.random() * 8000 - 4000) * (i + 1),
      upperBound: 70245.50 + (Math.random() * 12000 - 2000) * (i + 1),
      confidence: Math.max(0.5, 0.95 - (i * 0.05)),
    })),
    summary: {
      currentPrice: 68245.50,
      predictedPrice: 72500.00,
      priceChange: 4254.50,
      priceChangePercent: 6.23,
      trend: Math.random() > 0.5 ? 'bullish' : 'bearish',
      strength: 'moderate',
      volatility: 0.05,
      confidenceScore: 0.85,
    },
    technicalIndicators: {
      rsi: 62.5,
      macd: 'bullish',
      movingAverages: {
        sma20: 67100,
        sma50: 64500,
        sma200: 52000,
      },
      supportLevels: [65000, 63000, 60000],
      resistanceLevels: [70000, 72000, 75000],
    },
  };

  return NextResponse.json(prediction);
}