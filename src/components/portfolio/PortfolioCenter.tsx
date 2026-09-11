import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  Clock,
  Play,
  ShieldCheck,
  Zap,
  TrendingUp,
  Layers,
  Radar,
  SlidersHorizontal,
  FileText
} from 'lucide-react';
import { Header } from '../common/Header';
import { RiskBadge, StatusBadge } from '../common/Badge';
import { PortfolioCharts } from './PortfolioCharts';
import { RoiSavingsCalculator } from './RoiSavingsCalculator';
import type { PortfolioProject } from '../../types';

interface PortfolioCenterProps {
  projects: PortfolioProject[];
  onOpenProject: (project: PortfolioProject) => void;
  onCompareProjects: (projects: PortfolioProject[]) => void;
  onStartDemo: () => void;
  onResetDemo: () => void;
  onExportReport?: () => void;
  onToggleMobileNav?: () => void;
}

export const PortfolioCenter: React.FC<PortfolioCenterProps> = ({
  projects,
  onOpenProject,
  onStartDemo,
  onResetDemo,
  onExportReport,
  onToggleMobileNav
}) => {
  const [insightsOpen, setInsightsOpen] = useState(false);

  // Highest risk unresolved project as Priority Spotlight
  const priorityProject = useMemo(() => {
    return [...projects]
      .filter(p => p.status !== 'Resolved')
      .sort((a, b) => b.assessment.score - a.assessment.score)[0];
  }, [projects]);

  // Top 6 actionable projects for the queue
  const reviewQueue = useMemo(() => {
    return [...projects]
      .filter(p => p.status !== 'Resolved')
      .sort((a, b) => b.assessment.score - a.assessment.score)
      .slice(0, 6);
  }, [projects]);

  // Metrics summary calculation
  const criticalHighCount = projects.filter(
    p => ['Critical', 'High'].includes(p.risk) && p.status !== 'Resolved'
  ).length;

  const staleAlertsCount = projects.filter(
    p => p.alertAgeDays > 30 && p.status !== 'Resolved'
  ).length;

  const activeReviewsCount = projects.filter(
    p => p.status === 'In review' || p.status === 'Monitoring'
  ).length;

  const resolvedCount = projects.filter(
    p => p.status === 'Resolved'
  ).length;

  return (
    <div className="portfolio-center-view">
      <Header
        title="Infrastructure Monitoring Command Centre"
        subtitle="An operational view of portfolio health, delivery risks and priority interventions for IPMD officers."
        onReset={onResetDemo}
        onExportReport={onExportReport}
        onToggleMobileNav={onToggleMobileNav}
      />

      <section className="sovereign-brief">
        <div className="sovereign-brief-head">
          <div className="sovereign-title">
            <span className="sovereign-radar"><Radar size={21} /></span>
            <div>
              <div className="sovereign-title-line">
                <h2>Union Infrastructure Early Warning Command Center</h2>
                <span className="model-chip">EWS ML-V4.2</span>
                <span className="confidential-chip">IPMD MONITORED</span>
              </div>
              <p>Predictive telemetry across the active national infrastructure project portfolio.</p>
            </div>
          </div>
          <div className="sovereign-actions">
            <button className="sovereign-secondary"><SlidersHorizontal size={14} />Run scenario</button>
            <button className="sovereign-primary" onClick={onExportReport}><FileText size={14} />Generate monitoring brief</button>
          </div>
        </div>
        <div className="filter-matrix" aria-label="Portfolio filter matrix">
          <label>Sector focus<select defaultValue="all"><option value="all">All sectors</option><option>Transport</option><option>Energy</option><option>Water</option></select></label>
          <label>Ministry segment<select defaultValue="all"><option value="all">All ministries</option><option>Railways</option><option>Power</option><option>Jal Shakti</option></select></label>
          <label>Outlay tier<select defaultValue="all"><option value="all">All project values</option><option>₹1,000 Cr+</option><option>₹500–1,000 Cr</option></select></label>
          <label>EWS risk cohort<select defaultValue="priority"><option value="priority">Priority escalation</option><option>Critical risk</option><option>High risk</option><option>Stable</option></select></label>
          <label>Implementation<select defaultValue="all"><option value="all">All modalities</option><option>EPC</option><option>PPP</option><option>HAM</option></select></label>
        </div>
      </section>

      {/* Guided Tour Banner */}
      <div className="guided-launch-bar">
        <div className="guided-launch-content">
          <div className="guided-launch-badge">
            <Zap size={14} className="icon-pulse" />
            <span>IPMD WORKFLOW</span>
          </div>
          <p>
            Move from <b>signal</b> to <b>verified action</b>: identify delivery risks, review evidence, coordinate intervention and record outcomes.
          </p>
        </div>
        <button className="btn-primary guided-btn" onClick={onStartDemo}>
          <Play size={14} />
          <span>View officer workflow</span>
        </button>
      </div>

      {/* Hero Priority Spotlight Card */}
      <div className="command-workbench">
      {priorityProject && (
        <section className="priority-hero-card">
          <div className="priority-hero-header">
            <div className="priority-tag">
              <span className="live-dot" />
              <AlertTriangle size={15} />
              <span>PRIORITY FOR OFFICER REVIEW</span>
            </div>
            <div className="hero-meta-pills">
              <span className="meta-pill">{priorityProject.ministry}</span>
              <span className="meta-pill">{priorityProject.sector}</span>
              <span className="meta-pill">{priorityProject.region} Region</span>
            </div>
          </div>

          <div className="priority-hero-body">
            <div className="priority-info">
              <div className="title-row">
                <RiskBadge level={priorityProject.risk} />
                <h2>{priorityProject.name}</h2>
              </div>
              <p className="priority-milestone">
                <span className="milestone-label">Current Milestone:</span> {priorityProject.milestone}
                <span className="alert-age">• Active alert for {priorityProject.alertAgeDays} days</span>
              </p>

              {/* SHAP Key Driver Highlight */}
              <div className="priority-shap-box">
                <div className="shap-box-header">
                  <TrendingUp size={14} />
                <b>Primary risk indicator</b>
                </div>
                <p className="shap-driver-text">{priorityProject.assessment.drivers[0]}</p>
              </div>
            </div>

            {/* Risk Score Circle */}
            <div className="priority-score-card">
              <div className="score-ring-wrapper">
                <svg viewBox="0 0 100 100" className="score-ring-svg">
                  <circle cx="50" cy="50" r="42" className="score-ring-bg" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    className="score-ring-fill"
                    style={{ strokeDashoffset: 264 - (264 * priorityProject.assessment.score) / 100 }}
                  />
                </svg>
                <div className="score-number-box">
                  <span className="score-val">{priorityProject.assessment.score}</span>
                  <span className="score-max">/100</span>
                </div>
              </div>
              <div className="score-meta">
                <span className="score-label">Predicted Risk Score</span>
                <span className="confidence-tag">{priorityProject.assessment.confidence}% Confidence</span>
              </div>
            </div>
          </div>

          <div className="priority-hero-footer">
            <div className="recommended-action-preview">
              <span className="action-label">Recommended Action:</span>
              <span>{priorityProject.recommendedAction}</span>
            </div>
            <button className="btn-action-hero" onClick={() => onOpenProject(priorityProject)}>
                  <span>Open monitoring brief</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}
        <aside className="alert-rail">
          <div className="rail-heading"><span><span className="rail-beacon" />EWS live alert feed</span><b>{reviewQueue.length}</b></div>
          {reviewQueue.slice(0, 4).map((project, index) => (
            <button className={`rail-alert ${project.risk.toLowerCase()}`} key={project.id} onClick={() => onOpenProject(project)}>
              <span className="rail-alert-level">{project.risk} · {index + 1}h ago</span>
              <strong>{project.name}</strong>
              <p>{project.assessment.drivers[0]}</p>
              <small>Triage: {project.recommendedAction}</small>
            </button>
          ))}
          <button className="rail-more">View all project alerts <ArrowRight size={14} /></button>
        </aside>
      </div>

      {/* Decision Metric Cards Row */}
      <section className="decision-metrics-grid">
        <article className="metric-card card-critical">
          <div className="metric-icon-box">
            <AlertTriangle size={20} />
          </div>
          <div className="metric-details">
            <small>HIGH-PRIORITY RISKS</small>
            <div className="metric-value-row">
              <b>{criticalHighCount}</b>
              <span className="metric-badge rose">Action Required</span>
            </div>
            <p>Critical & High risk projects requiring officer intervention.</p>
          </div>
        </article>

        <article className="metric-card card-warning">
          <div className="metric-icon-box">
            <Clock size={20} />
          </div>
          <div className="metric-details">
            <small>OVERDUE REVIEW ITEMS</small>
            <div className="metric-value-row">
              <b>{staleAlertsCount}</b>
              <span className="metric-badge amber">&gt; 30 Days Active</span>
            </div>
            <p>Alerts lingering past recommended response window.</p>
          </div>
        </article>

        <article className="metric-card card-active">
          <div className="metric-icon-box">
            <Activity size={20} />
          </div>
          <div className="metric-details">
            <small>ACTIVE MONITORING CASES</small>
            <div className="metric-value-row">
              <b>{activeReviewsCount}</b>
              <span className="metric-badge cyan">In Review / Monitoring</span>
            </div>
            <p>Projects with ongoing review or field monitoring.</p>
          </div>
        </article>

        <article className="metric-card card-success">
          <div className="metric-icon-box">
            <ShieldCheck size={20} />
          </div>
          <div className="metric-details">
            <small>VERIFIED OUTCOMES</small>
            <div className="metric-value-row">
              <b>{resolvedCount}</b>
              <span className="metric-badge mint">Model Learning Signal</span>
            </div>
            <p>Outcomes logged & feedback loop closed.</p>
          </div>
        </article>
      </section>

      {/* Officer Review Queue Section */}
      <section className="officer-queue-section">
        <div className="queue-section-header">
          <div>
            <span className="px-kicker">EXPLAINABLE RISK QUEUE</span>
            <h2>Priority Projects Requiring Attention</h2>
          </div>
          <span className="queue-count-tag">{reviewQueue.length} Active Projects</span>
        </div>

        <div className="queue-list">
          {reviewQueue.map(project => (
            <div
              className="queue-card-row"
              key={project.id}
              onClick={() => onOpenProject(project)}
            >
              <div className="queue-col-project">
                <RiskBadge level={project.risk} />
                <div>
                  <div className="queue-project-name">
                    <b>{project.name}</b>
                    <span className="project-id-tag">{project.id}</span>
                  </div>
                  <span className="queue-project-meta">
                    {project.ministry} · {project.sector} · {project.cost}
                  </span>
                </div>
              </div>

              <div className="queue-col-driver">
                <div className="driver-chip-preview">
                  <span className="driver-dot" />
                  <p>{project.assessment.drivers[0]}</p>
                </div>
              </div>

              <div className="queue-col-score">
                <div className="score-pill">
                  <b>{project.assessment.score}</b>
                  <small>/100</small>
                </div>
                <span className="conf-sub">{project.assessment.confidence}% conf.</span>
              </div>

              <div className="queue-col-status">
                <StatusBadge status={project.status} />
              </div>

              <div className="queue-col-action">
                <button className="btn-row-open" aria-label="Review project">
                  <span>Review</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collapsible Portfolio Insights Fold */}
      <section className="insights-fold-section">
        <button
          className={`insights-toggle-btn ${insightsOpen ? 'open' : ''}`}
          onClick={() => setInsightsOpen(prev => !prev)}
          aria-expanded={insightsOpen}
        >
          <div className="toggle-btn-left">
            <Layers size={18} />
            <div>
              <b>Portfolio Analytics & Impact Model</b>
              <span>Interactive sector distribution, risk heatmaps & ROI savings calculator</span>
            </div>
          </div>
          <ChevronDown className={`toggle-icon ${insightsOpen ? 'rotate' : ''}`} size={18} />
        </button>

        {insightsOpen && (
          <div className="insights-fold-content">
            <PortfolioCharts projects={projects} />
            <RoiSavingsCalculator />
          </div>
        )}
      </section>
    </div>
  );
};
