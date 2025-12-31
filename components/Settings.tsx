
import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Globe, 
  Users, 
  CreditCard, 
  Mail, 
  Camera,
  Check,
  ChevronRight
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'workspace'>('profile');

  const SettingSection: React.FC<{ title: string; subtitle: string; children: React.ReactNode }> = ({ title, subtitle, children }) => (
    <div className="bg-white dark:bg-[#14161c] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-6">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  const Toggle: React.FC<{ enabled: boolean; onChange: () => void }> = ({ enabled, onChange }) => (
    <button 
      onClick={onChange}
      className={`w-11 h-6 flex items-center rounded-full transition-colors duration-200 focus:outline-none ${enabled ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your account settings and preferences</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {[
              { id: 'profile', label: 'My Profile', icon: <User size={18} /> },
              { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
              { id: 'security', label: 'Security', icon: <Shield size={18} /> },
              { id: 'workspace', label: 'Workspace', icon: <Globe size={18} /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                  activeTab === item.id 
                    ? 'bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 dark:text-indigo-400' 
                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <SettingSection title="Personal Information" subtitle="Update your personal details and how others see you.">
                <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                  <div className="relative group">
                    <img 
                      src="https://picsum.photos/seed/admin/200/200" 
                      alt="Avatar" 
                      className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-50 dark:ring-slate-800"
                    />
                    <button className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:scale-110 transition-transform">
                      <Camera size={16} />
                    </button>
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">First Name</label>
                        <input type="text" defaultValue="Harshal" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-slate-200" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Last Name</label>
                        <input type="text" defaultValue="Panchal" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-slate-200" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                      <input type="email" defaultValue="harshal.panchal@crm.com" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-slate-200" />
                    </div>
                  </div>
                </div>
              </SettingSection>

              <SettingSection title="Biography" subtitle="Brief description for your profile.">
                <textarea 
                  rows={4}
                  placeholder="Tell us a bit about yourself..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-slate-200 resize-none"
                  defaultValue="Senior CRM Specialist with over 8 years of experience in sales automation and lead management optimization."
                ></textarea>
              </SettingSection>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <SettingSection title="Notification Preferences" subtitle="Control when and how you receive updates.">
                <div className="space-y-6">
                  {[
                    { id: 'leads', title: 'New Lead Alerts', desc: 'Get notified when a new lead is assigned to you.' },
                    { id: 'deals', title: 'Deal Progress', desc: 'Receive updates when a deal moves to a new stage.' },
                    { id: 'tasks', title: 'Task Reminders', desc: 'Get reminded about upcoming and overdue tasks.' },
                    { id: 'weekly', title: 'Weekly Reports', desc: 'Receive a summary of your performance every Monday.' },
                  ].map((item, idx) => (
                    <div key={item.id} className={`flex items-center justify-between ${idx !== 0 ? 'pt-6 border-t border-slate-100 dark:border-slate-800' : ''}`}>
                      <div className="max-w-md">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                      <Toggle enabled={idx % 2 === 0} onChange={() => {}} />
                    </div>
                  ))}
                </div>
              </SettingSection>

              <SettingSection title="Email Subscriptions" subtitle="Manage which emails you'd like to receive.">
                 <div className="space-y-4">
                   <label className="flex items-center gap-3 cursor-pointer group">
                     <div className="w-5 h-5 rounded border border-slate-300 dark:border-slate-700 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
                       <Check size={14} className="text-indigo-600" />
                     </div>
                     <span className="text-sm text-slate-600 dark:text-slate-300">Product updates and new features</span>
                   </label>
                   <label className="flex items-center gap-3 cursor-pointer group">
                     <div className="w-5 h-5 rounded border border-slate-300 dark:border-slate-700 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
                       <Check size={14} className="text-indigo-600" />
                     </div>
                     <span className="text-sm text-slate-600 dark:text-slate-300">Security advisories and alerts</span>
                   </label>
                 </div>
              </SettingSection>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <SettingSection title="Change Password" subtitle="Ensure your account is using a long, random password.">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all dark:text-slate-200" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all dark:text-slate-200" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Confirm Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all dark:text-slate-200" />
                    </div>
                  </div>
                </div>
              </SettingSection>

              <SettingSection title="Two-Factor Authentication" subtitle="Add an extra layer of security to your account.">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Authenticator App</p>
                    <p className="text-xs text-slate-500 mt-0.5">Use an app like Google Authenticator or Authy.</p>
                  </div>
                  <button className="text-indigo-600 dark:text-indigo-400 font-bold text-sm border-2 border-indigo-600/10 px-4 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all">
                    Enable
                  </button>
                </div>
              </SettingSection>
            </div>
          )}

          {activeTab === 'workspace' && (
            <div className="space-y-6">
              <SettingSection title="Workspace Details" subtitle="Customize your workspace settings.">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Organization Name</label>
                    <input type="text" defaultValue="TechFlow Inc." className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all dark:text-slate-200" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Subdomain</label>
                    <div className="flex items-center">
                      <input type="text" defaultValue="techflow" className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-l-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all dark:text-slate-200" />
                      <span className="bg-slate-100 dark:bg-slate-800 border-y border-r border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-r-xl text-sm text-slate-500">.crmpro.io</span>
                    </div>
                  </div>
                </div>
              </SettingSection>

              <div className="bg-rose-50 dark:bg-rose-900/10 rounded-2xl border border-rose-100 dark:border-rose-900/20 p-6">
                <h3 className="text-lg font-bold text-rose-600 dark:text-rose-400">Danger Zone</h3>
                <p className="text-sm text-rose-500 mt-1">Permanently delete your account and all associated data.</p>
                <button className="mt-4 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-rose-600/20 transition-all">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
