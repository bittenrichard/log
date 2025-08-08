import React, { useState } from 'react';
import { X, CheckSquare, Save } from 'lucide-react';
import { ActionPlan } from '../../types';

interface CreateActionPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (actionPlan: Partial<ActionPlan>) => void;
}

const CreateActionPlanModal: React.FC<CreateActionPlanModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    description: '',
    assignedToUserId: '',
    dueDate: '',
    alertId: '', // Optional - can be linked to a specific alert
  });

  const users = [
    { id: '1', name: 'Maria Silva' },
    { id: '2', name: 'João Santos' },
    { id: '3', name: 'Ana Costa' },
    { id: '4', name: 'Carlos Lima' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const actionPlanData = {
      ...formData,
      dueDate: new Date(formData.dueDate),
      status: 'pending' as const,
    };
    onSave(actionPlanData);
    onClose();
    // Reset form
    setFormData({
      description: '',
      assignedToUserId: '',
      dueDate: '',
      alertId: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <CheckSquare className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Criar Plano de Ação</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição da Ação *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descreva detalhadamente a ação que deve ser executada..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Responsável *
              </label>
              <select
                name="assignedToUserId"
                value={formData.assignedToUserId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione um responsável</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Vencimento *
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID do Alerta (Opcional)
            </label>
            <input
              type="text"
              name="alertId"
              value={formData.alertId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: alert-001"
            />
            <p className="text-xs text-gray-500 mt-1">
              Vincule esta ação a um alerta específico do sistema
            </p>
          </div>

          {/* Priority Guidelines */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Diretrizes de Prioridade:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Alta:</strong> Problemas críticos de segurança ou estoque zerado</li>
              <li>• <strong>Média:</strong> Estoque baixo ou CAs próximos do vencimento</li>
              <li>• <strong>Baixa:</strong> Melhorias de processo ou manutenções preventivas</li>
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
              Criar Plano de Ação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateActionPlanModal;