import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface AnalyticsChartProps {
  months: string[];
  revenue: number[];
  deals: number[];
}

type Metric = 'revenue' | 'deals';
type Year = 'This year' | 'Last year';

export function AnalyticsChart({ months, revenue, deals }: AnalyticsChartProps) {
  const [metric, setMetric] = useState<Metric>('revenue');
  const [year, setYear] = useState<Year>('This year');
  const [hovered, setHovered] = useState<number | null>(null);

  const scale = year === 'This year' ? 1 : 0.72;
  const values = (metric === 'revenue' ? revenue : deals).map((v) => Math.round(v * scale));

  const max = Math.max(...values);
  const activeIdx = hovered ?? values.indexOf(max);

  const isRevenue = metric === 'revenue';
  const niceMax = isRevenue ? Math.ceil(max / 50e6) * 50e6 : Math.ceil(max / 10) * 10;
  const gridSteps = 4;

  const formatValue = (v: number) =>
    isRevenue ? `Rp ${Math.round(v / 1e6).toLocaleString('id-ID')} jt` : `${v} deals`;
  const formatAxis = (v: number) => (isRevenue ? `${Math.round(v / 1e6)}jt` : `${v}`);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.fromTo(
        '.gs-bar',
        { scaleY: reduced ? 1 : 0 },
        {
          scaleY: 1,
          duration: reduced ? 0 : 0.7,
          stagger: 0.05,
          ease: 'power3.out',
          transformOrigin: 'bottom',
        }
      );
    },
    { dependencies: [metric, year], scope: '.gs-analytics' }
  );

  return (
    <div className="gs-card card glass p-5 flex flex-col gs-analytics">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-base font-bold text-white">Analytics</h2>
        <div className="flex items-center gap-2.5">
          <div className="toggle-group" role="tablist" aria-label="Metric">
            {(['revenue', 'deals'] as Metric[]).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={metric === m}
                onClick={() => setMetric(m)}
                className={metric === m ? 'toggle-pill-active' : 'toggle-pill'}
              >
                {m === 'revenue' ? 'Revenue' : 'Deals'}
              </button>
            ))}
          </div>
          <div className="relative">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value as Year)}
              aria-label="Period"
              className="appearance-none bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-lg pl-3.5 pr-8 py-1.5 text-[12px] font-semibold text-dark-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue/40"
            >
              <option className="bg-dark-800">This year</option>
              <option className="bg-dark-800">Last year</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-dark-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex gap-3 flex-1 min-h-[220px]">
        {/* Y axis */}
        <div className="flex flex-col justify-between items-end py-0.5 text-[10px] font-semibold text-dark-500 w-9 flex-shrink-0 tabular-nums">
          {Array.from({ length: gridSteps + 1 }, (_, i) => {
            const v = niceMax - ((niceMax / gridSteps) * i);
            return <span key={i}>{formatAxis(v)}</span>;
          })}
        </div>

        <div className="relative flex-1">
          {/* Gridlines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none" aria-hidden="true">
            {Array.from({ length: gridSteps + 1 }, (_, i) => (
              <div key={i} className="border-t border-dashed border-white/[0.06]" />
            ))}
          </div>

          {/* Bars */}
          <div className="relative h-full flex items-end justify-between gap-1.5 sm:gap-2.5">
            {values.map((v, i) => {
              const isActive = i === activeIdx;
              const pct = Math.max((v / niceMax) * 100, 4);
              return (
                <div
                  key={months[i]}
                  className="relative flex-1 h-full flex flex-col justify-end items-center"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {isActive && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg bg-dark-700 border border-orange-500/30 shadow-glow-orange whitespace-nowrap transition-all duration-200 z-10"
                      style={{ bottom: `calc(${pct}% + 12px)` }}
                    >
                      <span className="text-[12px] font-bold text-white tabular-nums">
                        {formatValue(v)}
                      </span>
                    </div>
                  )}
                  <button
                    className={`gs-bar w-7 sm:w-9 rounded-md transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-t from-orange-400 to-orange-500 shadow-glow-orange glow-active'
                        : 'bg-gradient-to-t from-dark-600 to-dark-500 hover:from-dark-500 hover:to-dark-400'
                    }`}
                    style={{ height: `${pct}%` }}
                    aria-label={`${months[i]}: ${formatValue(v)}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* X labels */}
      <div className="flex gap-3 mt-3">
        <div className="w-9 flex-shrink-0" />
        <div className="flex-1 flex justify-between gap-1.5 sm:gap-2.5">
          {months.map((m, i) => (
            <span
              key={m}
              className={`flex-1 text-center text-[11px] font-medium transition-colors ${
                i === activeIdx ? 'text-white font-bold' : 'text-dark-500'
              }`}
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
