import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
} from '../ui/sheet';
import { Button } from '../ui/Button';
import {
  Pencil,
  Check,
  X,
  User,
  FileText,
  Receipt,
  Wrench,
  Star,
  Clock,
  Note,
  ArrowSquareOut,
  CaretDown,
} from '@phosphor-icons/react';
import type { Deal, DealStage, InvoiceStatus, TestimonialStatus } from '../../types';
import { DEAL_STAGES } from '../../types';

interface DealDrawerProps {
  deal: Deal | null;
  open: boolean;
  onClose: () => void;
  onUpdate?: (dealId: string, updates: Partial<Deal>) => void;
}

const typeBadgeColor: Record<string, string> = {
  'Paid Outbound': 'bg-[#FFD043]/15 text-[#FFD043] border border-[#FFD043]/25',
  'Paid Inbound': 'bg-[#4CD7E0]/15 text-[#4CD7E0] border border-[#4CD7E0]/25',
  'Kerjasama-Engagement': 'bg-[#A89AE8]/15 text-[#A89AE8] border border-[#A89AE8]/25',
};

const stageBadgeColor: Record<string, string> = {
  Prospecting: 'bg-[#A89AE8]/12 text-[#A89AE8] border border-[#A89AE8]/25',
  'Approval Internal': 'bg-[#FFD043]/12 text-[#FFD043] border border-[#FFD043]/25',
  Development: 'bg-[#4CD7E0]/12 text-[#4CD7E0] border border-[#4CD7E0]/25',
  Review: 'bg-[#FF8A3D]/12 text-[#FF8A3D] border border-[#FF8A3D]/25',
  Deploy: 'bg-[#D8FF3F]/12 text-[#D8FF3F] border border-[#D8FF3F]/25',
};

const invoiceStatusColor: Record<string, string> = {
  'Belum ditagih': 'bg-white/8 text-white/50 border border-white/10',
  Ditagih: 'bg-[#FFD043]/12 text-[#FFD043] border border-[#FFD043]/25',
  Lunas: 'bg-[#D8FF3F]/12 text-[#D8FF3F] border border-[#D8FF3F]/25',
};

const testimonialStatusColor: Record<string, string> = {
  'Belum diminta': 'bg-white/8 text-white/50 border border-white/10',
  Diminta: 'bg-[#FFD043]/12 text-[#FFD043] border border-[#FFD043]/25',
  Diterima: 'bg-[#D8FF3F]/12 text-[#D8FF3F] border border-[#D8FF3F]/25',
};

function formatCurrency(val: number) {
  if (val === 0) return '-';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val);
}

export function DealDrawer({ deal, open, onClose, onUpdate }: DealDrawerProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    namaKlien: '',
    pic: '',
    deadline: '',
    nextAction: '',
    estimasiValue: 0,
    catatan: '',
    stage: '' as DealStage,
    briefFile: '',
    invoiceNominal: 0,
    invoiceStatus: '' as InvoiceStatus,
    invoiceJatuhTempo: '',
    maintenanceActive: false,
    maintenanceCatatan: '',
    testimonialStatus: '' as TestimonialStatus,
    testimonialLink: '',
  });

  useEffect(() => {
    if (deal) {
      setForm({
        namaKlien: deal.namaKlien,
        pic: deal.pic,
        deadline: deal.deadline,
        nextAction: deal.nextAction,
        estimasiValue: deal.estimasiValue,
        catatan: deal.catatan,
        stage: deal.stage,
        briefFile: deal.briefFile || '',
        invoiceNominal: deal.invoice?.nominal || 0,
        invoiceStatus: deal.invoice?.status || 'Belum ditagih',
        invoiceJatuhTempo: deal.invoice?.jatuhTempo || '',
        maintenanceActive: deal.maintenance?.active || false,
        maintenanceCatatan: deal.maintenance?.catatanRequest || '',
        testimonialStatus: deal.testimonial?.status || 'Belum diminta',
        testimonialLink: deal.testimonial?.linkOrText || '',
      });
      setEditing(false);
    }
  }, [deal]);

  if (!deal) return null;

  const isPaid = deal.tipe === 'Paid Outbound' || deal.tipe === 'Paid Inbound';
  const isDeploy = deal.stage === 'Deploy';

  function handleSave() {
    if (!onUpdate || !deal) return;
    const updates: Partial<Deal> = {
      namaKlien: form.namaKlien,
      pic: form.pic,
      deadline: form.deadline,
      nextAction: form.nextAction,
      estimasiValue: form.estimasiValue,
      catatan: form.catatan,
      stage: form.stage,
      briefFile: form.briefFile || undefined,
    };
    if (isDeploy) {
      if (isPaid) {
        updates.invoice = {
          nominal: form.invoiceNominal,
          status: form.invoiceStatus,
          jatuhTempo: form.invoiceJatuhTempo,
        };
      }
      updates.maintenance = {
        active: form.maintenanceActive,
        catatanRequest: form.maintenanceCatatan,
      };
      updates.testimonial = {
        status: form.testimonialStatus,
        linkOrText: form.testimonialLink,
      };
    }
    onUpdate(deal.id, updates);
    setEditing(false);
  }

  function handleCancel() {
    if (!deal) return;
    setForm({
      namaKlien: deal.namaKlien,
      pic: deal.pic,
      deadline: deal.deadline,
      nextAction: deal.nextAction,
      estimasiValue: deal.estimasiValue,
      catatan: deal.catatan,
      stage: deal.stage,
      briefFile: deal.briefFile || '',
      invoiceNominal: deal.invoice?.nominal || 0,
      invoiceStatus: deal.invoice?.status || 'Belum ditagih',
      invoiceJatuhTempo: deal.invoice?.jatuhTempo || '',
      maintenanceActive: deal.maintenance?.active || false,
      maintenanceCatatan: deal.maintenance?.catatanRequest || '',
      testimonialStatus: deal.testimonial?.status || 'Belum diminta',
      testimonialLink: deal.testimonial?.linkOrText || '',
    });
    setEditing(false);
  }

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="sm:max-w-md bg-[#121318] border-l border-white/[0.06] !p-0">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#121318]/95 backdrop-blur-xl border-b border-white/[0.06] px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              {editing ? (
                <input
                  value={form.namaKlien}
                  onChange={(e) => setForm({ ...form, namaKlien: e.target.value })}
                  className="input !h-9 !text-[15px] font-bold !bg-white/5 flex-1 min-w-0"
                />
              ) : (
                <h2 className="text-[15px] font-bold text-white truncate">{deal.namaKlien}</h2>
              )}
              <span className={`text-[9px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${typeBadgeColor[deal.tipe]}`}>
                {deal.tipe}
              </span>
            </div>
            {onUpdate && (
              <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                {editing ? (
                  <>
                    <Button variant="ghost" size="icon-sm" onClick={handleSave} className="text-[#D8FF3F] hover:bg-[#D8FF3F]/10 rounded-xl">
                      <Check size={15} weight="bold" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" onClick={handleCancel} className="text-[#FF5A5A] hover:bg-[#FF5A5A]/10 rounded-xl">
                      <X size={15} weight="bold" />
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" size="icon-sm" onClick={() => setEditing(true)} className="text-white/40 hover:text-white hover:bg-white/5 rounded-xl">
                    <Pencil size={14} weight="bold" />
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-white/35">
            <span className="font-mono">{deal.id}</span>
            <span className="text-white/15">·</span>
            <span>Update {deal.updatedAt}</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-5 px-5 py-4 overflow-y-auto max-h-[calc(100vh-110px)]">
          {/* ── Info Dasar ── */}
          <Section icon={<User size={14} weight="fill" className="text-[#D8FF3F]/70" />} title="Info Dasar">
            {editing ? (
              <div className="flex flex-col gap-3">
                <EditField label="PIC" value={form.pic} onChange={(v) => setForm({ ...form, pic: v })} />
                <EditField label="Deadline" value={form.deadline} onChange={(v) => setForm({ ...form, deadline: v })} type="date" />
                <EditField label="Next Action" value={form.nextAction} onChange={(v) => setForm({ ...form, nextAction: v })} />
                {isPaid && (
                  <EditField label="Estimasi Value" value={String(form.estimasiValue)} onChange={(v) => setForm({ ...form, estimasiValue: Number(v) || 0 })} type="number" />
                )}
                <SelectField
                  label="Stage"
                  value={form.stage}
                  onChange={(v) => setForm({ ...form, stage: v as DealStage })}
                  options={DEAL_STAGES.map((s) => ({ value: s, label: s }))}
                />
              </div>
            ) : (
              <div className="flex flex-col">
                <InfoRow label="PIC" value={deal.pic} />
                <InfoRow label="Deadline" value={deal.deadline} divider />
                <InfoRow label="Next Action" value={deal.nextAction} divider />
                {isPaid && <InfoRow label="Estimasi Value" value={formatCurrency(deal.estimasiValue)} highlight divider />}
                <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.04]">
                  <span className="text-xs text-white/45">Stage</span>
                  <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${stageBadgeColor[deal.stage]}`}>
                    {deal.stage}
                  </span>
                </div>
              </div>
            )}
          </Section>

          {/* ── Catatan ── */}
          <Section icon={<Note size={14} weight="fill" className="text-[#FFD043]/70" />} title="Catatan">
            {editing ? (
              <textarea
                value={form.catatan}
                onChange={(e) => setForm({ ...form, catatan: e.target.value })}
                className="input !h-20 !py-3 resize-none text-sm leading-relaxed"
                placeholder="Catatan deal..."
              />
            ) : (
              <p className="text-[13px] text-white/55 leading-relaxed">{deal.catatan || <span className="text-white/25 italic">Tidak ada catatan</span>}</p>
            )}
          </Section>

          {/* ── File Brief ── */}
          <Section icon={<FileText size={14} weight="fill" className="text-[#4CD7E0]/70" />} title="File Brief">
            {editing ? (
              <EditField label="Link" value={form.briefFile} onChange={(v) => setForm({ ...form, briefFile: v })} placeholder="https://drive.google.com/..." />
            ) : deal.briefFile ? (
              <a href={deal.briefFile} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] text-[#4CD7E0] hover:text-[#4CD7E0]/80 transition-colors group/link py-1">
                <div className="w-9 h-9 rounded-xl bg-[#4CD7E0]/10 flex items-center justify-center flex-shrink-0 group-hover/link:bg-[#4CD7E0]/15 transition-colors">
                  <ArrowSquareOut size={15} weight="bold" className="text-[#4CD7E0]" />
                </div>
                <span className="group-hover/link:underline">Buka Google Drive</span>
              </a>
            ) : (
              <p className="text-xs text-white/25 italic py-1">Tidak ada file brief</p>
            )}
          </Section>

          {/* ── Deploy Extras ── */}
          {isDeploy && (
            <>
              {/* Invoice */}
              {isPaid && (
                <Section icon={<Receipt size={14} weight="fill" className="text-[#FFD043]/70" />} title="Invoice">
                  {editing ? (
                    <div className="flex flex-col gap-3">
                      <EditField label="Nominal" value={String(form.invoiceNominal)} onChange={(v) => setForm({ ...form, invoiceNominal: Number(v) || 0 })} type="number" />
                      <EditField label="Jatuh Tempo" value={form.invoiceJatuhTempo} onChange={(v) => setForm({ ...form, invoiceJatuhTempo: v })} type="date" />
                      <SelectField
                        label="Status"
                        value={form.invoiceStatus}
                        onChange={(v) => setForm({ ...form, invoiceStatus: v as InvoiceStatus })}
                        options={[
                          { value: 'Belum ditagih', label: 'Belum ditagih' },
                          { value: 'Ditagih', label: 'Ditagih' },
                          { value: 'Lunas', label: 'Lunas' },
                        ]}
                      />
                    </div>
                  ) : deal.invoice ? (
                    <div className="flex flex-col">
                      <InfoRow label="Nominal" value={formatCurrency(deal.invoice.nominal)} />
                      <InfoRow label="Jatuh Tempo" value={deal.invoice.jatuhTempo} divider />
                      <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.04]">
                        <span className="text-xs text-white/45">Status</span>
                        <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${invoiceStatusColor[deal.invoice.status]}`}>
                          {deal.invoice.status}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-white/25 italic py-1">Belum ada invoice</p>
                  )}
                </Section>
              )}

              {/* Maintenance */}
              <Section icon={<Wrench size={14} weight="fill" className="text-[#4CD7E0]/70" />} title="Maintenance">
                {editing ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/45">Status</span>
                      <button type="button" onClick={() => setForm({ ...form, maintenanceActive: !form.maintenanceActive })} className="flex items-center gap-2.5 cursor-pointer py-1 px-1 -mr-1 rounded-lg hover:bg-white/5 transition-colors">
                        <span className="text-xs font-medium text-white/50">{form.maintenanceActive ? 'Aktif' : 'Non-aktif'}</span>
                        <span className={`w-10 h-[22px] rounded-full flex items-center transition-colors px-0.5 ${form.maintenanceActive ? 'bg-[#D8FF3F]' : 'bg-white/12'}`}>
                          <span className={`w-[18px] h-[18px] rounded-full bg-white shadow-md transition-transform ${form.maintenanceActive ? 'translate-x-[18px]' : 'translate-x-0'}`} />
                        </span>
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-white/45">Catatan Request</span>
                      <textarea
                        value={form.maintenanceCatatan}
                        onChange={(e) => setForm({ ...form, maintenanceCatatan: e.target.value })}
                        className="input !h-16 !py-3 resize-none text-sm"
                        placeholder="Catatan maintenance..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/45">Status</span>
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-medium text-white/50">{deal.maintenance?.active ? 'Aktif' : 'Non-aktif'}</span>
                        <span className={`w-9 h-5 rounded-full flex items-center transition-colors px-0.5 ${deal.maintenance?.active ? 'bg-[#D8FF3F]' : 'bg-white/12'}`}>
                          <span className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${deal.maintenance?.active ? 'translate-x-[16px]' : 'translate-x-0'}`} />
                        </span>
                      </div>
                    </div>
                    {deal.maintenance?.catatanRequest && (
                      <p className="text-xs text-white/40 leading-relaxed bg-white/[0.03] rounded-xl px-3.5 py-2.5">{deal.maintenance.catatanRequest}</p>
                    )}
                  </div>
                )}
              </Section>

              {/* Testimoni */}
              <Section icon={<Star size={14} weight="fill" className="text-[#A89AE8]/70" />} title="Testimoni">
                {editing ? (
                  <div className="flex flex-col gap-3">
                    <SelectField
                      label="Status"
                      value={form.testimonialStatus}
                      onChange={(v) => setForm({ ...form, testimonialStatus: v as TestimonialStatus })}
                      options={[
                        { value: 'Belum diminta', label: 'Belum diminta' },
                        { value: 'Diminta', label: 'Diminta' },
                        { value: 'Diterima', label: 'Diterima' },
                      ]}
                    />
                    <EditField label="Link / Teks" value={form.testimonialLink} onChange={(v) => setForm({ ...form, testimonialLink: v })} placeholder="URL atau teks testimoni..." />
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-xs text-white/45">Status</span>
                      <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${testimonialStatusColor[deal.testimonial?.status || 'Belum diminta']}`}>
                        {deal.testimonial?.status || 'Belum diminta'}
                      </span>
                    </div>
                    {deal.testimonial?.linkOrText && (
                      <div className="px-4 pb-3 border-t border-white/[0.04] pt-3">
                        <p className="text-xs text-white/45 leading-relaxed">{deal.testimonial.linkOrText}</p>
                      </div>
                    )}
                  </div>
                )}
              </Section>
            </>
          )}

          {/* ── History Log ── */}
          <Section icon={<Clock size={14} weight="fill" className="text-[#FF8A3D]/70" />} title="History Log">
            {deal.activities.length === 0 ? (
              <p className="text-xs text-white/25 italic py-1">Belum ada aktivitas</p>
            ) : (
              <div className="flex flex-col">
                {deal.activities.map((act, i) => (
                  <div key={act.id} className={`flex gap-3 px-4 py-3 ${i < deal.activities.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                    <div className="flex flex-col items-center flex-shrink-0 pt-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      {i < deal.activities.length - 1 && <div className="w-px flex-1 bg-white/[0.06] mt-1.5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[13px] font-semibold text-white/65">{act.action}</span>
                        <span className="text-[11px] text-white/25 font-mono flex-shrink-0">{act.timestamp}</span>
                      </div>
                      <p className="text-xs text-white/40 mt-1 leading-relaxed">{act.details}</p>
                      <p className="text-[11px] text-white/25 mt-1">oleh {act.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">{title}</span>
      </div>
      <div className="bg-white/[0.025] rounded-2xl border border-white/[0.05] overflow-hidden px-4 py-3">
        {children}
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  highlight = false,
  divider = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  divider?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between px-4 py-3 ${divider ? 'border-t border-white/[0.04]' : ''}`}>
      <span className="text-xs text-white/45">{label}</span>
      <span className={`text-[13px] text-right ${highlight ? 'font-bold text-[#D8FF3F]' : 'text-white/65 font-medium'}`}>
        {value}
      </span>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className="text-xs text-white/45 flex-shrink-0">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input select !w-auto !h-9 !text-sm !pr-9"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <CaretDown size={14} weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
      </div>
    </div>
  );
}

function EditField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className="text-xs text-white/45 flex-shrink-0">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input !h-9 !text-sm text-right"
      />
    </div>
  );
}
