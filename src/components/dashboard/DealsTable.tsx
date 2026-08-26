import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronDown } from 'lucide-react';
import type { Lead, PipelineStage } from '../../types';

interface DealsTableProps {
  leads: Lead[];
}

const stageStyles: Partial<Record<PipelineStage, string>> = {
  Won: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
  Lost: 'bg-red-500/15 text-red-400 border border-red-500/20',
  Qualified: 'bg-blue/15 text-blue-bright border border-blue/20',
};

function stageBadgeClass(stage: PipelineStage) {
  return stageStyles[stage] ?? 'bg-foreground/[0.04] text-dark-300 border border-border';
}

function relativeTime(dateStr: string) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / 86400000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? 'Last month' : `${months} months ago`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

type SortDir = 'asc' | 'desc' | null;

export function DealsTable({ leads }: DealsTableProps) {
  const [query, setQuery] = useState('');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [hotOnly, setHotOnly] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let rows = [...leads];
    if (hotOnly) rows = rows.filter((l) => l.priority === 'High');
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter(
        (l) =>
          l.businessName.toLowerCase().includes(q) ||
          l.contactPerson.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q)
      );
    }
    if (sortDir) {
      rows.sort((a, b) => {
        const cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return rows;
  }, [leads, query, sortDir, hotOnly]);

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allSelected = filtered.length > 0 && filtered.every((l) => selected.has(l.id));
  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(filtered.map((l) => l.id)));
  };

  const cycleSort = () =>
    setSortDir((d) => (d === 'desc' ? 'asc' : d === 'asc' ? null : 'desc'));

  return (
    <div className="gs-card card overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 p-4 lg:p-5">
        <h2 className="text-base font-bold text-foreground mr-1">List Deals</h2>

        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-dark-500 pointer-events-none"
            strokeWidth={1.8}
          />
          <input
            type="search"
            placeholder="Search deals..."
            aria-label="Search deals"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input !py-1.5 !pl-9 !text-[12px] !bg-dark-850"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setHotOnly((v) => !v)}
            aria-pressed={hotOnly}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all cursor-pointer ${
              hotOnly
                ? 'bg-ember/10 border-ember/30 text-ember-bright'
                : 'bg-foreground/[0.04] border-white/[0.07] text-dark-300 hover:text-foreground'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.8} />
            Filter
          </button>
          <button
            onClick={cycleSort}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold bg-foreground/[0.04] border border-white/[0.07] text-dark-300 hover:text-foreground transition-all cursor-pointer"
          >
            <ArrowUpDown className="w-3.5 h-3.5" strokeWidth={1.8} />
            Sort
            <ChevronDown
              className={`w-3 h-3 transition-transform ${
                sortDir === 'asc' ? 'rotate-180' : sortDir === null ? 'opacity-30' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px]">
          <thead>
            <tr className="border-t border-white/[0.05]">
              <th className="table-header !w-12">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Select all deals"
                />
              </th>
              <th className="table-header">Title</th>
              <th className="table-header">Source</th>
              <th className="table-header">Last Activity</th>
              <th className="table-header">Contact</th>
              <th className="table-header">Category</th>
              <th className="table-header">Created</th>
              <th className="table-header">Stage</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr className="table-row">
                <td colSpan={8} className="table-cell !text-center !py-10 text-dark-500">
                  No deals found
                </td>
              </tr>
            ) : (
              filtered.map((lead) => (
                <tr key={lead.id} className={`table-row ${selected.has(lead.id) ? 'bg-white/[0.02]' : ''}`}>
                  <td className="table-cell">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selected.has(lead.id)}
                      onChange={() => toggleRow(lead.id)}
                      aria-label={`Select ${lead.businessName}`}
                    />
                  </td>
                  <td className="table-cell">
                    <Link
                      to={`/leads/${lead.id}`}
                      className="font-semibold text-foreground hover:text-ember-bright transition-colors"
                    >
                      {lead.businessName}
                    </Link>
                  </td>
                  <td className="table-cell text-dark-300">{lead.leadSource}</td>
                  <td className="table-cell text-dark-400">{formatDate(lead.lastContact)}</td>
                  <td className="table-cell font-medium text-dark-100">{lead.contactPerson}</td>
                  <td className="table-cell">
                    <span className="badge-gray">{lead.category}</span>
                  </td>
                  <td className="table-cell text-dark-400">{relativeTime(lead.createdAt)}</td>
                  <td className="table-cell">
                    <span className={`badge ${stageBadgeClass(lead.pipelineStage)}`}>
                      {lead.pipelineStage}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
