import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const affiliateData = {
    referralCode: 'DEMO2024',
    referralLink: 'https://pulsechain-analytics.vercel.app/?ref=DEMO2024',
    tier: 'SILVER',
    commissionRate: 30,
    totalReferrals: 25,
    totalEarnings: 250.50,
  };

  return NextResponse.json(affiliateData);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customCode } = body;

    const referralCode = customCode || `PULSE${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      referralCode,
      referralLink: `https://pulsechain-analytics.vercel.app/?ref=${referralCode}`,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate link' }, { status: 400 });
  }
}