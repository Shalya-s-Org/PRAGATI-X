import React from 'react';
import type { RiskLevel, ReviewStatus, Outcome } from '../../types';

export const RiskBadge: React.FC<{ level: RiskLevel }> = ({ level }) => {
  const lowercaseClass = level.toLowerCase();
  return (
    <span className={`risk ${lowercaseClass}`}>
      <i />
      {level}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: ReviewStatus }> = ({ status }) => {
  let styleClass = 'status-needs';
  if (status === 'In review') styleClass = 'status-in-review';
  if (status === 'Monitoring') styleClass = 'status-monitoring';
  if (status === 'Resolved') styleClass = 'status-resolved';

  return (
    <span className={`px-status-tag ${styleClass}`}>
      {status}
    </span>
  );
};

export const OutcomeBadge: React.FC<{ outcome: Outcome }> = ({ outcome }) => {
  let styleClass = 'outcome-confirmed';
  if (outcome === 'Mitigated') styleClass = 'outcome-mitigated';
  if (outcome === 'False alert') styleClass = 'outcome-false-alert';
  if (outcome === 'Needs monitoring') styleClass = 'outcome-monitoring';

  return (
    <span className={`px-outcome-tag ${styleClass}`}>
      {outcome}
    </span>
  );
};
