import { NextRequest, NextResponse } from 'next/server';

const PREDICTIONS = [
  {
    coin: 'Bitcoin',
    symbol: 'BTC',
    currentPrice: 68245.50,
    predictedPrice: 72500.00,
    change: 6.23,
    trend: 'bullish',
    confidence: 85,
    days: 7,
  },
  {
    coin: 'Ethereum',
    symbol: 'ETH',
    currentPrice: 3420.80,
    predictedPrice: 3650.00,
    change: 6.70,
    trend: 'bullish',
    confidence: 82,
    days: 7,
  },
  {
    coin: 'Solana',
    symbol: 'SOL',
    currentPrice: 112.45,
    predictedPrice: 128.00,
    change: 13.83,
    trend: 'bullish',
    confidence: 78,
    days: 7,
  },
  {
    coin: 'Cardano',
    symbol: 'ADA',
    currentPrice: 0.62,
    predictedPrice: 0.58,
    change: -6.45,
    trend: 'bearish',
    confidence: 73,
    days: 7,
  },
  {
    coin: 'Avalanche',
    symbol: 'AVAX',
    currentPrice: 42.80,
    predictedPrice: 48.50,
    change: 13.32,
    trend: 'bullish',
    confidence: 80,
    days: 7,
  },
  {
    coin: 'Dogecoin',
    symbol: 'DOGE',
    currentPrice: 0.092,
    predictedPrice: 0.078,
    change: -15.22,
    trend: 'bearish',
    confidence: 70,
    days: 7,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');

  return NextResponse.json({
    predictions: PREDICTIONS.slice(0, limit),
    total: PREDICTIONS.length,
    generatedAt: new Date().toISOString(),
  });
}