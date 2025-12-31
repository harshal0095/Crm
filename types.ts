
export enum LeadStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  PROPOSAL = 'Proposal',
  WON = 'Won',
  LOST = 'Lost'
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: string;
  assignedTo: string;
  value: number;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  assignedTo: string;
  completed: boolean;
}

export interface Activity {
  id: string;
  type: 'Call' | 'Email' | 'Meeting' | 'Note';
  content: string;
  timestamp: string;
  user: string;
}

export type ViewType = 'Dashboard' | 'Leads' | 'Deals' | 'Tasks' | 'Reports' | 'Customers' | 'Settings';
