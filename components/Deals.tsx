
import React, { useState } from 'react';
import { MoreVertical, Plus, Clock, MessageSquare, CheckSquare, ListTodo, GripVertical } from 'lucide-react';
import { Lead, LeadStatus } from '../types';

const PIPELINE_STAGES = [
  { id: LeadStatus.NEW, label: 'New Lead', color: 'bg-blue-500' },
  { id: LeadStatus.CONTACTED, label: 'Contacted', color: 'bg-amber-500' },
  { id: LeadStatus.PROPOSAL, label: 'Proposal Sent', color: 'bg-purple-500' },
  { id: LeadStatus.WON, label: 'Won', color: 'bg-emerald-500' },
  { id: LeadStatus.LOST, label: 'Lost', color: 'bg-rose-500' },
];

interface DealsProps {
  leads: Lead[];
  onUpdateStatus: (id: string, status: LeadStatus) => void;
}

const DealCard: React.FC<{ lead: Lead, onDragStart: (e: React.DragEvent, id: string) => void }> = ({ lead, onDragStart }) => {
  const [showTasks, setShowTasks] = useState(false);
  
  return (
    <div 
      draggable
      onDragStart={(e) => onDragStart(e, lead.id)}
      className="bg-white dark:bg-[#1c1f26] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group relative"
    >
      <div className="absolute top-4 right-4 text-slate-300 dark:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical size={16} />
      </div>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <img src={lead.avatar} alt="" className="w-6 h-6 rounded-full" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{lead.source}</span>
        </div>
      </div>
      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{lead.name}</h4>
      <p className="text-lg font-bold text-slate-900 dark:text-white mb-2">${lead.value.toLocaleString()}</p>
      
      <div className="mb-3">
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowTasks(!showTasks); }}
          className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider mb-1 px-1.5 py-0.5 rounded transition-colors ${showTasks ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <ListTodo size={12} /> Pipeline Progress
        </button>
        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 w-[66%] transition-all"></div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex -space-x-2">
          <img src="https://picsum.photos/seed/a1/32/32" className="w-6 h-6 rounded-full border-2 border-white dark:border-[#1c1f26]" alt="" />
          <img src="https://picsum.photos/seed/a2/32/32" className="w-6 h-6 rounded-full border-2 border-white dark:border-[#1c1f26]" alt="" />
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span className="flex items-center gap-1 text-[10px] font-medium"><Clock size={12} /> 2d</span>
        </div>
      </div>
    </div>
  );
};

const Deals: React.FC<DealsProps> = ({ leads, onUpdateStatus }) => {
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('leadId', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    setDragOverColumn(status);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, newStatus: LeadStatus) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    if (leadId) {
      onUpdateStatus(leadId, newStatus);
    }
    setDragOverColumn(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 h-full flex flex-col animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Sales Pipeline</h1>
          <p className="text-slate-500 dark:text-slate-400">Drag deals to update their stage</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 shadow-lg active:scale-95">
          <Plus size={18} /> Add Deal
        </button>
      </div>

      <div className="flex-1 overflow-x-auto pb-6 -mx-6 md:-mx-8 px-6 md:px-8">
        <div className="flex gap-6 min-h-full">
          {PIPELINE_STAGES.map((stage) => (
            <div 
              key={stage.id} 
              onDragOver={(e) => handleDragOver(e, stage.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage.id)}
              className={`flex flex-col w-72 flex-shrink-0 transition-all rounded-2xl ${
                dragOverColumn === stage.id ? 'bg-indigo-50/50 dark:bg-indigo-900/10 ring-2 ring-indigo-500/50 scale-[1.02]' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4 p-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${stage.color}`}></div>
                  <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">{stage.label}</h3>
                  <span className="bg-slate-200 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded text-[10px] font-bold">
                    {leads.filter(l => l.status === stage.id).length}
                  </span>
                </div>
              </div>

              <div className="flex-1 bg-slate-100/50 dark:bg-slate-900/30 rounded-2xl p-3 space-y-3 custom-scrollbar overflow-y-auto border-2 border-transparent">
                {leads.filter(l => l.status === stage.id).map(lead => (
                  <DealCard key={lead.id} lead={lead} onDragStart={handleDragStart} />
                ))}
                {leads.filter(l => l.status === stage.id).length === 0 && (
                  <div className="h-24 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-400">
                    Drop here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deals;
