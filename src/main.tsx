import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { usePortfolioStore } from './store/portfolioStore';
import { ToastProvider, useToast } from './components/common/ToastSystem';
import { Sidebar } from './components/common/Sidebar';
import { CommandTopbar } from './components/common/CommandTopbar';
import { PortfolioCenter } from './components/portfolio/PortfolioCenter';
import { RiskQueuePage } from './components/risk/RiskQueuePage';
import { RiskBriefDrawer } from './components/risk/RiskBriefDrawer';
import { InterventionLoopPage } from './components/intervention/InterventionLoopPage';
import { DataQualityPage } from './components/data/DataQualityPage';
import { PortfolioAssistantPage } from './components/assistant/PortfolioAssistantPage';
import { ExecutiveReportModal } from './components/common/ExecutiveReportModal';
import { ProjectComparisonModal } from './components/portfolio/ProjectComparisonModal';
import { KeyboardShortcutsModal } from './components/common/KeyboardShortcutsModal';
import { GuidedDemoModal } from './components/common/GuidedDemoModal';
import type { PortfolioProject } from './types';
import './styles.css';

function AppContent() {
  const { projects, recordIntervention, resetDemo } = usePortfolioStore();
  const { showToast } = useToast();
  const [activePage, setActivePage] = useState<string>('portfolio');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [comparingProjects, setComparingProjects] = useState<PortfolioProject[]>([]);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState<boolean>(false);
  const [showGuidedDemo, setShowGuidedDemo] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Synchronize selected project reference with updated projects state
  const activeSelectedProject = selectedProject
    ? projects.find(p => p.id === selectedProject.id) || null
    : null;

  // Global Keyboard Power Hotkeys Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keypresses if focus is inside an input, textarea, or select element
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select') {
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        setShowShortcutsModal(prev => !prev);
        return;
      }

      const keyUpper = e.key.toUpperCase();

      if (e.key === '1' || keyUpper === 'P') {
        setActivePage('portfolio');
        showToast('Navigation: Portfolio Command Center', 'info');
      } else if (e.key === '2' || keyUpper === 'R') {
        setActivePage('risk');
        showToast('Navigation: Risk Queue', 'info');
      } else if (e.key === '3' || keyUpper === 'I') {
        setActivePage('interventions');
        showToast('Navigation: Interventions & Learning Loop', 'info');
      } else if (e.key === '4' || keyUpper === 'D') {
        setActivePage('data');
        showToast('Navigation: Data Quality & Provenance', 'info');
      } else if (e.key === '5' || keyUpper === 'A') {
        setActivePage('assistant');
        showToast('Navigation: AI Assistant', 'info');
      } else if (keyUpper === 'E') {
        setShowReportModal(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showToast]);

  // Dark Theme Class Binding
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isDarkMode]);

  const handleOpenProject = (project: PortfolioProject) => {
    setSelectedProject(project);
  };

  const handleCloseDrawer = () => {
    setSelectedProject(null);
  };

  const handleRecordIntervention = (
    projectId: string,
    type: any,
    outcome: any,
    note: string
  ) => {
    recordIntervention(projectId, type, outcome, note);
  };

  const handleResetDemo = () => {
    resetDemo();
    showToast('Demo dataset reset to initial April 2026 snapshot', 'info');
  };

  const handleToggleMobileNav = () => {
    setMobileNavOpen(prev => !prev);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    showToast(isDarkMode ? 'Switched to light mode' : 'Switched to IPMD dark mode', 'info');
  };

  const renderContent = () => {
    const commonProps = {
      projects,
      onResetDemo: handleResetDemo,
      onExportReport: () => setShowReportModal(true),
      onToggleMobileNav: handleToggleMobileNav
    };

    switch (activePage) {
      case 'portfolio':
        return (
          <PortfolioCenter
            {...commonProps}
            onOpenProject={handleOpenProject}
            onCompareProjects={setComparingProjects}
            onStartDemo={() => setShowGuidedDemo(true)}
          />
        );
      case 'risk':
        return (
          <RiskQueuePage
            {...commonProps}
            onOpenProject={handleOpenProject}
          />
        );
      case 'interventions':
        return (
          <InterventionLoopPage
            {...commonProps}
            onOpenProject={handleOpenProject}
          />
        );
      case 'data':
        return (
          <DataQualityPage
            {...commonProps}
          />
        );
      case 'assistant':
        return (
          <PortfolioAssistantPage
            {...commonProps}
          />
        );
      default:
        return (
          <PortfolioCenter
            {...commonProps}
            onOpenProject={handleOpenProject}
            onCompareProjects={setComparingProjects}
            onStartDemo={() => setShowGuidedDemo(true)}
          />
        );
    }
  };

  return (
    <div className="px-app">
      <CommandTopbar projects={projects} />
      <Sidebar
        currentPage={activePage}
        onPageSelect={setActivePage}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
        onOpenShortcuts={() => setShowShortcutsModal(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      <main className="px-main">
        {renderContent()}
      </main>

      {activeSelectedProject && (
        <RiskBriefDrawer
          project={activeSelectedProject}
          onClose={handleCloseDrawer}
          onRecordIntervention={handleRecordIntervention}
        />
      )}

      {showReportModal && (
        <ExecutiveReportModal
          projects={projects}
          onClose={() => setShowReportModal(false)}
        />
      )}

      {comparingProjects.length >= 2 && (
        <ProjectComparisonModal
          projects={comparingProjects}
          onClose={() => setComparingProjects([])}
        />
      )}

      {showShortcutsModal && (
        <KeyboardShortcutsModal
          onClose={() => setShowShortcutsModal(false)}
        />
      )}

      {showGuidedDemo && (
        <GuidedDemoModal
          projects={projects}
          onOpenProject={handleOpenProject}
          onClose={() => setShowGuidedDemo(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
