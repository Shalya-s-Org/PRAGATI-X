import React from 'react';
import { Database, CheckCircle2 } from 'lucide-react';
import { Header } from '../common/Header';
import type { PortfolioProject } from '../../types';

interface DataQualityPageProps {
  projects: PortfolioProject[];
  onResetDemo: () => void;
  onToggleMobileNav?: () => void;
}

export const DataQualityPage: React.FC<DataQualityPageProps> = ({
  projects,
  onResetDemo,
  onToggleMobileNav
}) => {
  const avgQuality = Math.round(
    projects.reduce((acc, p) => acc + p.quality.score, 0) / (projects.length || 1)
  );

  const avgCompleteness = Math.round(
    projects.reduce((acc, p) => acc + p.quality.recordCompleteness, 0) / (projects.length || 1)
  );

  const clearDependenciesCount = projects.filter(
    p => p.quality.dependency.includes('No unresolved') || p.quality.dependency.includes('resolved')
  ).length;

  const clearDependencyPct = Math.round((clearDependenciesCount / (projects.length || 1)) * 100);

  return (
    <div className="data-quality-view">
      <Header
        title="Data quality & transparency"
        subtitle="The transparent inputs and data completeness scores behind every model prediction."
        onReset={onResetDemo}
        onToggleMobileNav={onToggleMobileNav}
      />

      {/* Top Banner */}
      <div className="data-banner">
        <Database size={24} className="icon-mint" />
        <div>
          <b>PAIMANA / CUF DATA PIPELINE VALIDATION</b>
          <p>
            Risk assessments rely on 5 transparent indicators: cost variance, schedule variance,
            progress trend, data completeness, and dependency resolution.
          </p>
        </div>
      </div>

      {/* Quality Summary Grid */}
      <div className="quality-grid">
        <article className="quality q0">
          <p>Record Completeness</p>
          <b>{avgCompleteness}%</b>
          <span>Field coverage across {projects.length} projects</span>
        </article>

        <article className="quality q1">
          <p>Snapshot Freshness</p>
          <b>93%</b>
          <span>Validated within the last 5 business days</span>
        </article>

        <article className="quality q2">
          <p>Dependency Resolution</p>
          <b>{clearDependencyPct}%</b>
          <span>Projects without unresolved blocking dependencies</span>
        </article>
      </div>

      {/* Project Data Table */}
      <div className="table-wrap">
        <div className="section-title">
          <div>
            <p className="px-kicker">INPUT HEALTH BY PROJECT</p>
            <h2>Data Quality Index ({avgQuality}% avg)</h2>
          </div>
        </div>

        <div className="quality-table">
          {projects.map(project => (
            <div className="field" key={project.id}>
              <div>
                <b>{project.name}</b>
                <small>{project.ministry} · {project.region}</small>
              </div>

              <div className="progress-cell">
                <div className="fieldbar">
                  <i style={{ width: `${project.quality.score}%` }} />
                </div>
                <span>{project.quality.score}% quality score</span>
              </div>

              <div className="meta-cell">
                <small>
                  <CheckCircle2 size={12} className="icon-mint-inline" /> {project.quality.freshness}
                </small>
                <small className="dep-text">{project.quality.dependency}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
