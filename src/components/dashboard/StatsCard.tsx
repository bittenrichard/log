import React, { useState, useEffect } from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { inventoryService, requestsService, usersService } from '../../services/api';

interface StatsCardProps {
  title: string;
  value?: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'orange' | 'purple';
  dataType?: 'inventory' | 'requests' | 'cost' | 'users';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value: initialValue,
  change,
  changeType,
  icon: Icon,
  color,
  dataType,
}) => {
  const [value, setValue] = useState(initialValue || '0');
  const [loading, setLoading] = useState(!!dataType);

  useEffect(() => {
    if (dataType) {
      loadData();
    }
  }, [dataType]);

  const loadData = async () => {
    try {
      setLoading(true);
      let result = '0';
      
      switch (dataType) {
        case 'inventory':
          const inventoryResponse = await inventoryService.getAll();
          result = inventoryResponse.results.length.toString();
          break;
        case 'requests':
          const requestsResponse = await requestsService.getAll();
          const pendingRequests = requestsResponse.results.filter((r: any) => r.status === 'pending');
          result = pendingRequests.length.toString();
          break;
        case 'cost':
          const costResponse = await inventoryService.getAll();
          const totalCost = costResponse.results.reduce((sum: number, item: any) => 
            sum + ((item.quantity || 0) * (item.unit_cost || 0)), 0
          );
          result = `R$ ${totalCost.toFixed(2)}`;
          break;
        case 'users':
          const usersResponse = await usersService.getAll();
          const activeUsers = usersResponse.results.filter((u: any) => u.status === 'active');
          result = activeUsers.length.toString();
          break;
      }
      
      setValue(result);
    } catch (err) {
      console.error('Erro ao carregar dados do card:', err);
      setValue('Erro');
    } finally {
      setLoading(false);
    }
  };

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
            ) : (
              value
            )}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      <div className="mt-4 flex items-center">
        {changeType === 'positive' ? (
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
        )}
        <span
          className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-1">vs último mês</span>
      </div>
    </div>
  );
};

export default StatsCard;