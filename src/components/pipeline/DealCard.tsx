import {
  User,
  CalendarDots,
  Flag,
  FileText,
  Receipt,
  Wrench,
  Star,
  CaretRight,
} from '@phosphor-icons/react';
import type { Deal } from '../../types';

interface DealCardProps {
  deal: Deal;
  onClick: () => void;
  onToggleMaintenance?: (dealId: string, active: boolean) => void;
}

const typeBadgeColor: Record<string, string> = {
  'Paid Outbound': 'bg-[#FFD043]/15 text-[#FFD043] border border-[#FFD043]/20',
  'Paid Inbound': 'bg-[#4CD7E0]/15 text-[#4CD7E0] border border-[#4CD7E0]/20',
  'Kerjasama-Engagement': 'bg-[#A89AE8]/15 text-[#A89AE8] border border-[#A89AE8]/20',
};

const invoiceStatusColor: Record<string, string> = {
  'Belum ditagih': 'bg-white/8 text-white/50 border border-white/10',
  Ditagih: 'bg-[#FFD043]/12 text-[#FFD043] border border-[#FFD043]/20',
  Lunas: 'bg-[#D8FF3F]/12 text-[#D8FF3F] border border-[#D8FF3F]/20',
};

const testimonialStatusColor: Record<string, string> = {
  'Belum diminta': 'bg-white/8 text-white/50 border border-white/10',
  Diminta: 'bg-[#FFD043]/12 text-[#FFD043] border border-[#FFD043]/20',
  Diterima: 'bg-[#D8FF3F]/12 text-[#D8FF3F] border border-[#D8FF3F]/20',
};

function formatCurrency(val: number) {
  if (val === 0) return '-';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val);
}

export function DealCard({ deal, onClick, onToggleMaintenance }: DealCardProps) {
  const isDeploy = deal.stage === 'Deploy';
  const isPaid = deal.tipe === 'Paid Outbound' || deal.tipe === 'Paid Inbound';

  function handleToggleMaintenance(e: React.MouseEvent) {
    e.stopPropagation();
    if (onToggleMaintenance && deal.maintenance) {
      onToggleMaintenance(deal.id, !deal.maintenance.active);
    }
  }

  return (
    <div
      onClick={onClick}
      className="bg-[#1C1E26]/70 border border-white/[0.06] rounded-2xl p-4 hover:bg-[#22242E]/80 hover:border-white/[0.12] transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <p className="text-[13px] font-bold text-white truncate leading-tight flex-1 mr-2">
          {deal.namaKlien}
        </p>
        <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${typeBadgeColor[deal.tipe]}`}>
          {deal.tipe === 'Kerjasama-Engagement' ? 'Collab' : deal.tipe.replace('Paid ', '')}
        </span>
      </div>

      {/* Value (Paid only) */}
      {isPaid && (
        <div className="mb-3">
          <p className="text-[13px] font-extrabold text-[#D8FF3F]">
            {formatCurrency(deal.estimasiValue)}
          </p>
        </div>
      )}

      {/* Meta info */}
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex items-center gap-2 text-[11px] text-white/60">
          <User size={13} weight="fill" className="text-white/40 flex-shrink-0" />
          <span className="truncate">{deal.pic}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-white/60">
          <CalendarDots size={13} weight="fill" className="text-white/40 flex-shrink-0" />
          <span className="truncate">{deal.deadline}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-white/60">
          <Flag size={13} weight="fill" className="text-[#FFD043]/60 flex-shrink-0" />
          <span className="truncate">{deal.nextAction}</span>
        </div>
      </div>

      {/* Deploy-stage extras */}
      {isDeploy && (
        <div className="border-t border-white/[0.06] pt-3 mt-1 flex flex-col gap-2.5">
          {/* Invoice (Paid only) */}
          {isPaid && deal.invoice && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-white/60">
                <Receipt size={13} weight="fill" className="text-[#FFD043]/70 flex-shrink-0" />
                <span className="font-medium">{formatCurrency(deal.invoice.nominal)}</span>
              </div>
              <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${invoiceStatusColor[deal.invoice.status]}`}>
                {deal.invoice.status}
              </span>
            </div>
          )}

          {/* Maintenance - interactive toggle */}
          {deal.maintenance && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-white/60">
                <Wrench size={13} weight="fill" className="text-[#4CD7E0]/70 flex-shrink-0" />
                <span>Maintenance</span>
              </div>
              <button
                onClick={handleToggleMaintenance}
                className="flex items-center gap-2 cursor-pointer py-1 px-1 -mr-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span className="text-[10px] font-medium text-white/50">
                  {deal.maintenance.active ? 'On' : 'Off'}
                </span>
                <span
                  className={`w-8 h-[18px] rounded-full flex items-center transition-colors px-0.5 ${
                    deal.maintenance.active ? 'bg-[#D8FF3F]' : 'bg-white/15'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full bg-white shadow transition-transform ${
                      deal.maintenance.active ? 'translate-x-[14px]' : 'translate-x-0'
                    }`}
                  />
                </span>
              </button>
            </div>
          )}

          {/* Testimonial */}
          {deal.testimonial && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-white/60">
                <Star size={13} weight="fill" className="text-[#A89AE8]/70 flex-shrink-0" />
                <span>Testimoni</span>
              </div>
              <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${testimonialStatusColor[deal.testimonial.status]}`}>
                {deal.testimonial.status}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Brief file indicator */}
      {deal.briefFile && (
        <div className="flex items-center gap-2 mt-3 text-[10px] text-white/35">
          <FileText size={11} weight="fill" className="flex-shrink-0" />
          <span>Brief tersedia</span>
        </div>
      )}

      {/* Click hint */}
      <div className="flex items-center justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CaretRight size={12} className="text-white/25" />
      </div>
    </div>
  );
}
