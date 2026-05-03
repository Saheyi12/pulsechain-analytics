import { NextRequest, NextResponse } from 'next/server';

let portfolio = {
  holdings: [
    { id: 'h1', coinId: 'bitcoin', coinName: 'Bitcoin', symbol: 'BTC', amount: 0.5, buyPrice: 35000, currentPrice: 68245.50 },
    { id: 'h2', coinId: 'ethereum', coinName: 'Ethereum', symbol: 'ETH', amount: 5, buyPrice: 2000, currentPrice: 3420.80 },
    { id: 'h3', coinId: 'solana', coinName: 'Solana', symbol: 'SOL', amount: 50, buyPrice: 80, currentPrice: 112.45 },
    { id: 'h4', coinId: 'cardano', coinName: 'Cardano', symbol: 'ADA', amount: 2000, buyPrice: 0.40, currentPrice: 0.62 },
  ],
};

export async function GET() {
  const holdings = portfolio.holdings.map((h) => {
    const currentValue = h.amount * h.currentPrice;
    const invested = h.amount * h.buyPrice;
    const pnl = currentValue - invested;
    const pnlPercent = invested > 0 ? (pnl / invested) * 100 : 0;

    return {
      ...h,
      currentValue,
      invested,
      pnl,
      pnlPercent,
    };
  });

  const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalInvested = holdings.reduce((sum, h) => sum + h.invested, 0);
  const totalPnl = totalValue - totalInvested;
  const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

  return NextResponse.json({
    holdings,
    summary: {
      totalValue,
      totalInvested,
      totalPnl,
      totalPnlPercent,
      totalHoldings: holdings.length,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { coinId, coinName, symbol, amount, buyPrice } = body;

    if (!coinId || !amount || !buyPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newHolding = {
      id: `h${Date.now()}`,
      coinId,
      coinName: coinName || coinId,
      symbol: symbol || coinId.toUpperCase(),
      amount: parseFloat(amount),
      buyPrice: parseFloat(buyPrice),
      currentPrice: 100,
    };

    portfolio.holdings.push(newHolding);

    return NextResponse.json({ success: true, holding: newHolding }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Holding ID required' }, { status: 400 });
  }

  portfolio.holdings = portfolio.holdings.filter((h) => h.id !== id);

  return NextResponse.json({ success: true, message: 'Holding removed' });
}