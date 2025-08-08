export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'hr' | 'purchasing' | 'supervisor';
  department: string;
  createdAt: Date;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'epi' | 'uniform';
  category: string;
  size: string;
  quantity: number;
  minStock: number;
  unitCost: number;
  supplier: string;
  lastUpdated: Date;
  costCenter: string;
  caNumber?: string;
  caExpiryDate?: Date;
}

export interface Request {
  id: string;
  requesterId: string;
  requesterName: string;
  items: RequestItem[];
  status: 'pending' | 'approved' | 'rejected' | 'fulfilled';
  priority: 'low' | 'medium' | 'high';
  costCenter: string;
  createdAt: Date;
  notes?: string;
}

export interface RequestItem {
  itemId: string;
  itemName: string;
  quantity: number;
  size: string;
  urgency: 'normal' | 'urgent';
}

export interface Report {
  id: string;
  type: 'consumption' | 'cost' | 'movement';
  title: string;
  period: string;
  costCenter?: string;
  data: any;
  generatedAt: Date;
}

export interface StockAlert {
  id: string;
  itemId: string;
  itemName: string;
  currentStock: number;
  minStock: number;
  severity: 'warning' | 'critical';
}

export interface CAAlert {
  id: string;
  itemId: string;
  itemName: string;
  caNumber: string;
  expiryDate: Date;
  daysUntilExpiry: number;
  severity: 'warning' | 'expired';
}

export interface DeliveryRecord {
  id: string;
  employeeName: string;
  employeeId: string;
  items: RequestItem[];
  deliveryDate: Date;
  signature: string;
  supervisor: string;
}