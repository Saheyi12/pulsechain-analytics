import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const history = [
  {
    id: '1',
    coinName: 'Bitcoin',
    symbol: 'BTC',
    condition: 'ABOVE',
    targetPrice: 45000,
    triggeredPrice: 45200,
    triggeredAt: '2024-03-15T14:30:00Z',
    status: 'triggered',
    notificationType: 'EMAIL',
  },
  {
    id: '2',
    coinName: 'Ethereum',
    symbol: 'ETH',
    condition: 'BELOW',
    targetPrice: 2500,
    triggeredPrice: 2480,
    triggeredAt: '2024-03-12T09:15:00Z',
    status: 'triggered',
    notificationType: 'PUSH',
  },
  {
    id: '3',
    coinName: 'Solana',
    symbol: 'SOL',
    condition: 'ABOVE',
    targetPrice: 120,
    triggeredPrice: 0,
    triggeredAt: '2024-03-10T16:00:00Z',
    status: 'cancelled',
    notificationType: 'EMAIL',
  },
  {
    id: '4',
    coinName: 'Cardano',
    symbol: 'ADA',
    condition: 'PERCENTAGE_CHANGE',
    targetPrice: 10,
    triggeredPrice: 12.5,
    triggeredAt: '2024-03-08T11:45:00Z',
    status: 'triggered',
    notificationType: 'SMS',
  },
  {
    id: '5',
    coinName: 'Avalanche',
    symbol: 'AVAX',
    condition: 'ABOVE',
    targetPrice: 50,
    triggeredPrice: 0,
    triggeredAt: '2024-03-05T08:00:00Z',
    status: 'expired',
    notificationType: 'EMAIL',
  },
];

const statusBadges: Record<string, { variant: 'success' | 'danger' | 'warning'; label: string }> = {
  triggered: { variant: 'success', label: 'Triggered' },
  cancelled: { variant: 'danger', label: 'Cancelled' },
  expired: { variant: 'warning', label: 'Expired' },
};

const notificationIcons: Record<string, string> = {
  EMAIL: '📧',
  PUSH: '🔔',
  SMS: '📱',
};

export function AlertHistory() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Alert History</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
              <th className="pb-3 font-medium">Alert</th>
              <th className="pb-3 font-medium">Target</th>
              <th className="pb-3 font-medium">Triggered</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Via</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="border-b border-gray-800/50">
                <td className="py-3">
                  <div className="font-medium text-sm">{item.coinName}</div>
                  <div className="text-xs text-gray-400">{item.symbol}</div>
                </td>
                <td className="py-3">
                  <div className="text-sm">
                    {item.condition.replace('_', ' ')} ${item.targetPrice.toLocaleString()}
                  </div>
                </td>
                <td className="py-3">
                  <div className="text-sm">
                    {item.triggeredPrice > 0
                      ? `$${item.triggeredPrice.toLocaleString()}`
                      : '-'}
                  </div>
                </td>
                <td className="py-3 text-sm text-gray-400">
                  {new Date(item.triggeredAt).toLocaleDateString()}
                </td>
                <td className="py-3">
                  <Badge variant={statusBadges[item.status]?.variant || 'default'}>
                    {statusBadges[item.status]?.label || item.status}
                  </Badge>
                </td>
                <td className="py-3 text-center">
                  <span title={item.notificationType}>
                    {notificationIcons[item.notificationType]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {history.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <div className="text-3xl mb-2">📋</div>
          <p>No alert history yet.</p>
        </div>
      )}
    </Card>
  );
}