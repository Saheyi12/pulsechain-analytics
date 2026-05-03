import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log Stripe webhook
    console.log('Stripe Webhook:', {
      type: body.type,
      id: body.id,
      timestamp: new Date().toISOString(),
    });

    // Handle different Stripe events
    switch (body.type) {
      case 'checkout.session.completed':
        // Payment successful - upgrade user to premium
        break;
      case 'customer.subscription.updated':
        // Subscription changed
        break;
      case 'customer.subscription.deleted':
        // Subscription cancelled - downgrade user
        break;
      case 'invoice.paid':
        // Invoice paid
        break;
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }
}