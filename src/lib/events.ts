import type { Work, ContentItem, Lead } from '../types';

export type EventKind = 'Deadline' | 'Mulai' | 'Konten' | 'Live' | 'Follow-up';

export interface CalendarEvent {
  date: string;
  title: string;
  kind: EventKind;
  refPath?: string;
}

export function buildEvents(works: Work[], content: ContentItem[], leads: Lead[]): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  for (const work of works) {
    if (work.deadline) {
      events.push({
        date: work.deadline,
        title: work.name,
        kind: 'Deadline',
        refPath: `/work/${work.id}`,
      });
    }
    if (work.startDate) {
      events.push({
        date: work.startDate,
        title: work.name,
        kind: 'Mulai',
        refPath: `/work/${work.id}`,
      });
    }
  }

  for (const item of content) {
    if (item.publishDate) {
      events.push({
        date: item.publishDate,
        title: item.title,
        kind: item.isLive ? 'Live' : 'Konten',
        refPath: '/content',
      });
    }
  }

  for (const lead of leads) {
    if (lead.nextFollowUp && lead.pipelineStage !== 'Won' && lead.pipelineStage !== 'Lost') {
      events.push({
        date: lead.nextFollowUp,
        title: `${lead.businessName} — ${lead.nextAction || 'Follow-up'}`,
        kind: 'Follow-up',
        refPath: `/leads/${lead.id}`,
      });
    }
  }

  return events;
}