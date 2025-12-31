
import React from 'react';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Tag, 
  Calendar,
  MessageSquare,
  Video,
  FileText,
  Clock,
  MoreVertical
} from 'lucide-react';
import { Lead, LeadStatus } from '../types';

interface ProfileProps {
  leadId: string;
  leads: Lead[];
  onBack: () => void;
}

const ACTIVITIES = [
  { id: '1', type: 'Call', content: 'Discussed pricing and package options for the enterprise plan.', timestamp: '2 hours ago', user: 'Alex Rivers' },
  { id: '2', type: 'Email', content: 'Sent the revised proposal for review.', timestamp: 'Yesterday, 4:15 PM', user: 'Alex Rivers' },
  { id: '3', type: 'Meeting', content: 'Initial discovery call with the product team.', timestamp: '3 days ago', user: 'Sarah Miller' },
  { id: '4', type: 'Note', content: 'Client is specifically interested in API integrations and multi-user support.', timestamp: '5 days ago', user: 'Alex Rivers' },
];

const CustomerProfile: React.FC<ProfileProps> = ({ leadId, leads, onBack }) => {
  const lead = leads.find(l => l.id === leadId) || leads[0];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in slide-in-from-left-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium mb-2"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#14161c] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden shadow-sm group">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-10"></div>
            <img src={lead.avatar} className="w-24 h-24 rounded-2xl mx-auto border-4 border-white dark:border-[#14161c] object-cover relative z-10 shadow-lg" alt="" />
            <div className="mt-4 relative z-10">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">{lead.name}</h2>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  lead.status === LeadStatus.WON ? 'bg-emerald-500/10 text-emerald-500' : 'bg-indigo-500/10 text-indigo-500'
                }`}>
                  {lead.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-8">
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all">
                <Phone size={16} /> Call
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                <Mail size={16} /> Email
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#14161c] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400"><Mail size={18} /></div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Email</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{lead.email}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400"><Phone size={18} /></div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Phone</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{lead.phone}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#14161c] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="flex border-b border-slate-200 dark:border-slate-800 p-1">
              {['Activity', 'Notes', 'Files'].map((tab, i) => (
                <button 
                  key={tab} 
                  className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all ${
                    i === 0 ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6">
              <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                {ACTIVITIES.map((activity) => (
                  <div key={activity.id} className="relative pl-12">
                    <div className="absolute left-1.5 top-0 w-6 h-6 rounded-full bg-white dark:bg-[#14161c] border-2 border-indigo-500 z-10 flex items-center justify-center">
                       {activity.type === 'Call' && <Phone size={10} className="text-indigo-500" />}
                       {activity.type === 'Email' && <Mail size={10} className="text-indigo-500" />}
                       {activity.type === 'Meeting' && <Video size={10} className="text-indigo-500" />}
                       {activity.type === 'Note' && <FileText size={10} className="text-indigo-500" />}
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-800 dark:text-white">{activity.user}</span>
                          <span className="text-xs text-slate-400 font-medium">{activity.type}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock size={12}/> {activity.timestamp}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {activity.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
