import { Card } from '@/components/ui/card';

const asks = [
  { price: 68750.00, amount: 2.45, total: 168437.50 },
  { price: 68700.00, amount: 1.80, total: 123660.00 },
  { price: 68650.00, amount: 3.20, total: 219680.00 },
  { price: 68600.00, amount: 0.95, total: 65170.00 },
  { price: 68550.00, amount: 4.10, total: 281055.00 },
];

const bids = [
  { price: 68450.00, amount: 1.50, total: 102675.00 },
  { price: 68400.00, amount: 2.80, total: 191520.00 },
  { price: 68350.00, amount: 5.20, total: 355420.00 },
  { price: 68300.00, amount: 3.40, total: 232220.00 },
  { price: 68250.00, amount: 1.90, total: 129675.00 },
];

const maxTotal = Math.max(
  ...asks.map((a) => a.total),
  ...bids.map((b) => b.total)
);

export function OrderBook() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Order Book</h2>
      
      <div className="grid grid-cols-3 text-xs text-gray-400 mb-2 px-2">
        <span>Price (USD)</span>
        <span className="text-right">Amount (BTC)</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (Sell Orders) */}
      <div className="space-y-0.5 mb-4">
        {asks.map((ask, i) => (
          <div key={i} className="grid grid-cols-3 text-sm px-2 py-1 relative rounded">
            <div
              className="absolute inset-0 bg-red-500/10"
              style={{ width: `${(ask.total / maxTotal) * 100}%` }}
            />
            <span className="relative text-red-400 font-medium">
              ${ask.price.toLocaleString()}
            </span>
            <span className="relative text-right">{ask.amount.toFixed(2)}</span>
            <span className="relative text-right text-gray-400">
              ${ask.total.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Spread */}
      <div className="text-center py-2 border-y border-gray-800 mb-4">
        <span className="text-lg font-bold">$68,245.50</span>
        <div className="text-xs text-gray-400">
          Spread: $50.00 (0.07%)
        </div>
      </div>

      {/* Bids (Buy Orders) */}
      <div className="space-y-0.5">
        {bids.map((bid, i) => (
          <div key={i} className="grid grid-cols-3 text-sm px-2 py-1 relative rounded">
            <div
              className="absolute inset-0 bg-green-500/10"
              style={{ width: `${(bid.total / maxTotal) * 100}%` }}
            />
            <span className="relative text-green-400 font-medium">
              ${bid.price.toLocaleString()}
            </span>
            <span className="relative text-right">{bid.amount.toFixed(2)}</span>
            <span className="relative text-right text-gray-400">
              ${bid.total.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}