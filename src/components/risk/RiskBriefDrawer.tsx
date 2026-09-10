import React, { useState, useEffect, useMemo } from 'react';
import { X, CheckCircle2, ShieldAlert, Info, Send, Sliders, RefreshCcw, AlertTriangle, Clock } from 'lucide-react';
import { RiskBadge, StatusBadge, OutcomeBadge } from '../common/Badge';
import { useToast } from '../common/ToastSystem';
import type { PortfolioProject, InterventionType, Outcome, RiskLevel } from '../../types';

interface RiskBriefDrawerProps {
  project: PortfolioProject;
  onClose: () => void;
  onRecordIntervention: (
    projectId: string,
    type: InterventionType,
    outcome: Outcome,
    note: string
  ) => void;
}

export const RiskBriefDrawer: React.FC<RiskBriefDrawerProps> = ({
  project,
  onClose,
  onRecordIntervention
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'brief' | 'simulator'>('brief');

  // Intervention form state
  const [type, setType] = useState<InterventionType>('Request recovery plan');
  const [outcome, setOutcome] = useState<Outcome>('Confirmed risk');
  const [note, setNote] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // What-If Simulator state
  const [simCostVar, setSimCostVar] = useState<number>(project.assessment.costVariance);
  const [simSchedVar, setSimSchedVar] = useState<number>(project.assessment.scheduleVariance);
  const [simDepResolved, setSimDepResolved] = useState<boolean>(
    project.quality.dependency.includes('No unresolved') || project.quality.dependency.includes('resolved')
  );

  // Reset state when project changes
  useEffect(() => {
    setType('Request recovery plan');
    setOutcome('Confirmed risk');
    setNote('');
    setSubmitted(false);
    setActiveTab('brief');

    setSimCostVar(project.assessment.costVariance);
    setSimSchedVar(project.assessment.scheduleVariance);
    setSimDepResolved(
      project.quality.dependency.includes('No unresolved') || project.quality.dependency.includes('resolved')
    );
  }, [project.id, project.assessment.costVariance, project.assessment.scheduleVariance, project.quality.dependency]);

  // Handle ESC key for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Calculate dynamic simulated score
  const simulatedScore = useMemo(() => {
    const base = simCostVar * 1.8 + simSchedVar * 2.2 + (simDepResolved ? 10 : 38);
    return Math.max(18, Math.min(96, Math.round(base)));
  }, [simCostVar, simSchedVar, simDepResolved]);

  const simulatedRiskLevel: RiskLevel = useMemo(() => {
    if (simulatedScore >= 78) return 'Critical';
    if (simulatedScore >= 62) return 'High';
    if (simulatedScore >= 38) return 'Watch';
    return 'Low';
  }, [simulatedScore]);

  const handleApplySimulator = () => {
    const text = `What-If Analysis: Resolving dependencies and reducing cost variance (+${simCostVar}%) & schedule delay (+${simSchedVar}%) drops predicted risk score from ${project.assessment.score} (${project.risk}) to ${simulatedScore} (${simulatedRiskLevel}).`;
    setNote(text);
    setOutcome(simulatedScore < 50 ? 'Mitigated' : 'Needs monitoring');
    setActiveTab('brief');
    showToast('Simulated parameters applied to intervention note!', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRecordIntervention(project.id, type, outcome, note);
    setSubmitted(true);
    showToast(`Intervention recorded for ${project.name}! Status: ${outcome === 'Mitigated' || outcome === 'False alert' ? 'Resolved' : 'Monitoring'}`, 'success');
  };

  const isDelayedPhase = project.assessment.costVariance > 10 || project.assessment.scheduleVariance > 10;

  return (
    <div
      className="drawer-back"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      <aside className="drawer" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close risk brief">
          <X size={18} />
        </button>

        <p className="px-kicker">EXPLAINABLE RISK BRIEF · CURATED DEMO</p>
        <h2 id="drawer-title">{project.name}</h2>
        <p className="drawer-sub">
          {project.ministry} · {project.sector} · {project.region} · Cost: {project.cost}
        </p>

        {/* Tab Selector: Brief vs Simulator */}
        <div className="drawer-tabs">
          <button
            className={activeTab === 'brief' ? 'active' : ''}
            onClick={() => setActiveTab('brief')}
          >
            Explainable Risk Brief
          </button>
          <button
            className={activeTab === 'simulator' ? 'active' : ''}
            onClick={() => setActiveTab('simulator')}
          >
            <Sliders size={13} />
            ⚡ What-If Risk Simulator
          </button>
        </div>

        {activeTab === 'brief' ? (
          <>
            {/* Risk Score Summary */}
            <div className="risk-summary">
              <div
                className="score-ring"
                style={{ '--v': project.assessment.score } as React.CSSProperties}
              >
                <b>{project.assessment.score}</b>
                <small>{project.assessment.confidence}% confidence</small>
              </div>
              <div className="risk-summary-meta">
                <div className="status-flex">
                  <RiskBadge level={project.risk} />
                  <StatusBadge status={project.status} />
                </div>
                <h3>{project.milestone}</h3>
                <p className="freshness-text">
                  <CheckCircle2 size={12} className="icon-mint-inline" /> {project.quality.freshness}
                </p>
              </div>
            </div>

            {/* Recommended Action */}
            <div className="recommend">
              <ShieldAlert size={18} className="recommend-icon" />
              <div>
                <b>RECOMMENDED OFFICER ACTION</b>
                <p>{project.recommendedAction}</p>
              </div>
            </div>

            {/* Visual Milestone Progress Timeline */}
            <div className="milestone-pipeline">
              <h3>Milestone Execution Pipeline</h3>
              <div className="pipeline-steps">
                <div className="step step-done">
                  <CheckCircle2 size={14} />
                  <span>Site & Survey</span>
                  <small>Completed</small>
                </div>
                <div className={`step ${isDelayedPhase ? 'step-warn' : 'step-done'}`}>
                  {isDelayedPhase ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                  <span>Clearances & ROW</span>
                  <small>{isDelayedPhase ? 'Delayed' : 'Completed'}</small>
                </div>
                <div className="step step-active">
                  <Clock size={14} />
                  <span>Construction</span>
                  <small>In Progress</small>
                </div>
                <div className="step step-pending">
                  <Clock size={14} />
                  <span>Synchronization</span>
                  <small>Pending</small>
                </div>
              </div>
            </div>

            {/* How this score was formed */}
            <div className="formation-panel">
              <h3>
                <Info size={14} className="panel-icon" />
                How this score was formed
              </h3>
              <p className="panel-caption">
                Inputs evaluated by the local risk simulation engine:
              </p>

              <div className="model-grid">
                <div className="model-grid-item">
                  <small>Cost Variance</small>
                  <b className={project.assessment.costVariance > 10 ? 'txt-warn' : ''}>
                    +{project.assessment.costVariance}%
                  </b>
                </div>
                <div className="model-grid-item">
                  <small>Schedule Variance</small>
                  <b className={project.assessment.scheduleVariance > 10 ? 'txt-warn' : ''}>
                    +{project.assessment.scheduleVariance}%
                  </b>
                </div>
                <div className="model-grid-item wide-item">
                  <small>Progress Trend</small>
                  <b>{project.assessment.progressTrend}</b>
                </div>
                <div className="model-grid-item">
                  <small>Data Quality</small>
                  <b>{project.quality.score}% score ({project.quality.recordCompleteness}% complete)</b>
                </div>
                <div className="model-grid-item">
                  <small>Dependencies</small>
                  <b>{project.quality.dependency}</b>
                </div>
              </div>
            </div>

            {/* SHAP Drivers */}
            <div className="drivers-section">
              <h3>Top SHAP Contributing Factors</h3>
              {project.assessment.drivers.map((driver, idx) => (
                <div className="driver" key={idx}>
                  <span>{idx + 1}</span>
                  <p>{driver}</p>
                </div>
              ))}
            </div>

            {/* Active Learning Signal */}
            {project.learningState && (
              <div className="learning-signal-box">
                <CheckCircle2 size={15} />
                <span>{project.learningState}</span>
              </div>
            )}

            {/* Officer Intervention Form */}
            <form className="intervention-form" onSubmit={handleSubmit}>
              <h3>Record Officer Intervention</h3>
              <p className="form-sub">
                Recording an intervention updates project review status, logs a dated audit trail,
                and updates the portfolio learning signal.
              </p>

              <div className="form-group">
                <label htmlFor="int-type">Intervention Type</label>
                <select
                  id="int-type"
                  value={type}
                  onChange={e => setType(e.target.value as InterventionType)}
                >
                  <option value="Request recovery plan">Request recovery plan</option>
                  <option value="Schedule review">Schedule review</option>
                  <option value="Funding review">Funding review</option>
                  <option value="Field verification">Field verification</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="int-outcome">Verified Officer Outcome</label>
                <select
                  id="int-outcome"
                  value={outcome}
                  onChange={e => setOutcome(e.target.value as Outcome)}
                >
                  <option value="Confirmed risk">Confirmed risk</option>
                  <option value="Mitigated">Mitigated</option>
                  <option value="False alert">False alert</option>
                  <option value="Needs monitoring">Needs monitoring</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="int-note">Officer Evidence & Notes</label>
                <textarea
                  id="int-note"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Record field observations, committee minutes, or recovery plan terms..."
                />
              </div>

              <button type="submit" className="action">
                <Send size={14} />
                {submitted ? '✓ Intervention recorded' : 'Record intervention & update learning signal'}
              </button>

              {submitted && (
                <p className="success-toast">
                  ✓ Portfolio state updated. Status set to &ldquo;{project.status}&rdquo;.
                </p>
              )}
            </form>

            {/* Intervention History */}
            {project.interventions.length > 0 && (
              <div className="timeline-section">
                <h3>Officer Intervention History ({project.interventions.length})</h3>
                <div className="timeline">
                  {project.interventions.map(item => (
                    <div key={item.id} className="timeline-item">
                      <CheckCircle2 size={16} className="timeline-icon" />
                      <div className="timeline-content">
                        <div className="timeline-head">
                          <b>{item.type}</b>
                          <OutcomeBadge outcome={item.outcome} />
                        </div>
                        <p className="timeline-note">&ldquo;{item.note}&rdquo;</p>
                        <small className="timeline-date">
                          {item.officerName || 'Officer'} · {item.at}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* What-If Risk Simulator Tab */
          <div className="simulator-container">
            <div className="simulator-hero">
              <Sliders size={20} className="icon-mint" />
              <div>
                <b>INTERACTIVE WHAT-IF RISK SIMULATOR</b>
                <p>Adjust risk drivers below to dynamically test how targeted officer actions reduce predicted risk score.</p>
              </div>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="sim-comparison-card">
              <div className="sim-side">
                <small>Current Baseline Score</small>
                <b className="sim-score-baseline">{project.assessment.score}</b>
                <RiskBadge level={project.risk} />
              </div>
              <div className="sim-arrow">➔</div>
              <div className="sim-side">
                <small>Simulated Risk Score</small>
                <b className="sim-score-new">{simulatedScore}</b>
                <RiskBadge level={simulatedRiskLevel} />
              </div>
            </div>

            {/* Simulator Controls */}
            <div className="sim-controls">
              <div className="sim-field">
                <div className="sim-label">
                  <span>Cost Variance</span>
                  <b>+{simCostVar}%</b>
                </div>
                <input
                  type="range"
                  min="0"
                  max="35"
                  value={simCostVar}
                  onChange={e => setSimCostVar(Number(e.target.value))}
                />
              </div>

              <div className="sim-field">
                <div className="sim-label">
                  <span>Schedule Delay</span>
                  <b>+{simSchedVar}%</b>
                </div>
                <input
                  type="range"
                  min="0"
                  max="35"
                  value={simSchedVar}
                  onChange={e => setSimSchedVar(Number(e.target.value))}
                />
              </div>

              <div className="sim-field-toggle">
                <span>Inter-departmental Dependencies Resolved?</span>
                <button
                  type="button"
                  className={`toggle-btn ${simDepResolved ? 'on' : ''}`}
                  onClick={() => setSimDepResolved(!simDepResolved)}
                >
                  {simDepResolved ? '✓ Resolved' : 'Unresolved'}
                </button>
              </div>
            </div>

            <div className="sim-actions">
              <button className="action" onClick={handleApplySimulator}>
                Apply simulated evidence to intervention note
              </button>
              <button
                className="export"
                onClick={() => {
                  setSimCostVar(project.assessment.costVariance);
                  setSimSchedVar(project.assessment.scheduleVariance);
                  setSimDepResolved(
                    project.quality.dependency.includes('No unresolved') || project.quality.dependency.includes('resolved')
                  );
                }}
              >
                <RefreshCcw size={14} /> Reset sliders
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
