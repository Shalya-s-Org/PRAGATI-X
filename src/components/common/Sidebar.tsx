import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageSelect: (pageId: string) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onPageSelect,
  mobileOpen = false,
  onCloseMobile
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
