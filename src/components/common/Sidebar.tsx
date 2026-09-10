import React from 'react';
import { CheckCircle2, X, Keyboard, Moon, Sun } from 'lucide-react';

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
    ['Portfolio', 'portfolio'],
    ['Risk queue', 'risk'],
    ['Interventions', 'interventions'],
    ['Data quality', 'data'],
    ['AI assistant', 'assistant']
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
            <span>PX</span>
            PRAGATI-X
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

        <p className="px-caption">GOVERNMENT PROJECT INTELLIGENCE</p>

        <nav className="px-nav" aria-label="Main Navigation">
          {navItems.map(([name, id]) => (
            <button
              key={id}
              className={currentPage === id ? 'active' : ''}
              onClick={() => handleSelect(id)}
            >
              {name}
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
              <span>{isDarkMode ? 'Light Mode' : 'Executive Navy'}</span>
            </button>
          )}
        </div>

        <div className="px-source">
          <CheckCircle2 size={16} />
          <span>
            <b>CURATED DEMO DATA</b>
            <small>PAIMANA / CUF · Apr 2026</small>
          </span>
        </div>
      </aside>
    </>
  );
};
