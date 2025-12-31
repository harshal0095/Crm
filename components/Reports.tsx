
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';

const barData = [
  { month: 'Jan', deals: 45, revenue: 12000 },
  { month: 'Feb', deals: 52, revenue: 15000 },
  { month: 'Mar', deals: 48, revenue: 14000 },
  { month: 'Apr', deals: 61, revenue: 18000 },
  { month: 'May', deals: 55, revenue: 16500 },
  { month: 'Jun', deals: 67, revenue: 21000 },
];

const sourceData = [
  { name: 'Website', value: 400, color: '#6366f1' },
  { name: 'Referral', value: 300, color: '#10b981' },
  { name: 'LinkedIn', value: 200, color: '#f59e0b' },
  { name: 'Events', value: 100, color: '#8b5cf6' },
];

const Reports: React.FC = () => {
  return (
    <div className="p-6 md:p-8 space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Reports & Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400">Deep dive into your sales performance</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white dark:bg-[#14161c] border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors">
            Monthly Report
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-lg">
            Generate New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Conversion Rate', value: '24.5%', sub: '+2.1% from last month', icon: <TrendingUp size={20}/>, color: 'text-indigo-500' },
          { label: 'Customer Retention', value: '88.2%', sub: '+0.4% from last month', icon: <Users size={20}/>, color: 'text-emerald-500' },
          { label: 'Avg Deal Size', value: '$8.4k', sub: '-1.2% from last month', icon: <DollarSign size={20}/>, color: 'text-amber-500' },
          { label: 'Sales Velocity', value: '12 days', sub: '-2 days from last month', icon: <Target size={20}/>, color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#14161c] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className={`p-2 w-fit rounded-lg bg-slate-100 dark:bg-slate-800 ${stat.color} mb-4`}>
              {stat.icon}
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white dark:bg-[#14161c] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white">Monthly Sales Performance</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.1}/>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9', opacity: 0.1}}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sources Chart */}
        <div className="bg-white dark:bg-[#14161c] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white">Lead Source Distribution</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
