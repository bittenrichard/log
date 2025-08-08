import React, { useState } from 'react';
import { Package, Plus, Calendar, FileText } from 'lucide-react';
import { Request, RequestItem } from '../../types';
import RequestEPIModal from './RequestEPIModal';

const MyEPIsPage: React.FC = () => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Mock data for employee's EPIs
  const myEPIs = [
    {
      id: '1',
      name: 'Capacete de Segurança Branco',
      size: 'M',
      deliveryDate: new Date('2024-01-10'),
      expiryDate: new Date('2024-07-10'),
      status: 'active' as const,
    },
    {
      id: '2',
      name: 'Luvas de Látex Descartáveis',
      size: 'P',
      deliveryDate: new Date('2024-01-05'),
      expiryDate: new Date('2024-04-05'),
      status: 'expiring' as const,
    },
    {
      id: '3',
      name: 'Óculos de Proteção',
      size: 'Único',
      deliveryDate: new Date('2023-12-15'),
      expiryDate: new Date('2024-06-15'),
      status: 'active' as const,
    },
  ];

  // Mock data for delivery history
  const deliveryHistory: Request[] = [
    {
      id: 'REQ-001',
      requesterId: '1',
      requesterName: 'Funcionário Atual',
      items: [
        { itemId: '1', itemName: 'Capacete de Segurança', quantity: 1, size: 'M', urgency: 'normal' },
        { itemId: '2', itemName: 'Luvas de Látex', quantity: 10, size: 'P', urgency: 'normal' }
      ],
      status: 'fulfilled',
      priority: 'medium',
      costCenter: 'CC-001',
      createdAt: new Date('2024-01-10'),
    },
    {
      id: 'REQ-002',
      requesterId: '1',
      requesterName: 'Funcionário Atual',
      items: [
        { itemId: '3', itemName: 'Óculos de Proteção', quantity: 1, size: 'Único', urgency: 'normal' }
      ],
      status: 'fulfilled',
      priority: 'low',
      costCenter: 'CC-001',
      createdAt: new Date('2023-12-15'),
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'expiring':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'expiring': return 'A Vencer';
      case 'expired': return 'Vencido';
      default: return status;
    }
  };

  const handleSaveRequest = (requestData: Partial<Request>) => {
    console.log('Saving EPI request:', requestData);
    // In a real app, this would make an API call
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meus EPIs</h1>
          <p className="text-gray-600 mt-1">Visualize seus equipamentos e histórico de recebimentos</p>
        </div>
        <button 
          onClick={() => setIsRequestModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Solicitar Novo EPI
        </button>
      </div>

      {/* Current EPIs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">EPIs em Sua Posse</h3>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myEPIs.map((epi) => (
              <div key={epi.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <Package className="w-6 h-6 text-blue-600" />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(epi.status)}`}>
                    {getStatusLabel(epi.status)}
                  </span>
                </div>
                
                <h4 className="font-medium text-gray-900 mb-2">{epi.name}</h4>
                <p className="text-sm text-gray-600 mb-3">Tamanho: {epi.size}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Recebido em:</span>
                    <span className="font-medium">{epi.deliveryDate.toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Validade:</span>
                    <span className={`font-medium ${epi.status === 'expiring' ? 'text-yellow-600' : 'text-gray-900'}`}>
                      {epi.expiryDate.toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {myEPIs.length === 0 && (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum EPI em sua posse</h3>
              <p className="text-gray-500">Solicite seus primeiros equipamentos de proteção.</p>
            </div>
          )}
        </div>
      </div>

      {/* Delivery History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Histórico de Recebimentos</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {deliveryHistory.map((delivery) => (
            <div key={delivery.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{delivery.id}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{delivery.createdAt.toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                  Entregue
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {delivery.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div>
                      <p className="font-medium text-gray-900">{item.itemName}</p>
                      <p className="text-sm text-gray-500">Tamanho: {item.size}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{item.quantity}x</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {deliveryHistory.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum histórico encontrado</h3>
            <p className="text-gray-500">Seus recebimentos aparecerão aqui.</p>
          </div>
        )}
      </div>

      {/* Request EPI Modal */}
      <RequestEPIModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSave={handleSaveRequest}
      />
    </div>
  );
};

export default MyEPIsPage;