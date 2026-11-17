import React from 'react';

export default function ServerValidationModal({
  show,
  onClose,
  isValidating,
  validationSteps,
  validationComplete,
  validationFailed,
  onSuccess,
  onRetry,
}) {
  if (!show) return null;

  const renderStepIcon = (status) => {
    switch (status) {
      case 'in-progress':
        return (
          <span
            className="spinner-border spinner-border-sm text-primary"
            role="status"
            aria-hidden="true"
          ></span>
        );
      case 'success':
        return <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '1.2rem' }}></i>;
      case 'failed':
        return <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: '1.2rem' }}></i>;
      case 'pending':
      default:
        return <i className="bi bi-circle text-muted" style={{ fontSize: '1.2rem' }}></i>;
    }
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0" style={{ borderRadius: '8px' }}>
          <div
            className="modal-header text-white"
            style={{ backgroundColor: '#0067FF', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
          >
            <h5 className="modal-title fs-6 fw-bold">
              <i className="bi bi-shield-check me-2"></i>
              Server Connectivity & Protocol Diagnostic
            </h5>
            {!isValidating && (
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            )}
          </div>

          <div className="modal-body p-4">
            <div className="list-group list-group-flush mb-3">
              {/* Step 1: Reachability */}
              <div className="list-group-item d-flex align-items-center py-3 px-2 border-bottom">
                <div className="me-3" style={{ width: '28px', textAlign: 'center' }}>
                  {renderStepIcon(validationSteps.reachability.status)}
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold small">1. Network & Port 22 Reachability</div>
                  <div className="text-muted small">{validationSteps.reachability.message}</div>
                </div>
              </div>

              {/* Step 2: Protocol Handshake */}
              <div className="list-group-item d-flex align-items-center py-3 px-2 border-bottom">
                <div className="me-3" style={{ width: '28px', textAlign: 'center' }}>
                  {renderStepIcon(validationSteps.protocol.status)}
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold small">2. SFTP Protocol Handshake</div>
                  <div className="text-muted small">{validationSteps.protocol.message}</div>
                </div>
              </div>

              {/* Step 3: Authentication */}
              <div className="list-group-item d-flex align-items-center py-3 px-2 border-bottom">
                <div className="me-3" style={{ width: '28px', textAlign: 'center' }}>
                  {renderStepIcon(validationSteps.auth.status)}
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold small">3. User Credential & SSH Key Validation</div>
                  <div className="text-muted small">{validationSteps.auth.message}</div>
                </div>
              </div>

              {/* Step 4: Storage Directory */}
              <div className="list-group-item d-flex align-items-center py-3 px-2">
                <div className="me-3" style={{ width: '28px', textAlign: 'center' }}>
                  {renderStepIcon(validationSteps.directory.status)}
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold small">4. Target Firmware Directory Write Access</div>
                  <div className="text-muted small">{validationSteps.directory.message}</div>
                </div>
              </div>
            </div>

            {isValidating && (
              <div className="alert alert-info py-2 px-3 small d-flex align-items-center mb-0">
                <span className="spinner-border spinner-border-sm me-2"></span>
                <span>Testing connectivity to file server endpoint...</span>
              </div>
            )}

            {validationComplete && (
              <div className="alert alert-success py-2 px-3 small mb-0">
                <i className="bi bi-check-circle-fill me-2"></i>
                All diagnostics passed! Server is ready to be saved.
              </div>
            )}

            {validationFailed && (
              <div className="alert alert-danger py-2 px-3 small mb-0">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Validation failed. Please verify the host, port, credentials, or keys.
              </div>
            )}
          </div>

          <div className="modal-footer bg-light py-2">
            {!isValidating && (
              <>
                {validationFailed ? (
                  <button className="btn btn-sm btn-outline-danger px-3" onClick={onRetry}>
                    <i className="bi bi-arrow-repeat me-1"></i> Retry
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-primary px-4"
                    onClick={onSuccess}
                    disabled={!validationComplete}
                  >
                    Save & Finish
                  </button>
                )}
                <button className="btn btn-sm btn-secondary px-3" onClick={onClose}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


