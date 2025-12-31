
import React, { useState, useEffect } from 'react';
import {
  Bell,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';
import { MENU_ITEMS, MOCK_LEADS, MOCK_TASKS } from './constants';
import { ViewType, Lead, Task, LeadStatus } from './types';
import Dashboard from './components/Dashboard';
import Leads from './components/Leads';
import Deals from './components/Deals';
import Tasks from './components/Tasks';
import Reports from './components/Reports';
import CustomerProfile from './components/CustomerProfile';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('Dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  // App State
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  // Apply dark mode class to html element
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
  }, [isDarkMode]);

  const handleNavigate = (view: ViewType) => {
    setActiveView(view);
    setSelectedLeadId(null);
    setIsMobileMenuOpen(false);
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
  };

  const renderContent = () => {
    if (selectedLeadId) {
      return (
        <CustomerProfile
          leadId={selectedLeadId}
          leads={leads}
          onBack={() => setSelectedLeadId(null)}
        />
      );
    }

    switch (activeView) {
      case 'Dashboard':
        return <Dashboard leads={leads} onViewLead={setSelectedLeadId} />;
      case 'Leads':
        return <Leads leads={leads} onViewLead={setSelectedLeadId} viewMode="Leads" />;
      case 'Customers':
        return <Leads leads={leads} onViewLead={setSelectedLeadId} viewMode="Customers" />;
      case 'Deals':
        return <Deals leads={leads} onUpdateStatus={handleUpdateLeadStatus} />;
      case 'Tasks':
        return <Tasks tasks={tasks} setTasks={setTasks} />;
      case 'Reports':
        return <Reports />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard leads={leads} onViewLead={setSelectedLeadId} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#0b0c10] transition-colors duration-300">
      {/* Sidebar - Desktop */}
      <aside
        className={`hidden md:flex flex-col bg-white dark:bg-[#14161c] border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-30 ${isSidebarCollapsed ? 'w-20' : 'w-64'
          }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
              T
            </div>
            {!isSidebarCollapsed && (
              <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">Trinetra</span>
            )}
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id as ViewType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeView === item.id
                ? 'bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
            >
              <div className={`${activeView === item.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-200`}>
                {item.icon}
              </div>
              {!isSidebarCollapsed && <span className="text-sm">{item.label}</span>}
              {activeView === item.id && !isSidebarCollapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-[#14161c] z-50 transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">C</div>
            <span className="font-bold text-xl text-slate-800 dark:text-white">Trinetra </span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-500">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id as ViewType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeView === item.id
                ? 'bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-500 dark:text-slate-400'
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-20 bg-white/80 dark:bg-[#14161c]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <div className="relative max-w-md w-full hidden sm:block">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search everything..."
                className="w-full bg-slate-100 dark:bg-slate-800/50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-slate-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-300"
            >
              {isDarkMode ? <Sun className="text-amber-400" size={20} /> : <Moon className="text-slate-600" size={20} />}
            </button>
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#14161c]"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1"></div>
            <button className="flex items-center gap-3 p-1 pr-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
              <img src="https://picsum.photos/seed/admin/100/100" alt="Profile" className="w-9 h-9 rounded-lg object-cover ring-2 ring-transparent group-hover:ring-indigo-500/20 transition-all" />
              <div className="text-left hidden lg:block">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-tight">Harshal Panchal</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Admin</p>
              </div>
            </button>
            <button className="hidden md:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
              <Plus size={18} />
              <span>Add New</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#f8fafc] dark:bg-[#0b0c10]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
