import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { Search, Plus, Star, Phone, Mail, MapPin } from 'lucide-react';
import { Supplier, SupplierReview } from '../../types';
import AddSupplierReviewModal from './AddSupplierReviewModal';
import { suppliersService } from '../../services/api';

const SuppliersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  // Carregar dados do Baserow
  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await suppliersService.getAll();
      
      // Mapear dados do Baserow para o formato esperado
      const mappedSuppliers: Supplier[] = response.results.map((supplier: any) => ({
        id: supplier.id.toString(),
        name: supplier.name || '',
        contactInfo: supplier.contact_info || '',
        averageRating: supplier.average_rating || 0,
        totalReviews: supplier.total_reviews || 0,
      }));
      
      setSuppliers(mappedSuppliers);
    } catch (err) {
      console.error('Erro ao carregar fornecedores:', err);
      setError('Erro ao carregar fornecedores');
    } finally {
      setLoading(false);
    }
  };

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
    handleSaveReviewAsync(reviewData);
  };

  const handleSaveReviewAsync = async (reviewData: Partial<SupplierReview>) => {
    try {
      // Aqui você criaria uma tabela de avaliações no Baserow
      // Por enquanto, vamos apenas simular a atualização da avaliação média
      console.log('Saving supplier review:', reviewData);
      
      // Recarregar fornecedores após salvar avaliação
      await loadSuppliers();
    } catch (err) {
      console.error('Erro ao salvar avaliação:', err);
      setError('Erro ao salvar avaliação');
    }
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
        {loading && (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Carregando fornecedores...</p>
          </div>
        )}
        
        {error && (
          <div className="col-span-full text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={loadSuppliers}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )}
        
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