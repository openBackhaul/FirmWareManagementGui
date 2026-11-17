import React, { useState, useEffect } from 'react';
import firmwareService from '../../services/firmwareService';
import CustomAlert from '../../components/common/CustomAlert';

export default function FirmwarePackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertConfig, setAlertConfig] = useState({
    show: false,
    type: 'info',
    title: '',
    message: '',
    onConfirm: null,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await firmwareService.listExistingFirmwareResources();
      setPackages(data || []);
    } catch (err) {
      setAlertConfig({
        show: true,
        type: 'danger',
        title: 'Communication Error',
        message: `Failed to load firmware resources: ${err.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (pkgName) => {
    try {
      await firmwareService.deleteFirmwareResource(pkgName);
      setAlertConfig({
        show: true,
        type: 'success',
        title: 'Package Removed',
        message: `Firmware package "${pkgName}" has been removed.`,
      });
      loadData();
    } catch (err) {
      setAlertConfig({
        show: true,
        type: 'danger',
        title: 'Deletion Error',
        message: `Failed to delete firmware package: ${err.message}`,
      });
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1" style={{ color: '#0b2b3a' }}>
            <i className="bi bi-boxes text-primary me-2"></i> Firmware Packages Catalog
          </h4>
          <span className="text-muted small">
            Catalog of certified microwave vendor firmware binaries ready for rollouts
          </span>
        </div>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            setAlertConfig({
              show: true,
              type: 'info',
              title: 'Register Resource',
              message: 'Resource registration modal will connect to POST /v1/create-firmware-resource.',
            });
          }}
        >
          <i className="bi bi-plus-lg me-1"></i> Register Resource
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <span className="fw-semibold small text-uppercase text-secondary">
            Certified Packages ({packages.length})
          </span>
          {loading && <span className="spinner-border spinner-border-sm text-primary"></span>}
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Package Name</th>
                <th style={{ width: '15%' }}>Version</th>
                <th style={{ width: '25%' }}>File Server</th>
                <th style={{ width: '25%' }}>Binary File Name</th>
                <th style={{ width: '10%' }} className="text-end pe-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted small">
                    <i className="bi bi-inbox fs-3 d-block text-secondary mb-1"></i>
                    No firmware packages registered.
                  </td>
                </tr>
              ) : (
                packages.map((pkg) => (
                  <tr key={pkg['firmware-resource-name']}>
                    <td>
                      <strong className="text-dark small">{pkg['firmware-resource-name']}</strong>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {pkg['firmware-resource-version']}
                      </span>
                    </td>
                    <td>
                      <code className="text-primary small">{pkg['server-label']}</code>
                    </td>
                    <td className="small font-monospace text-secondary">{pkg['file-name']}</td>
                    <td className="text-end pe-3">
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-danger btn-sm py-0 px-2"
                          onClick={() => {
                            setAlertConfig({
                              show: true,
                              type: 'danger',
                              title: 'Confirm Deletion',
                              message: `Delete firmware resource "${pkg['firmware-resource-name']}"?`,
                              onConfirm: () => handleDelete(pkg['firmware-resource-name']),
                            });
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CustomAlert
        show={alertConfig.show}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => setAlertConfig((prev) => ({ ...prev, show: false }))}
        onConfirm={alertConfig.onConfirm}
      />
    </div>
  );
}


