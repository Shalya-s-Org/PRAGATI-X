import React from 'react';
import { Bell, Search, ShieldCheck, UserRound } from 'lucide-react';
import type { PortfolioProject } from '../../types';

interface CommandTopbarProps {
  projects: PortfolioProject[];
}

export const CommandTopbar: React.FC<CommandTopbarProps> = ({ projects }) => {
  const ministries = new Set(projects.map(project => project.ministry)).size;
  const sectors = new Set(projects.map(project => project.sector)).size;

  return (
    <header className="command-topbar">
      <div className="command-brand">
        <span className="command-brand-mark">IPMD</span>
        <div>
          <strong>IPMD Monitor</strong>
          <small>Infrastructure &amp; Project Monitoring Division</small>
        </div>
      </div>

      <div className="command-telemetry" aria-label="Portfolio telemetry">
        <span className="telemetry-live"><i /> Live sync</span>
        <span><b>{projects.length}</b> active projects</span>
        <span><b>{ministries}</b> ministries</span>
        <span><b>{sectors}</b> sectors</span>
        <span>Cut-off: <b>Apr 2026</b></span>
      </div>

      <div className="command-tools">
        <label className="command-search">
          <Search size={15} />
          <input aria-label="Search projects" placeholder="Search project or ministry" />
        </label>
        <button className="command-icon-button" aria-label="Alerts"><Bell size={17} /><em>4</em></button>
        <span className="command-user"><UserRound size={16} /></span>
      </div>

      <div className="command-classification">
        <ShieldCheck size={13} /> Government of India · IPMD decision support system
        <b>IPMD-SECURE</b>
      </div>
    </header>
  );
};
