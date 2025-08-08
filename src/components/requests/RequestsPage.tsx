import React, { useState } from 'react';
import { Plus, Search, Filter, FileText, User, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Request } from '../../types';
import DeliveryConfirmationModal from './DeliveryConfirmationModal';

const RequestsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'fulfilled'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const requests: Request[] = [
    {
      id: 'REQ-001',
      requesterId: '1',
      requesterName: 'Maria Silva',
      items: [
        { itemId: '1', itemName: 'Luvas descartáveis', quantity: 100, size: 'P', urgency: 'normal' },
        { itemId: '2', itemName: 'Avental descartável', quantity: 2, size: 'M', urgency: 'normal' }
      ],
      status: 'approved',
      priority: 'high',
      costCenter: 'CC-001 - Limpeza',
      createdAt: new Date('2024-01-15'),
      notes: 'Solicitação para equipe de limpeza do turno da manhã'
    },
    {
      id: 'REQ-002',
      requesterId: '2',
      requesterName: 'João Santos',
      items: [
        { itemId: '3', itemName: 'Capacete de segurança', quantity: 1, size: 'M', urgency: 'urgent' },
        { itemId: '4', itemName: 'Óculos de proteção', quantity: 2, size: 'Único', urgency: 'urgent' }
      ],
      status: 'pending',
      priority: 'high',
      costCenter: 'CC-002 - Manutenção',
      createdAt: new Date('2024-01-15'),
      notes: 'Equipamentos para novo funcionário - início imediato'
    },
    {
      id: 'REQ-003',
      requesterId: '3',
      requesterName: 'Ana Costa',
      items: [
        { itemId: '5', itemName: 'Botas de segurança', quantity: 1, size: '40', urgency: 'normal' }
      ],
      status: 'fulfilled',
      priority: 'medium',
      costCenter: 'CC-003 - Jardinagem',
      createdAt: new Date('2024-01-14')
    },
  ];

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.costCenter.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || request.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'fulfilled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'fulfilled':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-orange-600 bg-orange-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'approved': return 'Aprovada';
      case 'fulfilled': return 'Atendida';
      case 'rejected': return 'Rejeitada';
      default: return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return priority;
    }
  };

  const tabCounts = {
    all: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    fulfilled: requests.filter(r => r.status === 'fulfilled').length,
  };

  const handleApproveRequest = (request: Request) => {
    setSelectedRequest(request);
    setDeliveryModalOpen(true);
  };

  const handleConfirmDelivery = (signature: string) => {
    console.log('Delivery confirmed with signature:', signature);
    // In a real app, this would update the request status and save the signature
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Solicitações de EPIs</h1>
          <p className="text-gray-600 mt-1">Gerencie todas as solicitações de materiais</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Nova Solicitação
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por solicitante, ID ou centro de custo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'all', label: 'Todas', count: tabCounts.all },
              { key: 'pending', label: 'Pendentes', count: tabCounts.pending },
              { key: 'approved', label: 'Aprovadas', count: tabCounts.approved },
              { key: 'fulfilled', label: 'Atendidas', count: tabCounts.fulfilled },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Requests List */}
        <div className="divide-y divide-gray-200">
          {filteredRequests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{request.id}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{request.requesterName}</span>
                      <span>•</span>
                      <span>{request.costCenter}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span>{getStatusLabel(request.status)}</span>
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                    {getPriorityLabel(request.priority)}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Itens solicitados:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {request.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div>
                        <p className="font-medium text-gray-900">{item.itemName}</p>
                        <p className="text-sm text-gray-500">Tamanho: {item.size}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{item.quantity}x</p>
                        {item.urgency === 'urgent' && (
                          <span className="text-xs text-red-600 font-medium">Urgente</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {request.notes && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Observações:</strong> {request.notes}
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Criada em {request.createdAt.toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {request.status === 'pending' && (
                    <>
                      <button className="px-3 py-1 text-red-600 border border-red-300 rounded hover:bg-red-50 transition-colors">
                        Rejeitar
                      </button>
                      <button 
                        onClick={() => handleApproveRequest(request)}
                        className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
                      >
                        Aprovar
                      </button>
                    </>
                  )}
                  {request.status === 'approved' && (
                    <button className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors">
                      Marcar como Atendida
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma solicitação encontrada</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou criar uma nova solicitação.</p>
          </div>
        )}
      </div>

      {/* Delivery Confirmation Modal */}
      <DeliveryConfirmationModal
        isOpen={deliveryModalOpen}
        onClose={() => setDeliveryModalOpen(false)}
        request={selectedRequest}
        onConfirmDelivery={handleConfirmDelivery}
      />
    </div>
  );
};

export default RequestsPage;