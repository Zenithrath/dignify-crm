import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Search, Plus, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { Lead, PipelineStage, Priority } from '../types';

interface LeadWithId extends Lead {
  id: string;
}

const columnHelper = createColumnHelper<LeadWithId>();

const mockLeads: LeadWithId[] = [
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

const columns = [
  columnHelper.accessor('businessName', {
    header: 'Business',
    cell: (info) => (
      <Link 
        to={`/leads/${info.row.original.id}`}
        className="font-medium text-gray-900 dark:text-white hover:text-accent-teal dark:hover:text-accent-teal"
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('contactPerson', {
    header: 'Contact',
    cell: (info) => (
      <span className="text-gray-600 dark:text-gray-400">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('pic', {
    header: 'PIC',
    cell: (info) => (
      <span className="text-gray-600 dark:text-gray-400">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('interestedService', {
    header: 'Service',
    cell: (info) => (
      <span className="text-gray-600 dark:text-gray-400">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('pipelineStage', {
    header: 'Stage',
    cell: (info) => {
      const stage = info.getValue();
      const colors: Record<PipelineStage, string> = {
        Prospect: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
        Contacted: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
        Responded: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
        Qualified: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
        Meeting: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
        Proposal: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
        Negotiation: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
        Won: 'bg-accent-teal/20 text-accent-teal',
        Lost: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
      };
      return (
        <span className={`badge ${colors[stage] || ''}`}>
          {stage}
        </span>
      );
    },
  }),
  columnHelper.accessor('estimatedValue', {
    header: 'Value',
    cell: (info) => {
      const value = info.getValue();
      return (
        <span className="font-medium text-gray-900 dark:text-white">
          Rp {(value / 1000000).toFixed(0)}M
        </span>
      );
    },
  }),
  columnHelper.accessor('nextFollowUp', {
    header: 'Follow-up',
    cell: (info) => {
      const date = new Date(info.getValue());
      return (
        <span className="text-gray-600 dark:text-gray-400">
          {date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
        </span>
      );
    },
  }),
  columnHelper.accessor('priority', {
    header: 'Priority',
    cell: (info) => {
      const priority = info.getValue();
      const colors: Record<Priority, string> = {
        Low: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
        Medium: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
        High: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
      };
      return (
        <span className={`badge ${colors[priority] || ''}`}>
          {priority}
        </span>
      );
    },
  }),
];

export function LeadsPage() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterStage, setFilterStage] = useState<PipelineStage | ''>('');
  const [filterPIC, setFilterPIC] = useState('');
  const [filterPriority, setFilterPriority] = useState<Priority | ''>('');

  const filteredLeads = mockLeads.filter((lead) => {
    const matchSearch = lead.businessName.toLowerCase().includes(search.toLowerCase()) ||
      lead.contactPerson.toLowerCase().includes(search.toLowerCase());
    const matchStage = !filterStage || lead.pipelineStage === filterStage;
    const matchPIC = !filterPIC || lead.pic === filterPIC;
    const matchPriority = !filterPriority || lead.priority === filterPriority;
    return matchSearch && matchStage && matchPIC && matchPriority;
  });

  const table = useReactTable({
    data: filteredLeads,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Leads</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{filteredLeads.length} leads total</p>
        </div>
        <Button className="bg-gradient-to-r from-accent-teal to-accent-green hover:from-accent-teal/90 hover:to-accent-green/90 text-white border-0">
          <Plus className="w-4 h-4 mr-1.5" />
          New Lead
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="card p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
              showFilters 
                ? 'bg-gray-900 dark:bg-accent-teal text-white border-gray-900 dark:border-accent-teal' 
                : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-dark-700">
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value as PipelineStage | '')}
              className="select"
            >
              <option value="">All Stages</option>
              <option value="Prospect">Prospect</option>
              <option value="Contacted">Contacted</option>
              <option value="Responded">Responded</option>
              <option value="Qualified">Qualified</option>
              <option value="Meeting">Meeting</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
            <select
              value={filterPIC}
              onChange={(e) => setFilterPIC(e.target.value)}
              className="select"
            >
              <option value="">All PIC</option>
              <option value="Daniel">Daniel</option>
              <option value="Ignas">Ignas</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as Priority | '')}
              className="select"
            >
              <option value="">All Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {(filterStage || filterPIC || filterPriority) && (
              <button
                onClick={() => {
                  setFilterStage('');
                  setFilterPIC('');
                  setFilterPriority('');
                }}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      <button
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-dark-700 flex items-center justify-between bg-gray-50 dark:bg-dark-800">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 disabled:opacity-50 text-gray-700 dark:text-gray-300"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 disabled:opacity-50 text-gray-700 dark:text-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
