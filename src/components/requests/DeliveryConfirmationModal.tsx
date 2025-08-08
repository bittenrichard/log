import React, { useState, useRef } from 'react';
import { X, FileText, Save, RotateCcw } from 'lucide-react';
import { Request } from '../../types';

interface DeliveryConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: Request | null;
  onConfirmDelivery: (signature: string) => void;
}

const DeliveryConfirmationModal: React.FC<DeliveryConfirmationModalProps> = ({
  isOpen,
  onClose,
  request,
  onConfirmDelivery,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const responsibilityText = `Declaro para os devidos fins que recebi da empresa os equipamentos de proteção individual (EPIs) listados acima, em perfeitas condições de uso. Comprometo-me a utilizá-los adequadamente durante o horário de trabalho e a zelar pela sua conservação.`;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
      setHasSignature(true);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasSignature(false);
    }
  };

  const handleConfirmDelivery = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature) return;

    const signatureData = canvas.toDataURL();
    onConfirmDelivery(signatureData);
    onClose();
  };

  // Initialize canvas
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [isOpen]);

  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Confirmação de Entrega e Ficha de EPI
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Delivery Summary */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">Resumo da Entrega</h3>
            <p className="text-blue-800">
              Entregando{' '}
              {request.items.map((item, index) => (
                <span key={index}>
                  {item.quantity} {item.itemName} Tam. {item.size}
                  {index < request.items.length - 1 && ', '}
                </span>
              ))}{' '}
              para <strong>{request.requesterName}</strong>.
            </p>
          </div>

          {/* Responsibility Term */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Termo de Responsabilidade
            </label>
            <textarea
              value={responsibilityText}
              readOnly
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 resize-none"
            />
          </div>

          {/* Signature Pad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assinatura do Funcionário
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <canvas
                ref={canvasRef}
                width={500}
                height={200}
                className="w-full h-48 border border-gray-200 rounded cursor-crosshair bg-white"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Clique e arraste para assinar
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              onClick={clearSignature}
              className="inline-flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Limpar Assinatura
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelivery}
                disabled={!hasSignature}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Confirmar Entrega e Salvar Assinatura
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryConfirmationModal;