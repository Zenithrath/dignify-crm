import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, DollarSign, Clock } from 'lucide-react';
import type { Lead, PipelineStage } from '../types';

interface KanbanCardProps {
  lead: Lead;
}

function KanbanCard({ lead }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: lead.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors: Record<string, string> = {
    High: 'bg-orange-500/15 text-orange-400 border border-orange-500/20',
    Medium: 'bg-gold/15 text-gold border border-gold/20',
    Low: 'bg-foreground/[0.04] text-dark-400 border border-border',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`card glass p-3 cursor-grab active:cursor-grabbing ${
        isDragging ? 'ring-2 ring-orange-500/40 shadow-none' : ''
      } transition-shadow`}
    >
      <div className="flex items-start justify-between mb-1">
        <Link
          to={`/leads/${lead.id}`}
          className="font-semibold text-foreground text-[13px] hover:text-orange-400 transition-colors"
        >
          {lead.businessName}
        </Link>
        <button
          {...attributes}
          {...listeners}
          className="text-dark-500 hover:text-foreground cursor-grab"
          aria-label="Drag handle"
        >
          <GripVertical className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className="text-[11px] text-dark-400 mb-2">{lead.contactPerson}</p>
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-bold text-dark-200 inline-flex items-center gap-1">
          <DollarSign className="w-3 h-3 text-sky-400" />
          Rp {(lead.estimatedValue / 1000000).toFixed(0)}jt
        </span>
        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${priorityColors[lead.priority]}`}>
          {lead.priority}
        </span>
      </div>
      {lead.nextFollowUp && (
        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-white/[0.04] text-[10px] text-dark-500">
          <Clock className="w-3 h-3" />
          <span>Follow-up: {lead.nextFollowUp}</span>
        </div>
      )}
    </div>
  );
}

interface KanbanColumnProps {
  stage: PipelineStage;
  leads: Lead[];
  dot: string;
}

function KanbanColumn({ stage, leads, dot }: KanbanColumnProps) {
  return (
    <div className="flex flex-col min-w-[260px] w-[260px]">
      <div className="flex items-center gap-2 mb-2.5 px-1">
        <span className={`w-2 h-2 rounded-sm ${dot}`} />
        <h3 className="text-[13px] font-bold text-foreground">{stage}</h3>
        <span className="text-[10px] font-bold text-dark-500 bg-foreground/[0.04] rounded px-1.5 py-0.5">
          {leads.length}
        </span>
      </div>
      <div className="flex-1 rounded-lg p-2 space-y-2 min-h-[180px] border bg-white/[0.02] border-white/[0.05]">
        <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
          {leads.map((lead) => (
            <KanbanCard key={lead.id} lead={lead} />
          ))}
        </SortableContext>
        {leads.length === 0 && (
          <div className="flex items-center justify-center h-20 text-[11px] text-dark-600">
            No leads
          </div>
        )}
      </div>
    </div>
  );
}

const pipelineStages: { stage: PipelineStage; dot: string }[] = [
  { stage: 'Prospect', dot: 'bg-purple-400' },
  { stage: 'Contacted', dot: 'bg-sky-400' },
  { stage: 'Responded', dot: 'bg-blue-400' },
  { stage: 'Qualified', dot: 'bg-blue-500' },
  { stage: 'Meeting', dot: 'bg-blue-bright' },
  { stage: 'Proposal', dot: 'bg-gold' },
  { stage: 'Negotiation', dot: 'bg-orange-400' },
  { stage: 'Won', dot: 'bg-emerald-400' },
  { stage: 'Lost', dot: 'bg-dark-500' },
];

const mockLeads: Lead[] = [
  {
    id: 'LEAD-2026-0001',
    businessName: 'PT Maju Jaya',
    contactPerson: 'Budi Santoso',
    whatsapp: '628123456789',
    email: 'budi@majujaya.com',
    instagramWebsite: 'majujaya.com',
    category: 'Company',
    leadSource: 'Instagram',
    interestedService: 'Website Development',
    pic: 'Daniel',
    estimatedValue: 75000000,
    priority: 'High',
    pipelineStage: 'Proposal',
    lastContact: '2026-08-25',
    nextFollowUp: '2026-08-26',
    nextAction: 'Send proposal document',
    notes: 'Interested in corporate website',
    createdAt: '2026-08-20',
    updatedAt: '2026-08-25',
  },
  {
    id: 'LEAD-2026-0002',
    businessName: 'StartupHub Indonesia',
    contactPerson: 'Arlene McCoy',
    whatsapp: '628987654321',
    email: 'arlene@startuphub.id',
    instagramWebsite: '@startuphub.id',
    category: 'Startup',
    leadSource: 'Event',
    interestedService: 'Mobile App Design',
    pic: 'Daniel',
    estimatedValue: 120000000,
    priority: 'High',
    pipelineStage: 'Qualified',
    lastContact: '2026-08-26',
    nextFollowUp: '2026-08-27',
    nextAction: 'Discovery call',
    notes: 'Met at Tech Summit Jakarta',
    createdAt: '2026-08-11',
    updatedAt: '2026-08-26',
  },
  {
    id: 'LEAD-2026-0003',
    businessName: 'UMKM Bakery Kita',
    contactPerson: 'Sari Dewi',
    whatsapp: '628123456791',
    email: 'sari@bakerykita.com',
    instagramWebsite: '@bakerykita',
    category: 'UMKM Small',
    leadSource: 'WhatsApp',
    interestedService: 'Instagram Design',
    pic: 'Ignas',
    estimatedValue: 15000000,
    priority: 'Medium',
    pipelineStage: 'Won',
    lastContact: '2026-08-24',
    nextFollowUp: '2026-09-01',
    nextAction: 'Kickoff project',
    notes: 'DP already received',
    createdAt: '2026-07-28',
    updatedAt: '2026-08-24',
  },
  {
    id: 'LEAD-2026-0004',
    businessName: 'Klinik Sehat Prima',
    contactPerson: 'Devon Lane',
    whatsapp: '628123456792',
    email: 'devon@kliniksehat.id',
    instagramWebsite: 'kliniksehat.id',
    category: 'UMKM Medium',
    leadSource: 'Referral',
    interestedService: 'Website Development',
    pic: 'Daniel',
    estimatedValue: 45000000,
    priority: 'High',
    pipelineStage: 'Negotiation',
    lastContact: '2026-08-23',
    nextFollowUp: '2026-08-27',
    nextAction: 'Final pricing discussion',
    notes: 'Referred by PT Berkah Sejahtera',
    createdAt: '2026-07-30',
    updatedAt: '2026-08-23',
  },
  {
    id: 'LEAD-2026-0005',
    businessName: 'Kampus Tech Community',
    contactPerson: 'Rizky Pratama',
    whatsapp: '628123456793',
    email: 'rizky@kampustech.org',
    instagramWebsite: '@kampustech',
    category: 'Education',
    leadSource: 'Campus',
    interestedService: 'Landing Page',
    pic: 'Ignas',
    estimatedValue: 10000000,
    priority: 'Low',
    pipelineStage: 'Contacted',
    lastContact: '2026-08-18',
    nextFollowUp: '2026-08-29',
    nextAction: 'Send service catalog',
    notes: 'Seminar audience',
    createdAt: '2026-08-05',
    updatedAt: '2026-08-18',
  },
];

export function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeLead = leads.find((l) => l.id === activeId);
    if (!activeLead) return;

    const targetStage = pipelineStages.find((s) => s.stage === overId);
    if (targetStage) {
      setLeads(
        leads.map((l) =>
          l.id === activeId
            ? { ...l, pipelineStage: targetStage.stage, updatedAt: new Date().toISOString() }
            : l
        )
      );
      return;
    }

    const overLead = leads.find((l) => l.id === overId);
    if (!overLead) return;

    if (activeLead.pipelineStage === overLead.pipelineStage) {
      const oldIndex = leads.findIndex((l) => l.id === activeId);
      const newIndex = leads.findIndex((l) => l.id === overId);
      setLeads(arrayMove(leads, oldIndex, newIndex));
    } else {
      setLeads(
        leads.map((l) =>
          l.id === activeId
            ? { ...l, pipelineStage: overLead.pipelineStage, updatedAt: new Date().toISOString() }
            : l
        )
      );
    }
  };

  const getLeadsByStage = (stage: PipelineStage) => leads.filter((l) => l.pipelineStage === stage);

  const totalValue = leads.reduce((sum, l) => sum + l.estimatedValue, 0);
  const wonValue = leads.filter((l) => l.pipelineStage === 'Won').reduce((sum, l) => sum + l.estimatedValue, 0);
  const activeLeads = leads.filter((l) => !['Won', 'Lost'].includes(l.pipelineStage)).length;

  return (
    <div className="space-y-4 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-foreground">Pipeline</h1>
          <p className="text-[13px] text-dark-400 mt-0.5">
            Drag leads between stages to update progress
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[11px] text-dark-500">Total Value</p>
            <p className="text-[15px] font-bold text-foreground">Rp {(totalValue / 1e6).toFixed(0)}jt</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-dark-500">Won</p>
            <p className="text-[15px] font-bold text-emerald-400">Rp {(wonValue / 1e6).toFixed(0)}jt</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-dark-500">Active</p>
            <p className="text-[15px] font-bold text-gold">{activeLeads}</p>
          </div>
        </div>
      </div>

      {/* Kanban */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex gap-3 overflow-x-auto pb-4">
          {pipelineStages.map((stage) => (
            <KanbanColumn
              key={stage.stage}
              stage={stage.stage}
              leads={getLeadsByStage(stage.stage)}
              dot={stage.dot}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
