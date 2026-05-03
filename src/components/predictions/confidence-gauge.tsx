import { Card } from '@/components/ui/card';

interface ConfidenceGaugeProps {
  value: number;
  size?: 'sm' | 'default' | 'lg';
}

export function ConfidenceGauge({ value, size = 'default' }: ConfidenceGaugeProps) {
  const sizes = {
    sm: { width: 80, height: 40, fontSize: 'text-lg' },
    default: { width: 120, height: 60, fontSize: 'text-2xl' },
    lg: { width: 160, height: 80, fontSize: 'text-3xl' },
  };

  const { width, height, fontSize } = sizes[size];

  const getColor = (val: number) => {
    if (val >= 80) return '#10B981';
    if (val >= 60) return '#3B82F6';
    if (val >= 40) return '#F59E0B';
    return '#EF4444';
  };

  const getLabel = (val: number) => {
    if (val >= 80) return 'High';
    if (val >= 60) return 'Moderate';
    if (val >= 40) return 'Low';
    return 'Very Low';
  };

  const color = getColor(value);
  const label = getLabel(value);

  // Arc parameters
  const radius = width / 2 - 10;
  const circumference = Math.PI * radius;
  const progress = (value / 100) * circumference;

  return (
    <Card className="p-6 text-center">
      <h3 className="text-sm font-medium text-gray-400 mb-4">Prediction Confidence</h3>
      
      <div className="flex justify-center mb-4">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* Background arc */}
          <path
            d={`M 10,${height - 10} A ${radius},${radius} 0 0,1 ${width - 10},${height - 10}`}
            fill="none"
            stroke="#1F2937"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Progress arc */}
          <path
            d={`M 10,${height - 10} A ${radius},${radius} 0 0,1 ${width - 10},${height - 10}`}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${progress}, ${circumference}`}
            className="transition-all duration-1000"
          />
          
          {/* Center text */}
          <text
            x={width / 2}
            y={height / 2 + 5}
            textAnchor="middle"
            fill="white"
            fontSize="16"
            fontWeight="bold"
          >
            {value}%
          </text>
        </svg>
      </div>

      <div className={`font-bold ${fontSize}`} style={{ color }}>
        {value}%
      </div>
      <div className="text-sm mt-1" style={{ color }}>
        {label} Confidence
      </div>

      <div className="flex justify-between text-[10px] text-gray-500 mt-4 max-w-[200px] mx-auto">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
    </Card>
  );
}