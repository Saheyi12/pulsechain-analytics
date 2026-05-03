import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const data = await resend.emails.send({
      from: 'PulseChain Analytics <alerts@pulsechain-analytics.vercel.app>',
      to,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Resend error:', error);
    return { success: false, error };
  }
}

export async function sendPriceAlert(
  email: string,
  coinName: string,
  symbol: string,
  targetPrice: number,
  currentPrice: number,
  condition: string
) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3B82F6;">🚨 Price Alert Triggered</h2>
      <p><strong>${coinName} (${symbol})</strong> has reached your alert condition.</p>
      <div style="background: #1F2937; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p>Condition: Price <strong>${condition}</strong> $${targetPrice.toLocaleString()}</p>
        <p>Current Price: <strong style="color: #10B981;">$${currentPrice.toLocaleString()}</strong></p>
      </div>
      <a href="https://pulsechain-analytics.vercel.app/coin/${symbol.toLowerCase()}" 
         style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
        View ${coinName} Chart
      </a>
      <p style="color: #6B7280; font-size: 12px; margin-top: 24px;">
        PulseChain Analytics - AI-Powered Crypto Intelligence
      </p>
    </div>
  `;

  return sendEmail({ to: email, subject: `🚨 ${symbol} Alert: ${condition} $${targetPrice}`, html });
}

export async function sendWelcomeEmail(email: string, name: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #3B82F6;">Welcome to PulseChain Analytics! 🚀</h1>
      <p>Hi ${name},</p>
      <p>Thank you for joining PulseChain Analytics. You now have access to:</p>
      <ul>
        <li>Real-time cryptocurrency prices</li>
        <li>AI-powered price predictions</li>
        <li>Personalized price alerts</li>
        <li>Portfolio tracking</li>
        <li>Daily market analysis</li>
      </ul>
      <a href="https://pulsechain-analytics.vercel.app/dashboard" 
         style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
        Go to Dashboard
      </a>
    </div>
  `;

  return sendEmail({ to: email, subject: 'Welcome to PulseChain Analytics! 🚀', html });
}