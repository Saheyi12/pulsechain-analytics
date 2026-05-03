import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

const stats = {
  referralCode: 'DEMO2024',
  referralLink: 'https://pulsechain-analytics.vercel.app/?ref=DEMO2024',
  tier: 'SILVER',
  commissionRate: 30,
  totalReferrals: 25,
  activeReferrals: 18,
  totalEarnings: 250.50,
  pendingEarnings: 45.75,
  thisMonth: 82.30,
  lastMonth: 168.20,
};

export function AffiliateDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-xs text-gray-400 mb-1">Total Earnings</div>
          <div className="text-xl font-bold text-green-400">{formatCurrency(stats.totalEarnings)}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-gray-400 mb-1">Commission Rate</div>
          <div className="text-xl font-bold text-blue-400">{stats.commissionRate}%</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-gray-400 mb-1">Total Referrals</div>
          <div className="text-xl font-bold">{stats.totalReferrals}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-gray-400 mb-1">Active Referrals</div>
          <div className="text-xl font-bold text-purple-400">{stats.activeReferrals}</div>
        </Card>
      </div>

      {/* Tier Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Your Tier</h2>
            <p className="text-sm text-gray-400">Refer more users to unlock higher commissions</p>
          </div>
          <Badge variant="primary" className="text-lg px-4 py-1">{stats.tier}</Badge>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {[
            { tier: 'BRONZE', rate: 20, refs: '0-10', active: true },
            { tier: 'SILVER', rate: 30, refs: '11-50', active: true },
            { tier: 'GOLD', rate: 40, refs: '51+', active: false },
          ].map((t) => (
            <div
              key={t.tier}
              className={`p-4 rounded-lg text-center border ${
                t.active
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 bg-gray-800/30 opacity-50'
              }`}
            >
              <div className="text-2xl mb-1">
                {t.tier === 'BRONZE' ? '🥉' : t.tier === 'SILVER' ? '🥈' : '🥇'}
              </div>
              <div className="font-semibold text-sm">{t.tier}</div>
              <div className="text-lg font-bold text-blue-400">{t.rate}%</div>
              <div className="text-xs text-gray-400">{t.refs} refs</div>
              {t.active && (
                <Badge variant="success" className="mt-2">Current</Badge>
              )}
            </div>
          ))}
        </div>

        {/* Progress to next tier */}
        <div className="p-4 bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progress to GOLD</span>
            <span className="text-sm">25/51 referrals</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
              style={{ width: '49%' }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">26 more referrals needed for 40% commission</p>
        </div>
      </Card>

      {/* Monthly Earnings */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Earnings Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">This Month</div>
            <div className="text-2xl font-bold text-green-400">{formatCurrency(stats.thisMonth)}</div>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Last Month</div>
            <div className="text-2xl font-bold">{formatCurrency(stats.lastMonth)}</div>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Available for Payout</div>
            <div className="text-2xl font-bold text-yellow-400">{formatCurrency(stats.pendingEarnings)}</div>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Lifetime Earned</div>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalEarnings)}</div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button className="flex-1" variant="gradient">
          Request Payout
        </Button>
        <Button className="flex-1" variant="outline">
          View All Referrals
        </Button>
      </div>
    </div>
  );
}