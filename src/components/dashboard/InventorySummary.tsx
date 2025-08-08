import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { inventoryService } from '../../services/api';

const InventorySummary: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInventorySummary();
  }, []);

  const loadInventorySummary = async () => {
    try {
      setLoading(true);
      const response = await inventoryService.getAll();
      
      // Agrupar itens por categoria
      const categoryMap = new Map();
      
      response.results.forEach((item: any) => {
        const category = item.category || 'Outros';
        if (!categoryMap.has(category)) {
          categoryMap.set(category, {
            name: category,
            total: 0,
            available: 0,
            reserved: 0,
            trend: 'stable' as const,
            change: '0%',
            color: ['blue', 'green', 'purple', 'orange', 'red', 'indigo'][categoryMap.size % 6],
          });
        }
        
        const categoryData = categoryMap.get(category);
        categoryData.total += item.quantity || 0;
        categoryData.available += item.quantity || 0;
      });
      
      setCategories(Array.from(categoryMap.values()));
    } catch (err) {
      console.error('Erro ao carregar resumo do inventário:', err);
    } finally {
      setLoading(false);
    }
  };

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
        {loading ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">Carregando...</p>
          </div>
        ) : (
        categories.map((category) => (
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
        ))
        )}
      </div>
    </div>
  );
};

export default InventorySummary;