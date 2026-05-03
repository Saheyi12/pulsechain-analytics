import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const earnings = {
    totalEarnings: 250.50,
    pendingEarnings: 45.75,
    paidEarnings: 204.75,
    thisMonth: 82.30,
    lastMonth: 168.20,
    tier: 'SILVER',
    commissionRate: 30,
    referrals: [
      { id: 'ref1', email: 'user1@email.com', status: 'ACTIVE', commission: 12.50, date: '2024-03-10' },
      { id: 'ref2', email: 'user2@email.com', status: 'ACTIVE', commission: 8.75, date: '2024-03-08' },
      { id: 'ref3', email: 'user3@email.com', status: 'PENDING', commission: 0, date: '2024-03-12' },
      { id: 'ref4', email: 'user4@email.com', status: 'ACTIVE', commission: 25.00, date: '2024-03-05' },
      { id: 'ref5', email: 'user5@email.com', status: 'CHURNED', commission: 5.00, date: '2024-02-28' },
    ],
    history: [
      { month: 'March 2024', referrals: 8, earnings: 82.30 },
      { month: 'February 2024', referrals: 12, earnings: 168.20 },
      { month: 'January 2024', referrals: 5, earnings: 45.75 },
    ],
  };

  return NextResponse.json(earnings);
}