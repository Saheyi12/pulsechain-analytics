import { Card } from '@/components/ui/card';

const badges = [
  {
    icon: '🔒',
    title: '256-Bit SSL',
    description: 'All data is encrypted with industry-standard SSL encryption.',
  },
  {
    icon: '🛡️',
    title: 'Security Audited',
    description: 'Our platform undergoes regular security assessments.',
  },
  {
    icon: '🇪🇺',
    title: 'GDPR Compliant',
    description: 'We comply with EU data protection regulations.',
  },
  {
    icon: '⚡',
    title: '99.9% Uptime',
    description: 'High availability infrastructure with real-time monitoring.',
  },
];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <Card key={badge.title} className="p-4 text-center">
          <div className="text-2xl mb-2">{badge.icon}</div>
          <h3 className="text-sm font-semibold mb-1">{badge.title}</h3>
          <p className="text-xs text-gray-400">{badge.description}</p>
        </Card>
      ))}
    </div>
  );
}

export function TrustFooter() {
  return (
    <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        SSL Secured
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        Audit Verified
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        GDPR Ready
      </div>
    </div>
  );
}