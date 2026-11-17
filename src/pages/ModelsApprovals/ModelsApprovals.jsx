import React from 'react';

export default function ModelsApprovals() {
  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1" style={{ color: '#0b2b3a' }}>
            <i className="bi bi-patch-check text-primary me-2"></i> Device Models & Approvals Matrix
          </h4>
          <span className="text-muted small">
            Define hardware device models and approve certified firmware versions (Lot 3 & Sprint 2)
          </span>
        </div>
      </div>

      <div className="card shadow-sm border-0 p-4 text-center">
        <i className="bi bi-clock-history fs-1 text-primary mb-2"></i>
        <h5 className="fw-semibold">Sprint 2 Scope (Lot 3: Models & Approvals)</h5>
        <p className="text-muted small mx-auto" style={{ maxWidth: '600px' }}>
          This section connects to <code>POST /v1/list-existing-device-models</code>, <code>POST /v1/add-firmware-approval</code>, and <code>POST /v1/list-unknown-device-models</code>.
        </p>
      </div>
    </div>
  );
}


