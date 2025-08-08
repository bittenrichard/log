import React, { useState } from 'react';
import { Search, Filter, Plus, Package, AlertTriangle, Edit, Trash2, XCircle } from 'lucide-react';
import { InventoryItem } from '../../types';
import AddItemModal from './AddItemModal';

const InventoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'epi' | 'uniform'>('all');
  const [filterStock, setFilterStock] = useState<'all' | 'low' | 'normal'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: 'Capacete de Segurança Branco',
      type: 'epi',
      category: 'Proteção da Cabeça',
      size: 'M',
      quantity: 45,
      minStock: 20,
      unitCost: 89.90,
      supplier: 'EPI Solutions',
      lastUpdated: new Date('2024-01-15'),
      costCenter: 'CC-001',
      caNumber: '12345',
      caExpiryDate: new Date('2024-06-15'),
    },
    {
      id: '2',
      name: 'Luvas de Látex Descartáveis',
      type: 'epi',
      category: 'Proteção das Mãos',
      size: 'P',
      quantity: 15,
      minStock: 50,
      unitCost: 0.85,
      supplier: 'ProSafe',
      lastUpdated: new Date('2024-01-14'),
      costCenter: 'CC-002',
      caNumber: '67890',
      caExpiryDate: new Date('2023-12-01'),
    },
    {
      id: '3',
      name: 'Uniforme Operacional Azul',
      type: 'uniform',
      category: 'Vestimentas',
      size: 'G',
      quantity: 28,
      minStock: 15,
      unitCost: 125.00,
      supplier: 'Uniformes Plus',
      lastUpdated: new Date('2024-01-13'),
      costCenter: 'CC-001',
    },
  ];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStock = filterStock === 'all' || 
      (filterStock === 'low' && item.quantity <= item.minStock) ||
      (filterStock === 'normal' && item.quantity > item.minStock);
    
    return matchesSearch && matchesType && matchesStock;
  });

  const getStockStatus = (item: InventoryItem) => {
    if (item.quantity <= item.minStock * 0.5) {
      return { status: 'critical', color: 'text-red-600 bg-red-50 border-red-200', label: 'Crítico' };
    } else if (item.quantity <= item.minStock) {
      return { status: 'low', color: 'text-orange-600 bg-orange-50 border-orange-200', label: 'Baixo' };
    }
    return { status: 'normal', color: 'text-green-600 bg-green-50 border-green-200', label: 'Normal' };
  };

  const getCAStatus = (expiryDate?: Date) => {
    if (!expiryDate) return null;
    
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { status: 'expired', color: 'text-red-600', icon: XCircle };
    } else if (diffDays <= 30) {
      return { status: 'warning', color: 'text-yellow-600', icon: AlertTriangle };
    }
    return { status: 'valid', color: 'text-green-600', icon: null };
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (itemData: Partial<InventoryItem>) => {
    // In a real app, this would make an API call
    console.log('Saving item:', itemData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Controle de Estoque</h1>
          <p className="text-gray-600 mt-1">Gerencie todos os EPIs e uniformes do inventário</p>
        </div>
        <button onClick={handleAddItem} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Item
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar itens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os tipos</option>
            <option value="epi">EPIs</option>
            <option value="uniform">Uniformes</option>
          </select>

          {/* Stock Filter */}
          <select
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os níveis</option>
            <option value="low">Estoque baixo</option>
            <option value="normal">Estoque normal</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Item</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Quantidade</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Nº do CA</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Validade do CA</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Categoria</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Tamanho</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Custo Unit.</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Fornecedor</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => {
                const stockStatus = getStockStatus(item);
                const caStatus = getCAStatus(item.caExpiryDate);
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{item.quantity}</p>
                        <p className="text-xs text-gray-500">Mín: {item.minStock}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {item.caNumber || '-'}
                    </td>
                    <td className="py-4 px-6">
                      {item.caExpiryDate ? (
                        <div className="flex items-center space-x-2">
                          {caStatus?.icon && <caStatus.icon className="w-4 h-4" />}
                          <span className={`text-sm ${caStatus?.color || 'text-gray-900'}`}>
                            {item.caExpiryDate.toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">{item.category}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{item.size}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${stockStatus.color}`}>
                        {stockStatus.status === 'critical' && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {stockStatus.label}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      R$ {item.unitCost.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">{item.supplier}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleEditItem(item)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum item encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou adicionar novos itens ao estoque.</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Itens</p>
              <p className="text-2xl font-bold text-gray-900">{inventoryItems.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Estoque Baixo</p>
              <p className="text-2xl font-bold text-orange-600">
                {inventoryItems.filter(item => item.quantity <= item.minStock).length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-green-600">
                R$ {inventoryItems.reduce((total, item) => total + (item.quantity * item.unitCost), 0).toFixed(2)}
              </p>
            </div>
            <Package className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categorias</p>
              <p className="text-2xl font-bold text-purple-600">
                {new Set(inventoryItems.map(item => item.category)).size}
              </p>
            </div>
            <Filter className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Add/Edit Item Modal */}
      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        editItem={editingItem}
      />
    </div>
  );
};

export default InventoryPage;