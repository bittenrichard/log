import React, { useState } from 'react';
import { X, Star, Save } from 'lucide-react';
import { Supplier, SupplierReview } from '../../types';

interface AddSupplierReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: Supplier | null;
  onSave: (review: Partial<SupplierReview>) => void;
}

const AddSupplierReviewModal: React.FC<AddSupplierReviewModalProps> = ({ 
  isOpen, 
  onClose, 
  supplier, 
  onSave 
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplier || rating === 0) return;

    const reviewData = {
      supplierId: supplier.id,
      rating,
      comment,
    };

    onSave(reviewData);
    onClose();
    
    // Reset form
    setRating(0);
    setHoveredRating(0);
    setComment('');
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <button
          key={index}
          type="button"
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          className="focus:outline-none"
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              starValue <= (hoveredRating || rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300 hover:text-yellow-200'
            }`}
          />
        </button>
      );
    });
  };

  const getRatingLabel = (rating: number) => {
    switch (rating) {
      case 1: return 'Muito Ruim';
      case 2: return 'Ruim';
      case 3: return 'Regular';
      case 4: return 'Bom';
      case 5: return 'Excelente';
      default: return 'Selecione uma avaliação';
    }
  };

  if (!isOpen || !supplier) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Star className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-900">Avaliar Fornecedor</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Supplier Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-1">{supplier.name}</h3>
            <p className="text-sm text-gray-600">{supplier.contactInfo}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm text-gray-600">Avaliação atual:</span>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < Math.floor(supplier.averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm font-medium text-gray-900 ml-1">
                  {supplier.averageRating.toFixed(1)} ({supplier.totalReviews} avaliações)
                </span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Sua Avaliação *
            </label>
            <div className="flex items-center space-x-2 mb-2">
              {renderStars()}
            </div>
            <p className="text-sm text-gray-600">
              {getRatingLabel(hoveredRating || rating)}
            </p>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentário
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Compartilhe sua experiência com este fornecedor..."
            />
          </div>

          {/* Rating Criteria */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Critérios de Avaliação:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Qualidade dos produtos fornecidos</li>
              <li>• Pontualidade nas entregas</li>
              <li>• Atendimento ao cliente</li>
              <li>• Preços competitivos</li>
              <li>• Conformidade com especificações</li>
            </ul>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Avaliação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplierReviewModal;