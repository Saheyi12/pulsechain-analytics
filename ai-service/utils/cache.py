from redis import Redis
import json
import os
from typing import Optional, Any
from datetime import timedelta

REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379')

class CacheManager:
    """Advanced cache management with tiered storage"""
    
    def __init__(self):
        self.redis = Redis.from_url(REDIS_URL, decode_responses=True)
        self.default_ttl = 60  # 1 minute
    
    def get(self, key: str) -> Optional[Any]:
        """Get value from cache"""
        try:
            value = self.redis.get(key)
            if value:
                return json.loads(value)
        except Exception:
            pass
        return None
    
    def set(self, key: str, value: Any, ttl: int = None) -> bool:
        """Set value in cache"""
        try:
            ttl = ttl or self.default_ttl
            serialized = json.dumps(value, default=str)
            self.redis.setex(key, ttl, serialized)
            return True
        except Exception:
            return False
    
    def delete(self, key: str) -> bool:
        """Delete value from cache"""
        try:
            self.redis.delete(key)
            return True
        except Exception:
            return False
    
    def delete_pattern(self, pattern: str) -> int:
        """Delete all keys matching pattern"""
        try:
            keys = self.redis.keys(pattern)
            if keys:
                return self.redis.delete(*keys)
        except Exception:
            pass
        return 0
    
    def exists(self, key: str) -> bool:
        """Check if key exists"""
        try:
            return self.redis.exists(key) > 0
        except Exception:
            return False
    
    def increment(self, key: str, amount: int = 1) -> Optional[int]:
        """Increment a counter"""
        try:
            return self.redis.incrby(key, amount)
        except Exception:
            return None
    
    def get_or_set(self, key: str, factory_func, ttl: int = None) -> Any:
        """Get from cache or compute and store"""
        value = self.get(key)
        if value is not None:
            return value
        
        value = factory_func()
        self.set(key, value, ttl)
        return value

# Singleton instance
cache = CacheManager()