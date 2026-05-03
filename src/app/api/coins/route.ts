import { NextRequest, NextResponse } from 'next/server';

const MOCK_COINS = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', price: 68245.50, change24h: 2.45, marketCap: 1340000000000, volume: 32500000000, image: '' },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', price: 3420.80, change24h: 1.87, marketCap: 410000000000, volume: 18200000000, image: '' },
  { id: 'solana', symbol: 'sol', name: 'Solana', price: 112.45, change24h: 15.23, marketCap: 48000000000, volume: 3200000000, image: '' },
  { id: 'cardano', symbol: 'ada', name: 'Cardano', price: 0.62, change24h: 8.71, marketCap: 22000000000, volume: 890000000, image: '' },
  { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche', price: 42.80, change24h: 12.15, marketCap: 15000000000, volume: 950000000, image: '' },
  { id: 'polkadot', symbol: 'dot', name: 'Polkadot', price: 8.95, change24h: 7.32, marketCap: 11800000000, volume: 520000000, image: '' },
  { id: 'chainlink', symbol: 'link', name: 'Chainlink', price: 16.20, change24h: 6.54, marketCap: 9500000000, volume: 480000000, image: '' },
  { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', price: 0.09, change24h: -8.32, marketCap: 12800000000, volume: 750000000, image: '' },
  { id: 'shiba-inu', symbol: 'shib', name: 'Shiba Inu', price: 0.000012, change24h: -6.21, marketCap: 7000000000, volume: 320000000, image: '' },
  { id: 'litecoin', symbol: 'ltc', name: 'Litecoin', price: 72.15, change24h: -4.12, marketCap: 5300000000, volume: 380000000, image: '' },
  { id: 'uniswap', symbol: 'uni', name: 'Uniswap', price: 7.85, change24h: 3.45, marketCap: 5900000000, volume: 210000000, image: '' },
  { id: 'aave', symbol: 'aave', name: 'Aave', price: 98.50, change24h: 5.67, marketCap: 1450000000, volume: 180000000, image: '' },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const sort = searchParams.get('sort') || 'market_cap_desc';

  let coins = [...MOCK_COINS];

  // Sort
  switch (sort) {
    case 'market_cap_desc':
      coins.sort((a, b) => b.marketCap - a.marketCap);
      break;
    case 'market_cap_asc':
      coins.sort((a, b) => a.marketCap - b.marketCap);
      break;
    case 'price_desc':
      coins.sort((a, b) => b.price - a.price);
      break;
    case 'price_asc':
      coins.sort((a, b) => a.price - b.price);
      break;
    case 'change_desc':
      coins.sort((a, b) => b.change24h - a.change24h);
      break;
  }

  // Paginate
  const start = (page - 1) * limit;
  const paginatedCoins = coins.slice(start, start + limit);

  return NextResponse.json({
    coins: paginatedCoins,
    total: coins.length,
    page,
    limit,
    hasMore: start + limit < coins.length,
  });
}