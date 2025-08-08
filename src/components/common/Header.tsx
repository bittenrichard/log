import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user } = useAuth();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 lg:py-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          {title && <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 truncate">{title}</h1>}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="w-4 h-4 lg:w-5 lg:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar itens..."
              className="pl-8 lg:pl-10 pr-3 lg:pr-4 py-1.5 lg:py-2 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-32 md:w-48 lg:w-auto"
            />
          </div>

          {/* Mobile Search Button */}
          <button 
            className="sm:hidden p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Mobile Search Expanded */}
          {isSearchExpanded && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-4 sm:hidden">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar itens..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  autoFocus
                />
              </div>
            </div>
          )}
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-500">
            <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>

          {/* User Avatar */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-700 truncate max-w-24 lg:max-w-none">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.department}</p>
            </div>
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;