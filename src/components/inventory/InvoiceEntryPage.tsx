import React, { useState } from 'react';
import { Upload, FileText, Check, AlertCircle, Plus } from 'lucide-react';

const InvoiceEntryPage: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        setUploadedFile(file);
        processInvoice(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      processInvoice(file);
    }
  };

  const processInvoice = async (file: File) => {
    setIsProcessing(true);
    
    // Simulate API processing
    setTimeout(() => {
      const mockExtractedData = {
        invoiceNumber: 'NF-2024-001234',
        supplier: 'EPI Solutions Ltda',
        date: '2024-01-15',
        items: [
          {
            description: 'Capacete de Segurança Branco - Tamanho M',
            quantity: 50,
            unitPrice: 89.90,
            total: 4495.00,
            category: 'EPI - Proteção da Cabeça'
          },
          {
            description: 'Luvas de Látex Descartáveis - Tamanho P',
            quantity: 1000,
            unitPrice: 0.85,
            total: 850.00,
            category: 'EPI - Proteção das Mãos'
          },
          {
            description: 'Óculos de Proteção Incolor',
            quantity: 25,
            unitPrice: 45.50,
            total: 1137.50,
            category: 'EPI - Proteção dos Olhos'
          }
        ],
        totalValue: 6482.50
      };
      
      setExtractedData(mockExtractedData);
      setIsProcessing(false);
    }, 3000);
  };

  const handleConfirmEntry = () => {
    // Process the entry to inventory
    alert('Entrada confirmada! Os itens foram adicionados ao estoque.');
    setUploadedFile(null);
    setExtractedData(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Entrada de Estoque via NF</h1>
        <p className="text-gray-600 mt-1">
          Faça upload da nota fiscal para cadastrar automaticamente os itens no estoque
        </p>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!uploadedFile ? (
            <>
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Faça upload da nota fiscal
              </h3>
              <p className="text-gray-600 mb-4">
                Arraste e solte o arquivo aqui, ou clique para selecionar
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Formatos aceitos: PDF, PNG, JPG (máx. 10MB)
              </p>
              <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                <Upload className="w-4 h-4 mr-2" />
                Selecionar Arquivo
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                />
              </label>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Check className="w-6 h-6 text-green-600" />
              </div>
              
              {isProcessing && (
                <div className="flex items-center justify-center space-x-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span>Processando nota fiscal...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Extracted Data */}
      {extractedData && !isProcessing && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Dados Extraídos da NF</h3>
            <div className="flex items-center space-x-2 text-green-600">
              <Check className="w-5 h-5" />
              <span className="text-sm font-medium">Processamento concluído</span>
            </div>
          </div>

          {/* Invoice Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Número da NF</p>
              <p className="font-semibold text-gray-900">{extractedData.invoiceNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fornecedor</p>
              <p className="font-semibold text-gray-900">{extractedData.supplier}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Data</p>
              <p className="font-semibold text-gray-900">
                {new Date(extractedData.date).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Item</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Categoria</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Qtd</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Valor Unit.</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {extractedData.items.map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{item.description}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{item.category}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{item.quantity}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">R$ {item.unitPrice.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      R$ {item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-300">
                  <td colSpan={4} className="py-3 px-4 text-right font-medium text-gray-900">
                    Total da NF:
                  </td>
                  <td className="py-3 px-4 text-lg font-bold text-gray-900">
                    R$ {extractedData.totalValue.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-orange-600">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">Verifique os dados antes de confirmar a entrada</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setUploadedFile(null);
                  setExtractedData(null);
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmEntry}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Confirmar Entrada
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-3">Dicas para melhor reconhecimento:</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Use arquivos PDF sempre que possível para melhor precisão</li>
          <li>• Certifique-se de que o texto esteja legível e não cortado</li>
          <li>• A qualidade da imagem influencia na precisão da extração</li>
          <li>• Verifique sempre os dados extraídos antes de confirmar</li>
        </ul>
      </div>
    </div>
  );
};

export default InvoiceEntryPage;