// Redis cache integration - requires '@upstash/redis' package
// Install: npm install @upstash/redis

let Redis: any = null;
let redis: any = null;

try {
  const upstash = require('@upstash/redis');
  Redis = upstash.Redis;
  redis = new Redis({
    url: process.env.REDIS_URL || 'https://localhost:6379',
    token: process.env.REDIS_TOKEN || '',
  });
} catch (e) {
  console.warn('Redis package not installed. Cache features disabled.');
}

export { redis };
export default redis;
