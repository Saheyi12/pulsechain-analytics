import { getCoins, getGlobalData, getTrending } from '../src/lib/api/coingecko';
import { 
  setCachedPrice, setCachedMarketData, 
  setCachedGlobalData, setCachedTrending 
} from '../src/lib/cache/price-cache';

async function main() {
  console.log('🔄 Syncing market data...\n');

  try {
    // Sync global data
    console.log('🌍 Fetching global market data...');
    const globalData = await getGlobalData();
    if (globalData) {
      await setCachedGlobalData({
        totalMarketCap: globalData?.total_market_cap?.usd || 0,
        totalVolume24h: globalData?.total_volume?.usd || 0,
        btcDominance: globalData?.market_cap_percentage?.btc || 0,
        ethDominance: globalData?.market_cap_percentage?.eth || 0,
        activeCryptocurrencies: globalData?.active_cryptocurrencies || 0,
        marketCapChange24h: globalData?.market_cap_change_percentage_24h_usd || 0,
      });
      console.log('  ✅ Global data cached');
    }

    // Sync top coins
    console.log('🪙 Fetching top 100 coins...');
    const coins = await getCoins(100);
    if (coins && coins.length > 0) {
      const formattedCoins = coins.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.current_price || 0,
        change24h: coin.price_change_percentage_24h || 0,
        marketCap: coin.market_cap || 0,
        volume: coin.total_volume || 0,
        image: coin.image || '',
      }));
      await setCachedMarketData(100, formattedCoins);
      console.log(`  ✅ ${formattedCoins.length} coins cached`);

      // Cache individual prices
      let priceCacheCount = 0;
      for (const coin of formattedCoins.slice(0, 50)) {
        await setCachedPrice(coin.id, {
          price: coin.price,
          change24h: coin.change24h,
          marketCap: coin.marketCap,
          volume24h: coin.volume,
          lastUpdated: new Date().toISOString(),
        });
        priceCacheCount++;
      }
      console.log(`  ✅ ${priceCacheCount} individual prices cached`);
    }

    // Sync trending
    console.log('🔥 Fetching trending coins...');
    const trending = await getTrending();
    if (trending?.coins) {
      const formattedTrending = trending.coins.slice(0, 15).map((item: any) => ({
        coinId: item.item.id,
        name: item.item.name,
        symbol: item.item.symbol,
        marketCapRank: item.item.market_cap_rank,
        score: item.item.score,
      }));
      await setCachedTrending(formattedTrending);
      console.log(`  ✅ ${formattedTrending.length} trending coins cached`);
    }

    console.log('\n═══════════════════════════════════════');
    console.log('✅ Market data sync complete!');
    console.log(`📅 Synced at: ${new Date().toISOString()}`);
    console.log('═══════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Market data sync failed:', error);
    process.exit(1);
  }
}

// Run every 5 minutes if called with --watch
const args = process.argv.slice(2);
if (args.includes('--watch')) {
  console.log('👁️  Watch mode enabled - syncing every 5 minutes\n');
  main();
  setInterval(main, 5 * 60 * 1000);
} else {
  main();
}