import { useRef } from 'react';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta: number;
  icon: React.ElementType;
}

export function StatCard({ label, value, prefix = '', suffix = '', delta, icon: Icon }: StatCardProps) {
  const valueRef = useRef<HTMLParagraphElement>(null);
  const up = delta >= 0;

  useGSAP(() => {
    const el = valueRef.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const counter = { val: 0 };

    gsap.to(counter, {
      val: value,
      duration: reduced ? 0 : 1.1,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(counter.val).toLocaleString('id-ID')}${suffix}`;
      },
    });
  }, { scope: valueRef });

  return (
    <div className="gs-card card glass p-4 flex flex-col justify-between gap-4 min-h-[132px]">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <p className="text-[13px] font-semibold text-dark-300 truncate">{label}</p>
          <Info className="w-3.5 h-3.5 text-dark-500 flex-shrink-0" strokeWidth={2} />
        </div>
        <button className="icon-btn !w-8 !h-8 !rounded-lg" aria-label={`${label} details`}>
          <Icon className="w-4 h-4" strokeWidth={1.8} />
        </button>
      </div>

      <div>
        <p ref={valueRef} className="text-[26px] leading-none font-extrabold text-foreground tabular-nums">
          {prefix}0{suffix}
        </p>
        <div className="flex items-center gap-2 mt-2.5">
          <span className="text-[11px] text-dark-500">Last period</span>
          <span className={up ? 'badge-up' : 'badge-down'}>
            {up ? <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} /> : <ArrowDownRight className="w-3 h-3" strokeWidth={2.5} />}
            {Math.abs(delta).toLocaleString('id-ID')}%
          </span>
        </div>
      </div>
    </div>
  );
}
