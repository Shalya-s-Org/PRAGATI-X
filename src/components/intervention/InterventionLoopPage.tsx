import React, { useState, useMemo } from 'react';
import { ShieldCheck, CheckCircle2, ChevronRight, Filter, AlertCircle, Award } from 'lucide-react';
import { Header } from '../common/Header';
import { OutcomeBadge } from '../common/Badge';
import type { PortfolioProject, Outcome, InterventionType } from '../../types';

interface InterventionLoopPageProps {
  projects: PortfolioProject[];
  onOpenProject: (project: PortfolioProject) => void;
  onResetDemo: () => void;
  onToggleMobileNav?: () => void;
}

export const InterventionLoopPage: React.FC<InterventionLoopPageProps> = ({
  projects,
  onOpenProject,
  onResetDemo,
  onToggleMobileNav
}) => {
  const [outcomeFilter, setOutcomeFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  // Collect all interventions across all projects with project context attached
  const allInterventions = useMemo(() => {
    const list: Array<{
      project: PortfolioProject;
      intervention: PortfolioProject['interventions'][0];
    }> = [];

    projects.forEach(proj => {
      proj.interventions.forEach(item => {
        list.push({
          project: proj,
          intervention: item
        });
      });
    });

    return list;
  }, [projects]);

  const filteredList = useMemo(() => {
    return allInterventions.filter(item => {
      if (outcomeFilter !== 'All' && item.intervention.outcome !== outcomeFilter) return false;
      if (typeFilter !== 'All' && item.intervention.type !== typeFilter) return false;
      return true;
    });
  }, [allInterventions, outcomeFilter, typeFilter]);

  const totalInterventions = allInterventions.length;
  const mitigatedCount = allInterventions.filter(i => i.intervention.outcome === 'Mitigated').length;
  const falseAlertCount = allInterventions.filter(i => i.intervention.outcome === 'False alert').length;
  const monitoringCount = allInterventions.filter(i => i.intervention.outcome === 'Needs monitoring').length;

  return (
    <div className="intervention-page-view">
      <Header
        title="Interventions & Learning Loop"
        subtitle="A traceable audit record from initial risk alert to verified officer outcome and model calibration."
        onReset={onResetDemo}
        onToggleMobileNav={onToggleMobileNav}
      />

      {/* Summary Metrics Row */}
      <section className="metric-row">
        <div>
          <span className="mint">
            <ShieldCheck size={18} />
          </span>
          <small>Total Interventions</small>
          <b>{totalInterventions}</b>
          <em>Across portfolio</em>
        </div>

        <div>
          <span className="sage">
            <Award size={18} />
          </span>
          <small>Mitigated Risks</small>
          <b>{mitigatedCount}</b>
          <em>Verified by field officers</em>
        </div>

        <div>
          <span className="blue">
            <CheckCircle2 size={18} />
          </span>
          <small>False Alerts Recalibrated</small>
          <b>{falseAlertCount}</b>
          <em>Baseline model updated</em>
        </div>

        <div>
          <span className="orange">
            <AlertCircle size={18} />
          </span>
          <small>Active Monitoring</small>
          <b>{monitoringCount}</b>
          <em>Follow-up required</em>
        </div>
      </section>

      {/* Filters Toolbar */}
      <div className="widefilters">
        <div className="filter-group-icon">
          <Filter size={15} />
          <span>Intervention Filters:</span>
        </div>

        <select value={outcomeFilter} onChange={e => setOutcomeFilter(e.target.value)}>
          <option value="All">All Outcomes</option>
          <option value="Confirmed risk">Confirmed risk</option>
          <option value="Mitigated">Mitigated</option>
          <option value="False alert">False alert</option>
          <option value="Needs monitoring">Needs monitoring</option>
        </select>

        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="All">All Types</option>
          <option value="Request recovery plan">Request recovery plan</option>
          <option value="Schedule review">Schedule review</option>
          <option value="Funding review">Funding review</option>
          <option value="Field verification">Field verification</option>
        </select>

        <b className="count-badge">{filteredList.length} recorded interactions</b>
      </div>

      {/* Intervention Timeline List */}
      {filteredList.length > 0 ? (
        <div className="timeline-container">
          {filteredList.map(({ project, intervention }) => (
            <div
              key={intervention.id}
              className="intervention-timeline-card"
              onClick={() => onOpenProject(project)}
            >
              <div className="timeline-card-icon">
                <CheckCircle2 size={20} className="icon-mint" />
              </div>

              <div className="timeline-card-body">
                <div className="timeline-card-head">
                  <div>
                    <b>{project.name}</b>
                    <span className="meta-sub">
                      {project.ministry} · {project.region}
                    </span>
                  </div>
                  <div className="badge-pair">
                    <span className="type-tag">{intervention.type}</span>
                    <OutcomeBadge outcome={intervention.outcome} />
                  </div>
                </div>

                <p className="intervention-note-text">
                  &ldquo;{intervention.note}&rdquo;
                </p>

                {project.learningState && (
                  <div className="learning-signal-chip">
                    <span className="signal-dot" />
                    {project.learningState}
                  </div>
                )}

                <div className="timeline-card-foot">
                  <small>Recorded on {intervention.at} by {intervention.officerName || 'Officer'}</small>
                  <span className="open-link">
                    View project brief <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <ShieldCheck size={36} />
          <h2>No intervention outcomes logged yet</h2>
          <p>
            Open any project from the Risk Queue, select an intervention type and verified outcome,
            and record officer evidence to see the learning loop in action.
          </p>
        </div>
      )}
    </div>
  );
};
