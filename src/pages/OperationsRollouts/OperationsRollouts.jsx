import React from 'react';

export default function OperationsRollouts() {
  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1" style={{ color: '#0b2b3a' }}>
            <i className="bi bi-rocket-takeoff text-primary me-2"></i> Device Groups & Rollouts
          </h4>
          <span className="text-muted small">
            Autonomous firmware update pipelines and rollout progress (Lot 4 & Sprint 3)
          </span>
        </div>
      </div>

      <div className="card shadow-sm border-0 p-4 text-center">
        <i className="bi bi-rocket-takeoff fs-1 text-primary mb-2"></i>
        <h5 className="fw-semibold">Sprint 3 Scope (Lot 4: Operations & Rollouts)</h5>
        <p className="text-muted small mx-auto" style={{ maxWidth: '600px' }}>
          Connects to <code>POST /v1/list-existing-device-groups</code>, <code>POST /v1/update-target-firmware</code>, and rollout monitoring jobs.
        </p>
      </div>
    </div>
  );
}


