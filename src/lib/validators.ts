import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password is too long');

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const alertSchema = z.object({
  coinId: z.string().min(1, 'Coin is required'),
  targetPrice: z.number().positive('Price must be positive'),
  condition: z.enum(['ABOVE', 'BELOW', 'PERCENTAGE_CHANGE', 'VOLUME_SPIKE']),
  notificationType: z.enum(['EMAIL', 'PUSH', 'SMS']),
});

export const portfolioSchema = z.object({
  coinId: z.string().min(1),
  coinName: z.string().optional(),
  symbol: z.string().optional(),
  amount: z.number().positive('Amount must be positive'),
  buyPrice: z.number().positive('Buy price must be positive'),
});

export const affiliatePayoutSchema = z.object({
  amount: z.number().min(10, 'Minimum payout is $10'),
  method: z.enum(['USDC', 'USDT', 'BTC', 'ETH']),
  address: z.string().min(10, 'Invalid wallet address'),
});

export const blogGenerateSchema = z.object({
  category: z.enum(['MARKET_ANALYSIS', 'TECHNICAL_ANALYSIS', 'DEFI', 'NFT', 'TUTORIAL', 'NEWS', 'PREDICTION']).optional(),
  coinId: z.string().optional(),
  publishImmediately: z.boolean().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: emailSchema,
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type AlertInput = z.infer<typeof alertSchema>;
export type PortfolioInput = z.infer<typeof portfolioSchema>;
export type PayoutInput = z.infer<typeof affiliatePayoutSchema>;