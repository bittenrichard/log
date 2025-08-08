import React, { useState } from 'react';
import { Settings, Users, Building, Shield, Bell, Database } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'costcenters' | 'security' | 'notifications' | 'system'>('users');

  const tabs = [
    { id: 'users' as const, label: 'Usuários', icon: Users },
    { id: 'costcenters' as const, label: 'Centros de Custo', icon: Building },
    { id: 'security' as const, label: 'Segurança', icon: Shield },
    { id: 'notifications' as const, label: 'Notificações', icon: Bell },
    { id: 'system' as const, label: 'Sistema', icon: Database },
  ];

  const users = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@empresa.com',
      role: 'admin',
      department: 'TI',
      status: 'active',
      lastLogin: '2024-01-15',
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@empresa.com',
      role: 'hr',
      department: 'RH',
      status: 'active',
      lastLogin: '2024-01-14',
    },
    {
      id: '3',
      name: 'Carlos Lima',
      email: 'carlos@empresa.com',
      role: 'purchasing',
      department: 'Compras',
      status: 'inactive',
      lastLogin: '2024-01-10',
    },
  ];

  const costCenters = [
    {
      id: 'CC-001',
      name: 'Limpeza',
      description: 'Equipe de limpeza e conservação',
      budget: 15000,
      spent: 8750,
      manager: 'Ana Costa',
    },
    {
      id: 'CC-002',
      name: 'Manutenção',
      description: 'Equipe de manutenção predial',
      budget: 25000,
      spent: 18200,
      manager: 'Pedro Oliveira',
    },
    {
      id: 'CC-003',
      name: 'Jardinagem',
      description: 'Equipe de jardinagem e paisagismo',
      budget: 8000,
      spent: 3400,
      manager: 'Luiza Ferreira',
    },
  ];

  const getRoleLabel = (role: string) => {
    const roles = {
      admin: 'Administrador',
      hr: 'RH',
      purchasing: 'Compras',
      supervisor: 'Supervisor',
    };
    return roles[role as keyof typeof roles] || role;
  };

  const getRoleColor = (role: string) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-800',
      hr: 'bg-blue-100 text-blue-800',
      purchasing: 'bg-green-100 text-green-800',
      supervisor: 'bg-orange-100 text-orange-800',
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const renderUsersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Gestão de Usuários</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Adicionar Usuário
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Usuário</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Papel</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Departamento</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Último Acesso</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {getRoleLabel(user.role)}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">{user.department}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {new Date(user.lastLogin).toLocaleDateString('pt-BR')}
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">Editar</button>
                    <button className="text-red-600 hover:text-red-700 text-sm">Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCostCentersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Centros de Custo</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Adicionar Centro de Custo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {costCenters.map((center) => (
          <div key={center.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{center.id}</h4>
              <Building className="w-6 h-6 text-gray-400" />
            </div>
            
            <h5 className="font-medium text-gray-900 mb-2">{center.name}</h5>
            <p className="text-sm text-gray-600 mb-4">{center.description}</p>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Orçamento</span>
                  <span className="font-medium">R$ {center.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Gasto</span>
                  <span className={center.spent > center.budget * 0.8 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                    R$ {center.spent.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${center.spent > center.budget * 0.8 ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.min((center.spent / center.budget) * 100, 100)}%` }}
                  />
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Responsável:</strong> {center.manager}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4">
              <button className="flex-1 text-blue-600 hover:text-blue-700 text-sm border border-blue-200 rounded px-3 py-1">
                Editar
              </button>
              <button className="flex-1 text-red-600 hover:text-red-700 text-sm border border-red-200 rounded px-3 py-1">
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlaceholderTab = (title: string, description: string, icon: React.ElementType) => {
    const Icon = icon;
    return (
      <div className="text-center py-12">
        <Icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return renderUsersTab();
      case 'costcenters':
        return renderCostCentersTab();
      case 'security':
        return renderPlaceholderTab('Configurações de Segurança', 'Configurações de segurança em desenvolvimento...', Shield);
      case 'notifications':
        return renderPlaceholderTab('Configurações de Notificações', 'Configurações de notificações em desenvolvimento...', Bell);
      case 'system':
        return renderPlaceholderTab('Configurações do Sistema', 'Configurações do sistema em desenvolvimento...', Database);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-1">Gerencie usuários, permissões e configurações do sistema</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;