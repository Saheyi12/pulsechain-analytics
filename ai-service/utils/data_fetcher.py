import httpx
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Optional, Dict, List
import asyncio
from redis import Redis
import json
import os

# Redis configuration
REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379')
redis_client = Redis.from_url(REDIS_URL, decode_responses=True)

class DataFetcher:
    """Fetches cryptocurrency data from various sources with caching"""
    
    COINGECKO_BASE = "https://api.coingecko.com/api/v3"
    
    def __init__(self):
        self.cache_ttl = 30  # 30 seconds for prices
        self.historical_cache_ttl = 300  # 5 minutes for historical data
    
    async def fetch_current_price(self, coin_id: str) -> Optional[Dict]:
        """Fetch current price for a coin"""
        cache_key = f"price:{coin_id}"
        
        # Check cache first
        cached = redis_client.get(cache_key)
        if cached:
            return json.loads(cached)
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.COINGECKO_BASE}/simple/price",
                    params={
                        "ids": coin_id,
                        "vs_currencies": "usd",
                        "include_24hr_change": "true",
                        "include_market_cap": "true",
                        "include_24hr_vol": "true"
                    },
                    timeout=10.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    if coin_id in data:
                        # Cache the result
                        redis_client.setex(
                            cache_key,
                            self.cache_ttl,
                            json.dumps(data[coin_id])
                        )
                        return data[coin_id]
        except Exception as e:
            print(f"Error fetching price for {coin_id}: {e}")
        
        return None
    
    async def fetch_historical_prices(
        self, 
        coin_id: str, 
        days: int = 365
    ) -> pd.DataFrame:
        """Fetch historical price data"""
        cache_key = f"historical:{coin_id}:{days}"
        
        # Check cache
        cached = redis_client.get(cache_key)
        if cached:
            return pd.DataFrame(json.loads(cached))
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.COINGECKO_BASE}/coins/{coin_id}/market_chart",
                    params={
                        "vs_currency": "usd",
                        "days": days,
                        "interval": "daily" if days > 90 else "hourly"
                    },
                    timeout=15.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    prices = data.get("prices", [])
                    
                    if prices:
                        df = pd.DataFrame(prices, columns=["timestamp", "price"])
                        df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms")
                        df.set_index("timestamp", inplace=True)
                        df["price"] = df["price"].astype(float)
                        
                        # Add features
                        df["returns"] = df["price"].pct_change()
                        df["log_returns"] = np.log(df["price"] / df["price"].shift(1))
                        df["volatility"] = df["returns"].rolling(window=30).std()
                        df["sma_7"] = df["price"].rolling(window=7).mean()
                        df["sma_30"] = df["price"].rolling(window=30).mean()
                        df["volume"] = self._extract_volumes(data.get("total_volumes", []))
                        
                        # Cache
                        redis_client.setex(
                            cache_key,
                            self.historical_cache_ttl,
                            json.dumps(df.reset_index().to_dict(orient="records"))
                        )
                        
                        return df
        except Exception as e:
            print(f"Error fetching historical data for {coin_id}: {e}")
        
        return pd.DataFrame()
    
    def _extract_volumes(self, volumes_data: List) -> pd.Series:
        """Extract volume data"""
        if volumes_data:
            vols = pd.DataFrame(volumes_data, columns=["timestamp", "volume"])
            vols["timestamp"] = pd.to_datetime(vols["timestamp"], unit="ms")
            vols.set_index("timestamp", inplace=True)
            return vols["volume"]
        return pd.Series()
    
    async def fetch_market_data(self, limit: int = 100) -> List[Dict]:
        """Fetch top coins market data"""
        cache_key = f"market_data:{limit}"
        
        cached = redis_client.get(cache_key)
        if cached:
            return json.loads(cached)
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.COINGECKO_BASE}/coins/markets",
                    params={
                        "vs_currency": "usd",
                        "order": "market_cap_desc",
                        "per_page": limit,
                        "page": 1,
                        "sparkline": "true",
                        "price_change_percentage": "1h,24h,7d,30d"
                    },
                    timeout=15.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    redis_client.setex(
                        cache_key,
                        self.cache_ttl,
                        json.dumps(data)
                    )
                    return data
        except Exception as e:
            print(f"Error fetching market data: {e}")
        
        return []
    
    async def fetch_trending_coins(self) -> List[Dict]:
        """Fetch trending coins"""
        cache_key = "trending_coins"
        
        cached = redis_client.get(cache_key)
        if cached:
            return json.loads(cached)
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.COINGECKO_BASE}/search/trending",
                    timeout=10.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    coins = data.get("coins", [])
                    redis_client.setex(cache_key, 300, json.dumps(coins))
                    return coins
        except Exception as e:
            print(f"Error fetching trending coins: {e}")
        
        return []
    
    async def fetch_global_data(self) -> Optional[Dict]:
        """Fetch global crypto market data"""
        cache_key = "global_data"
        
        cached = redis_client.get(cache_key)
        if cached:
            return json.loads(cached)
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.COINGECKO_BASE}/global",
                    timeout=10.0
                )
                
                if response.status_code == 200:
                    data = response.json().get("data", {})
                    redis_client.setex(cache_key, 60, json.dumps(data))
                    return data
        except Exception as e:
            print(f"Error fetching global data: {e}")
        
        return None