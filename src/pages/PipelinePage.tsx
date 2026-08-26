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
import { GripVertical, DollarSign } from 'lucide-react';
import type { Lead, PipelineStage } from '../types';

interface KanbanCardProps {
  lead: Lead;
}

function KanbanCard({ lead }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-3 cursor-grab active:cursor-grabbing
        ${isDragging ? 'shadow-lg dark:shadow-dark-lg ring-2 ring-accent-teal/50' : 'hover:shadow-md dark:hover:shadow-dark-lg'}
        transition-shadow`}
    >
      <div className="flex items-start justify-between mb-2">
        <Link 
          to={`/leads/${lead.id}`}
          className="font-medium text-gray-900 dark:text-white text-sm hover:text-accent-teal dark:hover:text-accent-teal"
        >
          {lead.businessName}
        </Link>
        <button {...attributes} {...listeners} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
          <GripVertical className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{lead.contactPerson}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-accent-teal flex items-center gap-1">
          <DollarSign className="w-3 h-3" />
          Rp {(lead.estimatedValue / 1000000).toFixed(0)}M
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{lead.pic}</span>
      </div>
    </div>
  );
}

interface KanbanColumnProps {
  stage: PipelineStage;
  leads: Lead[];
  count: number;
  color: string;
}

function KanbanColumn({ stage, leads, count, color }: KanbanColumnProps) {
  return (
    <div className="flex flex-col min-w-[280px] w-[280px]">
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{stage}</h3>
        <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-dark-700 px-2 py-0.5 rounded-full">
          {count}
        </span>
      </div>
      <div className="flex-1 bg-gray-50 dark:bg-dark-900/50 rounded-xl p-2 space-y-2 min-h-[200px] border border-gray-100 dark:border-dark-800">
        <SortableContext items={leads.map(l => l.id)} strategy={verticalListSortingStrategy}>
          {leads.map((lead) => (
            <KanbanCard key={lead.id} lead={lead} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

const pipelineStages: { stage: PipelineStage; color: string }[] = [
  { stage: 'Prospect', color: 'bg-gray-400 dark:bg-gray-500' },
  { stage: 'Contacted', color: 'bg-blue-400 dark:bg-blue-500' },
  { stage: 'Responded', color: 'bg-blue-500 dark:bg-blue-400' },
  { stage: 'Qualified', color: 'bg-green-500' },
  { stage: 'Meeting', color: 'bg-purple-500' },
  { stage: 'Proposal', color: 'bg-amber-500' },
  { stage: 'Negotiation', color: 'bg-orange-500' },
  { stage: 'Won', color: 'bg-accent-teal' },
  { stage: 'Lost', color: 'bg-red-400 dark:bg-red-500' },
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
    contactPerson: 'Rina Wijaya',
    whatsapp: '628987654321',
    email: 'rina@startuphub.id',
    instagramWebsite: 'startuphub.id',
    category: 'Startup',
    leadSource: 'Referral',
    interestedService: 'UI/UX Design',
    pic: 'Ignas',
    estimatedValue: 50000000,
    priority: 'Medium',
    pipelineStage: 'Qualified',
    lastContact: '2026-08-24',
    nextFollowUp: '2026-08-26',
    nextAction: 'Schedule discovery call',
    notes: 'Mobile app design project',
    createdAt: '2026-08-18',
    updatedAt: '2026-08-24',
  },
  {
    id: 'LEAD-2026-0003',
    businessName: 'Kampus Tech',
    contactPerson: 'Dr. Ahmad',
    whatsapp: '628111222333',
    email: 'ahmad@kampustech.ac.id',
    instagramWebsite: 'kampustech.ac.id',
    category: 'Education',
    leadSource: 'Campus',
    interestedService: 'AI Solutions',
    pic: 'Daniel',
    estimatedValue: 120000000,
    priority: 'High',
    pipelineStage: 'Meeting',
    lastContact: '2026-08-23',
    nextFollowUp: '2026-08-27',
    nextAction: 'Prepare demo presentation',
    notes: 'AI-powered student management system',
    createdAt: '2026-08-15',
    updatedAt: '2026-08-23',
  },
  {
    id: 'LEAD-2026-0004',
    businessName: 'Warung Bu Ani',
    contactPerson: 'Ani Setiawan',
    whatsapp: '628444555666',
    email: 'ani@warungbuanii.com',
    instagramWebsite: '@warungbuanii',
    category: 'UMKM Small',
    leadSource: 'WhatsApp',
    interestedService: 'N8N Workflow Automation',
    pic: 'Ignas',
    estimatedValue: 15000000,
    priority: 'Low',
    pipelineStage: 'Contacted',
    lastContact: '2026-08-22',
    nextFollowUp: '2026-08-29',
    nextAction: 'Follow up on WhatsApp',
    notes: 'Needs inventory automation',
    createdAt: '2026-08-20',
    updatedAt: '2026-08-22',
  },
  {
    id: 'LEAD-2026-0005',
    businessName: 'PT Sejahtera',
    contactPerson: 'Hendra Kusuma',
    whatsapp: '628777888999',
    email: 'hendra@sejahtera.co.id',
    instagramWebsite: 'sejahtera.co.id',
    category: 'UMKM Large',
    leadSource: 'LinkedIn',
    interestedService: 'API Integration',
    pic: 'Daniel',
    estimatedValue: 95000000,
    priority: 'High',
    pipelineStage: 'Negotiation',
    lastContact: '2026-08-25',
    nextFollowUp: '2026-08-26',
    nextAction: 'Final price negotiation',
    notes: 'ERP integration project',
    createdAt: '2026-08-10',
    updatedAt: '2026-08-25',
  },
];

export function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeLead = leads.find(l => l.id === activeId);
    if (!activeLead) return;

    const targetStage = pipelineStages.find(s => s.stage === overId);
    if (targetStage) {
      setLeads(leads.map(l => 
        l.id === activeId 
          ? { ...l, pipelineStage: targetStage.stage, updatedAt: new Date().toISOString() }
          : l
      ));
      return;
    }

    const overLead = leads.find(l => l.id === overId);
    if (!overLead) return;

    if (activeLead.pipelineStage === overLead.pipelineStage) {
      const oldIndex = leads.findIndex(l => l.id === activeId);
      const newIndex = leads.findIndex(l => l.id === overId);
      setLeads(arrayMove(leads, oldIndex, newIndex));
    } else {
      setLeads(leads.map(l =>
        l.id === activeId
          ? { ...l, pipelineStage: overLead.pipelineStage, updatedAt: new Date().toISOString() }
          : l
      ));
    }
  };

  const getLeadsByStage = (stage: PipelineStage) => 
    leads.filter(l => l.pipelineStage === stage);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Sales Pipeline</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Drag leads between stages to update</p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {pipelineStages.map((stage) => (
            <KanbanColumn
              key={stage.stage}
              stage={stage.stage}
              leads={getLeadsByStage(stage.stage)}
              count={getLeadsByStage(stage.stage).length}
              color={stage.color}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
