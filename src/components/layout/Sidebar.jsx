import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaServer,
  FaBoxes,
  FaCheckCircle,
  FaRocket,
  FaNetworkWired,
  FaTools,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

export default function Sidebar({ isCollapsed, onToggle, incompleteCount = 1 }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      path: '/server-configuration',
      label: 'File Servers',
      icon: <FaServer />,
      badge: incompleteCount > 0 ? `${incompleteCount} Incomplete` : null,
      badgeClass: 'bg-warning text-dark',
    },
    {
      path: '/firmware-catalog',
      label: 'Firmware Catalog',
      icon: <FaBoxes />,
      badge: '4 Packages',
      badgeClass: 'bg-secondary',
    },
    {
      path: '/models-approvals',
      label: 'Models & Approvals',
      icon: <FaCheckCircle />,
      badge: null,
      badgeClass: '',
    },
    {
      path: '/operations-rollouts',
      label: 'Operations & Rollouts',
      icon: <FaRocket />,
      badge: '3 Groups',
      badgeClass: 'bg-info text-dark',
    },
    {
      path: '/planning-devices',
      label: 'Planning & Devices',
      icon: <FaNetworkWired />,
      badge: null,
      badgeClass: '',
    },
    {
      path: '/admin-diagnostics',
      label: 'Admin & Diagnostics',
      icon: <FaTools />,
      badge: null,
      badgeClass: '',
    },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <ul className="sidebar-menu">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/server-configuration');
          return (
            <li
              key={item.path}
              className={`menu-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
              title={isCollapsed ? item.label : undefined}
            >
              <i>{item.icon}</i>
              {!isCollapsed && (
                <>
                  <span className="menu-label">{item.label}</span>
                  {item.badge && (
                    <span className={`badge menu-badge ${item.badgeClass}`}>{item.badge}</span>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer">
        <button
          className="sidebar-toggle-btn"
          onClick={onToggle}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
    </aside>
  );
}


