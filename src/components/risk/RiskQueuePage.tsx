import React, { useState, useMemo } from 'react';
import { Filter, ChevronRight, Search, RotateCcw } from 'lucide-react';
import { Header } from '../common/Header';
import { RiskBadge, StatusBadge } from '../common/Badge';
import type { PortfolioProject, RiskLevel, ReviewStatus } from '../../types';

interface RiskQueuePageProps {
  projects: PortfolioProject[];
  onOpenProject: (project: PortfolioProject) => void;
  onResetDemo: () => void;
  onToggleMobileNav?: () => void;
}

export const RiskQueuePage: React.FC<RiskQueuePageProps> = ({
  projects,
  onOpenProject,
  onResetDemo,
  onToggleMobileNav
}) => {
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [selectedMinistry, setSelectedMinistry] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const riskLevels: RiskLevel[] = ['Critical', 'High', 'Watch', 'Low'];
  const statusOptions: ReviewStatus[] = ['Needs review', 'In review', 'Monitoring', 'Resolved'];

  const uniqueMinistries = useMemo(() => {
    return Array.from(new Set(projects.map(p => p.ministry))).sort();
  }, [projects]);

  const uniqueSectors = useMemo(() => {
    return Array.from(new Set(projects.map(p => p.sector))).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (selectedRisk !== 'All' && p.risk !== selectedRisk) return false;
      if (selectedMinistry !== 'All' && p.ministry !== selectedMinistry) return false;
      if (selectedSector !== 'All' && p.sector !== selectedSector) return false;
      if (selectedStatus !== 'All' && p.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchMin = p.ministry.toLowerCase().includes(q);
        const matchSec = p.sector.toLowerCase().includes(q);
        const matchReg = p.region.toLowerCase().includes(q);
        if (!matchName && !matchMin && !matchSec && !matchReg) return false;
      }
      return true;
    }).sort((a, b) => b.assessment.score - a.assessment.score);
  }, [projects, selectedRisk, selectedMinistry, selectedSector, selectedStatus, searchQuery]);

  const clearFilters = () => {
    setSelectedRisk('All');
    setSelectedMinistry('All');
    setSelectedSector('All');
    setSelectedStatus('All');
    setSearchQuery('');
  };

  return (
    <div className="risk-queue-view">
      <Header
        title="Risk queue"
        subtitle="Filter the portfolio by severity, ministry, sector, and current review status."
        onReset={onResetDemo}
        onToggleMobileNav={onToggleMobileNav}
      />

      {/* Multi-Dimensional Filter Bar */}
      <div className="widefilters">
        <div className="filter-group-icon">
          <Filter size={15} />
          <span>Filters:</span>
        </div>

        {/* Search */}
        <div className="search-box">
          <Search size={14} className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search projects, regions..."
          />
        </div>

        {/* Severity */}
        <select value={selectedRisk} onChange={e => setSelectedRisk(e.target.value)}>
          <option value="All">All Severities</option>
          {riskLevels.map(r => (
            <option key={r} value={r}>{r} Risk</option>
          ))}
        </select>

        {/* Ministry */}
        <select value={selectedMinistry} onChange={e => setSelectedMinistry(e.target.value)}>
          <option value="All">All Ministries</option>
          {uniqueMinistries.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        {/* Sector */}
        <select value={selectedSector} onChange={e => setSelectedSector(e.target.value)}>
          <option value="All">All Sectors</option>
          {uniqueSectors.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Review Status */}
        <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
          <option value="All">All Review Statuses</option>
          {statusOptions.map(st => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>

        {(selectedRisk !== 'All' || selectedMinistry !== 'All' || selectedSector !== 'All' || selectedStatus !== 'All' || searchQuery) && (
          <button className="clear-filter-btn" onClick={clearFilters} title="Reset search and filters">
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}

        <b className="count-badge">{filteredProjects.length} projects</b>
      </div>

      {/* Project Table List */}
      {filteredProjects.length > 0 ? (
        <div className="queue">
          <div className="queue-head">
            <span>PROJECT NAME & DETAILS</span>
            <span>SEVERITY</span>
            <span>SCORE</span>
            <span>REVIEW STATUS</span>
            <span />
          </div>
          {filteredProjects.map(project => (
            <button
              className="project-row"
              key={project.id}
              onClick={() => onOpenProject(project)}
            >
              <div>
                <b>{project.name}</b>
                <small>
                  {project.ministry} · {project.sector} · {project.region} · Alert age: {project.alertAgeDays}d
                </small>
              </div>
              <RiskBadge level={project.risk} />
              <div className="inline-score">
                <b>{project.assessment.score}</b>
                <span className="score-sub">({project.assessment.confidence}% conf)</span>
              </div>
              <StatusBadge status={project.status} />
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
      ) : (
        <div className="empty">
          <Filter size={32} />
          <h2>No matching projects</h2>
          <p>Try clearing or adjusting your search filters to view the portfolio.</p>
          <button onClick={clearFilters}>Reset all filters</button>
        </div>
      )}
    </div>
  );
};
