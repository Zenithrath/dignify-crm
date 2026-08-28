import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  CaretDown,
  ChatCircle,
  CalendarBlank,
  Plus,
  Trash,
  X,
} from '@phosphor-icons/react';
import type { ContentItem, ContentKanbanStage, ContentPlatform, ContentType } from '../../types';
import { CONTENT_KANBAN_STAGES, CONTENT_PLATFORMS, CONTENT_TYPES } from '../../types';

interface ContentKanbanBoardProps {
  contents: ContentItem[];
  onMoveContent: (contentId: string, newStage: ContentKanbanStage) => void;
  onAddContent: (item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  onDeleteContent: (contentId: string) => void;
  onAddComment: (contentId: string, user: string, text: string) => void;
}

const platformColor: Record<ContentPlatform, string> = {
  Instagram: 'bg-[#E1306C]',
  TikTok: 'bg-[#00F2EA]',
  LinkedIn: 'bg-[#0A66C2]',
  YouTube: 'bg-[#FF0000]',
};

const stageColor: Record<ContentKanbanStage, string> = {
  Ide: 'bg-white/8 text-white/45 border border-white/10',
  'Draft copy': 'bg-[#4CD7E0]/12 text-[#4CD7E0] border border-[#4CD7E0]/25',
  'Menunggu ACC Ignas': 'bg-[#FFD043]/12 text-[#FFD043] border border-[#FFD043]/25',
  Desain: 'bg-[#A89AE8]/12 text-[#A89AE8] border border-[#A89AE8]/25',
  Review: 'bg-[#FF8A3D]/12 text-[#FF8A3D] border border-[#FF8A3D]/25',
  Terjadwal: 'bg-[#4CD7E0]/12 text-[#4CD7E0] border border-[#4CD7E0]/25',
  Published: 'bg-[#D8FF3F]/12 text-[#D8FF3F] border border-[#D8FF3F]/25',
};

function ContentCard({ content, onDelete }: { content: ContentItem; onDelete: (id: string) => void }) {
  const [showComments, setShowComments] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: content.id, data: { content } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 cursor-grab active:cursor-grabbing hover:border-white/[0.1] transition-colors group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${platformColor[content.platform]}`} />
          <span className="text-[12px] font-semibold text-white/80 truncate">{content.title}</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(content.id); }}
          className="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-[#FF5A5A]/10 text-white/20 hover:text-[#FF5A5A] transition-all cursor-pointer flex-shrink-0"
        >
          <Trash size={11} weight="bold" />
        </button>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <span className="text-[9px] font-medium text-white/40 bg-white/5 px-1.5 py-0.5 rounded">{content.platform}</span>
        <span className="text-[9px] font-medium text-white/40 bg-white/5 px-1.5 py-0.5 rounded">{content.tipe}</span>
      </div>

      {/* Writers */}
      <div className="flex items-center gap-3 text-[10px] text-white/35 mb-2">
        <span>✍️ {content.captionWriter}</span>
        <span>🎨 {content.designer}</span>
      </div>

      {/* Publish date */}
      {content.publishDate && (
        <div className="flex items-center gap-1.5 text-[10px] text-white/25 mb-2">
          <CalendarBlank size={10} weight="fill" />
          <span>{content.publishDate}</span>
        </div>
      )}

      {/* Comments */}
      {(content.comments?.length ?? 0) > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); setShowComments(!showComments); }}
          className="flex items-center gap-1.5 text-[10px] text-white/30 hover:text-white/50 transition-colors cursor-pointer"
        >
          <ChatCircle size={11} weight="fill" />
          <span>{content.comments?.length} komentar</span>
          <CaretDown size={9} className={`transition-transform ${showComments ? 'rotate-180' : ''}`} />
        </button>
      )}

      {showComments && content.comments && (
        <div className="mt-2 flex flex-col gap-1.5 border-t border-white/[0.04] pt-2">
          {content.comments.map((c) => (
            <div key={c.id} className="text-[10px] text-white/30 bg-white/[0.02] rounded-lg px-2.5 py-1.5">
              <span className="font-semibold text-white/50">{c.user}:</span> {c.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function KanbanColumn({
  stage,
  contents,
  onDelete,
}: {
  stage: ContentKanbanStage;
  contents: ContentItem[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex flex-col min-w-[240px] max-w-[280px] flex-shrink-0">
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${stageColor[stage]}`}>
          {stage}
        </span>
        <span className="text-[10px] text-white/25">{contents.length}</span>
      </div>
      <SortableContext items={contents.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2 min-h-[100px] bg-white/[0.015] rounded-xl p-2 border border-white/[0.03]">
          {contents.map((content) => (
            <ContentCard key={content.id} content={content} onDelete={onDelete} />
          ))}
          {contents.length === 0 && (
            <div className="flex items-center justify-center h-16 text-[11px] text-white/15">
              Kosong
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

export function ContentKanbanBoard({ contents, onMoveContent, onAddContent, onDeleteContent }: ContentKanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const activeContent = activeId ? contents.find((c) => c.id === activeId) : null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const overData = over.data.current;
    if (overData?.stage) {
      onMoveContent(String(active.id), overData.stage as ContentKanbanStage);
    } else if (overData?.content) {
      onMoveContent(String(active.id), overData.content.stage);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-bold text-white/70">Kanban Board</h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 text-[11px] text-[#D8FF3F] hover:text-[#D8FF3F]/80 transition-colors cursor-pointer"
        >
          <Plus size={12} weight="bold" />
          <span>Tambah Konten</span>
        </button>
      </div>

      {showAdd && (
        <AddContentInline onAdd={(item) => { onAddContent(item); setShowAdd(false); }} onClose={() => setShowAdd(false)} />
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {CONTENT_KANBAN_STAGES.map((stage) => (
            <KanbanColumn
              key={stage}
              stage={stage}
              contents={contents.filter((c) => c.stage === stage)}
              onDelete={onDeleteContent}
            />
          ))}
        </div>
        <DragOverlay>
          {activeContent ? (
            <div className="bg-[#1B1D25] border border-white/10 rounded-xl p-3 shadow-2xl w-[240px] opacity-90">
              <span className="text-[12px] font-semibold text-white/80">{activeContent.title}</span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function AddContentInline({
  onAdd,
  onClose,
}: {
  onAdd: (item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState<ContentPlatform>('Instagram');
  const [tipe, setTipe] = useState<ContentType>('Feed');
  const [captionWriter, setCaptionWriter] = useState('');
  const [designer, setDesigner] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !captionWriter.trim()) return;
    onAdd({
      title: title.trim(),
      platform,
      tipe,
      captionWriter: captionWriter.trim(),
      designer: designer.trim() || '-',
      stage: 'Ide',
      publishDate: '',
      caption: '',
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-bold text-white/60">Konten Baru</span>
        <button type="button" onClick={onClose} className="p-1 rounded-md hover:bg-white/5 text-white/30 cursor-pointer">
          <X size={12} weight="bold" />
        </button>
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input !h-8 !text-[11px]"
        placeholder="Judul konten..."
        autoFocus
      />
      <div className="flex gap-2">
        <select value={platform} onChange={(e) => setPlatform(e.target.value as ContentPlatform)} className="input select !h-8 !text-[11px] flex-1">
          {CONTENT_PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={tipe} onChange={(e) => setTipe(e.target.value as ContentType)} className="input select !h-8 !text-[11px] flex-1">
          {CONTENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="flex gap-2">
        <input value={captionWriter} onChange={(e) => setCaptionWriter(e.target.value)} className="input !h-8 !text-[11px] flex-1" placeholder="Caption writer" />
        <input value={designer} onChange={(e) => setDesigner(e.target.value)} className="input !h-8 !text-[11px] flex-1" placeholder="Designer" />
      </div>
      <div className="flex justify-end">
        <button type="submit" disabled={!title.trim() || !captionWriter.trim()} className="flex items-center gap-1.5 bg-[#D8FF3F] hover:bg-[#D8FF3F]/90 disabled:opacity-30 text-black text-[11px] font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer">
          <Plus size={12} weight="bold" />
          <span>Tambah</span>
        </button>
      </div>
    </form>
  );
}
