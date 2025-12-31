
import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Flag,
  MoreVertical,
  Search,
  Trash2
} from 'lucide-react';
import { Task } from '../types';

interface TasksProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Tasks: React.FC<TasksProps> = ({ tasks, setTasks }) => {
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'completed'>('today');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-rose-500 bg-rose-500/10';
      case 'Medium': return 'text-amber-500 bg-amber-500/10';
      case 'Low': return 'text-emerald-500 bg-emerald-500/10';
      default: return 'text-slate-500 bg-slate-500/10';
    }
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'completed') return matchesSearch && t.completed;
    if (activeTab === 'today') return matchesSearch && !t.completed && (t.dueDate === '2023-11-20');
    return matchesSearch && !t.completed && (t.dueDate !== '2023-11-20');
  });

  return (
    <div className="p-6 md:p-8 space-y-6 animate-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">To-Do List</h1>
          <p className="text-slate-500 dark:text-slate-400">Keep track of your daily tasks</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg active:scale-95 flex items-center gap-2">
          <Plus size={18} /> New Task
        </button>
      </div>

      <div className="bg-white dark:bg-[#14161c] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          {(['today', 'upcoming', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-4 text-sm font-semibold capitalize transition-all border-b-2 relative ${
                activeTab === tab 
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/30 dark:bg-indigo-500/5' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab}
              <span className="ml-2 px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px]">
                {tasks.filter(t => {
                  if (tab === 'completed') return t.completed;
                  if (tab === 'today') return !t.completed && (t.dueDate === '2023-11-20');
                  return !t.completed && (t.dueDate !== '2023-11-20');
                }).length}
              </span>
            </button>
          ))}
        </div>

        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 rounded-xl border-none text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-slate-200"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 min-h-[300px]">
          {filteredTasks.length > 0 ? filteredTasks.map((task) => (
            <div key={task.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group flex items-start gap-4">
              <button 
                onClick={() => toggleTask(task.id)}
                className="mt-1 text-slate-400 hover:text-indigo-600 transition-all hover:scale-110"
              >
                {task.completed ? <CheckCircle2 className="text-emerald-500" size={20} /> : <Circle size={20} />}
              </button>
              <div className="flex-1">
                <h4 className={`text-sm font-semibold mb-1 transition-all ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-slate-200'}`}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {task.dueDate}</span>
                  <span className="flex items-center gap-1"><Flag size={14} /> {task.assignedTo}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <CheckCircle2 size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-medium">All clear here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
