import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import { Navbar } from './components/Navbar.js';
import { Sidebar } from './components/Sidebar.js';
import { CommandPalette } from './components/CommandPalette.js';
import { LandingPage } from './pages/LandingPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { NewResearchPage } from './pages/NewResearchPage.js';
import { ProgressPage } from './pages/ProgressPage.js';
import { ReportPage } from './pages/ReportPage.js';
import { HistoryPage } from './pages/HistoryPage.js';
import { AgentsPage } from './pages/AgentsPage.js';
import { SettingsPage } from './pages/SettingsPage.js';
import { ProfilePage } from './pages/ProfilePage.js';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppLayout: React.FC = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isPublicPage = location.pathname === '/' || location.pathname === '/login';

  if (isPublicPage || !isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-[#151310] text-[#e8e1dd] font-sans selection:bg-[#ffb77d] selection:text-[#4d2600]">
      <Sidebar />
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

      {/* Main Content Area: Margin left 260px for sidebar, Padding top 16 for header */}
      <main className="md:ml-[260px] pt-16 min-h-screen bg-[#151310] overflow-y-auto">
        <Routes>
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/research/new" element={<ProtectedRoute><NewResearchPage /></ProtectedRoute>} />
          <Route path="/research/:id/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
          <Route path="/research/:id" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
          <Route path="/agents" element={<ProtectedRoute><AgentsPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
};

export default App;
