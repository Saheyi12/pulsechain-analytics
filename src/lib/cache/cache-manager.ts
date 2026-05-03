import { redis } from '@/lib/redis';

interface CacheOptions {
  ttl?: number; // Time to live in seconds
  namespace?: string;
}

const DEFAULT_TTL = 60; // 1 minute

export class CacheManager {
  private namespace: string;

  constructor(namespace: string = 'pulsechain') {
    this.namespace = namespace;
  }

  private key(key: string): string {
    return `${this.namespace}:${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(this.key(key));
      if (!data) return null;
      return JSON.parse(data as string) as T;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl: number = DEFAULT_TTL): Promise<boolean> {
    try {
      await redis.set(this.key(key), JSON.stringify(value), { ex: ttl });
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      await redis.del(this.key(key));
      return true;
    } catch (error) {
      console.error('Cache delete error:', error);
      return false;
    }
  }

  async deletePattern(pattern: string): Promise<number> {
    try {
      const keys = await redis.keys(this.key(pattern));
      if (keys.length > 0) {
        return await redis.del(...keys);
      }
      return 0;
    } catch (error) {
      console.error('Cache deletePattern error:', error);
      return 0;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      return (await redis.exists(this.key(key))) === 1;
    } catch (error) {
      return false;
    }
  }

  async increment(key: string, amount: number = 1): Promise<number> {
    try {
      return await redis.incrby(this.key(key), amount);
    } catch (error) {
      console.error('Cache increment error:', error);
      return 0;
    }
  }

  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttl: number = DEFAULT_TTL
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) return cached;

    const value = await factory();
    await this.set(key, value, ttl);
    return value;
  }

  async remember<T>(
    key: string,
    ttl: number,
    factory: () => Promise<T>
  ): Promise<T> {
    return this.getOrSet(key, factory, ttl);
  }

  async flush(): Promise<boolean> {
    try {
      await this.deletePattern('*');
      return true;
    } catch (error) {
      console.error('Cache flush error:', error);
      return false;
    }
  }

  async tags(tags: string[]): Promise<TaggedCache> {
    return new TaggedCache(this, tags);
  }
}

class TaggedCache {
  private cache: CacheManager;
  private tags: string[];

  constructor(cache: CacheManager, tags: string[]) {
    this.cache = cache;
    this.tags = tags;
  }

  async get<T>(key: string): Promise<T | null> {
    return this.cache.get<T>(`tagged:${this.tags.join(':')}:${key}`);
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<boolean> {
    for (const tag of this.tags) {
      await this.cache.set(`tag:${tag}:${key}`, true, ttl);
    }
    return this.cache.set(`tagged:${this.tags.join(':')}:${key}`, value, ttl);
  }

  async flushByTag(tag: string): Promise<number> {
    return this.cache.deletePattern(`tag:${tag}:*`);
  }
}

export const cache = new CacheManager('pulsechain');
export const marketCache = new CacheManager('pulsechain:market');
export const userCache = new CacheManager('pulsechain:user');
export const blogCache = new CacheManager('pulsechain:blog');