import React from 'react';
import { Package, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const InventorySummary: React.FC = () => {
  const categories = [
    {
      name: 'Capacetes de Segurança',
      total: 145,
      available: 132,
      reserved: 13,
      trend: 'up' as const,
      change: '+5%',
      color: 'blue',
    },
    {
      name: 'Luvas de Proteção',
      total: 1250,
      available: 1180,
      reserved: 70,
      trend: 'down' as const,
      change: '-12%',
      color: 'green',
    },
    {
      name: 'Óculos de Segurança',
      total: 89,
      available: 76,
      reserved: 13,
      trend: 'up' as const,
      change: '+8%',
      color: 'purple',
    },
    {
      name: 'Uniformes',
      total: 320,
      available: 298,
      reserved: 22,
      trend: 'stable' as const,
      change: '0%',
      color: 'orange',
    },
    {
      name: 'Calçados de Segurança',
      total: 67,
      available: 54,
      reserved: 13,
      trend: 'up' as const,
      change: '+15%',
      color: 'red',
    },
    {
      name: 'Equipamentos Diversos',
      total: 203,
      available: 189,
      reserved: 14,
      trend: 'down' as const,
      change: '-3%',
      color: 'indigo',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    };
    return colors[color as keyof typeof colors];
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Resumo do Inventário</h3>
        <Package className="w-5 h-5 text-gray-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`p-4 rounded-lg border ${getColorClasses(category.color)} transition-colors hover:shadow-sm`}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 text-sm">{category.name}</h4>
              {getTrendIcon(category.trend)}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Total:</span>
                <span className="text-sm font-semibold text-gray-900">{category.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Disponível:</span>
                <span className="text-sm font-medium text-green-600">{category.available}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Reservado:</span>
                <span className="text-sm font-medium text-orange-600">{category.reserved}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Variação mensal</span>
                <span className={`text-xs font-medium ${
                  category.trend === 'up' ? 'text-green-600' : 
                  category.trend === 'down' ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {category.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventorySummary;