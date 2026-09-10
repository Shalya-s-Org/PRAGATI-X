import React, { useEffect } from 'react';
import { X, Keyboard, Command } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const shortcuts = [
    { key: '1 / P', desc: 'Jump to Portfolio Command Center' },
    { key: '2 / R', desc: 'Jump to Risk Queue Page' },
    { key: '3 / I', desc: 'Jump to Interventions & Learning Loop' },
    { key: '4 / D', desc: 'Jump to Data Quality & Provenance' },
    { key: '5 / A', desc: 'Jump to AI Assistant' },
    { key: 'E', desc: 'Export Executive Brief Report' },
    { key: '?', desc: 'Toggle Keyboard Shortcuts Guide' },
    { key: 'Esc', desc: 'Close open drawers or modals' }
  ];

  return (
    <div className="report-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="report-modal shortcuts-modal" onClick={e => e.stopPropagation()}>
        <div className="report-modal-header">
          <div className="shortcuts-title-flex">
            <Keyboard size={20} className="icon-mint" />
            <div>
              <h2>Keyboard Power Shortcuts</h2>
              <small>Navigate PRAGATI-X at full speed during hackathon judging</small>
            </div>
          </div>
          <button className="close" onClick={onClose} aria-label="Close shortcuts guide">
            <X size={18} />
          </button>
        </div>

        <div className="shortcuts-grid">
          {shortcuts.map(sc => (
            <div key={sc.key} className="shortcut-row">
              <kbd className="shortcut-kbd">{sc.key}</kbd>
              <span className="shortcut-desc">{sc.desc}</span>
            </div>
          ))}
        </div>

        <div className="shortcuts-foot">
          <Command size={14} className="icon-mint" />
          <span>Press any key to test navigation hotkeys</span>
        </div>
      </div>
    </div>
  );
};
