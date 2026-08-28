import { useState, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { FunnelSimple, ListPlus } from '@phosphor-icons/react';
import { useDeals } from '../hooks/useDeals';
import { KanbanColumn } from '../components/pipeline/KanbanColumn';
import { DealCard } from '../components/pipeline/DealCard';
import { DealDrawer } from '../components/pipeline/DealDrawer';
import type { Deal, DealStage, DealType } from '../types';
import { DEAL_STAGES } from '../types';

const filterButtons: { label: string; value: DealType | 'all' }[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Paid Outbound', value: 'Paid Outbound' },
  { label: 'Paid Inbound', value: 'Paid Inbound' },
  { label: 'Kerjasama', value: 'Kerjasama-Engagement' },
];

const filterActiveColor: Record<string, string> = {
  all: 'bg-[#D8FF3F] text-black shadow-[0_0_12px_rgba(216,255,63,0.3)]',
  'Paid Outbound': 'bg-[#FFD043] text-black shadow-[0_0_12px_rgba(255,208,67,0.3)]',
  'Paid Inbound': 'bg-[#4CD7E0] text-black shadow-[0_0_12px_rgba(76,215,224,0.3)]',
  'Kerjasama-Engagement': 'bg-[#A89AE8] text-black shadow-[0_0_12px_rgba(168,154,232,0.3)]',
};

export function PipelinePage() {
  const { data: deals, loading, moveDeal, updateDeal } = useDeals();
  const [activeFilter, setActiveFilter] = useState<DealType | 'all'>('all');
  const [drawerDeal, setDrawerDeal] = useState<Deal | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const filteredDeals = useMemo(() => {
    if (!deals) return [];
    if (activeFilter === 'all') return deals;
    return deals.filter((d) => d.tipe === activeFilter);
  }, [deals, activeFilter]);

  const dealsByStage = useMemo(() => {
    const map: Record<DealStage, Deal[]> = {
      Prospecting: [],
      'Approval Internal': [],
      Development: [],
      Review: [],
      Deploy: [],
    };
    filteredDeals.forEach((d) => {
      if (map[d.stage]) map[d.stage].push(d);
    });
    return map;
  }, [filteredDeals]);

  const totalValue = useMemo(
    () => filteredDeals.reduce((sum, d) => sum + d.estimasiValue, 0),
    [filteredDeals]
  );

  function handleDragStart(event: DragStartEvent) {
    const deal = filteredDeals.find((d) => d.id === event.active.id);
    setActiveDeal(deal ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveDeal(null);
    const { active, over } = event;
    if (!over) return;

    const dealId = active.id as string;
    const newStage = over.id as DealStage;

    if (DEAL_STAGES.includes(newStage)) {
      moveDeal(dealId, newStage);
    }
  }

  function handleCardClick(deal: Deal) {
    setDrawerDeal(deal);
    setDrawerOpen(true);
  }

  function handleToggleMaintenance(dealId: string, active: boolean) {
    updateDeal(dealId, {
      maintenance: {
        active,
        catatanRequest: deals?.find((d) => d.id === dealId)?.maintenance?.catatanRequest || '',
      },
    });
  }

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
        <div className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#D8FF3F]/[0.03] blur-[80px]" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D8FF3F]/10 flex items-center justify-center">
              <ListPlus size={20} weight="bold" className="text-[#D8FF3F]" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">Pipeline & Deal</h1>
              <p className="text-[11px] text-white/40">
                {filteredDeals.length} deal · {formatCurrency(totalValue)} total value
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] px-5 py-3.5 relative overflow-hidden">
        <div className="flex items-center gap-2.5 flex-wrap">
          <FunnelSimple size={15} weight="bold" className="text-white/40 mr-0.5" />
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setActiveFilter(btn.value)}
              className={`crm-pill-btn px-4 py-1.5 text-[11px] font-bold transition-all ${
                activeFilter === btn.value
                  ? filterActiveColor[btn.value]
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1">
          {DEAL_STAGES.map((stage) => (
            <KanbanColumn
              key={stage}
              stage={stage}
              deals={dealsByStage[stage]}
              onCardClick={handleCardClick}
              onToggleMaintenance={handleToggleMaintenance}
            />
          ))}
        </div>

        <DragOverlay>
          {activeDeal ? (
            <div className="w-[264px] opacity-90">
              <DealCard deal={activeDeal} onClick={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Detail Drawer */}
      <DealDrawer
        deal={drawerDeal}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setDrawerDeal(null);
        }}
        onUpdate={updateDeal}
      />
    </div>
  );
}

function formatCurrency(val: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val);
}
