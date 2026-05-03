import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const tiers = [
  {
    name: 'BRONZE',
    icon: '🥉',
    rate: 20,
    requirement: '0-10 referrals',
    color: 'from-amber-600 to-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
  },
  {
    name: 'SILVER',
    icon: '🥈',
    rate: 30,
    requirement: '11-50 referrals',
    color: 'from-gray-400 to-gray-300',
    bgColor: 'bg-gray-400/10',
    borderColor: 'border-gray-400/30',
  },
  {
    name: 'GOLD',
    icon: '🥇',
    rate: 40,
    requirement: '51-100 referrals',
    color: 'from-yellow-500 to-yellow-300',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
  },
  {
    name: 'PLATINUM',
    icon: '💎',
    rate: 50,
    requirement: '101+ referrals',
    color: 'from-purple-500 to-purple-300',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
];

const benefits = [
  '20% base commission',
  'Monthly bonus for top performers',
  'Early access to new features',
  'Priority support',
  'Custom referral codes',
  'Dedicated account manager',
];

export function TierProgress({ currentTier = 'SILVER', currentRefs = 25 }: { currentTier?: string; currentRefs?: number }) {

  const getNextTier = () => {
    const tierIndex = tiers.findIndex((t) => t.name === currentTier);
    return tierIndex < tiers.length - 1 ? tiers[tierIndex + 1] : null;
  };

  const getProgressToNext = () => {
    const tierIndex = tiers.findIndex((t) => t.name === currentTier);
    if (tierIndex >= tiers.length - 1) return 100;

    const currentMin = tierIndex === 0 ? 0 : parseInt(tiers[tierIndex].requirement.split('-')[0]) || 0;
    const nextMin = parseInt(tiers[tierIndex + 1].requirement.split('-')[0]) || 100;
    const range = nextMin - currentMin;
    const progress = currentRefs - currentMin;
    return Math.min(Math.max((progress / range) * 100, 0), 100);
  };

  const nextTier = getNextTier();
  const progress = getProgressToNext();

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Tier Progress</h2>

      {/* Tier Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {tiers.map((tier) => {
          const isCurrent = tier.name === currentTier;
          const tierIndex = tiers.findIndex((t) => t.name === tier.name);
          const currentIndex = tiers.findIndex((t) => t.name === currentTier);
          const isPast = tierIndex < currentIndex;

          return (
            <div
              key={tier.name}
              className={`p-3 rounded-lg border text-center transition ${
                isCurrent
                  ? `${tier.bgColor} ${tier.borderColor}`
                  : isPast
                  ? 'bg-gray-800/30 border-gray-700 opacity-70'
                  : 'bg-gray-800/20 border-gray-700/50 opacity-40'
              }`}
            >
              <div className="text-lg">{tier.icon}</div>
              <div className="text-xs font-bold mt-1">{tier.name}</div>
              <div className={`text-sm font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                {tier.rate}%
              </div>
              <div className="text-[10px] text-gray-400">{tier.requirement}</div>
              {isCurrent && <Badge variant="primary" className="mt-1 text-[10px]">You</Badge>}
              {isPast && <Badge variant="success" className="mt-1 text-[10px]">✓</Badge>}
            </div>
          );
        })}
      </div>

      {/* Progress to Next Tier */}
      {nextTier && (
        <div className="p-4 bg-gray-800/50 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Progress to {nextTier.name} {nextTier.icon}
            </span>
            <span className="text-sm font-medium">{currentRefs} referrals</span>
          </div>
          <Progress value={progress} variant="success" size="lg" />
          <p className="text-xs text-gray-400 mt-2">
            {parseInt(nextTier.requirement.split('-')[0]) - currentRefs} more referrals needed for {nextTier.rate}% commission
          </p>
        </div>
      )}

      {/* Current Benefits */}
      <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
        <h3 className="text-sm font-semibold mb-2">Your Benefits</h3>
        <div className="grid grid-cols-2 gap-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
              <span className="text-green-400">✓</span>
              {benefit}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
