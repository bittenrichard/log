import React, { useState } from 'react';
import { Search, Package, Save, AlertTriangle, CheckCircle } from 'lucide-react';
import { InventoryItem, InventoryCount } from '../../types';

const InventoryCountPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [countData, setCountData] = useState<Record<string, number>>({});
  const [isCountCompleted, setIsCountCompleted] = useState(false);
  const [divergences, setDivergences] = useState<InventoryCount[]>([]);

  const categories = [
    'Proteção da Cabeça',
    'Proteção das Mãos',
    'Proteção dos Olhos',
    'Proteção Respiratória',
    'Vestimentas',
    'Calçados de Segurança',
  ];

  const mockInventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: 'Capacete de Segurança Branco',
      type: 'epi',
      category: 'Proteção da Cabeça',
      size: 'M',
      quantity: 45,
      minStock: 20,
      unitCost: 89.90,
      supplier: 'EPI Solutions',
      lastUpdated: new Date('2024-01-15'),
      costCenter: 'CC-001',
    },
    {
      id: '2',
      name: 'Luvas de Látex Descartáveis',
      type: 'epi',
      category: 'Proteção das Mãos',
      size: 'P',
      quantity: 150,
      minStock: 50,
      unitCost: 0.85,
      supplier: 'ProSafe',
      lastUpdated: new Date('2024-01-14'),
      costCenter: 'CC-002',
    },
    {
      id: '3',
      name: 'Óculos de Proteção Incolor',
      type: 'epi',
      category: 'Proteção dos Olhos',
      size: 'Único',
      quantity: 28,
      minStock: 15,
      unitCost: 45.50,
      supplier: 'Safety First',
      lastUpdated: new Date('2024-01-13'),
      costCenter: 'CC-001',
    },
  ];

  const filteredItems = selectedCategory 
    ? mockInventoryItems.filter(item => item.category === selectedCategory)
    : [];

  const handleCountChange = (itemId: string, countedQuantity: number) => {
    setCountData(prev => ({
      ...prev,
      [itemId]: countedQuantity
    }));
  };

  const handleSubmitCount = () => {
    const newDivergences: InventoryCount[] = [];
    
    filteredItems.forEach(item => {
      const countedQuantity = countData[item.id] || 0;
      const divergence = countedQuantity - item.quantity;
      
      if (divergence !== 0) {
        newDivergences.push({
          id: `count-${item.id}`,
          itemId: item.id,
          itemName: item.name,
          systemQuantity: item.quantity,
          countedQuantity,
          divergence,
          userId: '1', // Current user
          date: new Date(),
        });
      }
    });

    setDivergences(newDivergences);
    setIsCountCompleted(true);
  };

  const getDivergenceColor = (divergence: number) => {
    if (divergence > 0) return 'text-green-600';
    if (divergence < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getDivergenceIcon = (divergence: number) => {
    if (divergence === 0) return <CheckCircle className="w-4 h-4 text-green-500" />;
    return <AlertTriangle className="w-4 h-4 text-orange-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inventário Rotativo</h1>
        <p className="text-gray-600 mt-1">Realize a contagem física do estoque por categoria</p>
      </div>

      {/* Category Selection */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Selecionar Categoria</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Count Form */}
      {selectedCategory && !isCountCompleted && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Contagem: {selectedCategory}
            </h3>
            <button
              onClick={handleSubmitCount}
              disabled={Object.keys(countData).length === 0}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Finalizar Contagem
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Item</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Tamanho</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Qtd. Sistema</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Qtd. Contada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <Package className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">{item.size}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.quantity}</td>
                    <td className="py-4 px-6">
                      <input
                        type="number"
                        min="0"
                        value={countData[item.id] || ''}
                        onChange={(e) => handleCountChange(item.id, parseInt(e.target.value) || 0)}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Divergences Report */}
      {isCountCompleted && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Relatório de Divergências</h3>
            <div className="flex items-center space-x-2">
              {divergences.length === 0 ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Sem divergências</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-orange-600">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm font-medium">{divergences.length} divergências encontradas</span>
                </div>
              )}
            </div>
          </div>

          {divergences.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Item</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Sistema</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Contado</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Divergência</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {divergences.map((divergence) => (
                    <tr key={divergence.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">{divergence.itemName}</td>
                      <td className="py-4 px-6 text-sm text-gray-900">{divergence.systemQuantity}</td>
                      <td className="py-4 px-6 text-sm text-gray-900">{divergence.countedQuantity}</td>
                      <td className="py-4 px-6">
                        <span className={`text-sm font-medium ${getDivergenceColor(divergence.divergence)}`}>
                          {divergence.divergence > 0 ? '+' : ''}{divergence.divergence}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {getDivergenceIcon(divergence.divergence)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Contagem Perfeita!</h4>
              <p className="text-gray-500">Todas as quantidades contadas coincidem com o sistema.</p>
            </div>
          )}

          <div className="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                setSelectedCategory('');
                setCountData({});
                setIsCountCompleted(false);
                setDivergences([]);
              }}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Nova Contagem
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Ajustar Estoque
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryCountPage;