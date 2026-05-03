import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const taxSummary = {
  year: 2024,
  totalTrades: 47,
  taxableEvents: 23,
  totalGains: 12850.75,
  totalLosses: 2340.50,
  netGain: 10510.25,
  shortTermGains: 8500.00,
  longTermGains: 2010.25,
  estimatedTax: 2522.46,
};

const breakdown = [
  { type: 'Short-term Capital Gains', amount: 8500.00, taxRate: '24%', estimatedTax: 2040.00 },
  { type: 'Long-term Capital Gains', amount: 2010.25, taxRate: '15%', estimatedTax: 301.54 },
  { type: 'Staking Rewards', amount: 320.00, taxRate: '24%', estimatedTax: 76.80 },
  { type: 'Airdrops', amount: 20.50, taxRate: '24%', estimatedTax: 4.92 },
];

export function TaxReport() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Tax Report</h2>
        <Badge variant="warning">Coming Soon - Beta</Badge>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-3 bg-gray-800/50 rounded-lg">
          <div className="text-xs text-gray-400">Total Trades</div>
          <div className="text-lg font-bold">{taxSummary.totalTrades}</div>
        </div>
        <div className="p-3 bg-gray-800/50 rounded-lg">
          <div className="text-xs text-gray-400">Taxable Events</div>
          <div className="text-lg font-bold">{taxSummary.taxableEvents}</div>
        </div>
        <div className="p-3 bg-gray-800/50 rounded-lg">
          <div className="text-xs text-gray-400">Net Gain</div>
          <div className="text-lg font-bold text-green-400">${taxSummary.netGain.toLocaleString()}</div>
        </div>
        <div className="p-3 bg-gray-800/50 rounded-lg">
          <div className="text-xs text-gray-400">Est. Tax Due</div>
          <div className="text-lg font-bold text-yellow-400">${taxSummary.estimatedTax.toLocaleString()}</div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3">Gains Breakdown</h3>
        <div className="space-y-2">
          {breakdown.map((item) => (
            <div key={item.type} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
              <div>
                <div className="text-sm font-medium">{item.type}</div>
                <div className="text-xs text-gray-400">Tax Rate: {item.taxRate}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">${item.amount.toLocaleString()}</div>
                <div className="text-xs text-yellow-400">Tax: ${item.estimatedTax.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-gray-800/50 rounded-lg mb-4">
        <div className="flex items-start gap-2">
          <span className="text-lg">⚠️</span>
          <div>
            <p className="text-sm font-medium mb-1">Important Disclaimer</p>
            <p className="text-xs text-gray-400">
              This is an estimate only. Tax laws vary by jurisdiction. Please consult a qualified tax professional
              for accurate tax advice. Cryptocurrency transactions may be taxable events in your country.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" size="sm" className="flex-1">
          Download Report (CSV)
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          Export for TurboTax
        </Button>
      </div>
    </Card>
  );
}