import { Plus, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { Payment, PaymentStatus, PaymentType } from '../types';

const mockPayments: Payment[] = [
  {
    id: 'PAY-2026-0001',
    projectId: 'PRJ-2026-0001',
    clientId: 'CLI-2026-0001',
    type: 'DP',
    amount: 25000000,
    dueDate: '2026-07-25',
    paidDate: '2026-07-24',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
    notes: 'DP received via BCA',
  },
  {
    id: 'PAY-2026-0002',
    projectId: 'PRJ-2026-0001',
    clientId: 'CLI-2026-0001',
    type: 'Milestone',
    amount: 30000000,
    dueDate: '2026-08-30',
    paidDate: '',
    status: 'Pending',
    paymentMethod: '',
    notes: 'Second milestone after design approval',
  },
  {
    id: 'PAY-2026-0003',
    projectId: 'PRJ-2026-0002',
    clientId: 'CLI-2026-0002',
    type: 'DP',
    amount: 15000000,
    dueDate: '2026-08-10',
    paidDate: '2026-08-09',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
    notes: 'DP received',
  },
];

const statusColors: Record<PaymentStatus, string> = {
  Pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  Partial: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  Paid: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  Overdue: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  Cancelled: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
};

const typeLabels: Record<PaymentType, string> = {
  DP: 'Down Payment',
  Milestone: 'Milestone',
  'Final Payment': 'Final Payment',
  Maintenance: 'Maintenance',
  Other: 'Other',
};

export function PaymentsPage() {
  const totalReceived = mockPayments
    .filter(p => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const totalOutstanding = mockPayments
    .filter(p => p.status !== 'Paid' && p.status !== 'Cancelled')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Payments</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track project payments</p>
        </div>
        <Button className="bg-gradient-to-r from-accent-teal to-accent-green hover:from-accent-teal/90 hover:to-accent-green/90 text-white border-0">
          <Plus className="w-4 h-4 mr-1.5" />
          Record Payment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-2.5 rounded-xl shadow-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Received</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">Rp {(totalReceived / 1000000).toFixed(0)}M</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2.5 rounded-xl shadow-lg">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Outstanding</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">Rp {(totalOutstanding / 1000000).toFixed(0)}M</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Project Value</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">Rp 65M</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Payment</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Due Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
            {mockPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{payment.id}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{payment.notes}</p>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{typeLabels[payment.type]}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  Rp {(payment.amount / 1000000).toFixed(0)}M
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  {new Date(payment.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-4 py-3">
                  <span className={`badge ${statusColors[payment.status]}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{payment.paymentMethod || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
