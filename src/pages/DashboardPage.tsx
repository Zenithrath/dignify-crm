import { useRef, useEffect, useState } from 'react';
import { Users, TrendingUp, Handshake, Target, CalendarDays } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDashboard, useLeads } from '../hooks/useData';
import { StatCard } from '../components/dashboard/StatCard';
import { RevenueDonut } from '../components/dashboard/RevenueDonut';
import { DealsTable } from '../components/dashboard/DealsTable';

function DashboardSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[132px] rounded-xl glass animate-pulse" />
        ))}
      </div>
      <div className="h-[340px] rounded-xl glass animate-pulse" />
      <div className="h-[320px] rounded-xl glass animate-pulse" />
    </div>
  );
}

function useCurrentTime() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export function DashboardPage() {
  const { data, loading, error } = useDashboard();
  const { data: leads } = useLeads();
  const scope = useRef<HTMLDivElement>(null);
  const now = useCurrentTime();

  const greeting = now.getHours() < 12 ? 'Selamat pagi' : now.getHours() < 17 ? 'Selamat siang' : 'Selamat malam';

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.from('.gs-card', {
        y: reduced ? 0 : 16,
        opacity: reduced ? 1 : 0,
        duration: reduced ? 0 : 0.5,
        stagger: 0.06,
        ease: 'power2.out',
      });
    },
    { scope, dependencies: [loading] }
  );

  if (loading || !data) {
    return (
      <div ref={scope} className="max-w-[1400px]">
        {error ? (
          <div role="alert" className="card p-8 text-center">
            <p className="text-sm font-semibold text-red-400">Failed to load dashboard</p>
            <p className="text-xs text-dark-400 mt-1">{error}</p>
          </div>
        ) : (
          <DashboardSkeleton />
        )}
      </div>
    );
  }

  return (
    <div ref={scope} className="space-y-4 max-w-[1400px]">
      {/* Greeting */}
      <div className="mb-2">
        <h1 className="text-xl font-extrabold text-foreground">
          {greeting}, Daniel 👋
        </h1>
        <div className="flex items-center gap-2 text-[13px] text-dark-400 mt-1">
          <CalendarDays className="w-3.5 h-3.5" strokeWidth={1.8} />
          <span>{now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="text-dark-600">·</span>
          <span className="tabular-nums font-medium text-orange-400">
            {now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <StatCard label="Total Leads" value={data.totalLeads} delta={25.8} icon={Users} />
        <StatCard
          label="Potential Value"
          value={Math.round(data.pipelineValue / 1e6)}
          prefix="Rp "
          suffix=" jt"
          delta={32.5}
          icon={TrendingUp}
        />
        <StatCard label="Deals Won" value={data.dealsWon} delta={-19.6} icon={Handshake} />
        <StatCard
          label="Conversion Rate"
          value={data.conversionRate}
          suffix="%"
          delta={15.2}
          icon={Target}
        />
      </div>

      {/* Revenue */}
      <RevenueDonut
        received={data.revenueReceived}
        outstanding={data.outstandingPayment}
        periodLabel="August 2026"
      />

      {/* List Deals */}
      <DealsTable leads={leads ?? []} />
    </div>
  );
}
