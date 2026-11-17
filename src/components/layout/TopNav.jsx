import React, { useState } from 'react';
import ServerTimeDisplay from '../common/ServerTimeDisplay';
import { FaUserCircle, FaSignOutAlt, FaBars } from 'react-icons/fa';
import authUtils from '../../utils/authUtils';

export default function TopNav({ onToggleSidebar }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = authUtils.getCredentials();

  const handleLogout = () => {
    authUtils.clearAuth();
    window.location.reload();
  };

  return (
    <nav className="top-nav">
      <div className="nav-left">
        <button
          className="btn btn-sm text-secondary d-md-none"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation"
        >
          <FaBars />
        </button>
        <div className="app-logo">T</div>
        <div className="app-title-group">
          <span className="app-title">FirmWareManager</span>
          <span className="app-subtitle">openBackhaul SDN Core</span>
        </div>
      </div>

      <div className="nav-center d-none d-md-flex">
        <ServerTimeDisplay />
      </div>

      <div className="nav-right">
        <div className="dropdown position-relative">
          <button
            className="avatar-btn d-flex align-items-center gap-2"
            onClick={() => setShowDropdown(!showDropdown)}
            title="User Profile"
          >
            <FaUserCircle className="avatar-icon" />
            <span className="d-none d-sm-inline text-dark fw-medium small">{user}</span>
          </button>

          {showDropdown && (
            <div
              className="dropdown-menu dropdown-menu-end show shadow-sm"
              style={{ position: 'absolute', right: 0, top: '100%', minWidth: '160px' }}
            >
              <div className="dropdown-item-text small text-muted">
                Signed in as <strong>{user}</strong>
              </div>
              <div className="dropdown-divider"></div>
              <button
                className="dropdown-item text-danger d-flex align-items-center gap-2"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}


