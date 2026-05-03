export type AlertCondition = 'ABOVE' | 'BELOW' | 'PERCENTAGE_CHANGE' | 'VOLUME_SPIKE';
export type NotificationType = 'EMAIL' | 'PUSH' | 'SMS';
export type AlertStatus = 'TRIGGERED' | 'CANCELLED' | 'EXPIRED';

export interface PriceAlert {
  id: string;
  userId: string;
  coinId: string;
  coinName: string;
  symbol: string;
  targetPrice: number;
  condition: AlertCondition;
  notificationType: NotificationType;
  isActive: boolean;
  triggeredAt: string | null;
  createdAt: string;
}

export interface CreateAlertInput {
  coinId: string;
  coinName?: string;
  symbol?: string;
  targetPrice: number;
  condition: AlertCondition;
  notificationType: NotificationType;
}

export interface AlertHistory {
  id: string;
  coinName: string;
  symbol: string;
  condition: AlertCondition;
  targetPrice: number;
  triggeredPrice: number;
  triggeredAt: string;
  status: AlertStatus;
  notificationType: NotificationType;
}

export interface WhaleMovement {
  id: string;
  coin: string;
  symbol: string;
  amount: number;
  value: number;
  from: string;
  to: string;
  type: 'inflow' | 'outflow' | 'transfer';
  timestamp: string;
}

export interface WhaleActivity {
  totalInflow: number;
  totalOutflow: number;
  netFlow: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
}