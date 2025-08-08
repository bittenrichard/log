import React from 'react';
import { AlertTriangle, Package, FileText, TrendingUp, Users, DollarSign } from 'lucide-react';
import StatsCard from './StatsCard';
import AlertsPanel from './AlertsPanel';
import RecentRequests from './RecentRequests';
import InventorySummary from './InventorySummary';
import CAValidityAlerts from './CAValidityAlerts';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total de Itens',
      value: '1,247',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Package,
      color: 'blue',
    },
    {
      title: 'Solicitações Pendentes',
      value: '23',
      change: '-8%',
      changeType: 'negative' as const,
      icon: FileText,
      color: 'orange',
    },
    {
      title: 'Custo Mensal',
      value: 'R$ 45.890',
      change: '+5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'green',
    },
    {
      title: 'Usuários Ativos',
      value: '89',
      change: '+15%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'purple',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Bem-vindo ao FocoLog</h1>
        <p className="text-blue-100">
          Sistema inteligente de gestão de EPIs e uniformes para sua empresa
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Alerts Panel - Takes 1 column */}
        <div className="lg:col-span-1">
          <AlertsPanel />
        </div>

        {/* CA Validity Alerts - Takes 1 column */}
        <div className="lg:col-span-1">
          <CAValidityAlerts />
        </div>

        {/* Recent Requests - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentRequests />
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-1">
        <InventorySummary />
      </div>
    </div>
  );
};

export default Dashboard;