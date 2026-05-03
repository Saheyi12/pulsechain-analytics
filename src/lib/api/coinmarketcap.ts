const BASE_URL = 'https://pro-api.coinmarketcap.com/v1';

const headers = {
  'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY || '',
  'Accept': 'application/json',
};

export async function getCMCListings(limit: number = 100) {
  try {
    const response = await fetch(
      `${BASE_URL}/cryptocurrency/listings/latest?limit=${limit}&convert=USD`,
      { headers }
    );
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('CMC API error:', error);
    return [];
  }
}

export async function getCMCQuote(symbol: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/cryptocurrency/quotes/latest?symbol=${symbol}&convert=USD`,
      { headers }
    );
    const data = await response.json();
    return data.data?.[symbol] || null;
  } catch (error) {
    console.error('CMC API error:', error);
    return null;
  }
}

export async function getCMCGlobalMetrics() {
  try {
    const response = await fetch(
      `${BASE_URL}/global-metrics/quotes/latest`,
      { headers }
    );
    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('CMC API error:', error);
    return null;
  }
}