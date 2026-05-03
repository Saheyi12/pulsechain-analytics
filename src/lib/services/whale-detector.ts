interface WhaleMovement {
  id: string;
  coin: string;
  symbol: string;
  amount: number;
  value: number;
  from: string;
  to: string;
  type: 'inflow' | 'outflow' | 'transfer';
  timestamp: string;
}

const whaleWallets: Record<string, string> = {
  'Binance': 'Binance',
  'Coinbase': 'Coinbase',
  'Kraken': 'Kraken',
  'Unknown Whale': 'Unknown Wallet',
  'Market Maker': 'Market Maker',
};

const mockMovements: WhaleMovement[] = [
  {
    id: '1',
    coin: 'Bitcoin',
    symbol: 'BTC',
    amount: 2500,
    value: 170_000_000,
    from: 'Unknown Whale',
    to: 'Coinbase',
    type: 'inflow',
    timestamp: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: '2',
    coin: 'Ethereum',
    symbol: 'ETH',
    amount: 15000,
    value: 51_000_000,
    from: 'Binance',
    to: 'Unknown Whale',
    type: 'outflow',
    timestamp: new Date(Date.now() - 900000).toISOString(),
  },
  {
    id: '3',
    coin: 'Solana',
    symbol: 'SOL',
    amount: 500000,
    value: 56_000_000,
    from: 'Market Maker',
    to: 'Unknown Whale',
    type: 'transfer',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
  },
];

export async function getWhaleMovements(): Promise<WhaleMovement[]> {
  return mockMovements;
}

export async function getWhaleMovementsForCoin(coinId: string): Promise<WhaleMovement[]> {
  return mockMovements.filter(
    (m) => m.coin.toLowerCase() === coinId.toLowerCase() || m.symbol.toLowerCase() === coinId.toLowerCase()
  );
}

export function isWhaleMovement(value: number): boolean {
  const thresholds: Record<string, number> = {
    BTC: 1_000_000,
    ETH: 500_000,
    SOL: 100_000,
    default: 100_000,
  };
  return value >= thresholds.default;
}

export function analyzeWhaleActivity(movements: WhaleMovement[]): {
  totalInflow: number;
  totalOutflow: number;
  netFlow: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
} {
  let totalInflow = 0;
  let totalOutflow = 0;

  for (const move of movements) {
    if (move.type === 'inflow') totalInflow += move.value;
    else if (move.type === 'outflow') totalOutflow += move.value;
  }

  const netFlow = totalOutflow - totalInflow;

  let sentiment: 'bullish' | 'bearish' | 'neutral';
  if (netFlow > 10_000_000) sentiment = 'bullish';
  else if (netFlow < -10_000_000) sentiment = 'bearish';
  else sentiment = 'neutral';

  return { totalInflow, totalOutflow, netFlow, sentiment };
}