import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Deal, DealStage } from '../../types';
import { DealCard } from './DealCard';

interface KanbanColumnProps {
  stage: DealStage;
  deals: Deal[];
  onCardClick: (deal: Deal) => void;
  onToggleMaintenance?: (dealId: string, active: boolean) => void;
}

const stageDotColor: Record<DealStage, string> = {
  Prospecting: 'bg-[#A89AE8]',
  'Approval Internal': 'bg-[#FFD043]',
  Development: 'bg-[#4CD7E0]',
  Review: 'bg-[#FF8A3D]',
  Deploy: 'bg-[#D8FF3F]',
};

function SortableDealCard({
  deal,
  onClick,
  onToggleMaintenance,
}: {
  deal: Deal;
  onClick: () => void;
  onToggleMaintenance?: (dealId: string, active: boolean) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : 'auto' as const,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <DealCard deal={deal} onClick={onClick} onToggleMaintenance={onToggleMaintenance} />
    </div>
  );
}

export function KanbanColumn({ stage, deals, onCardClick, onToggleMaintenance }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });

  return (
    <div className="flex flex-col min-w-[290px] w-[290px] flex-shrink-0">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${stageDotColor[stage]} shadow-sm`} />
          <h3 className="text-[12px] font-bold text-white/70 tracking-wide">
            {stage}
          </h3>
        </div>
        <span className="text-[10px] font-bold text-white/35 bg-white/5 px-2.5 py-0.5 rounded-full">
          {deals.length}
        </span>
      </div>

      {/* Cards container */}
      <div
        ref={setNodeRef}
        className={`flex flex-col gap-3 p-2 rounded-2xl min-h-[200px] transition-all ${
          isOver
            ? 'bg-[#D8FF3F]/[0.03] ring-1 ring-[#D8FF3F]/15 shadow-[inset_0_0_30px_rgba(216,255,63,0.02)]'
            : 'bg-white/[0.01]'
        }`}
      >
        <SortableContext items={deals.map((d) => d.id)} strategy={verticalListSortingStrategy}>
          {deals.map((deal) => (
            <SortableDealCard
              key={deal.id}
              deal={deal}
              onClick={() => onCardClick(deal)}
              onToggleMaintenance={onToggleMaintenance}
            />
          ))}
        </SortableContext>

        {deals.length === 0 && (
          <div className="flex flex-col items-center justify-center h-28 text-[11px] text-white/20 border border-dashed border-white/[0.08] rounded-2xl gap-1.5">
            <span className="text-white/15 text-[20px]">+</span>
            <span>Seret deal ke sini</span>
          </div>
        )}
      </div>
    </div>
  );
}
