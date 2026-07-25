import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export const App: React.FC = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex flex-col font-sans selection:bg-purple-600 selection:text-white">
        <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
        <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

        <div className="flex-1 flex w-full">
          <Sidebar />
          <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/research/new" element={<NewResearchPage />} />
              <Route path="/research/:id/progress" element={<ProgressPage />} />
              <Route path="/research/:id" element={<ReportPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<DashboardPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
