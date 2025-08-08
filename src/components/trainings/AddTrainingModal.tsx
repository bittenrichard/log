import React, { useState } from 'react';
import { X, GraduationCap, Save, Upload } from 'lucide-react';
import { Training } from '../../types';

interface AddTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (training: Partial<Training>) => void;
}

const AddTrainingModal: React.FC<AddTrainingModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    userId: '',
    trainingType: '',
    issueDate: '',
    expiryDate: '',
    certificateFile: null as File | null,
  });

  const trainingTypes = [
    'NR-06 - Equipamentos de Proteção Individual',
    'NR-10 - Segurança em Instalações e Serviços em Eletricidade',
    'NR-33 - Segurança e Saúde nos Trabalhos em Espaços Confinados',
    'NR-35 - Trabalho em Altura',
    'NR-18 - Condições e Meio Ambiente de Trabalho na Indústria da Construção',
    'NR-20 - Segurança e Saúde no Trabalho com Inflamáveis e Combustíveis',
  ];

  const employees = [
    { id: '1', name: 'Maria Silva' },
    { id: '2', name: 'João Santos' },
    { id: '3', name: 'Ana Costa' },
    { id: '4', name: 'Carlos Lima' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trainingData = {
      ...formData,
      issueDate: new Date(formData.issueDate),
      expiryDate: new Date(formData.expiryDate),
      certificateUrl: formData.certificateFile ? `/certificates/${formData.certificateFile.name}` : undefined,
    };
    onSave(trainingData);
    onClose();
    // Reset form
    setFormData({
      userId: '',
      trainingType: '',
      issueDate: '',
      expiryDate: '',
      certificateFile: null,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        certificateFile: e.target.files![0]
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Registrar Novo Treinamento</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Funcionário *
              </label>
              <select
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione um funcionário</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Treinamento *
              </label>
              <select
                name="trainingType"
                value={formData.trainingType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione o tipo de treinamento</option>
                {trainingTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Emissão *
              </label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Validade *
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certificado (PDF)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <label className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-700 font-medium">
                    Clique para fazer upload
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">PDF até 10MB</p>
                {formData.certificateFile && (
                  <p className="text-sm text-green-600 mt-2">
                    Arquivo selecionado: {formData.certificateFile.name}
                  </p>
                )}
              </div>
            </div>
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
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Registrar Treinamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTrainingModal;