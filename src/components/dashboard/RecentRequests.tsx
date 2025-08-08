import React from 'react';
import { FileText, User, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const RecentRequests: React.FC = () => {
  const requests = [
    {
      id: 'REQ-001',
      requester: 'Maria Silva',
      department: 'Limpeza',
      items: 'Luvas descartáveis (100un), Avental (2un)',
      status: 'approved' as const,
      priority: 'high' as const,
      date: '2024-01-15',
      costCenter: 'CC-001',
    },
    {
      id: 'REQ-002',
      requester: 'João Santos',
      department: 'Manutenção',
      items: 'Capacete de segurança (1un), Óculos de proteção (2un)',
      status: 'pending' as const,
      priority: 'medium' as const,
      date: '2024-01-15',
      costCenter: 'CC-002',
    },
    {
      id: 'REQ-003',
      requester: 'Ana Costa',
      department: 'Jardinagem',
      items: 'Botas de segurança (1par)',
      status: 'fulfilled' as const,
      priority: 'low' as const,
      date: '2024-01-14',
      costCenter: 'CC-003',
    },
    {
      id: 'REQ-004',
      requester: 'Carlos Lima',
      department: 'Segurança',
      items: 'Colete refletivo (3un), Lanterna (2un)',
      status: 'rejected' as const,
      priority: 'medium' as const,
      date: '2024-01-14',
      costCenter: 'CC-001',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'fulfilled':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        return 'text-red-600';
      case 'medium':
        return 'text-orange-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Solicitações Recentes</h3>
        <FileText className="w-5 h-5 text-gray-500" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="pb-3 text-sm font-medium text-gray-500">ID</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Solicitante</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Itens</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Prioridade</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 text-sm font-medium text-gray-900">
                  {request.id}
                </td>
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{request.requester}</p>
                      <p className="text-xs text-gray-500">{request.department}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <p className="text-sm text-gray-900 max-w-xs truncate">
                    {request.items}
                  </p>
                  <p className="text-xs text-gray-500">{request.costCenter}</p>
                </td>
                <td className="py-3">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="capitalize">{request.status === 'fulfilled' ? 'Atendida' : request.status === 'approved' ? 'Aprovada' : request.status === 'rejected' ? 'Rejeitada' : 'Pendente'}</span>
                  </span>
                </td>
                <td className="py-3">
                  <span className={`text-sm font-medium capitalize ${getPriorityColor(request.priority)}`}>
                    {request.priority === 'high' ? 'Alta' : request.priority === 'medium' ? 'Média' : 'Baixa'}
                  </span>
                </td>
                <td className="py-3 text-sm text-gray-500">
                  {new Date(request.date).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
        Ver todas as solicitações
      </button>
    </div>
  );
};

export default RecentRequests;