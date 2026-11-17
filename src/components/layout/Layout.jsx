import React, { useState } from 'react';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout({ children, incompleteCount = 1 }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="dashboard-container">
      <TopNav onToggleSidebar={() => setIsCollapsed((s) => !s)} />
      <div className="main-layout">
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed((s) => !s)}
          incompleteCount={incompleteCount}
        />
        <main className="content-area">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}


