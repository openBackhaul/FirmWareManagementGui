import React, { useState } from 'react';

export default function CreateServerModal({ show, onClose, onSaveAndValidate }) {
  const [formData, setFormData] = useState({
    serverLabel: '',
    destinationUrl: 'sftp://',
    userName: '',
    authType: 'password', // 'password' | 'key'
    password: '',
    sshKey: '',
    retentionPeriod: '30 Days',
  });
  const [errorMsg, setErrorMsg] = useState('');

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.serverLabel.trim()) {
      setErrorMsg('Server Label is required.');
      return;
    }
    if (!formData.destinationUrl.trim() || formData.destinationUrl === 'sftp://') {
      setErrorMsg('Destination Host / URL is required.');
      return;
    }

    onSaveAndValidate(formData);
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content shadow border-0" style={{ borderRadius: '8px' }}>
          <div
            className="modal-header"
            style={{
              backgroundColor: '#0067FF',
              color: '#ffffff',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
            }}
          >
            <h5 className="modal-title fs-6 fw-bold">
              <i className="bi bi-server me-2"></i> Register New File Server Repository
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              {errorMsg && (
                <div className="alert alert-danger py-2 px-3 small mb-3">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {errorMsg}
                </div>
              )}

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Server Label *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="serverLabel"
                    placeholder="e.g. SFTP_Primary_DE"
                    value={formData.serverLabel}
                    onChange={handleChange}
                    required
                  />
                  <div className="form-text small">Unique label in network domain.</div>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Destination URL / Host *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="destinationUrl"
                    placeholder="sftp://10.244.18.25/firmware"
                    value={formData.destinationUrl}
                    onChange={handleChange}
                    required
                  />
                  <div className="form-text small">Protocol and target directory path.</div>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">SFTP Username</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="userName"
                    placeholder="e.g. fw_admin"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Image Retention Policy</label>
                  <select
                    className="form-select form-select-sm"
                    name="retentionPeriod"
                    value={formData.retentionPeriod}
                    onChange={handleChange}
                  >
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="60 Days">60 Days</option>
                    <option value="90 Days">90 Days</option>
                    <option value="180 Days">180 Days</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label small fw-semibold d-block">Authentication Method</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="authType"
                      id="authPassword"
                      value="password"
                      checked={formData.authType === 'password'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label small" htmlFor="authPassword">
                      Password
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="authType"
                      id="authKey"
                      value="key"
                      checked={formData.authType === 'key'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label small" htmlFor="authKey">
                      SSH Private Key
                    </label>
                  </div>
                </div>

                {formData.authType === 'password' ? (
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Password</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      name="password"
                      placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <div className="col-12">
                    <label className="form-label small fw-semibold">SSH Private Key</label>
                    <textarea
                      className="form-control form-control-sm font-monospace"
                      rows="3"
                      name="sshKey"
                      placeholder="-----BEGIN OPENSSH PRIVATE KEY-----&#10;...&#10;-----END OPENSSH PRIVATE KEY-----"
                      value={formData.sshKey}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer bg-light py-2">
              <button type="button" className="btn btn-sm btn-outline-secondary px-3" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-sm btn-primary px-3">
                <i className="bi bi-shield-check me-1"></i> Validate & Register Server
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


