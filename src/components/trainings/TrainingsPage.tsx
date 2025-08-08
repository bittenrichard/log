import React, { useState } from 'react';
import { Search, Filter, Plus, GraduationCap, Calendar, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Training } from '../../types';
import AddTrainingModal from './AddTrainingModal';

const TrainingsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'valid' | 'expiring' | 'expired'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const trainings: Training[] = [
    {
      id: '1',
      userId: '1',
      userName: 'Maria Silva',
      trainingType: 'NR-10 - Segurança em Instalações e Serviços em Eletricidade',
      issueDate: new Date('2023-06-15'),
      expiryDate: new Date('2025-06-15'),
      certificateUrl: '/certificates/nr10-maria.pdf',
      status: 'valid',
    },
    {
      id: '2',
      userId: '2',
      userName: 'João Santos',
      trainingType: 'NR-35 - Trabalho em Altura',
      issueDate: new Date('2023-01-20'),
      expiryDate: new Date('2024-01-20'),
      certificateUrl: '/certificates/nr35-joao.pdf',
      status: 'expired',
    },
    {
      id: '3',
      userId: '3',
      userName: 'Ana Costa',
      trainingType: 'NR-06 - Equipamentos de Proteção Individual',
      issueDate: new Date('2023-11-10'),
      expiryDate: new Date('2024-05-10'),
      certificateUrl: '/certificates/nr06-ana.pdf',
      status: 'expiring',
    },
  ];

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = 
      training.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.trainingType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || training.status === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'expiring':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-4 h-4" />;
      case 'expiring':
        return <AlertTriangle className="w-4 h-4" />;
      case 'expired':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'valid': return 'Válido';
      case 'expiring': return 'A Vencer';
      case 'expired': return 'Vencido';
      default: return status;
    }
  };

  const handleSaveTraining = (trainingData: Partial<Training>) => {
    console.log('Saving training:', trainingData);
    // In a real app, this would make an API call
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Treinamentos e Certificações</h1>
          <p className="text-gray-600 mt-1">Gerencie os treinamentos obrigatórios (NRs) dos funcionários</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Registrar Treinamento
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por funcionário ou treinamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os status</option>
            <option value="valid">Válidos</option>
            <option value="expiring">A Vencer</option>
            <option value="expired">Vencidos</option>
          </select>

          {/* Training Type Filter */}
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">Todos os tipos</option>
            <option value="nr10">NR-10</option>
            <option value="nr35">NR-35</option>
            <option value="nr06">NR-06</option>
            <option value="nr33">NR-33</option>
          </select>
        </div>
      </div>

      {/* Trainings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Funcionário</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Treinamento</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Data de Emissão</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Data de Validade</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Certificado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTrainings.map((training) => (
                <tr key={training.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{training.userName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-gray-900">{training.trainingType}</p>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {training.issueDate.toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {training.expiryDate.toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(training.status)}`}>
                      {getStatusIcon(training.status)}
                      <span>{getStatusLabel(training.status)}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {training.certificateUrl ? (
                      <a
                        href={training.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        Ver Certificado
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTrainings.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum treinamento encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou registrar um novo treinamento.</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Treinamentos</p>
              <p className="text-2xl font-bold text-gray-900">{trainings.length}</p>
            </div>
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Válidos</p>
              <p className="text-2xl font-bold text-green-600">
                {trainings.filter(t => t.status === 'valid').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">A Vencer</p>
              <p className="text-2xl font-bold text-yellow-600">
                {trainings.filter(t => t.status === 'expiring').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vencidos</p>
              <p className="text-2xl font-bold text-red-600">
                {trainings.filter(t => t.status === 'expired').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Add Training Modal */}
      <AddTrainingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTraining}
      />
    </div>
  );
};

export default TrainingsPage;