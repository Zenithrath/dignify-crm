import { useRef, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { useWorks, useContentItems, useLeads } from '../hooks/useData';
import { buildEvents, type CalendarEvent, type EventKind } from '../lib/events';

const KIND_BADGE: Record<EventKind, string> = {
  Deadline: 'badge-coral',
  Mulai: 'badge-sky',
  Konten: 'badge-lav',
  Live: 'badge-orange',
  'Follow-up': 'badge-gold',
};

const KIND_LABEL: Record<EventKind, string> = {
  Deadline: 'Deadline',
  Mulai: 'Mulai',
  Konten: 'Konten',
  Live: 'Live',
  'Follow-up': 'Follow-up',
};

function formatDateId(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
}

function getWeekDays(date: Date): Date[] {
  const start = new Date(date);
  start.setDate(1);
  const dayOfWeek = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - dayOfWeek);

  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function toISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function CalendarPage() {
  const navigate = useNavigate();
  const { data: works, loading: worksLoading } = useWorks();
  const { data: content, loading: contentLoading } = useContentItems();
  const { data: leads, loading: leadsLoading } = useLeads();

  const loading = worksLoading || contentLoading || leadsLoading;

  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const scope = useRef<HTMLDivElement>(null);

  const events = useMemo(() => {
    if (!works || !content || !leads) return [];
    return buildEvents(works, content, leads);
  }, [works, content, leads]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const ev of events) {
      const arr = map.get(ev.date) ?? [];
      arr.push(ev);
      map.set(ev.date, arr);
    }
    return map;
  }, [events]);

  const weekDays = useMemo(() => getWeekDays(currentMonth), [currentMonth]);
  const today = new Date();

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
    { scope, dependencies: [loading, currentMonth] }
  );

  if (loading) {
    return (
      <div ref={scope} className="space-y-4 max-w-[1400px]" aria-busy="true" aria-label="Memuat kalender">
        <div className="h-10 w-48 rounded-lg glass animate-pulse" />
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 42 }).map((_, i) => (
            <div key={i} className="h-[90px] rounded-lg glass animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const handlePrevMonth = () => {
    setCurrentMonth((m) => {
      const d = new Date(m);
      d.setMonth(m.getMonth() - 1);
      return d;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((m) => {
      const d = new Date(m);
      d.setMonth(m.getMonth() + 1);
      return d;
    });
  };

  const handleToday = () => {
    setCurrentMonth(new Date());
  };

  const handleDayClick = (date: Date) => {
    const iso = toISO(date);
    setSelectedDate(iso);
  };

  const handleEventClick = (refPath?: string) => {
    if (refPath) {
      navigate(refPath);
    }
  };

  const selectedEvents = selectedDate ? eventsByDate.get(selectedDate) ?? [] : [];

  return (
    <div ref={scope} className="space-y-4 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-foreground">Kalender</h1>
          <p className="text-[13px] text-dark-400 mt-0.5">
            Lihat deadline, jadwal konten, dan follow-up dalam satu tampilan bulanan.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Bulan sebelumnya"
            className="icon-btn"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleToday}
            aria-label="Bulan ini"
            className="badge badge-gray px-3 py-1.5 text-[12px]"
          >
            {formatMonthYear(currentMonth)}
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Bulan berikutnya"
            className="icon-btn"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Month Grid */}
      <div className="gs-card card glass p-3">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, i) => (
            <div
              key={i}
              className="text-center text-[11px] font-semibold text-dark-400 py-2"
              aria-hidden="true"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1" role="grid" aria-label={`Kalender ${formatMonthYear(currentMonth)}`}>
          {weekDays.map((day, idx) => {
            const iso = toISO(day);
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
            const isToday = isSameDay(day, today);
            const isSelected = selectedDate === iso;
            const dayEvents = eventsByDate.get(iso) ?? [];
            const displayEvents = dayEvents.slice(0, 3);
            const extraCount = dayEvents.length - 3;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleDayClick(day)}
                className={`
                  relative min-h-[90px] p-2 text-left transition-all
                  rounded-lg border
                  ${isCurrentMonth ? 'bg-card' : 'bg-muted/30 text-dark-400'}
                  ${isToday ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border'}
                  ${isSelected ? 'ring-2 ring-primary' : ''}
                  hover:border-primary/30 hover:bg-primary/5
                `}
                role="gridcell"
                aria-label={`${day.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}, ${dayEvents.length} acara`}
                aria-selected={isSelected}
              >
                <span
                  className={`
                    text-[12px] font-medium
                    ${isCurrentMonth ? 'text-foreground' : 'text-dark-400'}
                    ${isToday ? 'text-primary' : ''}
                  `}
                >
                  {day.getDate()}
                </span>

                {dayEvents.length > 0 && (
                  <div className="mt-1.5 flex flex-col gap-1 overflow-hidden max-h-[60px]">
                    {displayEvents.map((ev, i) => (
                      <span
                        key={i}
                        className={`badge ${KIND_BADGE[ev.kind]} text-[10px] truncate flex items-center gap-1`}
                        title={ev.title}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" aria-hidden="true" />
                        {ev.title}
                      </span>
                    ))}
                    {extraCount > 0 && (
                      <span className="badge badge-gray text-[10px] flex items-center justify-center">
                        +{extraCount}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Agenda List */}
      {selectedDate && (
        <div className="gs-card card glass p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">
              <CalendarDays className="w-4 h-4 inline-block mr-1" />
              Agenda {formatDateId(selectedDate)}
            </h2>
            <button
              type="button"
              onClick={() => setSelectedDate(null)}
              aria-label="Tutup agenda"
              className="icon-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {selectedEvents.length === 0 ? (
            <p className="text-sm text-dark-400 text-center py-4">Tidak ada acara pada tanggal ini.</p>
          ) : (
            <div className="space-y-2">
              {selectedEvents.map((ev, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleEventClick(ev.refPath)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all text-left"
                >
                  <span className={`badge ${KIND_BADGE[ev.kind]} flex-shrink-0`}>
                    {KIND_LABEL[ev.kind]}
                  </span>
                  <span className="flex-1 text-sm font-medium text-foreground truncate">{ev.title}</span>
                  <ChevronRight className="w-4 h-4 text-dark-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {!selectedDate && events.length > 0 && (
        <div className="gs-card card glass p-4">
          <p className="text-sm text-dark-400 text-center">
            Klik pada tanggal di kalender untuk melihat daftar agenda.
          </p>
        </div>
      )}
    </div>
  );
}