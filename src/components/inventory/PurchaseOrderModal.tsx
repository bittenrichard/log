import React, { useState } from 'react';
import { X, ShoppingCart, Save } from 'lucide-react';
import { InventoryItem, PurchaseOrder } from '../../types';

interface PurchaseOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
  onSave: (purchaseOrder: Partial<PurchaseOrder>) => void;
}

const PurchaseOrderModal: React.FC<PurchaseOrderModalProps> = ({ isOpen, onClose, item, onSave }) => {
  const [formData, setFormData] = useState({
    quantity: item ? Math.max(item.minStock * 2 - item.quantity, 0) : 0,
    supplierId: item?.supplier || '',
    notes: '',
  });

  const suppliers = [
    { id: '1', name: 'EPI Solutions' },
    { id: '2', name: 'ProSafe' },
    { id: '3', name: 'Uniformes Plus' },
    { id: '4', name: 'Safety First' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    const purchaseOrderData = {
      itemId: item.id,
      itemName: item.name,
      quantity: formData.quantity,
      supplierId: formData.supplierId,
      supplierName: suppliers.find(s => s.id === formData.supplierId)?.name || '',
      estimatedCost: formData.quantity * item.unitCost,
      status: 'pending' as const,
    };

    onSave(purchaseOrderData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };

  if (!isOpen || !item) return null;

  const estimatedCost = formData.quantity * item.unitCost;
  const targetStock = item.minStock * 2;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Solicitar Compra</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Item Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Item para Compra</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Nome:</span>
                <span className="ml-2 font-medium">{item.name}</span>
              </div>
              <div>
                <span className="text-gray-600">Tamanho:</span>
                <span className="ml-2 font-medium">{item.size}</span>
              </div>
              <div>
                <span className="text-gray-600">Estoque Atual:</span>
                <span className="ml-2 font-medium text-red-600">{item.quantity}</span>
              </div>
              <div>
                <span className="text-gray-600">Estoque Mínimo:</span>
                <span className="ml-2 font-medium">{item.minStock}</span>
              </div>
              <div>
                <span className="text-gray-600">Custo Unitário:</span>
                <span className="ml-2 font-medium">R$ {item.unitCost.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-600">Estoque Ideal:</span>
                <span className="ml-2 font-medium text-green-600">{targetStock}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade a Comprar *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Sugestão: {Math.max(targetStock - item.quantity, 0)} unidades para atingir estoque ideal
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fornecedor *
              </label>
              <select
                name="supplierId"
                value={formData.supplierId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione um fornecedor</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Observações adicionais sobre a compra..."
            />
          </div>

          {/* Cost Summary */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Resumo do Pedido</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Quantidade:</span>
                <span className="ml-2 font-medium text-blue-900">{formData.quantity} unidades</span>
              </div>
              <div>
                <span className="text-blue-700">Custo Estimado:</span>
                <span className="ml-2 font-medium text-blue-900">R$ {estimatedCost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Criar Solicitação de Compra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseOrderModal;