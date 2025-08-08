import React, { useState } from 'react';
import { Search, Plus, Star, Phone, Mail, MapPin } from 'lucide-react';
import { Supplier, SupplierReview } from '../../types';
import AddSupplierReviewModal from './AddSupplierReviewModal';

const SuppliersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'EPI Solutions',
      contactInfo: 'contato@episolutions.com | (11) 1234-5678',
      averageRating: 4.5,
      totalReviews: 12,
    },
    {
      id: '2',
      name: 'ProSafe',
      contactInfo: 'vendas@prosafe.com.br | (11) 9876-5432',
      averageRating: 4.2,
      totalReviews: 8,
    },
    {
      id: '3',
      name: 'Uniformes Plus',
      contactInfo: 'pedidos@uniformesplus.com | (11) 5555-1234',
      averageRating: 3.8,
      totalReviews: 15,
    },
    {
      id: '4',
      name: 'Safety First',
      contactInfo: 'atendimento@safetyfirst.com.br | (11) 7777-8888',
      averageRating: 4.7,
      totalReviews: 20,
    },
  ];

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleAddReview = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsReviewModalOpen(true);
  };

  const handleSaveReview = (reviewData: Partial<SupplierReview>) => {
    console.log('Saving supplier review:', reviewData);
    // In a real app, this would make an API call
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fornecedores</h1>
          <p className="text-gray-600 mt-1">Gerencie e avalie seus fornecedores de EPIs</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Fornecedor
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar fornecedores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
              <div className="flex items-center space-x-1">
                {renderStars(supplier.averageRating)}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{supplier.contactInfo.split(' | ')[0]}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{supplier.contactInfo.split(' | ')[1]}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Avaliação Média</p>
                <p className="text-lg font-bold text-gray-900">
                  {supplier.averageRating.toFixed(1)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total de Avaliações</p>
                <p className="text-lg font-bold text-gray-900">{supplier.totalReviews}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleAddReview(supplier)}
                className="flex-1 text-blue-600 hover:text-blue-700 text-sm border border-blue-200 rounded px-3 py-2 hover:bg-blue-50 transition-colors"
              >
                Avaliar
              </button>
              <button className="flex-1 text-gray-600 hover:text-gray-700 text-sm border border-gray-200 rounded px-3 py-2 hover:bg-gray-50 transition-colors">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum fornecedor encontrado</h3>
          <p className="text-gray-500">Tente ajustar sua busca ou adicionar um novo fornecedor.</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Fornecedores</p>
              <p className="text-2xl font-bold text-gray-900">{suppliers.length}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avaliação Média</p>
              <p className="text-2xl font-bold text-yellow-600">
                {(suppliers.reduce((sum, s) => sum + s.averageRating, 0) / suppliers.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Avaliações</p>
              <p className="text-2xl font-bold text-green-600">
                {suppliers.reduce((sum, s) => sum + s.totalReviews, 0)}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Melhor Avaliado</p>
              <p className="text-lg font-bold text-purple-600">
                {suppliers.reduce((best, current) => 
                  current.averageRating > best.averageRating ? current : best
                ).name}
              </p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Supplier Review Modal */}
      <AddSupplierReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        supplier={selectedSupplier}
        onSave={handleSaveReview}
      />
    </div>
  );
};

export default SuppliersPage;