export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image?: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  totalVolume: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  priceChangePercentage7d: number;
  priceChangePercentage30d: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number | null;
  ath: number;
  athDate: string;
  atl: number;
  atlDate: string;
  sparkline7d?: number[];
  lastUpdated: string;
}

export interface CoinDetail extends Coin {
  description: string;
  website: string;
  explorers: string[];
  subreddit: string;
  twitter: string;
  categories: string[];
  marketData: {
    high24h: number;
    low24h: number;
    priceChange24hInCurrency: number;
    marketCapChange24h: number;
    marketCapChangePercentage24h: number;
  };
}

export interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume: number;
}

export interface CoinSearchResult {
  id: string;
  name: string;
  symbol: string;
  marketCapRank: number;
  thumb: string;
}

export interface GlobalMarketData {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  ethDominance: number;
  activeCryptocurrencies: number;
  marketCapChange24h: number;
}