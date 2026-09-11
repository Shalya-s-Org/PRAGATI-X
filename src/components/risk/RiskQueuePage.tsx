import React, { useMemo, useState } from 'react';
import { ChevronRight, Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { Header } from '../common/Header';
import { RiskBadge, StatusBadge } from '../common/Badge';
import type { PortfolioProject, RiskLevel, ReviewStatus } from '../../types';

interface RiskQueuePageProps {
  projects: PortfolioProject[];
  onOpenProject: (project: PortfolioProject) => void;
  onResetDemo: () => void;
  onExportReport?: () => void;
  onToggleMobileNav?: () => void;
}

export const RiskQueuePage: React.FC<RiskQueuePageProps> = ({
  projects,
  onOpenProject,
  onResetDemo,
  onExportReport,
  onToggleMobileNav
}) => {
  const [risk, setRisk] = useState<string>('All');
  const [status, setStatus] = useState<string>('All');
  const [ministry, setMinistry] = useState<string>('All');
  const [sector, setSector] = useState<string>('All');
  const [query, setQuery] = useState<string>('');
  const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false);

  const clearFilters = () => {
    setRisk('All');
    setStatus('All');
    setMinistry('All');
    setSector('All');
    setQuery('');
  };

  const hasActiveFilters = risk !== 'All' || status !== 'All' || ministry !== 'All' || sector !== 'All' || Boolean(query);

  const filteredProjects = useMemo(() => {
    return projects
      .filter(p => {
        if (risk !== 'All' && p.risk !== risk) return false;
        if (status !== 'All' && p.status !== status) return false;
        if (ministry !== 'All' && p.ministry !== ministry) return false;
        if (sector !== 'All' && p.sector !== sector) return false;
        if (query.trim()) {
          const matchText = `${p.name} ${p.id} ${p.ministry} ${p.sector} ${p.assessment.drivers.join(' ')}`.toLowerCase();
          if (!matchText.includes(query.toLowerCase())) return false;
        }
        return true;
      })
      .sort((a, b) => b.assessment.score - a.assessment.score);
  }, [projects, risk, status, ministry, sector, query]);

  const uniqueMinistries = useMemo(() => [...new Set(projects.map(p => p.ministry))].sort(), [projects]);
  const uniqueSectors = useMemo(() => [...new Set(projects.map(p => p.sector))].sort(), [projects]);

  return (
    <div className="risk-queue-view">
      <Header
        title="Explainable Risk Queue"
        subtitle="Filter, inspect SHAP drivers, and initiate targeted officer interventions."
        onReset={onResetDemo}
        onExportReport={onExportReport}
        onToggleMobileNav={onToggleMobileNav}
      />

      {/* Filter & Search Toolbar */}
      <section className="queue-toolbar-card">
        <div className="toolbar-top-row">
          <div className="search-box-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search project name, ID, ministry, or SHAP driver..."
            />
            {query && (
              <button className="clear-search-btn" onClick={() => setQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="filter-pills-group">
            <span className="pills-label">Risk Level:</span>
            {(['All', 'Critical', 'High', 'Watch'] as string[]).map(level => (
              <button
                key={level}
                className={`filter-pill ${risk === level ? 'active' : ''} ${level.toLowerCase()}`}
                onClick={() => setRisk(level)}
              >
                {level === 'All' ? 'All Risks' : level}
              </button>
            ))}
          </div>

          <div className="toolbar-actions">
            <button
              className={`btn-secondary filter-toggle-btn ${showMoreFilters ? 'active' : ''}`}
              onClick={() => setShowMoreFilters(prev => !prev)}
            >
              <SlidersHorizontal size={14} />
              <span>{showMoreFilters ? 'Hide Filters' : 'More Filters'}</span>
            </button>

            {hasActiveFilters && (
              <button className="btn-text clear-all-btn" onClick={clearFilters}>
                <X size={14} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Expanded Filters Drawer */}
        {showMoreFilters && (
          <div className="expanded-filters-grid">
            <div className="filter-field">
              <label htmlFor="select-status">Review Status</label>
              <select
                id="select-status"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                {(['Needs review', 'In review', 'Monitoring', 'Resolved'] as ReviewStatus[]).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="filter-field">
              <label htmlFor="select-ministry">Ministry / Department</label>
              <select
                id="select-ministry"
                value={ministry}
                onChange={e => setMinistry(e.target.value)}
              >
                <option value="All">All Ministries</option>
                {uniqueMinistries.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="filter-field">
              <label htmlFor="select-sector">Infrastructure Sector</label>
              <select
                id="select-sector"
                value={sector}
                onChange={e => setSector(e.target.value)}
              >
                <option value="All">All Sectors</option>
                {uniqueSectors.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </section>

      {/* Queue Results Count Header */}
      <div className="queue-results-header">
        <div>
          <span>Showing <b>{filteredProjects.length}</b> of <b>{projects.length}</b> portfolio projects</span>
          <small>Ordered by highest ML-computed risk score</small>
        </div>

        {hasActiveFilters && (
          <div className="active-filter-tags">
            {risk !== 'All' && <span className="active-tag">Risk: {risk}</span>}
            {status !== 'All' && <span className="active-tag">Status: {status}</span>}
            {ministry !== 'All' && <span className="active-tag">Ministry: {ministry}</span>}
            {sector !== 'All' && <span className="active-tag">Sector: {sector}</span>}
            {query && <span className="active-tag">&ldquo;{query}&rdquo;</span>}
          </div>
        )}
      </div>

      {/* Explainable risk matrix */}
      {filteredProjects.length > 0 ? (
        <div className="risk-matrix-wrap">
          <table className="risk-matrix">
            <thead>
              <tr>
                <th scope="col">Project ID</th>
                <th scope="col">Project</th>
                <th scope="col">Ministry</th>
                <th scope="col">Risk</th>
                <th scope="col" className="score-column">Score</th>
                <th scope="col">Status</th>
                <th scope="col">Recommended action</th>
                <th scope="col"><span className="sr-only">Open project</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(project => (
                <tr key={project.id} onClick={() => onOpenProject(project)}>
                  <td><span className="matrix-id">{project.id}</span></td>
                  <td className="matrix-project"><strong>{project.name}</strong><small>{project.sector} · {project.cost}</small></td>
                  <td>{project.ministry}</td>
                  <td><RiskBadge level={project.risk} /></td>
                  <td className="matrix-score"><b>{project.assessment.score}</b><small>/100 · {project.assessment.confidence}%</small></td>
                  <td><StatusBadge status={project.status} /></td>
                  <td className="matrix-action">{project.recommendedAction}</td>
                  <td><button className="matrix-open" aria-label={`Open monitoring brief for ${project.name}`}><span>Review</span><ChevronRight size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-queue-state">
          <Filter size={36} className="empty-icon" />
          <h3>No projects match your filter criteria</h3>
          <p>Try clearing your filters or adjusting your search term to see the complete queue.</p>
          <button className="btn-primary" onClick={clearFilters}>
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
