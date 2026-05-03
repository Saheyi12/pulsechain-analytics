// Resend email integration - requires 'resend' package
// Install: npm install resend
// Get API key: https://resend.com

let resend: any = null;

try {
  const { Resend } = require('resend');
  resend = new Resend(process.env.RESEND_API_KEY || '');
} catch (e) {
  console.warn('Resend package not installed. Email features disabled.');
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  if (!resend) return { success: false, error: 'Email service not configured.' };
  
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
  const html = `<div><h2>Price Alert Triggered</h2><p>${coinName} (${symbol}) has reached your alert condition.</p><p>Condition: ${condition} $${targetPrice}</p><p>Current: $${currentPrice}</p></div>`;
  return sendEmail({ to: email, subject: `${symbol} Alert: ${condition} $${targetPrice}`, html });
}

export async function sendWelcomeEmail(email: string, name: string) {
  const html = `<div><h1>Welcome to PulseChain Analytics!</h1><p>Hi ${name}, thanks for joining!</p></div>`;
  return sendEmail({ to: email, subject: 'Welcome to PulseChain Analytics!', html });
}
