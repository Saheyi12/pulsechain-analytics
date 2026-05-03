import { Card } from '@/components/ui/card';

const allocations = [
  { coin: 'Bitcoin', symbol: 'BTC', percentage: 45, color: 'bg-orange-500', value: 34122.75 },
  { coin: 'Ethereum', symbol: 'ETH', percentage: 28, color: 'bg-blue-500', value: 17104.00 },
  { coin: 'Solana', symbol: 'SOL', percentage: 9, color: 'bg-purple-500', value: 5622.50 },
  { coin: 'Cardano', symbol: 'ADA', percentage: 2, color: 'bg-blue-400', value: 1240.00 },
  { coin: 'Avalanche', symbol: 'AVAX', percentage: 2, color: 'bg-red-400', value: 1070.00 },
  { coin: 'Others', symbol: '...', percentage: 14, color: 'bg-gray-500', value: 8540.75 },
];

export function AssetAllocation() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Asset Allocation</h2>

      {/* Donut Chart */}
      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {allocations.reduce((acc, item, index) => {
              const previousPercent = allocations
                .slice(0, index)
                .reduce((sum, a) => sum + a.percentage, 0);
              
              const circumference = 2 * Math.PI * 40;
              const dashLength = (item.percentage / 100) * circumference;
              const dashOffset = (previousPercent / 100) * circumference;

              acc.push(
                <circle
                  key={item.symbol}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={
                    item.color === 'bg-orange-500' ? '#F97316' :
                    item.color === 'bg-blue-500' ? '#3B82F6' :
                    item.color === 'bg-purple-500' ? '#8B5CF6' :
                    item.color === 'bg-blue-400' ? '#60A5FA' :
                    item.color === 'bg-red-400' ? '#F87171' : '#6B7280'
                  }
                  strokeWidth="12"
                  strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                  strokeDashoffset={-dashOffset}
                  strokeLinecap="round"
                />
              );
              return acc;
            }, [] as JSX.Element[])}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">5</div>
              <div className="text-xs text-gray-400">Assets</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {allocations.map((item) => (
          <div key={item.symbol} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm ${item.color}`}></div>
              <span className="text-sm">{item.coin}</span>
              <span className="text-xs text-gray-500">({item.symbol})</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">${item.value.toLocaleString()}</span>
              <span className="text-sm font-medium w-10 text-right">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}