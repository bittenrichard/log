import React, { useState } from 'react';
import { X, Wrench, Save } from 'lucide-react';
import { ItemMaintenance } from '../../types';

interface AddMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  itemName: string;
  onSave: (maintenance: Partial<ItemMaintenance>) => void;
}

const AddMaintenanceModal: React.FC<AddMaintenanceModalProps> = ({ 
  isOpen, 
  onClose, 
  itemId, 
  itemName, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    maintenanceDate: new Date().toISOString().split('T')[0],
    cost: 0,
    description: '',
    nextMaintenanceDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const maintenanceData = {
      itemId,
      maintenanceDate: new Date(formData.maintenanceDate),
      cost: formData.cost,
      description: formData.description,
      nextMaintenanceDate: formData.nextMaintenanceDate ? new Date(formData.nextMaintenanceDate) : undefined,
    };
    onSave(maintenanceData);
    onClose();
    // Reset form
    setFormData({
      maintenanceDate: new Date().toISOString().split('T')[0],
      cost: 0,
      description: '',
      nextMaintenanceDate: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cost' ? parseFloat(value) || 0 : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Wrench className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Registrar Manutenção</h2>
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
            <h3 className="font-medium text-gray-900 mb-1">Item</h3>
            <p className="text-gray-600">{itemName}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data da Manutenção *
              </label>
              <input
                type="date"
                name="maintenanceDate"
                value={formData.maintenanceDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custo da Manutenção *
              </label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição da Manutenção *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descreva os procedimentos realizados..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Próxima Manutenção Programada
            </label>
            <input
              type="date"
              name="nextMaintenanceDate"
              value={formData.nextMaintenanceDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Opcional - deixe em branco se não aplicável</p>
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
              Registrar Manutenção
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMaintenanceModal;