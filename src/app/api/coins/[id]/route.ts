import { NextRequest, NextResponse } from 'next/server';

const COIN_DETAILS: Record<string, any> = {
  bitcoin: {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    price: 68245.50,
    change24h: 2.45,
    change7d: 8.32,
    change30d: 15.67,
    marketCap: 1340000000000,
    volume24h: 32500000000,
    circulatingSupply: 19600000,
    totalSupply: 21000000,
    maxSupply: 21000000,
    ath: 69045,
    athDate: '2024-03-05',
    atl: 67.81,
    atlDate: '2013-07-06',
    description: 'Bitcoin is the first successful internet money based on peer-to-peer technology.',
    website: 'https://bitcoin.org',
    explorers: ['https://blockchain.info', 'https://blockchair.com/bitcoin'],
    subreddit: 'https://reddit.com/r/bitcoin',
    twitter: 'https://twitter.com/bitcoin',
  },
  ethereum: {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    price: 3420.80,
    change24h: 1.87,
    change7d: 5.43,
    change30d: 12.34,
    marketCap: 410000000000,
    volume24h: 18200000000,
    circulatingSupply: 120000000,
    totalSupply: 120000000,
    maxSupply: null,
    ath: 4878,
    athDate: '2021-11-10',
    atl: 0.43,
    atlDate: '2015-10-20',
    description: 'Ethereum is a decentralized platform that runs smart contracts.',
    website: 'https://ethereum.org',
    explorers: ['https://etherscan.io'],
    subreddit: 'https://reddit.com/r/ethereum',
    twitter: 'https://twitter.com/ethereum',
  },
  solana: {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    price: 112.45,
    change24h: 15.23,
    change7d: 22.56,
    change30d: 45.67,
    marketCap: 48000000000,
    volume24h: 3200000000,
    circulatingSupply: 430000000,
    totalSupply: 570000000,
    maxSupply: null,
    ath: 260,
    athDate: '2021-11-06',
    atl: 0.50,
    atlDate: '2020-05-11',
    description: 'Solana is a high-performance blockchain supporting builders around the world.',
    website: 'https://solana.com',
    explorers: ['https://explorer.solana.com'],
    subreddit: 'https://reddit.com/r/solana',
    twitter: 'https://twitter.com/solana',
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const coin = COIN_DETAILS[params.id];

  if (!coin) {
    // Return generic coin data for unknown IDs
    return NextResponse.json({
      id: params.id,
      symbol: params.id.substring(0, 3).toUpperCase(),
      name: params.id.charAt(0).toUpperCase() + params.id.slice(1),
      price: 100.00,
      change24h: 0,
      change7d: 0,
      change30d: 0,
      marketCap: 1000000000,
      volume24h: 100000000,
      circulatingSupply: 10000000,
      totalSupply: 10000000,
      maxSupply: null,
      ath: 200,
      athDate: '2024-01-01',
      atl: 10,
      atlDate: '2023-01-01',
      description: `${params.id} cryptocurrency details.`,
      website: '',
      explorers: [],
      subreddit: '',
      twitter: '',
    });
  }

  return NextResponse.json(coin);
}