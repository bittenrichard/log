import React, { useState, useEffect } from 'react';
import { FileText, User, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { requestsService } from '../../services/api';

const RecentRequests: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentRequests();
  }, []);

  const loadRecentRequests = async () => {
    try {
      setLoading(true);
      const response = await requestsService.getAll();
      
      // Pegar apenas as 4 solicitações mais recentes
      const recentRequests = response.results
        .slice(0, 4)
        .map((request: any) => ({
          id: request.id.toString(),
          requester: request.requester_name || '',
          department: request.cost_center || '',
          items: 'Itens da solicitação', // Simplificado para o dashboard
          status: request.status || 'pending',
          priority: request.priority || 'medium',
          date: request.created_at ? new Date(request.created_at).toISOString().split('T')[0] : '',
          costCenter: request.cost_center || '',
        }));
      
      setRequests(recentRequests);
    } catch (err) {
      console.error('Erro ao carregar solicitações recentes:', err);
    } finally {
      setLoading(false);
    }
  };

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
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">Carregando...</p>
          </div>
        ) : (
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
        )}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
        Ver todas as solicitações
      </button>
    </div>
  );
};

export default RecentRequests;