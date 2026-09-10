import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { PortfolioProject } from '../../types';

interface DemoScenariosBarProps {
  projects: PortfolioProject[];
  onSelectProject: (project: PortfolioProject) => void;
}

export const DemoScenariosBar: React.FC<DemoScenariosBarProps> = ({ projects, onSelectProject }) => {
  const scenarios = [
    {
      id: 'PX-001',
      title: '🚂 Scenario A: Critical Railway ROW Delay',
      desc: 'Land & forest clearance bottleneck (Score 88) → Joint field verification recommendation.',
      badge: 'Critical Risk'
    },
    {
      id: 'PX-002',
      title: '💧 Scenario B: Water Link Canal Backlog',
      desc: 'Monsoon canal lining delays (Score 74) → Request recovery plan workflow.',
      badge: 'High Risk'
    },
    {
      id: 'PX-011',
      title: '🌾 Scenario C: False Alert Model Calibration',
      desc: 'Telemetry reporting lag verified (Score 24) → Automatic baseline recalibration.',
      badge: 'Resolved'
    }
  ];

  const handleLaunch = (projectId: string) => {
    const proj = projects.find(p => p.id === projectId);
    if (proj) {
      onSelectProject(proj);
    }
  };

  return (
    <div className="scenarios-banner">
      <div className="scenarios-header">
        <Sparkles size={16} className="scenarios-icon" />
        <span>
          <b>HACKATHON JUDGING QUICK SCENARIOS</b>
          <small>Select a scenario to launch the interactive risk brief & intervention loop</small>
        </span>
      </div>

      <div className="scenarios-grid">
        {scenarios.map(sc => (
          <button
            key={sc.id}
            className="scenario-card"
            onClick={() => handleLaunch(sc.id)}
          >
            <div className="scenario-card-top">
              <b>{sc.title}</b>
              <span className="scenario-tag">{sc.badge}</span>
            </div>
            <p>{sc.desc}</p>
            <div className="scenario-action">
              <span>Test scenario</span>
              <ArrowRight size={13} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
