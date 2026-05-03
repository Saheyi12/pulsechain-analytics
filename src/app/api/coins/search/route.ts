import { NextRequest, NextResponse } from 'next/server';

const ALL_COINS = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', marketCap: 1340000000000 },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', marketCap: 410000000000 },
  { id: 'solana', symbol: 'sol', name: 'Solana', marketCap: 48000000000 },
  { id: 'cardano', symbol: 'ada', name: 'Cardano', marketCap: 22000000000 },
  { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche', marketCap: 15000000000 },
  { id: 'polkadot', symbol: 'dot', name: 'Polkadot', marketCap: 11800000000 },
  { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', marketCap: 12800000000 },
  { id: 'shiba-inu', symbol: 'shib', name: 'Shiba Inu', marketCap: 7000000000 },
  { id: 'chainlink', symbol: 'link', name: 'Chainlink', marketCap: 9500000000 },
  { id: 'uniswap', symbol: 'uni', name: 'Uniswap', marketCap: 5900000000 },
  { id: 'litecoin', symbol: 'ltc', name: 'Litecoin', marketCap: 5300000000 },
  { id: 'aave', symbol: 'aave', name: 'Aave', marketCap: 1450000000 },
  { id: 'cosmos', symbol: 'atom', name: 'Cosmos', marketCap: 3800000000 },
  { id: 'stellar', symbol: 'xlm', name: 'Stellar', marketCap: 3500000000 },
  { id: 'monero', symbol: 'xmr', name: 'Monero', marketCap: 2900000000 },
  { id: 'tron', symbol: 'trx', name: 'TRON', marketCap: 8500000000 },
  { id: 'near', symbol: 'near', name: 'NEAR Protocol', marketCap: 4200000000 },
  { id: 'aptos', symbol: 'apt', name: 'Aptos', marketCap: 3800000000 },
  { id: 'sui', symbol: 'sui', name: 'Sui', marketCap: 2100000000 },
  { id: 'arbitrum', symbol: 'arb', name: 'Arbitrum', marketCap: 1800000000 },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!query || query.length < 1) {
    return NextResponse.json({ coins: [] });
  }

  // Search by name, symbol, or ID
  const results = ALL_COINS.filter(
    (coin) =>
      coin.name.toLowerCase().includes(query) ||
      coin.symbol.toLowerCase().includes(query) ||
      coin.id.toLowerCase().includes(query)
  )
    .sort((a, b) => b.marketCap - a.marketCap)
    .slice(0, limit);

  return NextResponse.json({
    query,
    coins: results,
    total: results.length,
  });
}