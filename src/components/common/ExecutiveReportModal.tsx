import React, { useEffect } from 'react';
import { Printer, X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { PortfolioProject } from '../../types';

interface ExecutiveReportModalProps {
  projects: PortfolioProject[];
  onClose: () => void;
}

export const ExecutiveReportModal: React.FC<ExecutiveReportModalProps> = ({ projects, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const criticalProjects = projects.filter(p => p.risk === 'Critical' || p.risk === 'High');
  const resolvedProjects = projects.filter(p => p.status === 'Resolved');
  const interventionsCount = projects.reduce((acc, p) => acc + p.interventions.length, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="report-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="report-modal" onClick={e => e.stopPropagation()}>
        <div className="report-modal-header">
          <div>
            <p className="px-kicker">IPMD · INFRASTRUCTURE &amp; PROJECT MONITORING DIVISION</p>
            <h2>National Infrastructure Portfolio Monitoring Brief</h2>
            <small>April 2026 Snapshot · Validated Local Simulation Data</small>
          </div>
          <div className="report-actions">
            <button className="export" onClick={handlePrint}>
              <Printer size={15} /> Print / Save PDF
            </button>
            <button className="close" onClick={onClose} aria-label="Close report">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="report-body">
          {/* Executive Summary Cards */}
          <div className="report-metrics-grid">
            <div className="report-metric">
              <small>Monitored Projects</small>
              <b>{projects.length}</b>
              <span>Across 11 ministries</span>
            </div>
            <div className="report-metric">
              <small>High & Critical Risks</small>
              <b>{criticalProjects.length}</b>
              <span>Requires intervention</span>
            </div>
            <div className="report-metric">
              <small>Recorded Interventions</small>
              <b>{interventionsCount}</b>
              <span>Dated audit records</span>
            </div>
            <div className="report-metric">
              <small>Resolved Outcomes</small>
              <b>{resolvedProjects.length}</b>
              <span>Learning signals active</span>
            </div>
          </div>

          {/* High Priority Risk Audit Trail */}
          <div className="report-section">
            <h3>High & Critical Risk Audit Trail ({criticalProjects.length})</h3>
            <table className="report-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>PROJECT NAME</th>
                  <th>MINISTRY</th>
                  <th>RISK</th>
                  <th>SCORE</th>
                  <th>STATUS</th>
                  <th>RECOMMENDED ACTION</th>
                </tr>
              </thead>
              <tbody>
                {criticalProjects.map(proj => (
                  <tr key={proj.id}>
                    <td><b>{proj.id}</b></td>
                    <td>{proj.name}</td>
                    <td>{proj.ministry}</td>
                    <td><span className={`risk ${proj.risk.toLowerCase()}`}>{proj.risk}</span></td>
                    <td><b>{proj.assessment.score}</b></td>
                    <td>{proj.status}</td>
                    <td><small>{proj.recommendedAction}</small></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calibrated Model Learning Signals */}
          <div className="report-section">
            <h3>Calibrated Model Learning Signals</h3>
            <div className="report-signals-list">
              {projects.filter(p => p.learningState).map(proj => (
                <div key={proj.id} className="report-signal-item">
                  <CheckCircle2 size={16} className="icon-mint" />
                  <div>
                    <b>{proj.name} ({proj.ministry})</b>
                    <p>{proj.learningState}</p>
                    <small>Latest officer outcome: {proj.interventions[0]?.outcome || 'Verified'}</small>
                  </div>
                </div>
              ))}
              {projects.filter(p => p.learningState).length === 0 && (
                <p className="muted-text">No active model learning signals recorded yet. Log an officer intervention to generate learning feedback.</p>
              )}
            </div>
          </div>

          <div className="report-footer">
            <ShieldCheck size={16} className="icon-mint" />
            <span>IPMD MONITORING PLATFORM · PORTFOLIO SUMMARY</span>
          </div>
        </div>
      </div>
    </div>
  );
};
