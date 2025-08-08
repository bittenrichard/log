import React, { useState } from 'react';
import { Plus, Calendar, DollarSign, FileText, Wrench } from 'lucide-react';
import { ItemMaintenance } from '../../types';
import AddMaintenanceModal from './AddMaintenanceModal';

interface ItemMaintenancePageProps {
  itemId: string;
  itemName: string;
}

const ItemMaintenancePage: React.FC<ItemMaintenancePageProps> = ({ itemId, itemName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const maintenances: ItemMaintenance[] = [
    {
      id: '1',
      itemId: itemId,
      maintenanceDate: new Date('2024-01-10'),
      cost: 25.50,
      description: 'Limpeza e desinfecção completa',
      nextMaintenanceDate: new Date('2024-04-10'),
    },
    {
      id: '2',
      itemId: itemId,
      maintenanceDate: new Date('2023-10-15'),
      cost: 45.00,
      description: 'Substituição de componentes internos',
      nextMaintenanceDate: new Date('2024-01-15'),
    },
    {
      id: '3',
      itemId: itemId,
      maintenanceDate: new Date('2023-07-20'),
      cost: 15.75,
      description: 'Inspeção visual e limpeza básica',
      nextMaintenanceDate: new Date('2023-10-20'),
    },
  ];

  const handleSaveMaintenance = (maintenanceData: Partial<ItemMaintenance>) => {
    console.log('Saving maintenance:', maintenanceData);
    // In a real app, this would make an API call
  };

  const totalMaintenanceCost = maintenances.reduce((total, maintenance) => total + maintenance.cost, 0);
  const nextMaintenance = maintenances
    .filter(m => m.nextMaintenanceDate && m.nextMaintenanceDate > new Date())
    .sort((a, b) => a.nextMaintenanceDate!.getTime() - b.nextMaintenanceDate!.getTime())[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Manutenções - {itemName}</h2>
          <p className="text-gray-600 mt-1">Histórico de manutenções e higienização</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Registrar Manutenção
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Manutenções</p>
              <p className="text-2xl font-bold text-gray-900">{maintenances.length}</p>
            </div>
            <Wrench className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Custo Total</p>
              <p className="text-2xl font-bold text-green-600">R$ {totalMaintenanceCost.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Próxima Manutenção</p>
              <p className="text-lg font-bold text-orange-600">
                {nextMaintenance 
                  ? nextMaintenance.nextMaintenanceDate!.toLocaleDateString('pt-BR')
                  : 'Não agendada'
                }
              </p>
            </div>
            <Calendar className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Maintenance History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Histórico de Manutenções</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Data</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Descrição</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Custo</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Próxima Manutenção</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {maintenances.map((maintenance) => (
                <tr key={maintenance.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {maintenance.maintenanceDate.toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{maintenance.description}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        R$ {maintenance.cost.toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {maintenance.nextMaintenanceDate ? (
                      <span className="text-sm text-gray-900">
                        {maintenance.nextMaintenanceDate.toLocaleDateString('pt-BR')}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {maintenances.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma manutenção registrada</h3>
            <p className="text-gray-500">Registre a primeira manutenção deste item.</p>
          </div>
        )}
      </div>

      {/* Add Maintenance Modal */}
      <AddMaintenanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemId={itemId}
        itemName={itemName}
        onSave={handleSaveMaintenance}
      />
    </div>
  );
};

export default ItemMaintenancePage;