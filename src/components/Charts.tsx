import { useMemo } from 'react';
import type { CrowdDataPoint, PredictionSlot } from '@/types';

const levelColor: Record<string, string> = {
  LOW: '#22c55e',
  MEDIUM: '#f59e0b',
  HIGH: '#ef4444',
};

export function PredictionChart({ slots }: { slots: PredictionSlot[] }) {
  const maxCrowd = Math.max(...slots.map((s) => s.crowd));
  const width = 560;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const points = slots.map((s, i) => ({
    x: padding.left + (i / (slots.length - 1)) * chartW,
    y: padding.top + (1 - s.crowd / maxCrowd) * chartH,
    ...s,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const areaPath =
    `M ${points[0].x} ${padding.top + chartH} ` +
    points.map((p) => `L ${p.x} ${p.y}`).join(' ') +
    ` L ${points[points.length - 1].x} ${padding.top + chartH} Z`;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[400px]" style={{ height: 'auto' }}>
        <defs>
          <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={padding.left}
            y1={padding.top + t * chartH}
            x2={width - padding.right}
            y2={padding.top + t * chartH}
            stroke="#e2e8f0"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}
        <path d={areaPath} fill="url(#predGrad)" />
        <path d={linePath} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p) => (
          <g key={p.time}>
            <circle cx={p.x} cy={p.y} r="5" fill="#fff" stroke={levelColor[p.level]} strokeWidth="2.5" />
            <text x={p.x} y={p.y - 12} textAnchor="middle" className="text-[11px] font-semibold fill-slate-700">
              {p.crowd}
            </text>
            <text x={p.x} y={height - 12} textAnchor="middle" className="text-[10px] fill-slate-500">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function CrowdBarChart({ data }: { data: CrowdDataPoint[] }) {
  const maxCrowd = Math.max(...data.map((d) => d.crowd));
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-end justify-between gap-1 min-w-[500px] h-[200px] px-1">
        {data.map((d, i) => {
          const h = (d.crowd / maxCrowd) * 100;
          const isPeak = d.crowd === maxCrowd;
          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1 group">
              <span className="text-[10px] font-semibold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                {d.crowd}
              </span>
              <div className="w-full flex-1 flex items-end">
                <div
                  className={`w-full rounded-t-md transition-all duration-300 group-hover:opacity-80 ${
                    isPeak
                      ? 'bg-gradient-to-t from-red-500 to-red-400'
                      : d.crowd > 35
                        ? 'bg-gradient-to-t from-amber-500 to-amber-400'
                        : d.crowd > 15
                          ? 'bg-gradient-to-t from-cyan-500 to-cyan-400'
                          : 'bg-gradient-to-t from-green-500 to-green-400'
                  }`}
                  style={{ height: `${h}%` }}
                />
              </div>
              <span className="text-[9px] text-slate-500 whitespace-nowrap">{d.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function WaitingTimeChart({ data }: { data: CrowdDataPoint[] }) {
  const maxWait = Math.max(...data.map((d) => d.waitingTime));
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-end justify-between gap-1 min-w-[500px] h-[180px] px-1">
        {data.map((d, i) => {
          const h = (d.waitingTime / maxWait) * 100;
          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1 group">
              <span className="text-[10px] font-semibold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                {d.waitingTime}m
              </span>
              <div className="w-full flex-1 flex items-end">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-300 group-hover:opacity-80"
                  style={{ height: `${h}%` }}
                />
              </div>
              <span className="text-[9px] text-slate-500 whitespace-nowrap">{d.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function OrdersChart({ data }: { data: CrowdDataPoint[] }) {
  const maxOrders = Math.max(...data.map((d) => d.orders));
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-end justify-between gap-1 min-w-[500px] h-[180px] px-1">
        {data.map((d, i) => {
          const h = (d.orders / maxOrders) * 100;
          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1 group">
              <span className="text-[10px] font-semibold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                {d.orders}
              </span>
              <div className="w-full flex-1 flex items-end">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-cyan-600 to-cyan-400 transition-all duration-300 group-hover:opacity-80"
                  style={{ height: `${h}%` }}
                />
              </div>
              <span className="text-[9px] text-slate-500 whitespace-nowrap">{d.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ConfidenceRing({ value }: { value: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = useMemo(() => circumference - (value / 100) * circumference, [value, circumference]);

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#0891b2"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="text-center">
        <span className="text-2xl font-bold text-slate-800">{value}%</span>
        <p className="text-[10px] text-slate-500 font-medium">Confidence</p>
      </div>
    </div>
  );
}
