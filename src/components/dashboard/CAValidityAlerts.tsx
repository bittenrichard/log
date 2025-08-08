import React from 'react';
import { AlertTriangle, Calendar, ArrowRight } from 'lucide-react';
import { CAAlert } from '../../types';

const CAValidityAlerts: React.FC = () => {
  // Mock data - in a real app, this would come from props or API
  const caAlerts: CAAlert[] = [
    {
      id: '1',
      itemId: '1',
      itemName: 'Capacete de Segurança Branco',
      caNumber: '12345',
      expiryDate: new Date('2024-06-15'),
      daysUntilExpiry: 45,
      severity: 'warning',
    },
    {
      id: '2',
      itemId: '2',
      itemName: 'Luvas de Látex Descartáveis',
      caNumber: '67890',
      expiryDate: new Date('2023-12-01'),
      daysUntilExpiry: -45,
      severity: 'expired',
    },
    {
      id: '3',
      itemId: '3',
      itemName: 'Óculos de Proteção',
      caNumber: '11111',
      expiryDate: new Date('2024-03-20'),
      daysUntilExpiry: 20,
      severity: 'warning',
    },
  ];

  const getSeverityColor = (severity: 'warning' | 'expired') => {
    return severity === 'expired' 
      ? 'bg-red-50 border-red-200 text-red-800'
      : 'bg-orange-50 border-orange-200 text-orange-800';
  };

  const formatExpiryMessage = (alert: CAAlert) => {
    if (alert.severity === 'expired') {
      return `Venceu em ${alert.expiryDate.toLocaleDateString('pt-BR')}`;
    }
    return `Vence em ${alert.expiryDate.toLocaleDateString('pt-BR')}`;
  };

  const handleItemClick = (itemId: string) => {
    // In a real app, this would navigate to the item edit page
    console.log('Navigate to edit item:', itemId);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Alertas de Validade</h3>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-orange-500" />
          <span className="text-sm font-medium text-orange-600">{caAlerts.length}</span>
        </div>
      </div>

      <div className="space-y-3">
        {caAlerts.map((alert) => (
          <button
            key={alert.id}
            onClick={() => handleItemClick(alert.itemId)}
            className={`w-full p-4 rounded-lg border ${getSeverityColor(alert.severity)} transition-colors hover:shadow-sm text-left`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 mt-0.5 text-orange-500" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 mb-1">{alert.itemName}</p>
                  <p className="text-sm text-gray-600 mb-1">CA: {alert.caNumber}</p>
                  <p className="text-sm font-medium">
                    ⚠️ {formatExpiryMessage(alert)}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          </button>
        ))}
      </div>

      {caAlerts.length === 0 && (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum alerta de validade no momento</p>
        </div>
      )}

      <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
        Ver todos os certificados
      </button>
    </div>
  );
};

export default CAValidityAlerts;