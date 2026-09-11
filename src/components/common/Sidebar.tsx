import React from 'react';
import { CheckCircle2, X, Keyboard, Moon, Sun, LayoutDashboard, AlertTriangle, ShieldCheck, Database, Bot, Landmark } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageSelect: (pageId: string) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  onOpenShortcuts?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onPageSelect,
  mobileOpen = false,
  onCloseMobile,
  onOpenShortcuts,
  isDarkMode = false,
  onToggleDarkMode
}) => {
  const navItems = [
    { name: 'Command Center', id: 'portfolio', icon: LayoutDashboard },
    { name: 'Project Deep-Dive', id: 'risk', icon: AlertTriangle },
    { name: 'Intervention Control', id: 'interventions', icon: ShieldCheck },
    { name: 'Benchmarking', id: 'data', icon: Database },
    { name: 'AI Copilot', id: 'assistant', icon: Bot }
  ];

  const handleSelect = (id: string) => {
    onPageSelect(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}
      <aside className={`px-side ${mobileOpen ? 'mobile-visible' : ''}`}>
        <div className="px-side-header">
          <div className="px-brand">
            <span className="px-logo-box"><Landmark size={18} strokeWidth={2.4} /></span>
            <div className="px-brand-text">
              <b>IPMD Monitor</b>
              <small>Project Intelligence Platform</small>
            </div>
          </div>
          {onCloseMobile && (
            <button
              className="mobile-close-btn"
              onClick={onCloseMobile}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <p className="px-caption">INFRASTRUCTURE &amp; PROJECT MONITORING</p>

        <nav className="px-nav" aria-label="Main Navigation">
          {navItems.map(({ name, id, icon: Icon }) => (
            <button
              key={id}
              className={currentPage === id ? 'active' : ''}
              onClick={() => handleSelect(id)}
            >
              <Icon size={16} className="nav-icon" />
              <span>{name}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Utilities: Shortcuts & Theme */}
        <div className="side-utilities">
          {onOpenShortcuts && (
            <button className="side-util-btn" onClick={onOpenShortcuts} title="Open keyboard shortcuts guide (?)">
              <Keyboard size={14} />
              <span>Shortcuts (?)</span>
            </button>
          )}

          {onToggleDarkMode && (
            <button className="side-util-btn" onClick={onToggleDarkMode} title="Toggle presentation theme">
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
              <span>{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
            </button>
          )}
        </div>

        <div className="px-source">
          <CheckCircle2 size={16} />
          <span>
            <b>MONITORING DATA ONLINE</b>
            <small>Portfolio refresh · Apr 2026</small>
          </span>
        </div>
      </aside>
    </>
  );
};
