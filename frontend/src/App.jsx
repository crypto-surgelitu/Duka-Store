/**
 * @file App.jsx
 * Main router file for the Duka Store application.
 * MVC: This is the View orchestrator, mapping routes to page components.
 */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./controllers/AuthController";

// Pages
import LandingPage from "./views/pages/LandingPage";
import AuthPage from "./views/pages/AuthPage";
import UserDashboard from "./views/pages/user/UserDashboard";
import VendorDashboard from "./views/pages/vendor/VendorDashboard";
import AddShopPage from "./views/pages/vendor/AddShopPage";
import AddProductPage from "./views/pages/vendor/AddProductPage";
import AdminDashboard from "./views/pages/admin/AdminDashboard";

// Super Admin Pages
import SuperAdminLogin from "./views/pages/superadmin/SuperAdminLogin";
import SuperAdminDashboard from "./views/pages/superadmin/SuperAdminDashboard";
import ShopsManagement from "./views/pages/superadmin/ShopsManagement";
import VendorsManagement from "./views/pages/superadmin/VendorsManagement";
import CustomersManagement from "./views/pages/superadmin/CustomersManagement";
import Analytics from "./views/pages/superadmin/Analytics";
import AuditLogs from "./views/pages/superadmin/AuditLogs";
import SystemHealth from "./views/pages/superadmin/SystemHealth";
import SystemControls from "./views/pages/superadmin/SystemControls";

// Route guard: only allow authenticated users matching the required role
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

const AppRoutes = () => (
  <Routes>
    {/* Public */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<AuthPage />} />
    <Route path="/superadmin-login" element={<SuperAdminLogin />} />

    {/* Customer */}
    <Route path="/dashboard" element={
      <ProtectedRoute role="customer"><UserDashboard /></ProtectedRoute>
    } />

    {/* Vendor */}
    <Route path="/vendor" element={
      <ProtectedRoute role="vendor"><VendorDashboard /></ProtectedRoute>
    } />
    <Route path="/vendor/shops/new" element={
      <ProtectedRoute role="vendor"><AddShopPage /></ProtectedRoute>
    } />
    <Route path="/vendor/products/new" element={
      <ProtectedRoute role="vendor"><AddProductPage /></ProtectedRoute>
    } />

    {/* Admin */}
    <Route path="/admin" element={
      <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
    } />

    {/* Super Admin */}
    <Route path="/superadmin" element={
      <ProtectedRoute role="superadmin"><SuperAdminDashboard /></ProtectedRoute>
    } />
    <Route path="/superadmin/shops" element={
      <ProtectedRoute role="superadmin"><ShopsManagement /></ProtectedRoute>
    } />
    <Route path="/superadmin/vendors" element={
      <ProtectedRoute role="superadmin"><VendorsManagement /></ProtectedRoute>
    } />
    <Route path="/superadmin/customers" element={
      <ProtectedRoute role="superadmin"><CustomersManagement /></ProtectedRoute>
    } />
    <Route path="/superadmin/analytics" element={
      <ProtectedRoute role="superadmin"><Analytics /></ProtectedRoute>
    } />
    <Route path="/superadmin/audit-logs" element={
      <ProtectedRoute role="superadmin"><AuditLogs /></ProtectedRoute>
    } />
    <Route path="/superadmin/system-health" element={
      <ProtectedRoute role="superadmin"><SystemHealth /></ProtectedRoute>
    } />
    <Route path="/superadmin/system-controls" element={
      <ProtectedRoute role="superadmin"><SystemControls /></ProtectedRoute>
    } />

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
