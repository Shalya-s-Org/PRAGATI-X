import React from 'react';
import { MapPin, AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react';
import type { PortfolioProject } from '../../types';

interface RegionalHeatmapProps {
  projects: PortfolioProject[];
  onSelectRegionFilter?: (region: string) => void;
  onOpenProject: (project: PortfolioProject) => void;
}

export const RegionalHeatmap: React.FC<RegionalHeatmapProps> = ({
  projects,
  onSelectRegionFilter,
  onOpenProject
}) => {
  const regions = ['North', 'East', 'South', 'West', 'Central', 'North East'];

  const regionStats = regions.map(region => {
    const regionalProjects = projects.filter(p => p.region === region);
    const criticalCount = regionalProjects.filter(p => p.risk === 'Critical' || p.risk === 'High').length;
    const avgScore = regionalProjects.length
      ? Math.round(regionalProjects.reduce((acc, p) => acc + p.assessment.score, 0) / regionalProjects.length)
      : 0;

    return {
      region,
      projects: regionalProjects,
      totalCount: regionalProjects.length,
      criticalCount,
      avgScore
    };
  });

  return (
    <div className="regional-heatmap-container">
      <div className="section-title">
        <div>
          <p className="px-kicker">GEOGRAPHIC RISK DISTRIBUTION</p>
          <h2>Regional Zone Risk Matrix</h2>
        </div>
      </div>

      <div className="regions-grid">
        {regionStats.map(stat => (
          <div
            key={stat.region}
            className={`region-card ${stat.criticalCount > 0 ? 'has-critical' : ''}`}
            onClick={() => onSelectRegionFilter && onSelectRegionFilter(stat.region)}
          >
            <div className="region-card-head">
              <div className="region-name-flex">
                <MapPin size={16} className="icon-mint" />
                <b>{stat.region} Zone</b>
              </div>
              <span className={`risk-pill-sm ${stat.avgScore >= 70 ? 'critical' : stat.avgScore >= 50 ? 'watch' : 'low'}`}>
                Avg Score: {stat.avgScore}
              </span>
            </div>

            <div className="region-body-stats">
              <div>
                <small>Monitored Projects</small>
                <b>{stat.totalCount}</b>
              </div>
              <div>
                <small>High/Critical Flags</small>
                <b className={stat.criticalCount > 0 ? 'txt-warn' : ''}>{stat.criticalCount}</b>
              </div>
            </div>

            {/* List of projects in this region */}
            <div className="region-projects-list">
              {stat.projects.map(p => (
                <div
                  key={p.id}
                  className="region-project-item"
                  onClick={e => {
                    e.stopPropagation();
                    onOpenProject(p);
                  }}
                >
                  <span>{p.name}</span>
                  <span className={`risk ${p.risk.toLowerCase()}`}>{p.risk}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
