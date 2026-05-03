import { NextRequest, NextResponse } from 'next/server';

let alerts: any[] = [
  {
    id: 'alert-1',
    userId: 'demo-user-1',
    coinId: 'bitcoin',
    coinName: 'Bitcoin',
    symbol: 'BTC',
    targetPrice: 50000,
    condition: 'ABOVE',
    notificationType: 'EMAIL',
    isActive: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'alert-2',
    userId: 'demo-user-1',
    coinId: 'ethereum',
    coinName: 'Ethereum',
    symbol: 'ETH',
    targetPrice: 2000,
    condition: 'BELOW',
    notificationType: 'EMAIL',
    isActive: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'alert-3',
    userId: 'demo-user-1',
    coinId: 'solana',
    coinName: 'Solana',
    symbol: 'SOL',
    targetPrice: 150,
    condition: 'ABOVE',
    notificationType: 'EMAIL',
    isActive: false,
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const active = searchParams.get('active');

  let filteredAlerts = [...alerts];

  if (active === 'true') {
    filteredAlerts = filteredAlerts.filter((a) => a.isActive);
  } else if (active === 'false') {
    filteredAlerts = filteredAlerts.filter((a) => !a.isActive);
  }

  return NextResponse.json({
    alerts: filteredAlerts,
    total: filteredAlerts.length,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { coinId, coinName, symbol, targetPrice, condition, notificationType } = body;

    if (!coinId || !targetPrice || !condition || !notificationType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newAlert = {
      id: `alert-${Date.now()}`,
      userId: 'demo-user-1',
      coinId,
      coinName: coinName || coinId,
      symbol: symbol || coinId.toUpperCase(),
      targetPrice: parseFloat(targetPrice),
      condition,
      notificationType,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    alerts.unshift(newAlert);

    return NextResponse.json({ success: true, alert: newAlert }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}