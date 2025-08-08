import React, { useState } from 'react';
import { X, Package, Save, Plus, Trash2 } from 'lucide-react';
import { Request, RequestItem } from '../../types';

interface RequestEPIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (request: Partial<Request>) => void;
}

const RequestEPIModal: React.FC<RequestEPIModalProps> = ({ isOpen, onClose, onSave }) => {
  const [items, setItems] = useState<Partial<RequestItem>[]>([
    { itemName: '', quantity: 1, size: '', urgency: 'normal' }
  ]);
  const [notes, setNotes] = useState('');

  const availableItems = [
    'Capacete de Segurança',
    'Luvas de Látex Descartáveis',
    'Óculos de Proteção',
    'Botas de Segurança',
    'Colete Refletivo',
    'Máscara PFF2',
    'Avental Descartável',
  ];

  const sizes = ['PP', 'P', 'M', 'G', 'GG', 'Único', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validItems = items.filter(item => item.itemName && item.quantity && item.size);
    
    if (validItems.length === 0) {
      alert('Adicione pelo menos um item à solicitação');
      return;
    }

    const requestData = {
      items: validItems as RequestItem[],
      notes,
      priority: 'medium' as const,
      status: 'pending' as const,
    };

    onSave(requestData);
    onClose();
    
    // Reset form
    setItems([{ itemName: '', quantity: 1, size: '', urgency: 'normal' }]);
    setNotes('');
  };

  const addItem = () => {
    setItems([...items, { itemName: '', quantity: 1, size: '', urgency: 'normal' }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof RequestItem, value: any) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Package className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Solicitar Novo EPI</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Items Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Itens Solicitados</h3>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar Item
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Item *
                      </label>
                      <select
                        value={item.itemName || ''}
                        onChange={(e) => updateItem(index, 'itemName', e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Selecione um item</option>
                        {availableItems.map((itemName) => (
                          <option key={itemName} value={itemName}>
                            {itemName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantidade *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tamanho *
                      </label>
                      <select
                        value={item.size || ''}
                        onChange={(e) => updateItem(index, 'size', e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Selecione</option>
                        {sizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        disabled={items.length === 1}
                        className="p-2 text-red-600 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Urgência
                    </label>
                    <select
                      value={item.urgency || 'normal'}
                      onChange={(e) => updateItem(index, 'urgency', e.target.value as 'normal' | 'urgent')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgente</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Informações adicionais sobre a solicitação..."
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Informações Importantes:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Sua solicitação será analisada pelo departamento responsável</li>
              <li>• Você receberá uma notificação quando a solicitação for aprovada</li>
              <li>• Para itens urgentes, entre em contato diretamente com seu supervisor</li>
            </ul>
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
              Enviar Solicitação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestEPIModal;