import React from 'react';
import type { PortfolioProject } from '../../types';

interface PortfolioChartsProps {
  projects: PortfolioProject[];
}

export const PortfolioCharts: React.FC<PortfolioChartsProps> = ({ projects }) => {
  const criticalCount = projects.filter(p => p.risk === 'Critical').length;
  const highCount = projects.filter(p => p.risk === 'High').length;
  const watchCount = projects.filter(p => p.risk === 'Watch').length;
  const lowCount = projects.filter(p => p.risk === 'Low').length;

  const total = projects.length || 1;
  const criticalPct = Math.round((criticalCount / total) * 100);
  const highPct = Math.round((highCount / total) * 100);
  const watchPct = Math.round((watchCount / total) * 100);
  const lowPct = Math.round((lowCount / total) * 100);

  // Sector breakdown
  const sectorCounts: Record<string, number> = {};
  projects.forEach(p => {
    sectorCounts[p.sector] = (sectorCounts[p.sector] || 0) + 1;
  });

  const sortedSectors = Object.entries(sectorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Trend data points (Nov - Apr)
  const trendPoints = [
    { month: 'Nov', score: 76, resolved: 2 },
    { month: 'Dec', score: 72, resolved: 3 },
    { month: 'Jan', score: 68, resolved: 5 },
    { month: 'Feb', score: 65, resolved: 7 },
    { month: 'Mar', score: 61, resolved: 9 },
    { month: 'Apr', score: 58, resolved: projects.filter(p => p.status === 'Resolved').length }
  ];

  return (
    <section className="charts-grid">
      {/* Risk Distribution Card */}
      <div className="chart-card">
        <div className="chart-head">
          <h3>Risk Severity Distribution</h3>
          <small>{projects.length} curated portfolio projects</small>
        </div>
        <div className="severity-bar-stacked">
          <div style={{ width: `${criticalPct}%` }} className="seg-critical" title={`Critical: ${criticalCount}`} />
          <div style={{ width: `${highPct}%` }} className="seg-high" title={`High: ${highCount}`} />
          <div style={{ width: `${watchPct}%` }} className="seg-watch" title={`Watch: ${watchCount}`} />
          <div style={{ width: `${lowPct}%` }} className="seg-low" title={`Low: ${lowCount}`} />
        </div>
        <div className="chart-legend">
          <div><span className="dot dot-critical" /> Critical ({criticalCount})</div>
          <div><span className="dot dot-high" /> High ({highCount})</div>
          <div><span className="dot dot-watch" /> Watch ({watchCount})</div>
          <div><span className="dot dot-low" /> Low ({lowCount})</div>
        </div>
      </div>

      {/* 6-Month Risk & Resolution Trend SVG */}
      <div className="chart-card">
        <div className="chart-head">
          <h3>Portfolio Risk Trend & Learning Curve</h3>
          <small>Average risk index reduction through officer intervention</small>
        </div>
        <div className="svg-chart-container">
          <svg viewBox="0 0 400 120" className="trend-svg" aria-label="6-month portfolio risk trend chart">
            {/* Grid lines */}
            <line x1="40" y1="20" x2="380" y2="20" stroke="#e6eeee" strokeDasharray="3 3" />
            <line x1="40" y1="60" x2="380" y2="60" stroke="#e6eeee" strokeDasharray="3 3" />
            <line x1="40" y1="100" x2="380" y2="100" stroke="#e6eeee" strokeDasharray="3 3" />

            {/* Line chart curve */}
            <path
              d="M 50 30 Q 110 40, 180 55 T 310 75 T 370 85"
              fill="none"
              stroke="#23a07a"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* Area fill */}
            <path
              d="M 50 30 Q 110 40, 180 55 T 310 75 T 370 85 L 370 100 L 50 100 Z"
              fill="rgba(35, 160, 122, 0.08)"
            />

            {/* Data points */}
            {trendPoints.map((pt, i) => {
              const x = 50 + i * 64;
              const y = 100 - (pt.score - 40) * 1.5;
              return (
                <g key={pt.month}>
                  <circle cx={x} cy={y} r="4" fill="#133b45" stroke="#23a07a" strokeWidth="2" />
                  <text x={x} y="115" textAnchor="middle" fontSize="9" fill="#718087" fontFamily="Manrope">
                    {pt.month}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Top Sector Risk Distribution */}
      <div className="chart-card">
        <div className="chart-head">
          <h3>Top Sectors by Project Volume</h3>
          <small>Monitored across 11 key infrastructure sectors</small>
        </div>
        <div className="sector-bars">
          {sortedSectors.map(([sector, count]) => {
            const pct = Math.round((count / projects.length) * 100);
            return (
              <div className="sector-row" key={sector}>
                <span className="sector-label">{sector}</span>
                <div className="sector-bar-outer">
                  <div className="sector-bar-inner" style={{ width: `${pct * 3}%` }} />
                </div>
                <span className="sector-count">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
