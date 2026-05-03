import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

const referrals = [
  { id: '1', email: 'trader1@email.com', status: 'ACTIVE', commission: 12.50, joinedAt: '2024-03-10', trades: 15 },
  { id: '2', email: 'investor2@email.com', status: 'ACTIVE', commission: 8.75, joinedAt: '2024-03-08', trades: 8 },
  { id: '3', email: 'crypto3@email.com', status: 'PENDING', commission: 0, joinedAt: '2024-03-12', trades: 0 },
  { id: '4', email: 'trader4@email.com', status: 'ACTIVE', commission: 25.00, joinedAt: '2024-03-05', trades: 32 },
  { id: '5', email: 'user5@email.com', status: 'CHURNED', commission: 5.00, joinedAt: '2024-02-28', trades: 3 },
  { id: '6', email: 'whale6@email.com', status: 'ACTIVE', commission: 45.30, joinedAt: '2024-03-01', trades: 50 },
  { id: '7', email: 'newbie7@email.com', status: 'PENDING', commission: 0, joinedAt: '2024-03-14', trades: 0 },
  { id: '8', email: 'pro8@email.com', status: 'ACTIVE', commission: 18.20, joinedAt: '2024-02-20', trades: 22 },
];

const statusBadges: Record<string, { variant: 'success' | 'warning' | 'danger'; label: string }> = {
  ACTIVE: { variant: 'success', label: 'Active' },
  PENDING: { variant: 'warning', label: 'Pending' },
  CHURNED: { variant: 'danger', label: 'Churned' },
};

export function EarningsTracker() {
  const activeCount = referrals.filter((r) => r.status === 'ACTIVE').length;
  const pendingCount = referrals.filter((r) => r.status === 'PENDING').length;
  const totalCommission = referrals.reduce((sum, r) => sum + r.commission, 0);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Referral Earnings</h2>
        <div className="flex gap-3 text-sm">
          <span className="text-gray-400">{referrals.length} total</span>
          <span className="text-green-400">{activeCount} active</span>
          <span className="text-yellow-400">{pendingCount} pending</span>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-gray-800/50 rounded-lg text-center">
          <div className="text-xs text-gray-400">Referrals</div>
          <div className="text-lg font-bold">{referrals.length}</div>
        </div>
        <div className="p-3 bg-gray-800/50 rounded-lg text-center">
          <div className="text-xs text-gray-400">Avg Commission</div>
          <div className="text-lg font-bold">
            {formatCurrency(referrals.filter((r) => r.commission > 0).length > 0
              ? totalCommission / referrals.filter((r) => r.commission > 0).length
              : 0)}
          </div>
        </div>
        <div className="p-3 bg-gray-800/50 rounded-lg text-center">
          <div className="text-xs text-gray-400">Total Earned</div>
          <div className="text-lg font-bold text-green-400">{formatCurrency(totalCommission)}</div>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
              <th className="pb-3 font-medium">User</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Trades</th>
              <th className="pb-3 font-medium text-right">Commission</th>
              <th className="pb-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((ref) => (
              <tr key={ref.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                <td className="py-3">
                  <div className="text-sm font-medium">{ref.email}</div>
                </td>
                <td className="py-3">
                  <Badge variant={statusBadges[ref.status]?.variant || 'default'}>
                    {statusBadges[ref.status]?.label || ref.status}
                  </Badge>
                </td>
                <td className="py-3 text-right text-sm">{ref.trades}</td>
                <td className="py-3 text-right">
                  <span className={`text-sm font-medium ${ref.commission > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                    {ref.commission > 0 ? formatCurrency(ref.commission) : '-'}
                  </span>
                </td>
                <td className="py-3 text-sm text-gray-400">{ref.joinedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {referrals.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <div className="text-3xl mb-2">👥</div>
          <p>No referrals yet. Share your link to start earning!</p>
        </div>
      )}
    </Card>
  );
}