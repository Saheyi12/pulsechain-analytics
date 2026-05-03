import { cache } from './cache-manager';

interface PriceData {
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  lastUpdated: string;
}

interface HistoricalPrice {
  timestamp: number;
  price: number;
}

const PRICE_TTL = 30; // 30 seconds for live prices
const HISTORICAL_TTL = 300; // 5 minutes for historical data
const MARKET_TTL = 60; // 1 minute for market data

export async function getCachedPrice(coinId: string): Promise<PriceData | null> {
  return cache.get<PriceData>(`price:${coinId}`);
}

export async function setCachedPrice(coinId: string, data: PriceData): Promise<boolean> {
  return cache.set(`price:${coinId}`, data, PRICE_TTL);
}

export async function getCachedPrices(coinIds: string[]): Promise<Record<string, PriceData>> {
  const results: Record<string, PriceData> = {};
  
  for (const coinId of coinIds) {
    const cached = await getCachedPrice(coinId);
    if (cached) {
      results[coinId] = cached;
    }
  }
  
  return results;
}

export async function setCachedPrices(prices: Record<string, PriceData>): Promise<void> {
  for (const [coinId, data] of Object.entries(prices)) {
    await setCachedPrice(coinId, data);
  }
}

export async function getCachedHistorical(
  coinId: string,
  days: number
): Promise<HistoricalPrice[] | null> {
  return cache.get<HistoricalPrice[]>(`historical:${coinId}:${days}`);
}

export async function setCachedHistorical(
  coinId: string,
  days: number,
  data: HistoricalPrice[]
): Promise<boolean> {
  return cache.set(`historical:${coinId}:${days}`, data, HISTORICAL_TTL);
}

export async function getCachedMarketData(limit: number): Promise<PriceData[] | null> {
  return cache.get<PriceData[]>(`market:top:${limit}`);
}

export async function setCachedMarketData(limit: number, data: PriceData[]): Promise<boolean> {
  return cache.set(`market:top:${limit}`, data, MARKET_TTL);
}

export async function getCachedGlobalData(): Promise<any | null> {
  return cache.get('market:global');
}

export async function setCachedGlobalData(data: any): Promise<boolean> {
  return cache.set('market:global', data, MARKET_TTL);
}

export async function getCachedTrending(): Promise<any | null> {
  return cache.get('market:trending');
}

export async function setCachedTrending(data: any): Promise<boolean> {
  return cache.set('market:trending', data, 300);
}

export async function invalidatePrice(coinId: string): Promise<boolean> {
  return cache.delete(`price:${coinId}`);
}

export async function invalidateAllPrices(): Promise<number> {
  return cache.deletePattern('price:*');
}

export async function getPriceAge(coinId: string): Promise<number | null> {
  const cached = await getCachedPrice(coinId);
  if (!cached) return null;
  return Date.now() - new Date(cached.lastUpdated).getTime();
}

export async function isPriceStale(coinId: string, maxAge: number = 60000): Promise<boolean> {
  const age = await getPriceAge(coinId);
  return age === null || age > maxAge;
}