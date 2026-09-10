import React from 'react';
import { AlertTriangle, Activity, ChevronRight, ShieldCheck, Clock } from 'lucide-react';
import { Header } from '../common/Header';
import { RiskBadge, StatusBadge } from '../common/Badge';
import { PortfolioCharts } from './PortfolioCharts';
import { DemoScenariosBar } from './DemoScenariosBar';
import type { PortfolioProject } from '../../types';

interface PortfolioCenterProps {
  projects: PortfolioProject[];
  onOpenProject: (project: PortfolioProject) => void;
  onResetDemo: () => void;
  onExportReport?: () => void;
  onToggleMobileNav?: () => void;
}

export const PortfolioCenter: React.FC<PortfolioCenterProps> = ({
  projects,
  onOpenProject,
  onResetDemo,
  onExportReport,
  onToggleMobileNav
}) => {
  const criticalCount = projects.filter(p => p.risk === 'Critical').length;
  const highCount = projects.filter(p => p.risk === 'High').length;
  const openInterventionsCount = projects.reduce((acc, p) => acc + p.interventions.length, 0);
  const resolvedCount = projects.filter(p => p.status === 'Resolved').length;

  const sortedProjects = [...projects].sort((a, b) => b.assessment.score - a.assessment.score);
  const prioritySlice = sortedProjects.slice(0, 6);

  const avgAlertAge = Math.round(
    projects.reduce((acc, p) => acc + p.alertAgeDays, 0) / (projects.length || 1)
  );

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

      {/* Embedded Portfolio Visualizations */}
      <PortfolioCharts projects={projects} />

      {/* Priority Queue Section */}
      <div className="section-title">
        <div>
          <p className="px-kicker">PRIORITY QUEUE</p>
          <h2>Where to look first</h2>
        </div>
      </div>

      <div className="queue">
        <div className="queue-head">
          <span>PROJECT NAME & CONTEXT</span>
          <span>SEVERITY</span>
          <span>SCORE</span>
          <span>REVIEW STATUS</span>
          <span />
        </div>
        {prioritySlice.map(project => (
          <button
            className="project-row"
            key={project.id}
            onClick={() => onOpenProject(project)}
          >
            <div>
              <b>{project.name}</b>
              <small>
                {project.ministry} · {project.sector} · {project.region} · Alert: {project.alertAgeDays}d old
              </small>
            </div>
            <RiskBadge level={project.risk} />
            <div className="inline-score">
              <b>{project.assessment.score}</b>
              <span className="score-sub">({project.assessment.confidence}% conf)</span>
            </div>
            <StatusBadge status={project.status} />
            <ChevronRight size={16} className="chevron-icon" />
          </button>
        ))}
      </div>
    </div>
  );
};
