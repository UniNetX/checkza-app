import React, { useEffect, useRef } from 'react';
import { useSettings } from '../../context/ThemeContext';
import './SettingsModal.css';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSetting, resetToDefaults } = useSettings();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay">
      <div className="settings-modal" ref={modalRef}>
        <div className="settings-modal-header">
          <h2 className="settings-modal-title">Settings</h2>
          <button
            className="settings-modal-close"
            onClick={onClose}
            aria-label="Close settings"
          >
            ×
          </button>
        </div>

        <div className="settings-modal-content">
          {/* Essential Settings */}
          <section className="settings-section">
            <h3 className="settings-section-title">Essential</h3>
            
            {/* Theme selection removed: always dark */}

            {/* Sound */}
            <div className="settings-group">
              <label className="settings-label">Sound</label>
              <div className="settings-toggle-group">
                <button
                  className={`settings-toggle-btn ${settings.soundLevel === 'off' ? 'active' : ''}`}
                  onClick={() => updateSetting('soundLevel', 'off')}
                >
                  🔇 Off
                </button>
                <button
                  className={`settings-toggle-btn ${settings.soundLevel === 'low' ? 'active' : ''}`}
                  onClick={() => updateSetting('soundLevel', 'low')}
                >
                  🔉 Low
                </button>
                <button
                  className={`settings-toggle-btn ${settings.soundLevel === 'medium' ? 'active' : ''}`}
                  onClick={() => updateSetting('soundLevel', 'medium')}
                >
                  🔊 Medium
                </button>
              </div>
            </div>
          </section>

          {/* Learning Preferences */}
          <section className="settings-section">
            <h3 className="settings-section-title">Learning</h3>
            
            <div className="settings-group">
              <div className="settings-checkbox-group">
                <label className="settings-checkbox">
                  <input
                    type="checkbox"
                    checked={settings.showCoordinates}
                    onChange={(e) => updateSetting('showCoordinates', e.target.checked)}
                  />
                  <span className="settings-checkbox-label">Show board coordinates</span>
                </label>
                <label className="settings-checkbox">
                  <input
                    type="checkbox"
                    checked={settings.highlightLegalMoves}
                    onChange={(e) => updateSetting('highlightLegalMoves', e.target.checked)}
                  />
                  <span className="settings-checkbox-label">Highlight legal moves</span>
                </label>
                <label className="settings-checkbox">
                  <input
                    type="checkbox"
                    checked={settings.enableAnimations}
                    onChange={(e) => updateSetting('enableAnimations', e.target.checked)}
                  />
                  <span className="settings-checkbox-label">Enable animations</span>
                </label>
              </div>
            </div>
          </section>

          {/* Actions */}
          <section className="settings-section">
            <div className="settings-actions">
              <button
                className="settings-btn settings-btn-secondary"
                onClick={resetToDefaults}
              >
                Reset to Defaults
              </button>
              <button
                className="settings-btn settings-btn-primary"
                onClick={onClose}
              >
                Done
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
