import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log webhook data
    console.log('CoinMarketCap Webhook:', {
      event: body.event,
      coin: body.data?.symbol,
      price: body.data?.price,
      timestamp: new Date().toISOString(),
    });

    // Process different event types
    switch (body.event) {
      case 'price_update':
        // Update price cache
        break;
      case 'listing':
        // New coin listed
        break;
      case 'market_update':
        // Market data update
        break;
    }

    return NextResponse.json({ success: true, received: true });

  } catch (error) {
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 400 });
  }
}