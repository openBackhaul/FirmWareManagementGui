import React from 'react';

export default function PlanningDevices() {
  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1" style={{ color: '#0b2b3a' }}>
            <i className="bi bi-hdd-network text-primary me-2"></i> Microwave Network Inventory
          </h4>
          <span className="text-muted small">
            Live inventory discovered via ONF SDN mediation layer (Lot 4 / Lot 6)
          </span>
        </div>
      </div>

      <div className="card shadow-sm border-0 p-4 text-center">
        <i className="bi bi-hdd-network fs-1 text-primary mb-2"></i>
        <h5 className="fw-semibold">Network Device Inventory</h5>
        <p className="text-muted small mx-auto" style={{ maxWidth: '600px' }}>
          Connects to <code>POST /v1/list-existing-devices</code> and <code>POST /v1/provide-existing-device</code>.
        </p>
      </div>
    </div>
  );
}


