import { useState } from 'react';
import { DollarSign, TrendingUp, Clock, Plus } from 'lucide-react';
import type { Payment } from '../types';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

const mockPayments: Payment[] = [
  { id: 'PAY-001', projectId: 'PRJ-001', clientId: 'CLI-001', type: 'DP', amount: 25000000, dueDate: '2026-07-25', paidDate: '2026-07-24', status: 'Paid', paymentMethod: 'Bank Transfer', notes: 'DP via BCA' },
  { id: 'PAY-002', projectId: 'PRJ-001', clientId: 'CLI-001', type: 'Milestone', amount: 35000000, dueDate: '2026-08-30', paidDate: '', status: 'Pending', paymentMethod: '', notes: 'Milestone 1' },
  { id: 'PAY-003', projectId: 'PRJ-002', clientId: 'CLI-002', type: 'DP', amount: 7500000, dueDate: '2026-08-05', paidDate: '2026-08-04', status: 'Paid', paymentMethod: 'E-Wallet', notes: 'DP via GoPay' },
];

const statusBadge: Record<string, string> = {
  Paid: 'badge-lime', Pending: 'badge-gold', Partial: 'badge-orange', Overdue: 'badge-coral', Cancelled: 'badge-gray',
};

const totalReceived = mockPayments.filter((p) => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);
const totalOutstanding = mockPayments.filter((p) => p.status === 'Pending').reduce((s, p) => s + p.amount, 0);

export function PaymentsPage() {
  const [showNewPayment, setShowNewPayment] = useState(false);

  return (
    <div className="space-y-4 max-w-[1400px]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-xl font-extrabold text-foreground">Payments</h1>
        <Button variant="primary" size="sm" onClick={() => setShowNewPayment(true)}>
          <Plus className="w-4 h-4 mr-1" /> New Payment
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="card glass p-4">
          <div className="flex items-center gap-2 mb-2"><DollarSign className="w-4 h-4 text-emerald-400" /><span className="text-[12px] text-dark-400">Received</span></div>
          <p className="text-xl font-extrabold text-foreground">Rp {(totalReceived / 1e6).toFixed(0)}jt</p>
        </div>
        <div className="card glass p-4">
          <div className="flex items-center gap-2 mb-2"><Clock className="w-4 h-4 text-gold" /><span className="text-[12px] text-dark-400">Outstanding</span></div>
          <p className="text-xl font-extrabold text-foreground">Rp {(totalOutstanding / 1e6).toFixed(0)}jt</p>
        </div>
        <div className="card glass p-4">
          <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4 text-orange-400" /><span className="text-[12px] text-dark-400">Avg Project</span></div>
          <p className="text-xl font-extrabold text-foreground">Rp {Math.round((totalReceived + totalOutstanding) / mockPayments.length / 1e6)}jt</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-t border-border">
              <th className="table-header">Type</th>
              <th className="table-header">Amount</th>
              <th className="table-header">Due Date</th>
              <th className="table-header">Paid Date</th>
              <th className="table-header">Status</th>
              <th className="table-header">Method</th>
            </tr>
          </thead>
          <tbody>
            {mockPayments.map((p) => (
              <tr key={p.id} className="table-row">
                <td className="table-cell font-semibold text-foreground">{p.type}</td>
                <td className="table-cell font-semibold text-foreground">Rp {(p.amount / 1e6).toFixed(0)}jt</td>
                <td className="table-cell text-dark-400">{p.dueDate}</td>
                <td className="table-cell text-dark-400">{p.paidDate || '—'}</td>
                <td className="table-cell"><span className={statusBadge[p.status]}>{p.status}</span></td>
                <td className="table-cell text-dark-300">{p.paymentMethod || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Payment Modal */}
      <Modal
        isOpen={showNewPayment}
        onClose={() => setShowNewPayment(false)}
        title="Record Payment"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setShowNewPayment(false)}>Cancel</Button>
            <Button size="sm">Save Payment</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Type</label>
              <select className="select" defaultValue="">
                <option value="" disabled className="bg-dark-800">Select type</option>
                {['DP', 'Milestone', 'Final Payment', 'Maintenance', 'Other'].map((t) => (
                  <option key={t} value={t} className="bg-dark-800">{t}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Amount (IDR)</label>
              <input type="number" placeholder="25000000" className="input" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Due Date</label>
              <input type="date" className="input" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Status</label>
              <select className="select" defaultValue="Pending">
                {['Pending', 'Partial', 'Paid', 'Overdue', 'Cancelled'].map((s) => (
                  <option key={s} value={s} className="bg-dark-800">{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Payment Method</label>
            <select className="select" defaultValue="">
              <option value="" disabled className="bg-dark-800">Select method</option>
              {['Bank Transfer', 'E-Wallet', 'Cash', 'Credit Card', 'Other'].map((m) => (
                <option key={m} value={m} className="bg-dark-800">{m}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Notes</label>
            <textarea rows={3} placeholder="Payment notes..." className="input !rounded-xl" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
