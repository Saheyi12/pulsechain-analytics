const BASE_URL = 'https://api.coingecko.com/api/v3';

interface CacheEntry {
  data: any;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 30000; // 30 seconds

async function fetchWithCache(url: string, ttl: number = CACHE_TTL) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`CoinGecko API error: ${response.status}`);
  }

  const data = await response.json();
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}

export async function getCoins(limit: number = 100) {
  return fetchWithCache(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&sparkline=true&price_change_percentage=1h,24h,7d,30d`
  );
}

export async function getCoin(id: string) {
  return fetchWithCache(
    `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
  );
}

export async function getCoinPrice(id: string) {
  return fetchWithCache(
    `${BASE_URL}/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`
  );
}

export async function getHistoricalPrices(id: string, days: number = 7) {
  return fetchWithCache(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
    300000 // 5 min cache
  );
}

export async function getTrending() {
  return fetchWithCache(`${BASE_URL}/search/trending`, 300000);
}

export async function getGlobalData() {
  return fetchWithCache(`${BASE_URL}/global`, 60000);
}

export async function searchCoins(query: string) {
  return fetchWithCache(`${BASE_URL}/search?query=${encodeURIComponent(query)}`, 300000);
}