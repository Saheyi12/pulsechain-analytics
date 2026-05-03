import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, chain } = body;

    if (!walletAddress || !chain) {
      return NextResponse.json({ error: 'Wallet address and chain required' }, { status: 400 });
    }

    // Mock wallet sync response
    const syncedHoldings = [
      {
        coinId: 'ethereum',
        coinName: 'Ethereum',
        symbol: 'ETH',
        amount: 3.45,
        currentPrice: 3420.80,
        value: 11801.76,
      },
      {
        coinId: 'usdc',
        coinName: 'USD Coin',
        symbol: 'USDC',
        amount: 5000,
        currentPrice: 1.00,
        value: 5000,
      },
      {
        coinId: 'chainlink',
        coinName: 'Chainlink',
        symbol: 'LINK',
        amount: 150,
        currentPrice: 16.20,
        value: 2430,
      },
    ];

    return NextResponse.json({
      success: true,
      walletAddress,
      chain,
      syncedAt: new Date().toISOString(),
      holdings: syncedHoldings,
      totalValue: syncedHoldings.reduce((sum, h) => sum + h.value, 0),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}