import React, { useState } from 'react';
import { QrCode, User, Package, CheckCircle, Scan } from 'lucide-react';

interface ScannedEmployee {
  id: string;
  name: string;
  department: string;
  badge: string;
}

interface ScannedEPI {
  id: string;
  name: string;
  size: string;
  caNumber: string;
}

const QuickDeliveryPage: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<ScannedEmployee | null>(null);
  const [scannedEPIs, setScannedEPIs] = useState<ScannedEPI[]>([]);
  const [isEmployeeScanned, setIsEmployeeScanned] = useState(false);

  const handleScanEmployee = () => {
    // Simulate scanning employee badge
    const mockEmployee: ScannedEmployee = {
      id: '001',
      name: 'Maria Silva',
      department: 'Limpeza',
      badge: 'FUNC001',
    };
    
    setSelectedEmployee(mockEmployee);
    setIsEmployeeScanned(true);
  };

  const handleScanEPI = () => {
    // Simulate scanning EPI QR code
    const mockEPIs: ScannedEPI[] = [
      {
        id: '1',
        name: 'Luvas de Látex Descartáveis',
        size: 'P',
        caNumber: '67890',
      },
      {
        id: '2',
        name: 'Avental Descartável',
        size: 'M',
        caNumber: '11111',
      },
    ];

    // Add new EPIs to the list (avoiding duplicates)
    const newEPIs = mockEPIs.filter(
      newEPI => !scannedEPIs.some(existing => existing.id === newEPI.id)
    );
    
    setScannedEPIs(prev => [...prev, ...newEPIs]);
  };

  const handleFinalizeDelivery = () => {
    if (selectedEmployee && scannedEPIs.length > 0) {
      alert(`Entrega finalizada para ${selectedEmployee.name}!\n${scannedEPIs.length} itens entregues.`);
      // Reset state
      setSelectedEmployee(null);
      setScannedEPIs([]);
      setIsEmployeeScanned(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4">
      <div className="max-w-sm sm:max-w-md mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Entrega Rápida</h1>
          <p className="text-sm sm:text-base text-gray-600">Sistema mobile para supervisores</p>
        </div>

        {/* Selected Employee Card */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Funcionário Selecionado:</h3>
          {selectedEmployee ? (
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-900 text-sm sm:text-base">{selectedEmployee.name}</p>
                <p className="text-sm text-green-700">{selectedEmployee.department}</p>
                <p className="text-xs text-green-600">Crachá: {selectedEmployee.badge}</p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm sm:text-base text-gray-500">Nenhum funcionário selecionado</p>
            </div>
          )}
        </div>

        {/* Scan Employee Button */}
        <button
          onClick={handleScanEmployee}
          className="w-full bg-blue-600 text-white rounded-xl p-4 sm:p-6 hover:bg-blue-700 transition-colors shadow-sm"
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <QrCode className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
            <div className="text-left">
              <p className="font-semibold text-sm sm:text-lg">1. Escanear Crachá do Funcionário</p>
              <p className="text-blue-100 text-xs sm:text-sm">Aponte a câmera para o QR code</p>
            </div>
          </div>
        </button>

        {/* Scan EPIs Button */}
        <button
          onClick={handleScanEPI}
          disabled={!isEmployeeScanned}
          className={`w-full rounded-xl p-6 transition-colors shadow-sm ${
            isEmployeeScanned
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <Scan className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
            <div className="text-left">
              <p className="font-semibold text-sm sm:text-lg">2. Escanear EPIs para Entrega</p>
              <p className={`text-xs sm:text-sm ${isEmployeeScanned ? 'text-green-100' : 'text-gray-400'}`}>
                Escaneie cada item individualmente
              </p>
            </div>
          </div>
        </button>

        {/* Scanned EPIs List */}
        {scannedEPIs.length > 0 && (
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">EPIs Escaneados:</h3>
            <div className="space-y-3">
              {scannedEPIs.map((epi) => (
                <div key={epi.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{epi.name}</p>
                      <p className="text-sm text-gray-500">Tam: {epi.size} | CA: {epi.caNumber}</p>
                    </div>
                  </div>
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Finalize Delivery Button */}
        <button
          onClick={handleFinalizeDelivery}
          disabled={!selectedEmployee || scannedEPIs.length === 0}
          className={`w-full rounded-xl p-6 transition-colors shadow-sm font-semibold text-lg ${
            selectedEmployee && scannedEPIs.length > 0
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Finalizar Entrega
        </button>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">Instruções:</h4>
          <ol className="text-xs sm:text-sm text-blue-800 space-y-1">
            <li>1. Escaneie primeiro o crachá do funcionário</li>
            <li>2. Escaneie cada EPI que será entregue</li>
            <li>3. Confirme a entrega no botão final</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default QuickDeliveryPage;