import React, { useEffect } from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { RiskBadge, StatusBadge } from '../common/Badge';
import type { PortfolioProject } from '../../types';

interface ProjectComparisonModalProps {
  projects: PortfolioProject[];
  onClose: () => void;
}

export const ProjectComparisonModal: React.FC<ProjectComparisonModalProps> = ({ projects, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!projects || projects.length === 0) return null;

  return (
    <div className="report-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="report-modal compare-modal" onClick={e => e.stopPropagation()}>
        <div className="report-modal-header">
          <div>
            <p className="px-kicker">SIDE-BY-SIDE RISK ANALYSIS</p>
            <h2>Project Comparison Engine ({projects.length} selected)</h2>
            <small>Compare simulated risk drivers, cost/schedule variances, and officer recommendations</small>
          </div>
          <button className="close" onClick={onClose} aria-label="Close comparison">
            <X size={18} />
          </button>
        </div>

        <div className="compare-grid" style={{ gridTemplateColumns: `180px repeat(${projects.length}, 1fr)` }}>
          {/* Column Headers */}
          <div className="compare-label-cell"><b>FEATURE / METRIC</b></div>
          {projects.map(p => (
            <div key={p.id} className="compare-header-cell">
              <b>{p.name}</b>
              <small>{p.ministry} · {p.sector}</small>
              <div className="compare-cost-tag">{p.cost}</div>
            </div>
          ))}

          {/* Row 1: Risk Level & Score */}
          <div className="compare-label-cell">Risk Level & Score</div>
          {projects.map(p => (
            <div key={p.id} className="compare-data-cell">
              <RiskBadge level={p.risk} />
              <b className="compare-score-num">{p.assessment.score}/100</b>
              <small>({p.assessment.confidence}% confidence)</small>
            </div>
          ))}

          {/* Row 2: Cost Variance */}
          <div className="compare-label-cell">Cost Variance</div>
          {projects.map(p => (
            <div key={p.id} className="compare-data-cell">
              <b className={p.assessment.costVariance > 10 ? 'txt-warn' : ''}>
                +{p.assessment.costVariance}%
              </b>
            </div>
          ))}

          {/* Row 3: Schedule Variance */}
          <div className="compare-label-cell">Schedule Variance</div>
          {projects.map(p => (
            <div key={p.id} className="compare-data-cell">
              <b className={p.assessment.scheduleVariance > 10 ? 'txt-warn' : ''}>
                +{p.assessment.scheduleVariance}%
              </b>
            </div>
          ))}

          {/* Row 4: Progress Trend */}
          <div className="compare-label-cell">Physical Progress Trend</div>
          {projects.map(p => (
            <div key={p.id} className="compare-data-cell">
              <span>{p.assessment.progressTrend}</span>
            </div>
          ))}

          {/* Row 5: Data Quality */}
          <div className="compare-label-cell">Data Quality Index</div>
          {projects.map(p => (
            <div key={p.id} className="compare-data-cell">
              <b>{p.quality.score}% score</b>
              <small>{p.quality.recordCompleteness}% complete</small>
            </div>
          ))}

          {/* Row 6: Primary Risk Driver */}
          <div className="compare-label-cell">Primary SHAP Driver</div>
          {projects.map(p => (
            <div key={p.id} className="compare-data-cell">
              <p className="driver-preview">&ldquo;{p.assessment.drivers[0]}&rdquo;</p>
            </div>
          ))}

          {/* Row 7: Recommended Action */}
          <div className="compare-label-cell">Officer Recommendation</div>
          {projects.map(p => (
            <div key={p.id} className="compare-data-cell">
              <p className="recommend-preview">{p.recommendedAction}</p>
            </div>
          ))}

          {/* Row 8: Status */}
          <div className="compare-label-cell">Review Status</div>
          {projects.map(p => (
            <div key={p.id} className="compare-data-cell">
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
