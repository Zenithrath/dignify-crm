import { useState, useMemo } from 'react';
import {
  Calendar,
  Plus,
  CaretLeft,
  CaretRight,
  Trash,
  X,
  Clock,
} from '@phosphor-icons/react';
import { useCalendar } from '../hooks/useCalendar';
import type { CalendarEvent, CalendarEventType } from '../types';
import { CALENDAR_EVENT_TYPES } from '../types';

const eventTypeConfig: Record<CalendarEventType, { color: string; bg: string; dot: string }> = {
  'Deadline Project': { color: 'text-[#FF5A5A]', bg: 'bg-[#FF5A5A]/10 border border-[#FF5A5A]/20', dot: 'bg-[#FF5A5A]' },
  'Jadwal Posting': { color: 'text-[#E1306C]', bg: 'bg-[#E1306C]/10 border border-[#E1306C]/20', dot: 'bg-[#E1306C]' },
  'Briefing': { color: 'text-[#4CD7E0]', bg: 'bg-[#4CD7E0]/10 border border-[#4CD7E0]/20', dot: 'bg-[#4CD7E0]' },
  'Update Klien': { color: 'text-[#FFD043]', bg: 'bg-[#FFD043]/10 border border-[#FFD043]/20', dot: 'bg-[#FFD043]' },
};

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export function CalendarPage() {
  const { data: events, loading, addEvent, deleteEvent } = useCalendar();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1));
  const [view, setView] = useState<'month' | 'week'>('month');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

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

  const eventsByDate = useMemo(() => {
    const map: Record<number, CalendarEvent[]> = {};
    (events || []).forEach((e) => {
      const d = new Date(e.date);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(e);
      }
    });
    return map;
  }, [events, year, month]);

  const weekDays = useMemo(() => {
    if (view !== 'week') return [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  }, [currentDate, view]);

  const weekEvents = useMemo(() => {
    if (view !== 'week') return {};
    const map: Record<string, CalendarEvent[]> = {};
    weekDays.forEach((d) => {
      const key = d.toISOString().slice(0, 10);
      map[key] = (events || []).filter((e) => e.date === key);
    });
    return map;
  }, [weekDays, events, view]);

  const selectedDayEvents = selectedDate ? eventsByDate[parseInt(selectedDate)] || [] : [];

  function prevMonth() { setCurrentDate(new Date(year, month - 1, 1)); }
  function nextMonth() { setCurrentDate(new Date(year, month + 1, 1)); }
  function prevWeek() { setCurrentDate(new Date(currentDate.getTime() - 7 * 86400000)); }
  function nextWeek() { setCurrentDate(new Date(currentDate.getTime() + 7 * 86400000)); }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#D8FF3F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-4 pb-6">
      {/* Header */}
      <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] px-6 py-4 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#4CD7E0]/[0.03] blur-[80px]" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4CD7E0]/10 flex items-center justify-center">
              <Calendar size={20} weight="bold" className="text-[#4CD7E0]" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">Kalender</h1>
              <p className="text-[11px] text-white/40">{events?.length || 0} event</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white/5 rounded-lg p-0.5">
              <button onClick={() => setView('month')} className={`text-[11px] font-medium px-3 py-1.5 rounded-md transition-colors cursor-pointer ${view === 'month' ? 'bg-white/10 text-white' : 'text-white/35 hover:text-white/50'}`}>Bulan</button>
              <button onClick={() => setView('week')} className={`text-[11px] font-medium px-3 py-1.5 rounded-md transition-colors cursor-pointer ${view === 'week' ? 'bg-white/10 text-white' : 'text-white/35 hover:text-white/50'}`}>Minggu</button>
            </div>
            <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-[#D8FF3F] hover:bg-[#D8FF3F]/90 text-black text-[12px] font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer">
              <Plus size={14} weight="bold" />
              <span>Tambah Event</span>
            </button>
          </div>
        </div>
      </div>

      {/* Event Type Legend */}
      <div className="flex items-center gap-4 px-1">
        {CALENDAR_EVENT_TYPES.map((type) => {
          const c = eventTypeConfig[type];
          return (
            <div key={type} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
              <span className="text-[10px] text-white/35">{type}</span>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <button onClick={view === 'month' ? prevMonth : prevWeek} className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-colors cursor-pointer">
          <CaretLeft size={16} weight="bold" />
        </button>
        <span className="text-[15px] font-bold text-white/80 min-w-[180px] text-center">
          {MONTHS[month]} {year}
          {view === 'week' && weekDays.length > 0 && (
            <span className="text-[11px] text-white/30 font-normal ml-2">
              {weekDays[0].getDate()} - {weekDays[6].getDate()}
            </span>
          )}
        </span>
        <button onClick={view === 'month' ? nextMonth : nextWeek} className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-colors cursor-pointer">
          <CaretRight size={16} weight="bold" />
        </button>
      </div>

      {/* Month View */}
      {view === 'month' && (
        <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] p-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((d) => <div key={d} className="text-center text-[10px] font-semibold text-white/30 py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => {
              const dayEvents = day ? eventsByDate[day] || [] : [];
              const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
              const isSelected = day?.toString() === selectedDate;
              return (
                <button
                  key={idx}
                  onClick={() => day && setSelectedDate(day.toString())}
                  className={`min-h-[90px] rounded-xl p-2 border text-left transition-all cursor-pointer ${
                    day ? 'bg-white/[0.015] hover:bg-white/[0.03]' : 'bg-transparent border-transparent'
                  } ${isToday ? 'ring-1 ring-[#D8FF3F]/40 border-[#D8FF3F]/20' : 'border-white/[0.04]'} ${isSelected ? 'bg-white/[0.05] ring-1 ring-white/20' : ''}`}
                  disabled={!day}
                >
                  {day && (
                    <>
                      <span className={`text-[11px] font-medium ${isToday ? 'text-[#D8FF3F]' : 'text-white/35'}`}>{day}</span>
                      <div className="flex flex-col gap-0.5 mt-1">
                        {dayEvents.slice(0, 3).map((e) => {
                          const c = eventTypeConfig[e.type];
                          return (
                            <div key={e.id} className="flex items-center gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                              <span className={`text-[8px] truncate ${c.color}`}>{e.title}</span>
                            </div>
                          );
                        })}
                        {dayEvents.length > 3 && <span className="text-[8px] text-white/20">+{dayEvents.length - 3}</span>}
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Week View */}
      {view === 'week' && (
        <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] p-4">
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((d) => {
              const key = d.toISOString().slice(0, 10);
              const dayEvents = weekEvents[key] || [];
              const isToday = d.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10);
              return (
                <div key={key} className={`rounded-xl border p-2 min-h-[120px] ${isToday ? 'border-[#D8FF3F]/30 bg-[#D8FF3F]/[0.02]' : 'border-white/[0.04] bg-white/[0.01]'}`}>
                  <div className="text-center mb-2">
                    <span className="text-[9px] text-white/25">{DAYS[d.getDay()]}</span>
                    <span className={`block text-[14px] font-bold ${isToday ? 'text-[#D8FF3F]' : 'text-white/60'}`}>{d.getDate()}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {dayEvents.map((e) => {
                      const c = eventTypeConfig[e.type];
                      return (
                        <div key={e.id} className={`rounded-lg px-2 py-1.5 ${c.bg}`}>
                          <span className={`text-[9px] font-semibold ${c.color}`}>{e.time}</span>
                          <p className="text-[10px] text-white/60 truncate">{e.title}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Day Detail */}
      {selectedDate && view === 'month' && (
        <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-bold text-white/70">
              {new Date(year, month, parseInt(selectedDate)).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h3>
            <button onClick={() => setSelectedDate(null)} className="p-1 rounded-lg hover:bg-white/5 text-white/30 cursor-pointer">
              <X size={14} weight="bold" />
            </button>
          </div>
          {selectedDayEvents.length === 0 ? (
            <p className="text-[12px] text-white/20">Tidak ada event di tanggal ini</p>
          ) : (
            <div className="flex flex-col gap-2">
              {selectedDayEvents.map((e) => {
                const c = eventTypeConfig[e.type];
                return (
                  <div key={e.id} className={`flex items-center gap-3 rounded-xl px-4 py-3 ${c.bg}`}>
                    <span className={`w-3 h-3 rounded-full flex-shrink-0 ${c.dot}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-[12px] font-semibold ${c.color}`}>{e.title}</p>
                      <p className="text-[10px] text-white/30">{e.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="flex items-center gap-1 text-[10px] text-white/25">
                        <Clock size={10} weight="fill" />
                        {e.time}
                      </span>
                      <button onClick={() => deleteEvent(e.id)} className="p-1 rounded-md hover:bg-[#FF5A5A]/10 text-white/15 hover:text-[#FF5A5A] cursor-pointer">
                        <Trash size={11} weight="bold" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Add Event Modal */}
      {showAdd && <AddEventModal onAdd={(e) => { addEvent(e); setShowAdd(false); }} onClose={() => setShowAdd(false)} />}
    </div>
  );
}

function AddEventModal({ onAdd, onClose }: { onAdd: (event: Omit<CalendarEvent, 'id'>) => void; onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<CalendarEventType>('Briefing');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [description, setDescription] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !date) return;
    onAdd({ title: title.trim(), type, date, time, description: description.trim() });
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#17181F] border border-white/[0.07] rounded-[22px] w-full max-w-md p-6 flex flex-col gap-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-white">Tambah Event</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white cursor-pointer"><X size={16} weight="bold" /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wider">Judul Event</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="input" placeholder="Judul event..." autoFocus />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wider">Tipe Event</label>
            <select value={type} onChange={(e) => setType(e.target.value as CalendarEventType)} className="input select">
              {CALENDAR_EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[11px] text-white/40 uppercase tracking-wider">Tanggal</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[11px] text-white/40 uppercase tracking-wider">Jam</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wider">Deskripsi</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input !h-16 !py-2.5 resize-none" placeholder="Deskripsi singkat..." />
          </div>
          <div className="flex justify-end gap-2 mt-1">
            <button type="button" onClick={onClose} className="text-[12px] text-white/40 hover:text-white/60 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">Batal</button>
            <button type="submit" disabled={!title.trim() || !date} className="flex items-center gap-2 bg-[#D8FF3F] hover:bg-[#D8FF3F]/90 disabled:opacity-30 text-black text-[12px] font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer">
              <Plus size={14} weight="bold" /><span>Tambah</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
