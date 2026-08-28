import { useState, useMemo } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import type { ContentItem, ContentPlatform } from '../../types';

interface ContentCalendarViewProps {
  contents: ContentItem[];
}

const platformColor: Record<ContentPlatform, string> = {
  Instagram: 'bg-[#E1306C]',
  TikTok: 'bg-[#00F2EA]',
  LinkedIn: 'bg-[#0A66C2]',
  YouTube: 'bg-[#FF0000]',
};

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export function ContentCalendarView({ contents }: ContentCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1));
  const [view, setView] = useState<'calendar' | 'heatmap'>('calendar');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [year, month]);

  const postsByDate = useMemo(() => {
    const map: Record<number, ContentItem[]> = {};
    contents.forEach((c) => {
      if (!c.publishDate) return;
      const d = new Date(c.publishDate);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(c);
      }
    });
    return map;
  }, [contents, year, month]);

  const heatmapData = useMemo(() => {
    const map: Record<number, number> = {};
    contents.forEach((c) => {
      if (!c.publishDate) return;
      const d = new Date(c.publishDate);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        map[day] = (map[day] || 0) + 1;
      }
    });
    return map;
  }, [contents, year, month]);

  const maxHeat = Math.max(...Object.values(heatmapData), 1);

  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors cursor-pointer">
            <CaretLeft size={14} weight="bold" />
          </button>
          <span className="text-[13px] font-bold text-white/70 min-w-[120px] text-center">
            {MONTHS[month]} {year}
          </span>
          <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors cursor-pointer">
            <CaretRight size={14} weight="bold" />
          </button>
        </div>

        <div className="flex items-center bg-white/5 rounded-lg p-0.5">
          <button
            onClick={() => setView('calendar')}
            className={`text-[11px] font-medium px-3 py-1.5 rounded-md transition-colors cursor-pointer ${view === 'calendar' ? 'bg-white/10 text-white' : 'text-white/35 hover:text-white/50'}`}
          >
            Kalender
          </button>
          <button
            onClick={() => setView('heatmap')}
            className={`text-[11px] font-medium px-3 py-1.5 rounded-md transition-colors cursor-pointer ${view === 'heatmap' ? 'bg-white/10 text-white' : 'text-white/35 hover:text-white/50'}`}
          >
            Heatmap
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      {view === 'calendar' && (
        <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[18px] p-4">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[10px] font-semibold text-white/30 py-1">{d}</div>
            ))}
          </div>
          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => {
              const posts = day ? postsByDate[day] || [] : [];
              const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
              return (
                <div
                  key={idx}
                  className={`min-h-[80px] rounded-lg p-1.5 border transition-colors ${
                    day ? 'bg-white/[0.015] border-white/[0.04] hover:border-white/[0.08]' : 'border-transparent'
                  } ${isToday ? 'ring-1 ring-[#D8FF3F]/30' : ''}`}
                >
                  {day && (
                    <>
                      <span className={`text-[10px] font-medium ${isToday ? 'text-[#D8FF3F]' : 'text-white/30'}`}>{day}</span>
                      <div className="flex flex-col gap-0.5 mt-1">
                        {posts.slice(0, 3).map((p) => (
                          <div key={p.id} className="flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${platformColor[p.platform]}`} />
                            <span className="text-[8px] text-white/40 truncate">{p.title}</span>
                          </div>
                        ))}
                        {posts.length > 3 && (
                          <span className="text-[8px] text-white/20">+{posts.length - 3}</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Heatmap View */}
      {view === 'heatmap' && (
        <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[18px] p-5">
          <div className="grid grid-cols-7 gap-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[10px] font-semibold text-white/30 py-1">{d}</div>
            ))}
            {calendarDays.map((day, idx) => {
              const count = day ? heatmapData[day] || 0 : 0;
              const intensity = count / maxHeat;
              const bg = day
                ? count === 0
                  ? 'bg-white/[0.02]'
                  : `rgba(216, 255, 63, ${0.1 + intensity * 0.5})`
                : 'transparent';
              return (
                <div
                  key={idx}
                  className="aspect-square rounded-lg flex items-center justify-center border border-white/[0.03] transition-colors"
                  style={{ backgroundColor: bg }}
                >
                  {day && count > 0 && (
                    <span className="text-[11px] font-bold text-white/70">{count}</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-[9px] text-white/25">Sedikit</span>
            <div className="flex gap-1">
              {[0.1, 0.2, 0.35, 0.5, 0.6].map((o, i) => (
                <div key={i} className="w-4 h-4 rounded" style={{ backgroundColor: `rgba(216, 255, 63, ${o})` }} />
              ))}
            </div>
            <span className="text-[9px] text-white/25">Banyak</span>
          </div>
        </div>
      )}
    </div>
  );
}
