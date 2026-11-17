import React, { useState, useEffect } from 'react';

export default function EditServerModal({ show, server, onClose, onSave }) {
  const [formData, setFormData] = useState({
    serverLabel: '',
    destinationUrl: '',
    userName: '',
    authType: 'password',
    password: '',
    sshKey: '',
    retentionPeriod: '30 Days',
  });

  useEffect(() => {
    if (server) {
      setFormData({
        serverLabel: server['server-label'] || '',
        destinationUrl: server['destination-url'] || '',
        userName: server['user-name'] || '',
        authType: server['ssh-key'] ? 'key' : 'password',
        password: server['password'] || '',
        sshKey: server['ssh-key'] || '',
        retentionPeriod: server['retention-period'] || '30 Days',
      });
    }
  }, [server]);

  if (!show || !server) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
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
              <i className="bi bi-pencil-square me-2"></i> Update Server: {server['server-label']}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Server Label (Read-only)</label>
                  <input
                    type="text"
                    className="form-control form-control-sm bg-light"
                    value={formData.serverLabel}
                    disabled
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Destination URL / Host</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="destinationUrl"
                    value={formData.destinationUrl}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">SFTP Username</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="userName"
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
                      id="editAuthPass"
                      value="password"
                      checked={formData.authType === 'password'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label small" htmlFor="editAuthPass">
                      Password
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="authType"
                      id="editAuthKey"
                      value="key"
                      checked={formData.authType === 'key'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label small" htmlFor="editAuthKey">
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
                      placeholder="Enter new password or leave blank to keep existing"
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
                      placeholder="Paste OpenSSH Private Key..."
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
                Update Configuration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


