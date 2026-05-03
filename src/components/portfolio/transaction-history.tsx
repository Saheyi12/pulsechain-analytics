import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const transactions = [
  { id: '1', type: 'buy', coin: 'Bitcoin', symbol: 'BTC', amount: 0.1, price: 65000, total: 6500, date: '2024-03-15', status: 'completed' },
  { id: '2', type: 'sell', coin: 'Ethereum', symbol: 'ETH', amount: 1.5, price: 3400, total: 5100, date: '2024-03-14', status: 'completed' },
  { id: '3', type: 'buy', coin: 'Solana', symbol: 'SOL', amount: 25, price: 108, total: 2700, date: '2024-03-12', status: 'completed' },
  { id: '4', type: 'buy', coin: 'Cardano', symbol: 'ADA', amount: 1000, price: 0.58, total: 580, date: '2024-03-10', status: 'completed' },
  { id: '5', type: 'sell', coin: 'Avalanche', symbol: 'AVAX', amount: 10, price: 42, total: 420, date: '2024-03-08', status: 'completed' },
  { id: '6', type: 'buy', coin: 'Chainlink', symbol: 'LINK', amount: 50, price: 15.80, total: 790, date: '2024-03-05', status: 'pending' },
  { id: '7', type: 'sell', coin: 'Polkadot', symbol: 'DOT', amount: 100, price: 8.90, total: 890, date: '2024-03-03', status: 'failed' },
];

const typeBadges: Record<string, { variant: 'success' | 'danger' | 'warning'; label: string }> = {
  buy: { variant: 'success', label: 'Buy' },
  sell: { variant: 'danger', label: 'Sell' },
};

const statusBadges: Record<string, { variant: 'success' | 'warning' | 'danger' }> = {
  completed: { variant: 'success' },
  pending: { variant: 'warning' },
  failed: { variant: 'danger' },
};

export function TransactionHistory() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Transaction History</h2>
        <button className="text-sm text-blue-400 hover:text-blue-300 transition">
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Asset</th>
              <th className="pb-3 font-medium text-right">Amount</th>
              <th className="pb-3 font-medium text-right">Price</th>
              <th className="pb-3 font-medium text-right">Total</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                <td className="py-3">
                  <Badge variant={typeBadges[tx.type]?.variant || 'default'}>
                    {typeBadges[tx.type]?.label || tx.type}
                  </Badge>
                </td>
                <td className="py-3">
                  <div className="font-medium text-sm">{tx.coin}</div>
                  <div className="text-xs text-gray-400">{tx.symbol}</div>
                </td>
                <td className="py-3 text-right text-sm">{tx.amount}</td>
                <td className="py-3 text-right text-sm">${tx.price.toLocaleString()}</td>
                <td className="py-3 text-right text-sm font-medium">${tx.total.toLocaleString()}</td>
                <td className="py-3 text-sm text-gray-400">{tx.date}</td>
                <td className="py-3">
                  <Badge variant={statusBadges[tx.status]?.variant || 'default'}>
                    {tx.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <div className="text-3xl mb-2">📋</div>
          <p>No transactions yet.</p>
        </div>
      )}
    </Card>
  );
}