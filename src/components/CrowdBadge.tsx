import type { CrowdLevel } from '@/types';

const config: Record<CrowdLevel, { bg: string; text: string; dot: string; ring: string }> = {
  LOW: {
    bg: 'bg-green-50 border-green-200',
    text: 'text-green-700',
    dot: 'bg-green-500',
    ring: 'shadow-green-200',
  },
  MEDIUM: {
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
    ring: 'shadow-amber-200',
  },
  HIGH: {
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-700',
    dot: 'bg-red-500',
    ring: 'shadow-red-200',
  },
};

export function CrowdBadge({
  level,
  size = 'md',
}: {
  level: CrowdLevel;
  size?: 'sm' | 'md' | 'lg';
}) {
  const c = config[level];
  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1.5',
    md: 'px-3 py-1 text-sm gap-2',
    lg: 'px-4 py-1.5 text-base gap-2.5',
  };
  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border font-semibold ${c.bg} ${c.text} ${sizes[size]}`}
    >
      <span className={`rounded-full ${c.dot} ${dotSizes[size]} animate-pulse`} />
      {level}
    </span>
  );
}

export function CrowdRing({ level }: { level: CrowdLevel }) {
  const colors: Record<CrowdLevel, string> = {
    LOW: 'text-green-500',
    MEDIUM: 'text-amber-500',
    HIGH: 'text-red-500',
  };
  const bgColors: Record<CrowdLevel, string> = {
    LOW: 'bg-green-50',
    MEDIUM: 'bg-amber-50',
    HIGH: 'bg-red-50',
  };
  return (
    <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${bgColors[level]}`}>
      <span className={`text-2xl font-bold ${colors[level]}`}>
        {level === 'LOW' ? 'L' : level === 'MEDIUM' ? 'M' : 'H'}
      </span>
    </div>
  );
}
