import { useState } from 'react';
import {
  TrendUp,
  TrendDown,
  Users,
  CalendarBlank,
  Clock,
} from '@phosphor-icons/react';
import type { PlatformPerformance, ContentPlatform } from '../../types';
import { CONTENT_PLATFORMS } from '../../types';

interface PerformanceTabsProps {
  performance: PlatformPerformance[];
  contents: { platform: ContentPlatform; stage: string }[];
}

const platformColor: Record<ContentPlatform, string> = {
  Instagram: '#E1306C',
  TikTok: '#00F2EA',
  LinkedIn: '#0A66C2',
  YouTube: '#FF0000',
};

export function PerformanceTabs({ performance, contents }: PerformanceTabsProps) {
  const [activeTab, setActiveTab] = useState<ContentPlatform>('Instagram');
  const data = performance.find((p) => p.platform === activeTab);

  const pendingByPlatform = CONTENT_PLATFORMS.reduce(
    (acc, p) => {
      acc[p] = contents.filter((c) => c.platform === p && c.stage !== 'Published').length;
      return acc;
    },
    {} as Record<ContentPlatform, number>
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Tab Bar */}
      <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] px-2 py-0 flex">
        {CONTENT_PLATFORMS.map((platform) => {
          const isActive = platform === activeTab;
          const color = platformColor[platform];
          return (
            <button
              key={platform}
              onClick={() => setActiveTab(platform)}
              className={`
                relative flex-1 flex items-center justify-center gap-2 py-3.5 text-[13px] font-medium transition-colors cursor-pointer
                ${isActive ? 'text-white' : 'text-white/30 hover:text-white/50'}
              `}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: color, opacity: isActive ? 1 : 0.3 }}
              />
              {platform}
              {isActive && (
                <span
                  className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                  style={{ backgroundColor: color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Stats Grid */}
      {data && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            icon={<Users size={16} weight="fill" />}
            label="Followers"
            value={data.followers.toLocaleString()}
            sub={data.growth > 0 ? `+${data.growth}%` : `${data.growth}%`}
            subColor={data.growth > 0 ? 'text-[#D8FF3F]' : 'text-[#FF5A5A]'}
            trend={data.growth > 0 ? 'up' : 'down'}
            accentColor={platformColor[activeTab]}
          />
          <StatCard
            icon={<TrendUp size={16} weight="fill" />}
            label="Engagement Rate"
            value={`${data.engagement}%`}
            sub={data.engagement >= 4 ? 'Above avg' : 'Below avg'}
            subColor={data.engagement >= 4 ? 'text-[#D8FF3F]' : 'text-[#FFD043]'}
            accentColor={platformColor[activeTab]}
          />
          <StatCard
            icon={<CalendarBlank size={16} weight="fill" />}
            label="Posts / Minggu"
            value={String(data.postsPerWeek)}
            sub={`Target: ${Math.ceil(data.postsPerWeek * 1.2)}`}
            subColor="text-white/30"
            accentColor={platformColor[activeTab]}
          />
          <StatCard
            icon={<Clock size={16} weight="fill" />}
            label="Posts Pending"
            value={String(pendingByPlatform[activeTab] || 0)}
            sub={pendingByPlatform[activeTab] > 3 ? 'Overloaded' : 'On track'}
            subColor={pendingByPlatform[activeTab] > 3 ? 'text-[#FF5A5A]' : 'text-[#D8FF3F]'}
            accentColor={platformColor[activeTab]}
          />
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  subColor,
  trend,
  accentColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  subColor: string;
  trend?: 'up' | 'down';
  accentColor: string;
}) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.05] rounded-[16px] p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accentColor}15` }}>
          <span style={{ color: accentColor }}>{icon}</span>
        </div>
        <span className="text-[11px] text-white/35">{label}</span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-[22px] font-extrabold text-white/85 leading-none">{value}</span>
        <div className="flex items-center gap-1 pb-0.5">
          {trend === 'up' && <TrendUp size={11} weight="bold" className="text-[#D8FF3F]" />}
          {trend === 'down' && <TrendDown size={11} weight="bold" className="text-[#FF5A5A]" />}
          <span className={`text-[10px] font-medium ${subColor}`}>{sub}</span>
        </div>
      </div>
    </div>
  );
}
