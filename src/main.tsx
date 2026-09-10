import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { usePortfolioStore } from './store/portfolioStore';
import { ToastProvider, useToast } from './components/common/ToastSystem';
import { Sidebar } from './components/common/Sidebar';
import { PortfolioCenter } from './components/portfolio/PortfolioCenter';
import { RiskQueuePage } from './components/risk/RiskQueuePage';
import { RiskBriefDrawer } from './components/risk/RiskBriefDrawer';
import { InterventionLoopPage } from './components/intervention/InterventionLoopPage';
import { DataQualityPage } from './components/data/DataQualityPage';
import { PortfolioAssistantPage } from './components/assistant/PortfolioAssistantPage';
import { ExecutiveReportModal } from './components/common/ExecutiveReportModal';
import { ProjectComparisonModal } from './components/portfolio/ProjectComparisonModal';
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

  // Synchronize selected project reference with updated projects state
  const activeSelectedProject = selectedProject
    ? projects.find(p => p.id === selectedProject.id) || null
    : null;

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
          />
        );
    }
  };

  return (
    <div className="px-app">
      <Sidebar
        currentPage={activePage}
        onPageSelect={setActivePage}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
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
