import React, { useState, useEffect } from 'react';
import { Settings, Users, Building, Shield, Bell, Database, Briefcase } from 'lucide-react';
import { usersService, costCentersService } from '../../services/api';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'costcenters' | 'roles' | 'security' | 'notifications' | 'system'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [costCenters, setCostCenters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { id: 'users' as const, label: 'Usuários', icon: Users },
    { id: 'costcenters' as const, label: 'Centros de Custo', icon: Building },
    { id: 'roles' as const, label: 'Funções', icon: Briefcase },
    { id: 'security' as const, label: 'Segurança', icon: Shield },
    { id: 'notifications' as const, label: 'Notificações', icon: Bell },
    { id: 'system' as const, label: 'Sistema', icon: Database },
  ];

  // Carregar dados quando a aba muda
  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    } else if (activeTab === 'costcenters') {
      loadCostCenters();
    }
  }, [activeTab]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await usersService.getAll();
      
      const mappedUsers = response.results.map((user: any) => ({
        id: user.id.toString(),
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user',
        department: user.department || '',
        status: user.status || 'active',
        lastLogin: user.last_login || new Date().toISOString().split('T')[0],
      }));
      
      setUsers(mappedUsers);
    } catch (err) {
      console.error('Erro ao carregar usuários:', err);
      setError('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const loadCostCenters = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await costCentersService.getAll();
      
      const mappedCostCenters = response.results.map((center: any) => ({
        id: center.id.toString(),
        name: center.name || '',
        description: center.description || '',
        budget: center.budget || 0,
        spent: center.spent || 0,
        manager: center.manager || '',
      }));
      
      setCostCenters(mappedCostCenters);
    } catch (err) {
      console.error('Erro ao carregar centros de custo:', err);
      setError('Erro ao carregar centros de custo');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      id: '1',
      name: 'Soldador',
      description: 'Profissional especializado em soldagem',
      usersCount: 12,
    },
    {
      id: '2',
      name: 'Eletricista',
      description: 'Profissional especializado em instalações elétricas',
      usersCount: 8,
    },
    {
      id: '3',
      name: 'Técnico de Manutenção',
      description: 'Profissional responsável pela manutenção predial',
      usersCount: 15,
    },
    {
      id: '4',
      name: 'Auxiliar de Limpeza',
      description: 'Profissional responsável pela limpeza e conservação',
      usersCount: 25,
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
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando usuários...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadUsers}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      )}
      
      {!loading && !error && (
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Gestão de Usuários</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Adicionar Usuário
        </button>
      </div>
      )}
      
      {!loading && !error && (
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
      )}
    </div>
  );

  const renderCostCentersTab = () => (
    <div className="space-y-6">
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando centros de custo...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadCostCenters}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      )}
      
      {!loading && !error && (
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Centros de Custo</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Adicionar Centro de Custo
        </button>
      </div>
      )}

      {!loading && !error && (
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
      )}
    </div>
  );

  const renderRolesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Gestão de Funções</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Adicionar Função
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{role.name}</h4>
              <Briefcase className="w-6 h-6 text-gray-400" />
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{role.description}</p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Funcionários:</span>
                <span className="text-sm font-medium text-gray-900">{role.usersCount}</span>
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
      case 'roles':
        return renderRolesTab();
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