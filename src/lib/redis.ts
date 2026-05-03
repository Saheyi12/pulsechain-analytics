import { Redis } from '@upstash/redis';

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

export const redis = globalForRedis.redis ?? new Redis({
  url: process.env.REDIS_URL || 'https://localhost:6379',
  token: process.env.REDIS_TOKEN || '',
});

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

export default redis;