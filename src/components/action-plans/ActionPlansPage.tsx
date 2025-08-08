import React, { useState } from 'react';
import { Search, Filter, Plus, CheckSquare, Clock, User, Calendar, AlertTriangle } from 'lucide-react';
import { ActionPlan } from '../../types';
import CreateActionPlanModal from './CreateActionPlanModal';

const ActionPlansPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const actionPlans: ActionPlan[] = [
    {
      id: '1',
      alertId: 'alert-001',
      description: 'Solicitar compra de capacetes de segurança - estoque crítico',
      assignedToUserId: '1',
      assignedToUserName: 'Maria Silva',
      dueDate: new Date('2024-02-15'),
      status: 'pending',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      alertId: 'alert-002',
      description: 'Verificar validade dos CAs vencidos e providenciar renovação',
      assignedToUserId: '2',
      assignedToUserName: 'João Santos',
      dueDate: new Date('2024-02-10'),
      status: 'in_progress',
      createdAt: new Date('2024-01-12'),
    },
    {
      id: '3',
      alertId: 'alert-003',
      description: 'Realizar inventário físico do estoque de luvas',
      assignedToUserId: '3',
      assignedToUserName: 'Ana Costa',
      dueDate: new Date('2024-01-20'),
      status: 'completed',
      createdAt: new Date('2024-01-10'),
    },
  ];

  const filteredPlans = actionPlans.filter(plan => {
    const matchesSearch = 
      plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.assignedToUserName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || plan.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'in_progress':
        return <AlertTriangle className="w-4 h-4" />;
      case 'completed':
        return <CheckSquare className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'in_progress': return 'Em Andamento';
      case 'completed': return 'Concluída';
      default: return status;
    }
  };

  const getPriorityColor = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'text-red-600'; // Overdue
    if (diffDays <= 3) return 'text-orange-600'; // Due soon
    return 'text-gray-600'; // Normal
  };

  const handleSaveActionPlan = (actionPlanData: Partial<ActionPlan>) => {
    console.log('Saving action plan:', actionPlanData);
    // In a real app, this would make an API call
  };

  const handleStatusChange = (planId: string, newStatus: ActionPlan['status']) => {
    console.log('Updating action plan status:', planId, newStatus);
    // In a real app, this would make an API call
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planos de Ação</h1>
          <p className="text-gray-600 mt-1">Gerencie ações criadas a partir dos alertas do sistema</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Criar Plano de Ação
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por descrição ou responsável..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os status</option>
            <option value="pending">Pendentes</option>
            <option value="in_progress">Em Andamento</option>
            <option value="completed">Concluídas</option>
          </select>
        </div>
      </div>

      {/* Action Plans List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{plan.description}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{plan.assignedToUserName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span className={getPriorityColor(plan.dueDate)}>
                        Prazo: {plan.dueDate.toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Criado em {plan.createdAt.toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(plan.status)}`}>
                    {getStatusIcon(plan.status)}
                    <span>{getStatusLabel(plan.status)}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-2">
                {plan.status === 'pending' && (
                  <button
                    onClick={() => handleStatusChange(plan.id, 'in_progress')}
                    className="px-3 py-1 text-blue-600 border border-blue-300 rounded hover:bg-blue-50 transition-colors text-sm"
                  >
                    Iniciar
                  </button>
                )}
                {plan.status === 'in_progress' && (
                  <button
                    onClick={() => handleStatusChange(plan.id, 'completed')}
                    className="px-3 py-1 text-green-600 border border-green-300 rounded hover:bg-green-50 transition-colors text-sm"
                  >
                    Concluir
                  </button>
                )}
                <button className="px-3 py-1 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum plano de ação encontrado</h3>
            <p className="text-gray-500">Crie planos de ação para gerenciar os alertas do sistema.</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Planos</p>
              <p className="text-2xl font-bold text-gray-900">{actionPlans.length}</p>
            </div>
            <CheckSquare className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-600">
                {actionPlans.filter(p => p.status === 'pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Em Andamento</p>
              <p className="text-2xl font-bold text-blue-600">
                {actionPlans.filter(p => p.status === 'in_progress').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Concluídas</p>
              <p className="text-2xl font-bold text-green-600">
                {actionPlans.filter(p => p.status === 'completed').length}
              </p>
            </div>
            <CheckSquare className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Create Action Plan Modal */}
      <CreateActionPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveActionPlan}
      />
    </div>
  );
};

export default ActionPlansPage;