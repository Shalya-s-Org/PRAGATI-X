import React from 'react';
import { RefreshCcw, CheckCircle2, Menu, FileText } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
  onReset: () => void;
  onExportReport?: () => void;
  onToggleMobileNav?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onReset,
  onExportReport,
  onToggleMobileNav
}) => {
  return (
    <header className="px-header">
      <div className="px-header-main">
        {onToggleMobileNav && (
          <button
            className="mobile-nav-toggle"
            onClick={onToggleMobileNav}
            aria-label="Toggle navigation menu"
          >
            <Menu size={20} />
          </button>
        )}
        <div>
          <p className="px-kicker">NATIONAL INFRASTRUCTURE PORTFOLIO</p>
          <h1>{title}</h1>
          <p className="header-subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="head-actions">
        <div className="data-source-badge" title="Validated local demo dataset">
          <CheckCircle2 size={14} className="icon-mint" />
          <span>
            <b>CURATED DEMO DATA</b>
            <small>PAIMANA / CUF · Apr 2026</small>
          </span>
        </div>

        {onExportReport && (
          <button
            className="export report-btn"
            onClick={onExportReport}
            title="Generate executive portfolio brief report"
          >
            <FileText size={14} />
            <span>Export Report</span>
          </button>
        )}

        <button
          className="export reset-btn"
          onClick={onReset}
          title="Reset demo data to initial seed state"
        >
          <RefreshCcw size={14} />
          <span>Reset demo</span>
        </button>
      </div>
    </header>
  );
};
