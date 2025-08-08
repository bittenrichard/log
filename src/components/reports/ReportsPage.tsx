import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Filter, DollarSign, Package, TrendingUp, FileSpreadsheet } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<'consumption' | 'cost' | 'movement'>('consumption');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCostCenter, setSelectedCostCenter] = useState('all');

  const reportTypes = [
    {
      id: 'consumption' as const,
      title: 'Relatório de Consumo',
      description: 'Consumo de EPIs por centro de custo e período',
      icon: Package,
      color: 'blue',
    },
    {
      id: 'cost' as const,
      title: 'Relatório de Custos',
      description: 'Custos totais com EPIs e uniformes',
      icon: DollarSign,
      color: 'green',
    },
    {
      id: 'movement' as const,
      title: 'Histórico de Movimentação',
      description: 'Entradas e saídas do estoque',
      icon: TrendingUp,
      color: 'purple',
    },
    {
      id: 'esocial' as const,
      title: 'Relatório de Entregas para eSocial',
      description: 'Exporte os registros de entrega de EPIs no formato CSV padrão para importação em sistemas de folha de pagamento',
      icon: FileSpreadsheet,
      color: 'indigo',
    },
    {
      id: 'consumption-by-role' as const,
      title: 'Consumo por Função',
      description: 'Análise de consumo de EPIs por função/atividade dos funcionários',
      icon: BarChart3,
      color: 'purple',
    },
  ];

  const mockConsumptionData = [
    {
      costCenter: 'CC-001 - Limpeza',
      items: [
        { name: 'Luvas descartáveis', quantity: 2500, cost: 2125.00 },
        { name: 'Avental descartável', quantity: 150, cost: 1800.00 },
        { name: 'Máscara PFF2', quantity: 300, cost: 900.00 }
      ],
      total: 4825.00
    },
    {
      costCenter: 'CC-002 - Manutenção',
      items: [
        { name: 'Capacete de segurança', quantity: 25, cost: 2247.50 },
        { name: 'Óculos de proteção', quantity: 50, cost: 2275.00 },
        { name: 'Botas de segurança', quantity: 15, cost: 1875.00 }
      ],
      total: 6397.50
    },
    {
      costCenter: 'CC-003 - Jardinagem',
      items: [
        { name: 'Botas de borracha', quantity: 12, cost: 720.00 },
        { name: 'Luvas de couro', quantity: 30, cost: 450.00 },
        { name: 'Chapéu de proteção', quantity: 18, cost: 360.00 }
      ],
      total: 1530.00
    }
  ];

  const getReportColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    };
    return colors[color as keyof typeof colors];
  };

  const handleDownloadESocial = () => {
    // Create mock CSV data
    const csvData = [
      ['Data', 'Funcionario', 'CPF', 'EPI', 'CA', 'Entrega', 'Devolucao'],
      ['15/01/2024', 'Maria Silva', '123.456.789-00', 'Capacete de Segurança', '12345', '15/01/2024', ''],
      ['15/01/2024', 'João Santos', '987.654.321-00', 'Luvas de Látex', '67890', '15/01/2024', ''],
      ['14/01/2024', 'Ana Costa', '456.789.123-00', 'Botas de Segurança', '11111', '14/01/2024', ''],
    ];

    // Convert to CSV string
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'entregas_esocial.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderConsumptionReport = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total de Itens</p>
              <p className="text-2xl font-bold text-blue-900">3,100</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Custo Total</p>
              <p className="text-2xl font-bold text-green-900">R$ 12.753</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Centros de Custo</p>
              <p className="text-2xl font-bold text-purple-900">3</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Detailed Data */}
      {mockConsumptionData.map((center, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{center.costCenter}</h3>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total do período</p>
              <p className="text-xl font-bold text-green-600">R$ {center.total.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Item</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-500">Quantidade</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-500">Custo Total</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-500">Custo Médio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {center.items.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td className="py-3 font-medium text-gray-900">{item.name}</td>
                    <td className="py-3 text-right text-gray-900">{item.quantity}</td>
                    <td className="py-3 text-right font-medium text-gray-900">R$ {item.cost.toFixed(2)}</td>
                    <td className="py-3 text-right text-gray-600">R$ {(item.cost / item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );

  const renderReport = () => {
    switch (selectedReport) {
      case 'consumption':
        return renderConsumptionReport();
      case 'cost':
        return (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
            <DollarSign className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Relatório de Custos</h3>
            <p className="text-gray-500">Relatório de custos em desenvolvimento...</p>
          </div>
        );
      case 'movement':
        return (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
            <TrendingUp className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Histórico de Movimentação</h3>
            <p className="text-gray-500">Relatório de movimentação em desenvolvimento...</p>
          </div>
        );
      case 'esocial':
        return (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="text-center mb-8">
              <FileSpreadsheet className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Relatório de Entregas para eSocial</h3>
              <p className="text-gray-500 mb-6">
                Exporte os registros de entrega de EPIs no formato CSV padrão para importação em sistemas de folha de pagamento.
              </p>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200 mb-6">
              <h4 className="font-medium text-indigo-900 mb-3">Informações do Relatório:</h4>
              <ul className="text-sm text-indigo-800 space-y-2">
                <li>• Formato: CSV (Comma Separated Values)</li>
                <li>• Campos: Data, Funcionário, CPF, EPI, CA, Entrega, Devolução</li>
                <li>• Compatível com sistemas de RH e folha de pagamento</li>
                <li>• Dados dos últimos 30 dias</li>
              </ul>
            </div>
            
            <div className="text-center">
              <button
                onClick={handleDownloadESocial}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                <Download className="w-5 h-5 mr-2" />
                Gerar e Baixar CSV
              </button>
            </div>
          </div>
        );
      case 'consumption-by-role':
        return (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
            <BarChart3 className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Consumo por Função</h3>
            <p className="text-gray-500">Relatório de consumo por função em desenvolvimento...</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600 mt-1">Análise detalhada de consumo, custos e movimentação</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Exportar PDF
        </button>
      </div>

      {/* Report Type Selection */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipo de Relatório</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedReport(type.id)}
              className={`p-4 rounded-lg border-2 text-left transition-colors h-full ${
                selectedReport === type.id
                  ? `${getReportColor(type.color)} border-current`
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <type.icon className="w-6 h-6" />
                <div>
                  <h4 className="font-medium text-sm">{type.title}</h4>
                  <p className="text-sm opacity-75">{type.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Period */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
            <div className="relative">
              <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">Esta semana</option>
                <option value="month">Este mês</option>
                <option value="quarter">Este trimestre</option>
                <option value="year">Este ano</option>
              </select>
            </div>
          </div>

          {/* Cost Center */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Centro de Custo</label>
            <div className="relative">
              <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCostCenter}
                onChange={(e) => setSelectedCostCenter(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos</option>
                <option value="CC-001">CC-001 - Limpeza</option>
                <option value="CC-002">CC-002 - Manutenção</option>
                <option value="CC-003">CC-003 - Jardinagem</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Gerar Relatório
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      {renderReport()}
    </div>
  );
};

export default ReportsPage;