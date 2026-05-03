import { getCoins, getGlobalData, getTrending } from '@/lib/api/coingecko';
import { getCachedMarketData, setCachedMarketData, getCachedGlobalData, setCachedGlobalData, getCachedTrending, setCachedTrending } from '@/lib/cache/price-cache';

interface MarketOverview {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  ethDominance: number;
  activeCryptocurrencies: number;
  marketCapChange24h: number;
}

interface TopMover {
  coinId: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
}

export async function getMarketOverview(): Promise<MarketOverview> {
  const cached = await getCachedGlobalData();
  if (cached) return cached;

  try {
    const data = await getGlobalData();
    const overview = {
      totalMarketCap: data?.total_market_cap?.usd || 0,
      totalVolume24h: data?.total_volume?.usd || 0,
      btcDominance: data?.market_cap_percentage?.btc || 0,
      ethDominance: data?.market_cap_percentage?.eth || 0,
      activeCryptocurrencies: data?.active_cryptocurrencies || 0,
      marketCapChange24h: data?.market_cap_change_percentage_24h_usd || 0,
    };
    await setCachedGlobalData(overview);
    return overview;
  } catch {
    return getFallbackMarketOverview();
  }
}

export async function getTopCoins(limit: number = 100) {
  const cached = await getCachedMarketData(limit);
  if (cached) return cached;

  try {
    const coins = await getCoins(limit);
    const formatted = coins.map(formatCoinData);
    await setCachedMarketData(limit, formatted);
    return formatted;
  } catch {
    return getFallbackCoins(limit);
  }
}

export async function getTopGainers(limit: number = 5): Promise<TopMover[]> {
  const coins = await getTopCoins(100);
  return coins
    .filter((c: any) => c.change24h > 0)
    .sort((a: any, b: any) => b.change24h - a.change24h)
    .slice(0, limit)
    .map((c: any) => ({
      coinId: c.id,
      name: c.name,
      symbol: c.symbol,
      price: c.price,
      change24h: c.change24h,
    }));
}

export async function getTopLosers(limit: number = 5): Promise<TopMover[]> {
  const coins = await getTopCoins(100);
  return coins
    .filter((c: any) => c.change24h < 0)
    .sort((a: any, b: any) => a.change24h - b.change24h)
    .slice(0, limit)
    .map((c: any) => ({
      coinId: c.id,
      name: c.name,
      symbol: c.symbol,
      price: c.price,
      change24h: c.change24h,
    }));
}

export async function getTrendingCoins(limit: number = 5) {
  const cached = await getCachedTrending();
  if (cached) return cached.slice(0, limit);

  try {
    const data = await getTrending();
    const coins = data?.coins?.slice(0, limit).map((item: any) => ({
      coinId: item.item.id,
      name: item.item.name,
      symbol: item.item.symbol,
      marketCapRank: item.item.market_cap_rank,
      score: item.item.score,
    })) || [];
    await setCachedTrending(coins);
    return coins;
  } catch {
    return [];
  }
}

function formatCoinData(coin: any) {
  return {
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    price: coin.current_price || 0,
    change24h: coin.price_change_percentage_24h || 0,
    change7d: coin.price_change_percentage_7d_in_currency || 0,
    marketCap: coin.market_cap || 0,
    volume: coin.total_volume || 0,
    image: coin.image || '',
    sparkline: coin.sparkline_in_7d?.price || [],
  };
}

function getFallbackMarketOverview(): MarketOverview {
  return {
    totalMarketCap: 2400000000000,
    totalVolume24h: 125000000000,
    btcDominance: 52.3,
    ethDominance: 18.1,
    activeCryptocurrencies: 12000,
    marketCapChange24h: 2.4,
  };
}

function getFallbackCoins(limit: number): any[] {
  const fallbackCoins = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc', price: 68245.50, change24h: 2.45, marketCap: 1340000000000, volume: 32500000000 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'eth', price: 3420.80, change24h: 1.87, marketCap: 410000000000, volume: 18200000000 },
    { id: 'solana', name: 'Solana', symbol: 'sol', price: 112.45, change24h: 15.23, marketCap: 48000000000, volume: 3200000000 },
    { id: 'cardano', name: 'Cardano', symbol: 'ada', price: 0.62, change24h: 8.71, marketCap: 22000000000, volume: 890000000 },
    { id: 'avalanche-2', name: 'Avalanche', symbol: 'avax', price: 42.80, change24h: 12.15, marketCap: 15000000000, volume: 950000000 },
  ];
  return fallbackCoins.slice(0, limit);
}