import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import type { Lead, PipelineStage } from '../types';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

const mockLeads: Lead[] = [
  {
    id: 'LEAD-2026-0001', businessName: 'PT Maju Jaya', contactPerson: 'Budi Santoso',
    whatsapp: '628123456789', email: 'budi@majujaya.com', instagramWebsite: 'majujaya.com',
    category: 'Company', leadSource: 'Instagram', interestedService: 'Website Development',
    pic: 'Daniel', estimatedValue: 75000000, priority: 'High', pipelineStage: 'Proposal',
    lastContact: '2026-08-25', nextFollowUp: '2026-08-26', nextAction: 'Send proposal',
    notes: 'Interested in corporate website', createdAt: '2026-08-20', updatedAt: '2026-08-25',
  },
  {
    id: 'LEAD-2026-0002', businessName: 'StartupHub Indonesia', contactPerson: 'Arlene McCoy',
    whatsapp: '628987654321', email: 'arlene@startuphub.id', instagramWebsite: '@startuphub.id',
    category: 'Startup', leadSource: 'Event', interestedService: 'Mobile App Design',
    pic: 'Daniel', estimatedValue: 120000000, priority: 'High', pipelineStage: 'Qualified',
    lastContact: '2026-08-26', nextFollowUp: '2026-08-27', nextAction: 'Discovery call',
    notes: 'Met at Tech Summit', createdAt: '2026-08-11', updatedAt: '2026-08-26',
  },
  {
    id: 'LEAD-2026-0003', businessName: 'UMKM Bakery Kita', contactPerson: 'Sari Dewi',
    whatsapp: '628123456791', email: 'sari@bakerykita.com', instagramWebsite: '@bakerykita',
    category: 'UMKM Small', leadSource: 'WhatsApp', interestedService: 'Instagram Design',
    pic: 'Ignas', estimatedValue: 15000000, priority: 'Medium', pipelineStage: 'Won',
    lastContact: '2026-08-24', nextFollowUp: '2026-09-01', nextAction: 'Kickoff project',
    notes: 'DP received', createdAt: '2026-07-28', updatedAt: '2026-08-24',
  },
  {
    id: 'LEAD-2026-0004', businessName: 'Klinik Sehat Prima', contactPerson: 'Devon Lane',
    whatsapp: '628123456792', email: 'devon@kliniksehat.id', instagramWebsite: 'kliniksehat.id',
    category: 'UMKM Medium', leadSource: 'Referral', interestedService: 'Website Development',
    pic: 'Daniel', estimatedValue: 45000000, priority: 'High', pipelineStage: 'Negotiation',
    lastContact: '2026-08-23', nextFollowUp: '2026-08-27', nextAction: 'Final pricing',
    notes: 'Referred by PT Berkah', createdAt: '2026-07-30', updatedAt: '2026-08-23',
  },
  {
    id: 'LEAD-2026-0005', businessName: 'Kampus Tech Community', contactPerson: 'Rizky Pratama',
    whatsapp: '628123456793', email: 'rizky@kampustech.org', instagramWebsite: '@kampustech',
    category: 'Education', leadSource: 'Campus', interestedService: 'Landing Page',
    pic: 'Ignas', estimatedValue: 10000000, priority: 'Low', pipelineStage: 'Contacted',
    lastContact: '2026-08-18', nextFollowUp: '2026-08-29', nextAction: 'Send catalog',
    notes: 'Seminar audience', createdAt: '2026-08-05', updatedAt: '2026-08-18',
  },
];

const stageColors: Record<PipelineStage, string> = {
  Prospect: 'badge-lav', Contacted: 'badge-sky', Responded: 'badge-mint',
  Qualified: 'badge-orange', Meeting: 'badge-gold', Proposal: 'badge-orange',
  Negotiation: 'badge-gold', Won: 'badge-lime', Lost: 'badge-coral',
};

const priorityColors: Record<string, string> = {
  High: 'badge-orange', Medium: 'badge-gold', Low: 'badge-gray',
};

const col = createColumnHelper<Lead>();

const columns = [
  col.accessor('businessName', {
    header: 'Business',
    cell: (info) => (
      <Link to={`/leads/${info.row.original.id}`} className="font-semibold text-foreground hover:text-orange-400 transition-colors">
        {info.getValue()}
      </Link>
    ),
  }),
  col.accessor('contactPerson', { header: 'Contact' }),
  col.accessor('leadSource', { header: 'Source' }),
  col.accessor('category', {
    header: 'Category',
    cell: (info) => <span className="badge-gray">{info.getValue()}</span>,
  }),
  col.accessor('pic', { header: 'PIC' }),
  col.accessor('estimatedValue', {
    header: 'Value',
    cell: (info) => <span className="font-semibold text-foreground">Rp {(info.getValue() / 1e6).toFixed(0)}jt</span>,
  }),
  col.accessor('priority', {
    header: 'Priority',
    cell: (info) => <span className={priorityColors[info.getValue()]}>{info.getValue()}</span>,
  }),
  col.accessor('pipelineStage', {
    header: 'Stage',
    cell: (info) => <span className={stageColors[info.getValue()]}>{info.getValue()}</span>,
  }),
];

export function LeadsPage() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [picFilter, setPicFilter] = useState<string>('all');
  const [showNewLead, setShowNewLead] = useState(false);

  const filteredData = useMemo(() => {
    let data = [...mockLeads];
    if (stageFilter !== 'all') data = data.filter((l) => l.pipelineStage === stageFilter);
    if (picFilter !== 'all') data = data.filter((l) => l.pic === picFilter);
    return data;
  }, [stageFilter, picFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-foreground">Leads</h1>
          <p className="text-[13px] text-dark-400 mt-0.5">{filteredData.length} leads total</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowNewLead(true)}>
          <Plus className="w-4 h-4 mr-1" /> New Lead
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none" />
          <input
            type="search"
            placeholder="Search leads..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="input !pl-10"
          />
        </div>
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="select !w-auto !py-2"
        >
          <option value="all" className="bg-dark-800">All Stages</option>
          {Object.keys(stageColors).map((s) => (
            <option key={s} value={s} className="bg-dark-800">{s}</option>
          ))}
        </select>
        <select
          value={picFilter}
          onChange={(e) => setPicFilter(e.target.value)}
          className="select !w-auto !py-2"
        >
          <option value="all" className="bg-dark-800">All PIC</option>
          <option value="Daniel" className="bg-dark-800">Daniel</option>
          <option value="Ignas" className="bg-dark-800">Ignas</option>
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-t border-border">
                  {hg.headers.map((h) => (
                    <th
                      key={h.id}
                      className="table-header cursor-pointer select-none hover:text-dark-300 transition-colors"
                      onClick={h.column.getToggleSortingHandler()}
                    >
                      <span className="flex items-center gap-1">
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        {{ asc: <ChevronUp className="w-3 h-3" />, desc: <ChevronDown className="w-3 h-3" /> }[h.column.getIsSorted() as string] ?? null}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="table-row">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="table-cell">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-[12px] text-dark-500">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="icon-btn !w-7 !h-7 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="icon-btn !w-7 !h-7 disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* New Lead Modal */}
      <Modal
        isOpen={showNewLead}
        onClose={() => setShowNewLead(false)}
        title="New Lead"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setShowNewLead(false)}>Cancel</Button>
            <Button size="sm">Save Lead</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Business Name</label>
              <input type="text" placeholder="PT Maju Jaya" className="input" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Contact Person</label>
              <input type="text" placeholder="Budi Santoso" className="input" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">WhatsApp</label>
              <input type="text" placeholder="628123456789" className="input" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Email</label>
              <input type="email" placeholder="budi@majujaya.com" className="input" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Category</label>
              <select className="select" defaultValue="">
                <option value="" disabled className="bg-dark-800">Select category</option>
                {['Student Org', 'Community', 'Personal Brand', 'UMKM Small', 'UMKM Medium', 'UMKM Large', 'Startup', 'Company', 'Education', 'Other'].map((c) => (
                  <option key={c} value={c} className="bg-dark-800">{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Lead Source</label>
              <select className="select" defaultValue="">
                <option value="" disabled className="bg-dark-800">Select source</option>
                {['Instagram', 'WhatsApp', 'Referral', 'Website', 'LinkedIn', 'Campus', 'Cold Outreach', 'Event', 'Other'].map((s) => (
                  <option key={s} value={s} className="bg-dark-800">{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Interested Service</label>
              <input type="text" placeholder="Website Development" className="input" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">PIC</label>
              <select className="select" defaultValue="">
                <option value="" disabled className="bg-dark-800">Select PIC</option>
                <option value="Daniel" className="bg-dark-800">Daniel</option>
                <option value="Ignas" className="bg-dark-800">Ignas</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Estimated Value (IDR)</label>
              <input type="number" placeholder="50000000" className="input" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Priority</label>
              <select className="select" defaultValue="Medium">
                <option value="Low" className="bg-dark-800">Low</option>
                <option value="Medium" className="bg-dark-800">Medium</option>
                <option value="High" className="bg-dark-800">High</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Notes</label>
            <textarea rows={3} placeholder="Additional notes..." className="input !rounded-xl" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
