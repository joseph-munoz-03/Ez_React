import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Páginas Públicas
import Index from './pages/public/Index';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

// Páginas Cliente
import ClienteDashboard from './pages/cliente/Dashboard';
import ClientePerfil from './pages/cliente/Perfil';
import ClienteSeguridad from './pages/cliente/Seguridad';
import ClienteChats from './pages/cliente/Chats';
import ClienteMarketplace from './pages/cliente/Marketplace';
import ClienteCalendario from './pages/cliente/Calendario';

// Páginas Ingeniero
import IngenieroDashboard from './pages/ingeniero/Dashboard';
import IngenieroPerfil from './pages/ingeniero/Perfil';
import IngieroSeguridad from './pages/ingeniero/Seguridad';
import IngieroChats from './pages/ingeniero/Chats';
import IngieroMarketplace from './pages/ingeniero/Marketplace';
import IngieroCalendario from './pages/ingeniero/Calendario';

// Páginas Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminChats from './pages/admin/AdminChats';
import AdminContracts from './pages/admin/AdminContracts';
import AdminEmails from './pages/admin/AdminEmails';
import AdminMarketplace from './pages/admin/AdminMarketplace';
import AdminReports from './pages/admin/AdminReports';

// Componente de ruta protegida
const PrivateRoute = ({ children, isAuthenticated, userRole, requiredRole }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

/**
 * App Component - Enrutador principal de la aplicación
 * Maneja todas las rutas públicas, privadas y por rol
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar autenticación al cargar
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }

    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
    window.location.href = '/login';
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />

        {/* RUTAS CLIENTE */}
        <Route
          path="/cliente/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="CLIENTE">
              <ClienteDashboard onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/cliente/perfil"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="CLIENTE">
              <ClientePerfil onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/cliente/seguridad"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="CLIENTE">
              <ClienteSeguridad onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/cliente/chats"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="CLIENTE">
              <ClienteChats onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/cliente/marketplace"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="CLIENTE">
              <ClienteMarketplace onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/cliente/calendario"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="CLIENTE">
              <ClienteCalendario onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        {/* RUTAS INGENIERO */}
        <Route
          path="/ingeniero/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="INGENIERO">
              <IngenieroDashboard onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/ingeniero/perfil"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="INGENIERO">
              <IngenieroPerfil onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/ingeniero/seguridad"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="INGENIERO">
              <IngieroSeguridad onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/ingeniero/chats"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="INGENIERO">
              <IngieroChats onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/ingeniero/marketplace"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="INGENIERO">
              <IngieroMarketplace onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/ingeniero/calendario"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="INGENIERO">
              <IngieroCalendario onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        {/* RUTAS ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="ADMIN">
              <AdminDashboard onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="ADMIN">
              <AdminUsers onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/chats"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="ADMIN">
              <AdminChats onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/contratos"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="ADMIN">
              <AdminContracts onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/emails"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="ADMIN">
              <AdminEmails onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/marketplace"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="ADMIN">
              <AdminMarketplace onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/reportes"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="ADMIN">
              <AdminReports onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        {/* Ruta 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
