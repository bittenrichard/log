import React from 'react';
import { AlertTriangle, Package, Clock, ArrowRight, Plus } from 'lucide-react';

const AlertsPanel: React.FC = () => {
  const alerts = [
    {
      id: 1,
      type: 'stock',
      title: 'Estoque baixo',
      message: 'Capacete de segurança - Tamanho M',
      quantity: 5,
      severity: 'critical' as const,
      time: '2h atrás',
    },
    {
      id: 2,
      type: 'request',
      title: 'Solicitação urgente',
      message: 'Luvas P/M/G - Centro de Custo ABC',
      quantity: 50,
      severity: 'warning' as const,
      time: '4h atrás',
    },
    {
      id: 3,
      type: 'stock',
      title: 'Estoque baixo',
      message: 'Colete refletivo - Tamanho G',
      quantity: 8,
      severity: 'warning' as const,
      time: '6h atrás',
    },
  ];

  const handleCreateAction = (alertId: number) => {
    console.log('Creating action for alert:', alertId);
    // In a real app, this would open a modal or navigate to action creation
  };

  const getSeverityColor = (severity: 'critical' | 'warning') => {
    return severity === 'critical' 
      ? 'bg-red-50 border-red-200 text-red-800'
      : 'bg-orange-50 border-orange-200 text-orange-800';
  };

  const getSeverityIcon = (severity: 'critical' | 'warning') => {
    return severity === 'critical' ? 'text-red-500' : 'text-orange-500';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Alertas do Sistema</h3>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <span className="text-sm font-medium text-orange-600">{alerts.length}</span>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} transition-colors hover:shadow-sm`}
          >
            <div className="flex items-start space-x-3">
              <AlertTriangle className={`w-5 h-5 mt-0.5 ${getSeverityIcon(alert.severity)}`} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 mb-1">{alert.title}</p>
                <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {alert.time}
                    </span>
                    <span className="text-xs font-medium text-gray-700 flex items-center">
                      <Package className="w-3 h-3 mr-1" />
                      Qtd: {alert.quantity}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                <button
                  onClick={() => handleCreateAction(alert.id)}
                  className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                  title="Criar Ação"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
        Ver todos os alertas
      </button>
    )
    )
    }
    </div>
  );
};

export default AlertsPanel;