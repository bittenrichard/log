import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Package, AlertTriangle, Edit, Trash2, XCircle } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { InventoryItem } from '../../types';
import AddItemModal from './AddItemModal';
import PurchaseOrderModal from './PurchaseOrderModal';
import { inventoryService } from '../../services/api';

const InventoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'epi' | 'uniform'>('all');
  const [filterStock, setFilterStock] = useState<'all' | 'low' | 'normal'>('all');
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [purchaseOrderModalOpen, setPurchaseOrderModalOpen] = useState(false);
  const [selectedItemForPurchase, setSelectedItemForPurchase] = useState<InventoryItem | null>(null);

  // Carregar dados do Baserow
  useEffect(() => {
    loadInventoryItems();
  }, []);

  const loadInventoryItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await inventoryService.getAll();
      
      // Mapear dados do Baserow para o formato esperado
      const mappedItems: InventoryItem[] = response.results.map((item: any) => ({
        id: item.id.toString(),
        name: item.name || '',
        type: item.type || 'epi',
        category: item.category || '',
        size: item.size || '',
        quantity: item.quantity || 0,
        minStock: item.min_stock || 0,
        unitCost: item.unit_cost || 0,
        supplier: item.supplier || '',
        lastUpdated: item.last_updated ? new Date(item.last_updated) : new Date(),
        costCenter: item.cost_center || '',
        caNumber: item.ca_number || undefined,
        caExpiryDate: item.ca_expiry_date ? new Date(item.ca_expiry_date) : undefined,
      }));
      
      setItems(mappedItems);
    } catch (err) {
      console.error('Erro ao carregar itens:', err);
      setError('Erro ao carregar itens do estoque');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => {
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
    handleSaveItemAsync(itemData);
  };

  const handleSaveItemAsync = async (itemData: Partial<InventoryItem>) => {
    try {
      setLoading(true);
      
      // Mapear dados para o formato do Baserow
      const baserowData = {
        name: itemData.name,
        type: itemData.type,
        category: itemData.category,
        size: itemData.size,
        quantity: itemData.quantity,
        min_stock: itemData.minStock,
        unit_cost: itemData.unitCost,
        supplier: itemData.supplier,
        cost_center: itemData.costCenter,
        ca_number: itemData.caNumber,
        ca_expiry_date: itemData.caExpiryDate?.toISOString().split('T')[0],
        last_updated: new Date().toISOString(),
      };

      if (editingItem) {
        // Atualizar item existente
        await inventoryService.update(editingItem.id, baserowData);
      } else {
        // Criar novo item
        await inventoryService.create(baserowData);
      }
      
      // Recarregar a lista
      await loadInventoryItems();
    } catch (err) {
      console.error('Erro ao salvar item:', err);
      setError('Erro ao salvar item');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestPurchase = (item: InventoryItem) => {
    setSelectedItemForPurchase(item);
    setPurchaseOrderModalOpen(true);
  };

  const handleSavePurchaseOrder = (purchaseOrderData: any) => {
    console.log('Creating purchase order:', purchaseOrderData);
    // In a real app, this would make an API call
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Controle de Estoque</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Gerencie todos os EPIs e uniformes do inventário</p>
        </div>
        <button onClick={handleAddItem} className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
          <Plus className="w-4 h-4 mr-1 sm:mr-2" />
          Adicionar Item
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar itens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os tipos</option>
            <option value="epi">EPIs</option>
            <option value="uniform">Uniformes</option>
          </select>

          {/* Stock Filter */}
          <select
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value as any)}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:col-span-2 lg:col-span-1"
          >
            <option value="all">Todos os níveis</option>
            <option value="low">Estoque baixo</option>
            <option value="normal">Estoque normal</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
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
                        {item.quantity <= item.minStock && (
                          <button 
                            onClick={() => handleRequestPurchase(item)}
                            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                            title="Solicitar Compra"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        )}
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

        {/* Mobile Card View */}
        <div className="lg:hidden divide-y divide-gray-200">
          {filteredItems.map((item) => {
            const stockStatus = getStockStatus(item);
            const caStatus = getCAStatus(item.caExpiryDate);
            return (
              <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{item.type} • {item.category}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${stockStatus.color} ml-2`}>
                        {stockStatus.status === 'critical' && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {stockStatus.label}
                      </span>
                    </div>
                    
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Quantidade:</span>
                        <span className="ml-1 font-medium">{item.quantity}</span>
                        <span className="text-xs text-gray-400 ml-1">(Mín: {item.minStock})</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Tamanho:</span>
                        <span className="ml-1 font-medium">{item.size}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Custo:</span>
                        <span className="ml-1 font-medium">R$ {item.unitCost.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">CA:</span>
                        <span className="ml-1 font-medium">{item.caNumber || '-'}</span>
                      </div>
                    </div>

                    {item.caExpiryDate && (
                      <div className="mt-2 flex items-center space-x-2">
                        {caStatus?.icon && <caStatus.icon className="w-4 h-4" />}
                        <span className={`text-sm ${caStatus?.color || 'text-gray-900'}`}>
                          Validade CA: {item.caExpiryDate.toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-gray-500">{item.supplier}</span>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleEditItem(item)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {item.quantity <= item.minStock && (
                          <button 
                            onClick={() => handleRequestPurchase(item)}
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                            title="Solicitar Compra"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Nenhum item encontrado</h3>
            <p className="text-sm sm:text-base text-gray-500">Tente ajustar os filtros ou adicionar novos itens ao estoque.</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {loading && (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Carregando itens...</p>
          </div>
        )}
        
        {error && (
          <div className="col-span-full text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={loadInventoryItems}
              className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Tentar Novamente
            </button>
          </div>
        )}
        
        {!loading && !error && (
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total de Itens</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{items.length}</p>
              </div>
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Estoque Baixo</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">
                  {items.filter(item => item.quantity <= item.minStock).length}
                </p>
              </div>
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  R$ {items.reduce((total, item) => total + (item.quantity * item.unitCost), 0).toFixed(2)}
                </p>
              </div>
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Categorias</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">
                  {new Set(items.map(item => item.category)).size}
                </p>
              </div>
              <Filter className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Item Modal */}
      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        editItem={editingItem}
      />

      {/* Purchase Order Modal */}
      <PurchaseOrderModal
        isOpen={purchaseOrderModalOpen}
        onClose={() => setPurchaseOrderModalOpen(false)}
        item={selectedItemForPurchase}
        onSave={handleSavePurchaseOrder}
      />
    </div>
  );
};

export default InventoryPage;