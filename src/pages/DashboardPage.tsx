import { 
  Users, Briefcase, DollarSign, TrendingUp, 
  Clock, CheckCircle, ArrowUpRight 
} from 'lucide-react';

const stats = [
  { label: 'Total Leads', value: '24', change: '+3', icon: Users, color: 'from-blue-500 to-blue-600' },
  { label: 'Qualified', value: '12', change: '+2', icon: CheckCircle, color: 'from-green-500 to-green-600' },
  { label: 'Deals Won', value: '8', change: '+1', icon: Briefcase, color: 'from-purple-500 to-purple-600' },
  { label: 'Pipeline Value', value: 'Rp 450M', change: '+Rp 50M', icon: TrendingUp, color: 'from-amber-500 to-amber-600' },
  { label: 'Revenue', value: 'Rp 180M', change: '+Rp 30M', icon: DollarSign, color: 'from-emerald-500 to-emerald-600' },
  { label: 'Follow-ups Today', value: '5', change: '', icon: Clock, color: 'from-cyan-500 to-cyan-600' },
];

const pipelineStages = [
  { stage: 'Prospect', count: 8, color: 'bg-gray-400 dark:bg-gray-500' },
  { stage: 'Contacted', count: 6, color: 'bg-blue-400 dark:bg-blue-500' },
  { stage: 'Responded', count: 4, color: 'bg-blue-500 dark:bg-blue-400' },
  { stage: 'Qualified', count: 3, color: 'bg-green-400 dark:bg-green-500' },
  { stage: 'Meeting', count: 2, color: 'bg-purple-400 dark:bg-purple-500' },
  { stage: 'Proposal', count: 2, color: 'bg-amber-400 dark:bg-amber-500' },
  { stage: 'Won', count: 1, color: 'bg-accent-teal' },
];

const upcomingActions = [
  { type: 'Follow-up', title: 'PT Maju Jaya - Proposal review', date: 'Today, 2:00 PM', status: 'urgent' },
  { type: 'Meeting', title: 'StartupHub - Discovery call', date: 'Today, 4:00 PM', status: 'normal' },
  { type: 'Deadline', title: 'UMKM Bakery - Website delivery', date: 'Tomorrow', status: 'warning' },
  { type: 'Follow-up', title: 'Kampus Tech - After seminar', date: 'Aug 28', status: 'normal' },
  { type: 'Payment', title: 'PT Sejahtera - DP due', date: 'Aug 30', status: 'warning' },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Business overview and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card p-4 hover:shadow-md dark:hover:shadow-dark-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`bg-gradient-to-br ${stat.color} p-2.5 rounded-xl shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                </div>
                {stat.change && (
                  <span className="text-sm font-medium text-accent-green">{stat.change}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Chart */}
        <div className="lg:col-span-2 card p-5">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sales Pipeline</h2>
          <div className="space-y-3">
            {pipelineStages.map((item) => (
              <div key={item.stage} className="flex items-center gap-4">
                <span className="w-24 text-sm text-gray-600 dark:text-gray-400">{item.stage}</span>
                <div className="flex-1 bg-gray-100 dark:bg-dark-900 rounded-full h-6 overflow-hidden">
                  <div 
                    className={`${item.color} h-full rounded-full transition-all`}
                    style={{ width: `${(item.count / 8) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-sm font-medium text-gray-900 dark:text-white text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Actions */}
        <div className="card p-5">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Upcoming Actions</h2>
          <div className="space-y-3">
            {upcomingActions.map((action, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors cursor-pointer">
                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                  action.status === 'urgent' ? 'bg-red-500' :
                  action.status === 'warning' ? 'bg-amber-500' : 'bg-accent-teal'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{action.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{action.type} · {action.date}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <div className="card p-5">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Revenue Overview</h2>
          <div className="h-48 flex items-end justify-between gap-2">
            {[65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88, 92].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className="w-full bg-gradient-to-t from-accent-teal to-accent-green rounded-t opacity-80 hover:opacity-100 transition-opacity"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources */}
        <div className="card p-5">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Lead Sources</h2>
          <div className="space-y-4">
            {[
              { source: 'Instagram', count: 10, percentage: 42, color: 'from-pink-500 to-purple-500' },
              { source: 'WhatsApp', count: 6, percentage: 25, color: 'from-green-500 to-green-600' },
              { source: 'Referral', count: 4, percentage: 17, color: 'from-blue-500 to-blue-600' },
              { source: 'Website', count: 2, percentage: 8, color: 'from-amber-500 to-amber-600' },
              { source: 'Other', count: 2, percentage: 8, color: 'from-gray-400 to-gray-500' },
            ].map((item) => (
              <div key={item.source} className="flex items-center gap-4">
                <span className="w-24 text-sm text-gray-600 dark:text-gray-400">{item.source}</span>
                <div className="flex-1 bg-gray-100 dark:bg-dark-900 rounded-full h-4 overflow-hidden">
                  <div 
                    className={`bg-gradient-to-r ${item.color} h-full rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="w-12 text-sm font-medium text-gray-900 dark:text-white text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
