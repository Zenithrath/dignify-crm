import { useRef } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface RevenueDonutProps {
  received: number;
  outstanding: number;
  periodLabel: string;
}

const SIZE = 200;
const STROKE = 14;
const R = (SIZE - STROKE) / 2 - 6;
const CIRC = 2 * Math.PI * R;

export function RevenueDonut({ received, outstanding, periodLabel }: RevenueDonutProps) {
  const centerRef = useRef<HTMLParagraphElement>(null);
  const arcRef = useRef<SVGCircleElement>(null);

  const total = received + outstanding;
  const pct = total > 0 ? received / total : 0;

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (arcRef.current) {
      gsap.fromTo(
        arcRef.current,
        { strokeDashoffset: reduced ? CIRC * (1 - pct) : CIRC },
        { strokeDashoffset: CIRC * (1 - pct), duration: reduced ? 0 : 1.4, ease: 'power2.inOut' }
      );
    }

    const el = centerRef.current;
    if (el) {
      const counter = { val: 0 };
      gsap.to(counter, {
        val: received,
        duration: reduced ? 0 : 1.4,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = `Rp ${Math.round(counter.val / 1e6).toLocaleString('id-ID')} jt`;
        },
      });
    }
  }, { scope: '.gs-donut' });

  return (
    <div className="gs-card card glass p-5 flex flex-col gs-donut">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-bold text-foreground">Revenue</h2>
        <button className="icon-btn !w-7 !h-7 !rounded-lg !border-0" aria-label="More options">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mb-2">
        <span className="flex items-center gap-2 text-[12px] font-medium text-dark-300">
          <span className="w-2 h-2 rounded-sm bg-orange-500" aria-hidden="true" />
          Received
        </span>
        <span className="flex items-center gap-2 text-[12px] font-medium text-dark-300">
          <span className="w-2 h-2 rounded-sm bg-gold" aria-hidden="true" />
          Outstanding
        </span>
      </div>

      {/* Donut */}
      <div className="flex-1 flex items-center justify-center py-2">
        <div className="relative">
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={`Revenue ${periodLabel}: received ${Math.round(pct * 100)}% of ${total}`}>
            <defs>
              <linearGradient id="donut-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F97316" />
                <stop offset="55%" stopColor="#FB923C" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>
            </defs>
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke="oklch(0.145 0 0 / 0.08)"
              strokeWidth={STROKE}
            />
            <circle
              ref={arcRef}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke="url(#donut-grad)"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={`${CIRC * pct} ${CIRC}`}
              strokeDashoffset={CIRC * (1 - pct)}
              transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p ref={centerRef} className="text-[20px] font-extrabold text-foreground tabular-nums leading-none">
              Rp 0 jt
            </p>
            <p className="text-[11px] text-dark-400 mt-1.5">{periodLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
