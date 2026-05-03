interface Holding {
  id: string;
  coinId: string;
  coinName: string;
  symbol: string;
  amount: number;
  buyPrice: number;
  currentPrice: number;
}

interface PortfolioSummary {
  totalValue: number;
  totalInvested: number;
  totalPnl: number;
  totalPnlPercent: number;
  holdings: (Holding & {
    currentValue: number;
    invested: number;
    pnl: number;
    pnlPercent: number;
    allocation: number;
  })[];
}

export function calculatePortfolio(holdings: Holding[]): PortfolioSummary {
  const enriched = holdings.map((h) => {
    const currentValue = h.amount * h.currentPrice;
    const invested = h.amount * h.buyPrice;
    const pnl = currentValue - invested;
    const pnlPercent = invested > 0 ? (pnl / invested) * 100 : 0;

    return {
      ...h,
      currentValue,
      invested,
      pnl,
      pnlPercent,
      allocation: 0,
    };
  });

  const totalValue = enriched.reduce((sum, h) => sum + h.currentValue, 0);
  const totalInvested = enriched.reduce((sum, h) => sum + h.invested, 0);
  const totalPnl = totalValue - totalInvested;
  const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

  const withAllocation = enriched.map((h) => ({
    ...h,
    allocation: totalValue > 0 ? (h.currentValue / totalValue) * 100 : 0,
  }));

  return {
    totalValue,
    totalInvested,
    totalPnl,
    totalPnlPercent,
    holdings: withAllocation,
  };
}

export function calculateDCA(
  purchases: { amount: number; price: number }[]
): { totalInvested: number; totalAmount: number; averagePrice: number } {
  const totalInvested = purchases.reduce((sum, p) => sum + p.amount * p.price, 0);
  const totalAmount = purchases.reduce((sum, p) => sum + p.amount, 0);
  const averagePrice = totalAmount > 0 ? totalInvested / totalAmount : 0;

  return { totalInvested, totalAmount, averagePrice };
}

export function suggestRebalance(
  holdings: Holding[],
  targets: Record<string, number>
): { coinId: string; action: 'buy' | 'sell'; amount: number }[] {
  const totalValue = holdings.reduce((sum, h) => sum + h.amount * h.currentPrice, 0);
  const suggestions: { coinId: string; action: 'buy' | 'sell'; amount: number }[] = [];

  for (const holding of holdings) {
    const currentValue = holding.amount * holding.currentPrice;
    const currentAllocation = totalValue > 0 ? (currentValue / totalValue) * 100 : 0;
    const targetAllocation = targets[holding.coinId] || 0;
    const diff = targetAllocation - currentAllocation;

    if (Math.abs(diff) > 2) {
      const targetValue = (targetAllocation / 100) * totalValue;
      const valueDiff = targetValue - currentValue;

      suggestions.push({
        coinId: holding.coinId,
        action: valueDiff > 0 ? 'buy' : 'sell',
        amount: Math.abs(valueDiff),
      });
    }
  }

  return suggestions;
}