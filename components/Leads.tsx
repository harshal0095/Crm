
import React, { useState } from 'react';
import { 
  Filter, 
  Download, 
  Search, 
  Edit2, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Briefcase,
  Users
} from 'lucide-react';
import { Lead, LeadStatus } from '../types';

interface LeadsProps {
  leads: Lead[];
  onViewLead: (id: string) => void;
  viewMode?: 'Leads' | 'Customers';
}

const Leads: React.FC<LeadsProps> = ({ leads, onViewLead, viewMode = 'Leads' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case LeadStatus.NEW: return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20';
      case LeadStatus.CONTACTED: return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20';
      case LeadStatus.PROPOSAL: return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-1 ring-purple-500/20';
      case LeadStatus.WON: return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20';
      case LeadStatus.LOST: return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 ring-1 ring-slate-500/20';
    }
  };

  const filteredData = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Strict separation logic
    if (viewMode === 'Customers') {
      return matchesSearch && lead.status === LeadStatus.WON;
    } else {
      return matchesSearch && lead.status !== LeadStatus.WON;
    }
  });

  const title = viewMode === 'Customers' ? 'Active Customers' : 'Leads Management';
  const subtitle = viewMode === 'Customers' ? 'Focus on retention and account expansion' : 'Convert potential prospects into customers';
  const icon = viewMode === 'Customers' ? <Briefcase className="text-indigo-600" size={24}/> : <Users className="text-indigo-600" size={24}/>;

  return (
    <div className="p-6 md:p-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl hidden sm:block">
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{title}</h1>
            <p className="text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#14161c] border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Download size={18} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
            <UserPlus size={18} /> Add {viewMode === 'Customers' ? 'Account' : 'Lead'}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-white dark:bg-[#14161c] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder={`Search ${viewMode.toLowerCase()}...`} 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-none text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#14161c] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredData.map((lead) => (
                <tr 
                  key={lead.id} 
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group"
                  onClick={() => onViewLead(lead.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={lead.avatar} className="w-9 h-9 rounded-lg object-cover" alt="" />
                      <div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{lead.name}</div>
                        <div className="text-xs text-slate-500">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-slate-200">${lead.value.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{lead.assignedTo}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leads;
