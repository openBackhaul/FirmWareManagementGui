import React from 'react';

export default function AdminDiagnostics() {
  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1" style={{ color: '#0b2b3a' }}>
            <i className="bi bi-tools text-primary me-2"></i> System Administration & Diagnostics
          </h4>
          <span className="text-muted small">
            Autonomous pulser heartbeat, lifecycle state, and historical execution errors
          </span>
        </div>
      </div>

      <div className="card shadow-sm border-0 p-4 text-center">
        <i className="bi bi-cpu fs-1 text-primary mb-2"></i>
        <h5 className="fw-semibold">System Diagnostics & Logs</h5>
        <p className="text-muted small mx-auto" style={{ maxWidth: '600px' }}>
          Connects to <code>POST /v1/list-existing-pulsers</code> and <code>POST /v1/list-historical-errors</code>.
        </p>
      </div>
    </div>
  );
}


