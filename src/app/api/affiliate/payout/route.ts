import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const payouts = [
    { id: 'pay1', amount: 150.00, status: 'COMPLETED', method: 'USDC', address: '0x1234...5678', paidAt: '2024-03-01', txHash: '0xabc...' },
    { id: 'pay2', amount: 54.75, status: 'COMPLETED', method: 'BTC', address: 'bc1q...xyz', paidAt: '2024-02-15', txHash: '0xdef...' },
    { id: 'pay3', amount: 45.75, status: 'PENDING', method: 'USDC', address: '0x1234...5678', paidAt: null, txHash: null },
  ];

  return NextResponse.json({ payouts });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, method, address } = body;

    if (!amount || !method || !address) {
      return NextResponse.json({ error: 'Amount, method, and address required' }, { status: 400 });
    }

    if (parseFloat(amount) < 10) {
      return NextResponse.json({ error: 'Minimum payout is $10' }, { status: 400 });
    }

    const newPayout = {
      id: `pay${Date.now()}`,
      amount: parseFloat(amount),
      status: 'PENDING',
      method,
      address,
      createdAt: new Date().toISOString(),
      paidAt: null,
      txHash: null,
    };

    return NextResponse.json({
      success: true,
      message: 'Payout request submitted',
      payout: newPayout,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}