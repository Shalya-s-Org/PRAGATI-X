import React, { useState } from 'react';
import { AlertTriangle, Activity, ChevronRight, ShieldCheck, Clock, Map, List, Columns } from 'lucide-react';
import { Header } from '../common/Header';
import { RiskBadge, StatusBadge } from '../common/Badge';
import { PortfolioCharts } from './PortfolioCharts';
import { DemoScenariosBar } from './DemoScenariosBar';
import { RegionalHeatmap } from './RegionalHeatmap';
import { RoiSavingsCalculator } from './RoiSavingsCalculator';
import type { PortfolioProject } from '../../types';

interface PortfolioCenterProps {
  projects: PortfolioProject[];
  onOpenProject: (project: PortfolioProject) => void;
  onCompareProjects: (projects: PortfolioProject[]) => void;
  onResetDemo: () => void;
  onExportReport?: () => void;
  onToggleMobileNav?: () => void;
}

export const PortfolioCenter: React.FC<PortfolioCenterProps> = ({
  projects,
  onOpenProject,
  onCompareProjects,
  onResetDemo,
  onExportReport,
  onToggleMobileNav
}) => {
  const [viewMode, setViewMode] = useState<'queue' | 'heatmap'>('queue');
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const criticalCount = projects.filter(p => p.risk === 'Critical').length;
  const highCount = projects.filter(p => p.risk === 'High').length;
  const openInterventionsCount = projects.reduce((acc, p) => acc + p.interventions.length, 0);
  const resolvedCount = projects.filter(p => p.status === 'Resolved').length;

  const sortedProjects = [...projects].sort((a, b) => b.assessment.score - a.assessment.score);
  const prioritySlice = sortedProjects.slice(0, 8);

  const avgAlertAge = Math.round(
    projects.reduce((acc, p) => acc + p.alertAgeDays, 0) / (projects.length || 1)
  );

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedForCompare(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const handleLaunchCompare = () => {
    const selectedProjs = projects.filter(p => selectedForCompare.includes(p.id));
    if (selectedProjs.length >= 2) {
      onCompareProjects(selectedProjs);
    }
  };

  return (
    <div className="portfolio-center-view">
      <Header
        title="Portfolio command center"
        subtitle="Validated snapshot → explainable risk → officer action → portfolio learning."
        onReset={onResetDemo}
        onExportReport={onExportReport}
        onToggleMobileNav={onToggleMobileNav}
      />

      {/* Quick Launch Scenarios for Hackathon Judges */}
      <DemoScenariosBar projects={projects} onSelectProject={onOpenProject} />

      {/* Hero Banner */}
      <section className="px-hero">
        <div>
          <p>APRIL 2026 CURATED SNAPSHOT</p>
          <h2>Prioritize the projects that need a decision.</h2>
          <span>
            Scores are transparent local demo data. Each alert includes contributing evidence,
            model confidence, and recommended officer intervention actions.
          </span>
        </div>
        <div className="hero-stats">
          <div>
            <b>{projects.length}</b>
            <small>curated projects</small>
          </div>
          <div>
            <b>4.6 mo</b>
            <small>warning lead time</small>
          </div>
          <div>
            <b>{avgAlertAge} days</b>
            <small>avg alert age</small>
          </div>
        </div>
      </section>

      {/* Key Metrics Row */}
      <section className="metric-row">
        <div>
          <span className="orange">
            <AlertTriangle size={18} />
          </span>
          <small>Critical risk</small>
          <b>{criticalCount}</b>
          <em>Requires officer intervention</em>
        </div>

        <div>
          <span className="sage">
            <Activity size={18} />
          </span>
          <small>High risk</small>
          <b>{highCount}</b>
          <em>Active monitoring required</em>
        </div>

        <div>
          <span className="blue">
            <Clock size={18} />
          </span>
          <small>Logged interventions</small>
          <b>{openInterventionsCount}</b>
          <em>Officer review records</em>
        </div>

        <div>
          <span className="mint">
            <ShieldCheck size={18} />
          </span>
          <small>Resolved outcomes</small>
          <b>{resolvedCount}</b>
          <em>Learning signal active</em>
        </div>
      </section>

      {/* ROI & Public Funds Protection Calculator */}
      <RoiSavingsCalculator />

      {/* Embedded Portfolio Visualizations */}
      <PortfolioCharts projects={projects} />

      {/* View Switcher & Comparison Bar */}
      <div className="section-title">
        <div>
          <p className="px-kicker">PORTFOLIO VIEWS</p>
          <h2>{viewMode === 'queue' ? 'Priority Risk Queue' : 'Regional Zone Matrix'}</h2>
        </div>

        <div className="view-switch-actions">
          {selectedForCompare.length >= 2 && (
            <button className="primary compare-trigger-btn" onClick={handleLaunchCompare}>
              <Columns size={14} /> Compare ({selectedForCompare.length})
            </button>
          )}

          <div className="view-mode-toggle">
            <button
              className={viewMode === 'queue' ? 'active' : ''}
              onClick={() => setViewMode('queue')}
            >
              <List size={14} /> Priority Queue
            </button>
            <button
              className={viewMode === 'heatmap' ? 'active' : ''}
              onClick={() => setViewMode('heatmap')}
            >
              <Map size={14} /> Regional Matrix
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'queue' ? (
        <div className="queue">
          <div className="queue-head">
            <span style={{ paddingLeft: '28px' }}>PROJECT NAME & CONTEXT</span>
            <span>SEVERITY</span>
            <span>SCORE</span>
            <span>REVIEW STATUS</span>
            <span />
          </div>
          {prioritySlice.map(project => {
            const isSelected = selectedForCompare.includes(project.id);
            return (
              <button
                className={`project-row ${isSelected ? 'row-selected' : ''}`}
                key={project.id}
                onClick={() => onOpenProject(project)}
              >
                <div className="project-title-cell">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={e => toggleCompare(project.id, e as any)}
                    onClick={e => e.stopPropagation()}
                    title="Select to compare side-by-side"
                  />
                  <div>
                    <b>{project.name}</b>
                    <small>
                      {project.ministry} · {project.sector} · {project.region} · Alert: {project.alertAgeDays}d old
                    </small>
                  </div>
                </div>
                <RiskBadge level={project.risk} />
                <div className="inline-score">
                  <b>{project.assessment.score}</b>
                  <span className="score-sub">({project.assessment.confidence}% conf)</span>
                </div>
                <StatusBadge status={project.status} />
                <ChevronRight size={16} className="chevron-icon" />
              </button>
            );
          })}
        </div>
      ) : (
        <RegionalHeatmap projects={projects} onOpenProject={onOpenProject} />
      )}
    </div>
  );
};
