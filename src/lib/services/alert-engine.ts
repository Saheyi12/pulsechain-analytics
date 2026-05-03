import { sendPriceAlert } from '@/lib/api/resend';

interface Alert {
  id: string;
  userId: string;
  coinId: string;
  coinName: string;
  symbol: string;
  targetPrice: number;
  condition: 'ABOVE' | 'BELOW' | 'PERCENTAGE_CHANGE' | 'VOLUME_SPIKE';
  notificationType: 'EMAIL' | 'PUSH' | 'SMS';
  isActive: boolean;
  userEmail?: string;
}

interface PriceCheck {
  coinId: string;
  currentPrice: number;
  change24h: number;
  volume24h: number;
}

export async function checkAlerts(alert: Alert, priceData: PriceCheck): Promise<boolean> {
  if (!alert.isActive) return false;
  if (alert.coinId !== priceData.coinId) return false;

  let triggered = false;

  switch (alert.condition) {
    case 'ABOVE':
      triggered = priceData.currentPrice >= alert.targetPrice;
      break;
    case 'BELOW':
      triggered = priceData.currentPrice <= alert.targetPrice;
      break;
    case 'PERCENTAGE_CHANGE':
      triggered = Math.abs(priceData.change24h) >= alert.targetPrice;
      break;
    case 'VOLUME_SPIKE':
      triggered = priceData.volume24h >= alert.targetPrice;
      break;
  }

  return triggered;
}

export async function processAlert(alert: Alert, priceData: PriceCheck): Promise<void> {
  const triggered = await checkAlerts(alert, priceData);
  
  if (!triggered) return;

  switch (alert.notificationType) {
    case 'EMAIL':
      if (alert.userEmail) {
        await sendPriceAlert(
          alert.userEmail,
          alert.coinName,
          alert.symbol,
          alert.targetPrice,
          priceData.currentPrice,
          alert.condition
        );
      }
      break;
    case 'PUSH':
      await sendPushNotification(alert, priceData);
      break;
    case 'SMS':
      await sendSMSAlert(alert, priceData);
      break;
  }
}

async function sendPushNotification(alert: Alert, priceData: PriceCheck): Promise<void> {
  console.log(`[PUSH] ${alert.symbol} alert triggered: ${alert.condition} $${alert.targetPrice}`);
  // Integrate with Web Push API or Firebase Cloud Messaging
}

async function sendSMSAlert(alert: Alert, priceData: PriceCheck): Promise<void> {
  console.log(`[SMS] ${alert.symbol} alert triggered: ${alert.condition} $${alert.targetPrice}`);
  // Integrate with Twilio or similar SMS provider
}

export async function processAllAlerts(alerts: Alert[], prices: PriceCheck[]): Promise<number> {
  let triggeredCount = 0;

  for (const alert of alerts) {
    const priceData = prices.find((p) => p.coinId === alert.coinId);
    if (priceData) {
      const triggered = await checkAlerts(alert, priceData);
      if (triggered) {
        await processAlert(alert, priceData);
        triggeredCount++;
      }
    }
  }

  return triggeredCount;
}