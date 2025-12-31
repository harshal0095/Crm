
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { LeadStatus, Lead, Task, ViewType } from './types';

export const MENU_ITEMS = [
  { id: 'Dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'Leads', label: 'Leads', icon: <Users size={20} /> },
  { id: 'Customers', label: 'Customers', icon: <Briefcase size={20} /> },
  { id: 'Deals', label: 'Deals', icon: <Target size={20} /> },
  { id: 'Tasks', label: 'Tasks', icon: <CheckSquare size={20} /> },
  { id: 'Reports', label: 'Reports', icon: <BarChart3 size={20} /> },
  { id: 'Settings', label: 'Settings', icon: <Settings size={20} /> },
];

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@techflow.com',
    phone: '+1 (555) 123-4567',
    status: LeadStatus.NEW,
    source: 'Website',
    assignedTo: 'Alex Rivers',
    value: 12500,
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'm.chen@global-logistics.net',
    phone: '+1 (555) 987-6543',
    status: LeadStatus.CONTACTED,
    source: 'Referral',
    assignedTo: 'Emma Watson',
    value: 45000,
    avatar: 'https://picsum.photos/seed/michael/100/100'
  },
  {
    id: '3',
    name: 'Amanda Brooks',
    email: 'abrooks@creative-studio.io',
    phone: '+1 (555) 246-8102',
    status: LeadStatus.PROPOSAL,
    source: 'LinkedIn',
    assignedTo: 'Alex Rivers',
    value: 8200,
    avatar: 'https://picsum.photos/seed/amanda/100/100'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'd.wilson@enterprise-corp.com',
    phone: '+1 (555) 135-7913',
    status: LeadStatus.WON,
    source: 'Cold Outreach',
    assignedTo: 'Sarah Miller',
    value: 120000,
    avatar: 'https://picsum.photos/seed/david/100/100'
  },
  {
    id: '5',
    name: 'Jessica Lee',
    email: 'jlee@innovate-solutions.com',
    phone: '+1 (555) 369-2580',
    status: LeadStatus.LOST,
    source: 'Website',
    assignedTo: 'Emma Watson',
    value: 15400,
    avatar: 'https://picsum.photos/seed/jessica/100/100'
  },
  {
    id: '6',
    name: 'Robert Taylor',
    email: 'rtaylor@fintech-edge.com',
    phone: '+1 (555) 741-8520',
    status: LeadStatus.CONTACTED,
    source: 'Referral',
    assignedTo: 'Sarah Miller',
    value: 32000,
    avatar: 'https://picsum.photos/seed/robert/100/100'
  }
];

export const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Follow up with Sarah Jenkins', dueDate: '2023-11-20', priority: 'High', assignedTo: 'Alex Rivers', completed: false },
  { id: '2', title: 'Prepare proposal for Global Logistics', dueDate: '2023-11-21', priority: 'Medium', assignedTo: 'Emma Watson', completed: false },
  { id: '3', title: 'Quarterly sales meeting', dueDate: '2023-11-20', priority: 'High', assignedTo: 'All Team', completed: true },
  { id: '4', title: 'Update CRM documentation', dueDate: '2023-11-25', priority: 'Low', assignedTo: 'Alex Rivers', completed: false },
];
