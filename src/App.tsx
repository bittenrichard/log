import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/routing/ProtectedRoute';

// Pages
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import InventoryPage from './components/inventory/InventoryPage';
import InvoiceEntryPage from './components/inventory/InvoiceEntryPage';
import RequestsPage from './components/requests/RequestsPage';
import ReportsPage from './components/reports/ReportsPage';
import SettingsPage from './components/settings/SettingsPage';
import QuickDeliveryPage from './components/delivery/QuickDeliveryPage';
import TrainingsPage from './components/trainings/TrainingsPage';
import InventoryCountPage from './components/inventory/InventoryCountPage';
import MyEPIsPage from './components/employee/MyEPIsPage';
import SuppliersPage from './components/suppliers/SuppliersPage';
import ActionPlansPage from './components/action-plans/ActionPlansPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              <Layout>
                <LoginPage />
              </Layout>
            } 
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout title="Dashboard">
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/estoque"
            element={
              <ProtectedRoute>
                <Layout title="Controle de Estoque">
                  <InventoryPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/estoque/entrada"
            element={
              <ProtectedRoute>
                <Layout title="Entrada de Estoque">
                  <InvoiceEntryPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/solicitacoes"
            element={
              <ProtectedRoute>
                <Layout title="Solicitações">
                  <RequestsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/relatorios"
            element={
              <ProtectedRoute>
                <Layout title="Relatórios">
                  <ReportsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/configuracoes"
            element={
              <ProtectedRoute>
                <Layout title="Configurações">
                  <SettingsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/entrega-rapida"
            element={
              <ProtectedRoute>
                <QuickDeliveryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/treinamentos"
            element={
              <ProtectedRoute>
                <Layout title="Treinamentos e Certificações">
                  <TrainingsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/estoque/contagem"
            element={
              <ProtectedRoute>
                <Layout title="Inventário Rotativo">
                  <InventoryCountPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/meus-epis"
            element={
              <ProtectedRoute>
                <Layout title="Meus EPIs">
                  <MyEPIsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/fornecedores"
            element={
              <ProtectedRoute>
                <Layout title="Fornecedores">
                  <SuppliersPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/planos-acao"
            element={
              <ProtectedRoute>
                <Layout title="Planos de Ação">
                  <ActionPlansPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Catch all - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;