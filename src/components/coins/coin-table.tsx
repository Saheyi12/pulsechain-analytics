'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const coins = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 68245.50, change24h: 2.45, marketCap: 1340000000000, volume: 32500000000 },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3420.80, change24h: 1.87, marketCap: 410000000000, volume: 18200000000 },
  { id: 'solana', name: 'Solana', symbol: 'SOL', price: 112.45, change24h: 15.23, marketCap: 48000000000, volume: 3200000000 },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.62, change24h: 8.71, marketCap: 22000000000, volume: 890000000 },
  { id: 'avalanche-2', name: 'Avalanche', symbol: 'AVAX', price: 42.80, change24h: 12.15, marketCap: 15000000000, volume: 950000000 },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', price: 8.95, change24h: 7.32, marketCap: 11800000000, volume: 520000000 },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 0.092, change24h: -8.32, marketCap: 12800000000, volume: 750000000 },
  { id: 'chainlink', name: 'Chainlink', symbol: 'LINK', price: 16.20, change24h: 6.54, marketCap: 9500000000, volume: 480000000 },
  { id: 'uniswap', name: 'Uniswap', symbol: 'UNI', price: 7.85, change24h: 3.45, marketCap: 5900000000, volume: 210000000 },
  { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', price: 72.15, change24h: -4.12, marketCap: 5300000000, volume: 380000000 },
];

type SortKey = 'name' | 'price' | 'change24h' | 'marketCap' | 'volume';

export function CoinTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('marketCap');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const filtered = coins.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const mult = sortDir === 'asc' ? 1 : -1;
    return (a[sortKey] > b[sortKey] ? 1 : -1) * mult;
  });

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <span className="text-gray-600 ml-1">↕</span>;
    return <span className="text-blue-400 ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Search coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
              <th className="pb-3 font-medium">#</th>
              <th
                className="pb-3 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('name')}
              >
                Name <SortIcon col="name" />
              </th>
              <th
                className="pb-3 font-medium text-right cursor-pointer hover:text-white"
                onClick={() => handleSort('price')}
              >
                Price <SortIcon col="price" />
              </th>
              <th
                className="pb-3 font-medium text-right cursor-pointer hover:text-white"
                onClick={() => handleSort('change24h')}
              >
                24h <SortIcon col="change24h" />
              </th>
              <th
                className="pb-3 font-medium text-right cursor-pointer hover:text-white hidden md:table-cell"
                onClick={() => handleSort('marketCap')}
              >
                Market Cap <SortIcon col="marketCap" />
              </th>
              <th
                className="pb-3 font-medium text-right cursor-pointer hover:text-white hidden lg:table-cell"
                onClick={() => handleSort('volume')}
              >
                Volume <SortIcon col="volume" />
              </th>
              <th className="pb-3 font-medium text-right">Trade</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((coin, index) => (
              <tr
                key={coin.id}
                className="border-b border-gray-800/50 hover:bg-gray-800/30 transition"
              >
                <td className="py-3 text-gray-400 text-sm">{index + 1}</td>
                <td className="py-3">
                  <Link href={`/coin/${coin.id}`} className="hover:text-blue-400 transition">
                    <div className="font-medium">{coin.name}</div>
                    <div className="text-sm text-gray-400">{coin.symbol}</div>
                  </Link>
                </td>
                <td className="py-3 text-right font-medium">
                  {formatCurrency(coin.price)}
                </td>
                <td className="py-3 text-right">
                  <span className={coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {formatPercent(coin.change24h)}
                  </span>
                </td>
                <td className="py-3 text-right text-gray-400 hidden md:table-cell">
                  {formatCurrency(coin.marketCap)}
                </td>
                <td className="py-3 text-right text-gray-400 hidden lg:table-cell">
                  {formatCurrency(coin.volume)}
                </td>
                <td className="py-3 text-right">
                  <button className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded transition">
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No coins found for &quot;{search}&quot;
        </div>
      )}
    </div>
  );
}