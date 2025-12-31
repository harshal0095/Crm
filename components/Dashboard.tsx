
import React from 'react';
import { 
  Users, 
  Target, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Lead, LeadStatus } from '../types';

const data = [
  { name: 'Mon', revenue: 4000, leads: 24 },
  { name: 'Tue', revenue: 3000, leads: 13 },
  { name: 'Wed', revenue: 2000, leads: 98 },
  { name: 'Thu', revenue: 2780, leads: 39 },
  { name: 'Fri', revenue: 1890, leads: 48 },
  { name: 'Sat', revenue: 2390, leads: 38 },
  { name: 'Sun', revenue: 3490, leads: 43 },
];

interface DashboardProps {
  leads: Lead[];
  onViewLead: (id: string) => void;
}

const KPICard: React.FC<{
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, isPositive, icon, color }) => (
  <div className="bg-white dark:bg-[#14161c] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all duration-300 group">
    <div className="flex items-start justify-between">
      <div className={`p-3 rounded-xl ${color} text-white transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-current/10`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-1 text-slate-800 dark:text-white">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ leads, onViewLead }) => {
  const activeDeals = leads.filter(l => l.status !== LeadStatus.WON && l.status !== LeadStatus.LOST).length;
  const totalRevenue = leads.filter(l => l.status === LeadStatus.WON).reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Sales Overview</h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome back, here's what's happening today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Leads" value={leads.length.toString()} change="+12.5%" isPositive={true} icon={<Users size={24} />} color="bg-blue-600" />
        <KPICard title="Active Deals" value={activeDeals.toString()} change="+3.2%" isPositive={true} icon={<Target size={24} />} color="bg-indigo-600" />
        <KPICard title="Revenue" value={`$${(totalRevenue / 1000).toFixed(1)}k`} change="-2.1%" isPositive={false} icon={<DollarSign size={24} />} color="bg-emerald-600" />
        <KPICard title="Conversion" value="18.2%" change="+4.8%" isPositive={true} icon={<TrendingUp size={24} />} color="bg-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#14161c] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Revenue Growth</h3>
              <p className="text-sm text-slate-500">Weekly performance insights</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1}/>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#14161c] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Activity</h3>
            <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium flex items-center gap-1 hover:underline">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4 flex-1">
            {leads.slice(0, 5).map((lead) => (
              <div key={lead.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group" onClick={() => onViewLead(lead.id)}>
                <img src={lead.avatar} alt={lead.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{lead.name}</p>
                  <p className="text-xs text-slate-500 truncate">{lead.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800 dark:text-white">${lead.value.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
