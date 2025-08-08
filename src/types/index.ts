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
  signatureImageUrl?: string;
  epiSheetPdfUrl?: string;
}

export interface Training {
  id: string;
  userId: string;
  userName: string;
  trainingType: string;
  issueDate: Date;
  expiryDate: Date;
  certificateUrl?: string;
  status: 'valid' | 'expiring' | 'expired';
}

export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface PurchaseOrder {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  supplierId: string;
  supplierName: string;
  status: 'pending' | 'approved' | 'ordered';
  createdAt: Date;
  estimatedCost: number;
}

export interface InventoryCount {
  id: string;
  itemId: string;
  itemName: string;
  systemQuantity: number;
  countedQuantity: number;
  divergence: number;
  userId: string;
  date: Date;
}

export interface ItemMaintenance {
  id: string;
  itemId: string;
  maintenanceDate: Date;
  cost: number;
  description: string;
  nextMaintenanceDate?: Date;
}

export interface ItemReview {
  id: string;
  itemId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Supplier {
  id: string;
  name: string;
  contactInfo: string;
  averageRating: number;
  totalReviews: number;
}

export interface SupplierReview {
  id: string;
  supplierId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface ActionPlan {
  id: string;
  alertId: string;
  description: string;
  assignedToUserId: string;
  assignedToUserName: string;
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: Date;
}