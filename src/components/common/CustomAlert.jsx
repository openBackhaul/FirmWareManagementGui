import React from 'react';

export default function CustomAlert({ show, onClose, type = 'info', title, message, onConfirm }) {
  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'bi-check-circle-fill text-success';
      case 'error':
      case 'danger':
        return 'bi-exclamation-triangle-fill text-danger';
      case 'warning':
        return 'bi-exclamation-circle-fill text-warning';
      case 'info':
      default:
        return 'bi-info-circle-fill text-primary';
    }
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}
      onClick={onConfirm ? undefined : onClose}
    >
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content" style={{ border: '2px solid #0067FF', borderRadius: '8px' }}>
          <div
            className="alert mb-0 border-0 rounded-0 rounded-top"
            style={{
              backgroundColor: '#E6F0FF',
              borderBottom: '1px solid #0067FF',
              color: '#0067FF',
              padding: '12px 16px',
            }}
          >
            <div className="d-flex align-items-center">
              <i className={`bi ${getIcon()} me-2`} style={{ fontSize: '1.4rem' }}></i>
              <h5 className="mb-0" style={{ color: '#0067FF', fontWeight: 600 }}>
                {title || type.charAt(0).toUpperCase() + type.slice(1)}
              </h5>
            </div>
          </div>
          <div className="modal-body p-3" style={{ fontSize: '0.93rem' }}>
            <p className="mb-0" style={{ whiteSpace: 'pre-line', color: '#333' }}>
              {message}
            </p>
          </div>
          <div className="modal-footer p-2" style={{ borderTop: '1px solid #E6F0FF' }}>
            {onConfirm && (
              <button
                className="btn btn-sm btn-outline-secondary px-3"
                onClick={onClose}
              >
                Cancel
              </button>
            )}
            <button
              className="btn btn-sm btn-primary px-3"
              onClick={handleConfirm}
              autoFocus
            >
              {onConfirm ? 'Confirm' : 'OK'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


