export interface PortfolioHolding {
  id: string;
  coinId: string;
  coinName: string;
  symbol: string;
  amount: number;
  buyPrice: number;
  currentPrice: number;
}

export interface EnrichedHolding extends PortfolioHolding {
  currentValue: number;
  invested: number;
  pnl: number;
  pnlPercent: number;
  allocation: number;
}

export interface PortfolioSummary {
  totalValue: number;
  totalInvested: number;
  totalPnl: number;
  totalPnlPercent: number;
  totalHoldings: number;
}

export interface Portfolio extends PortfolioSummary {
  holdings: EnrichedHolding[];
}

export interface AddHoldingInput {
  coinId: string;
  coinName?: string;
  symbol?: string;
  amount: number;
  buyPrice: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  coin: string;
  symbol: string;
  amount: number;
  price: number;
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface DCAInput {
  purchases: { amount: number; price: number }[];
}

export interface DCAResult {
  totalInvested: number;
  totalAmount: number;
  averagePrice: number;
}

export interface RebalanceSuggestion {
  coinId: string;
  action: 'buy' | 'sell';
  amount: number;
}

export interface WalletSyncInput {
  walletAddress: string;
  chain: string;
}

export interface TaxSummary {
  year: number;
  totalTrades: number;
  taxableEvents: number;
  totalGains: number;
  totalLosses: number;
  netGain: number;
  shortTermGains: number;
  longTermGains: number;
  estimatedTax: number;
}