import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  Upload,
  Users,
  Smartphone,
  GraduationCap,
  ClipboardList,
  Star,
  CheckSquare,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/estoque', icon: Package, label: 'Estoque' },
    { path: '/estoque/entrada', icon: Upload, label: 'Entrada NF' },
    { path: '/estoque/contagem', icon: ClipboardList, label: 'Inventário Rotativo' },
    { path: '/solicitacoes', icon: FileText, label: 'Solicitações' },
    { path: '/treinamentos', icon: GraduationCap, label: 'Treinamentos' },
    { path: '/relatorios', icon: BarChart3, label: 'Relatórios' },
    { path: '/fornecedores', icon: Star, label: 'Fornecedores' },
    { path: '/planos-acao', icon: CheckSquare, label: 'Planos de Ação' },
    { path: '/meus-epis', icon: Users, label: 'Meus EPIs' },
    { path: '/entrega-rapida', icon: Smartphone, label: 'Entrega Rápida' },
    { path: '/configuracoes', icon: Settings, label: 'Configurações' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">FocoLog</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      {/* Logo */}
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">FocoLog</h1>
        <p className="text-sm text-gray-500 mt-1">Gestão de EPIs</p>
      </div>

      {/* User Info */}
      <div className="p-3 lg:p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-900 text-sm lg:text-base">{user?.name}</p>
            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 lg:p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm lg:text-base">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-3 lg:p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm lg:text-base">Sair</span>
        </button>
      </div>
    </div>
    </>
  );
};

export default Sidebar;