import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { WORK_STAGES, WORK_TYPES } from '../../types';
import type { Work, WorkType } from '../../types';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

const todayIso = () => new Date().toISOString().slice(0, 10);

const emptyForm = {
  name: '',
  type: 'Paid Outbound' as WorkType,
  partner: '',
  pic: '',
  value: '',
  startDate: '',
  deadline: '',
  notes: '',
};

type WorkFormValues = typeof emptyForm;

function valuesFromWork(work: Work): WorkFormValues {
  return {
    name: work.name,
    type: work.type,
    partner: work.partner,
    pic: work.pic,
    value: work.value > 0 ? String(work.value) : '',
    startDate: work.startDate,
    deadline: work.deadline,
    notes: work.notes,
  };
}

interface WorkFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (work: Work) => void;
  initial?: Work;
}

export function WorkFormModal({ open, onClose, onSubmit, initial }: WorkFormModalProps) {
  const [form, setForm] = useState<WorkFormValues>(() =>
    initial ? valuesFromWork(initial) : emptyForm
  );
  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setForm(initial ? valuesFromWork(initial) : emptyForm);
  }

  const setField =
    (key: keyof WorkFormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = () => {
    onSubmit({
      ...(initial ?? {
        id: '',
        teamMembers: [],
        benefit: '',
        driveLink: '',
        createdAt: todayIso(),
      }),
      name: form.name.trim(),
      type: form.type,
      partner: form.partner.trim(),
      pic: form.pic.trim(),
      value: form.type === 'Collab' ? 0 : Number(form.value) || 0,
      startDate: form.startDate,
      deadline: form.deadline,
      stage: initial ? initial.stage : WORK_STAGES[form.type][0],
      notes: form.notes.trim(),
      updatedAt: todayIso(),
    });
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={onClose} title={initial ? 'Ubah Work' : 'Work Baru'}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-4"
      >
        <div className="space-y-1.5">
          <label htmlFor="work-name" className="block text-sm font-bold text-foreground">Nama Work</label>
          <input id="work-name" type="text" required placeholder="Contoh: PT Maju Jaya - Company Profile" className="input" value={form.name} onChange={setField('name')} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="work-type" className="block text-sm font-bold text-foreground">Tipe</label>
            <select id="work-type" className="select input" value={form.type} onChange={setField('type')}>
              {WORK_TYPES.map((t) => (
                <option key={t} value={t} className="bg-card">{t}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="work-partner" className="block text-sm font-bold text-foreground">Partner</label>
            <input id="work-partner" type="text" required placeholder="Nama partner/klien" className="input" value={form.partner} onChange={setField('partner')} />
          </div>
        </div>
        <div className={form.type === 'Collab' ? '' : 'grid grid-cols-2 gap-3'}>
          <div className="space-y-1.5">
            <label htmlFor="work-pic" className="block text-sm font-bold text-foreground">PIC</label>
            <input id="work-pic" type="text" required placeholder="Nama PIC" className="input" value={form.pic} onChange={setField('pic')} />
          </div>
          {form.type !== 'Collab' && (
            <div className="space-y-1.5">
              <label htmlFor="work-value" className="block text-sm font-bold text-foreground">Nilai (Rp)</label>
              <input id="work-value" type="number" min={0} step={1000000} placeholder="35000000" className="input tabular-nums" value={form.value} onChange={setField('value')} />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="work-start" className="block text-sm font-bold text-foreground">Tanggal Mulai</label>
            <input id="work-start" type="date" className="input" value={form.startDate} onChange={setField('startDate')} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="work-deadline" className="block text-sm font-bold text-foreground">Deadline</label>
            <input id="work-deadline" type="date" required className="input" value={form.deadline} onChange={setField('deadline')} />
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="work-notes" className="block text-sm font-bold text-foreground">Catatan</label>
          <textarea id="work-notes" rows={3} placeholder="Catatan tambahan..." className="input !rounded-xl !h-auto py-2" value={form.notes} onChange={setField('notes')} />
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" size="sm" onClick={onClose}>Batal</Button>
          <Button type="submit" size="sm">Simpan</Button>
        </div>
      </form>
    </Modal>
  );
}
