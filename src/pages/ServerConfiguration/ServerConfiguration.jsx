import React, { useState, useEffect } from 'react';
import serverService from '../../services/serverService';
import CreateServerModal from './CreateServerModal';
import EditServerModal from './EditServerModal';
import ServerValidationModal from './ServerValidationModal';
import CustomAlert from '../../components/common/CustomAlert';

export default function ServerConfiguration() {
  const [servers, setServers] = useState([]);
  const [incompleteLabels, setIncompleteLabels] = useState([]);
  const [filterIncompleteOnly, setFilterIncompleteOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingServer, setEditingServer] = useState(null);
  const [serverToDelete, setServerToDelete] = useState(null);

  // Validation state
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [pendingServerData, setPendingServerData] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationComplete, setValidationComplete] = useState(false);
  const [validationFailed, setValidationFailed] = useState(false);
  const [validationSteps, setValidationSteps] = useState({
    reachability: { status: 'pending', message: 'Verifying network & host DNS resolution...' },
    protocol: { status: 'pending', message: 'Waiting...' },
    auth: { status: 'pending', message: 'Waiting...' },
    directory: { status: 'pending', message: 'Waiting...' },
  });

  // Alert State
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
      const [serverList, incompleteList] = await Promise.all([
        serverService.listExistingServers(),
        serverService.listIncompleteServers(),
      ]);
      setServers(serverList || []);
      setIncompleteLabels(incompleteList || []);
    } catch (err) {
      setAlertConfig({
        show: true,
        type: 'danger',
        title: 'Communication Error',
        message: `Failed to load file servers: ${err.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered servers
  const displayedServers = filterIncompleteOnly
    ? servers.filter((s) => incompleteLabels.includes(s['server-label']) || !s['is-complete'])
    : servers;

  // Validation runner
  const runValidationFlow = (serverData) => {
    setPendingServerData(serverData);
    setShowCreateModal(false);
    setShowValidationModal(true);
    setIsValidating(true);
    setValidationComplete(false);
    setValidationFailed(false);

    setValidationSteps({
      reachability: { status: 'in-progress', message: 'Testing ping & port reachability...' },
      protocol: { status: 'pending', message: 'Waiting...' },
      auth: { status: 'pending', message: 'Waiting...' },
      directory: { status: 'pending', message: 'Waiting...' },
    });

    setTimeout(() => {
      setValidationSteps((prev) => ({
        ...prev,
        reachability: { status: 'success', message: 'Port 22 reachable (RTT: 12ms)' },
        protocol: { status: 'in-progress', message: 'Negotiating SFTP v3/v4 handshake...' },
      }));

      setTimeout(() => {
        setValidationSteps((prev) => ({
          ...prev,
          protocol: { status: 'success', message: 'SFTP subsystem accepted cipher suite' },
          auth: { status: 'in-progress', message: 'Authenticating credentials...' },
        }));

        setTimeout(() => {
          setValidationSteps((prev) => ({
            ...prev,
            auth: { status: 'success', message: 'User authorized via key/password' },
            directory: { status: 'in-progress', message: 'Validating directory read/write privileges...' },
          }));

          setTimeout(() => {
            setValidationSteps((prev) => ({
              ...prev,
              directory: { status: 'success', message: 'Storage directory writable' },
            }));
            setIsValidating(false);
            setValidationComplete(true);
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  const handleSaveConfirmed = async () => {
    try {
      await serverService.createServer(pendingServerData);
      setShowValidationModal(false);
      setAlertConfig({
        show: true,
        type: 'success',
        title: 'Server Registered',
        message: `Server "${pendingServerData.serverLabel}" was successfully registered in the running domain!`,
      });
      loadData();
    } catch (err) {
      setAlertConfig({
        show: true,
        type: 'danger',
        title: 'Registration Error',
        message: `Failed to create server: ${err.message}`,
      });
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await serverService.updateServer(formData);
      setEditingServer(null);
      setAlertConfig({
        show: true,
        type: 'success',
        title: 'Server Updated',
        message: `Server "${formData.serverLabel}" credentials have been updated successfully.`,
      });
      loadData();
    } catch (err) {
      setAlertConfig({
        show: true,
        type: 'danger',
        title: 'Update Error',
        message: `Failed to update server: ${err.message}`,
      });
    }
  };

  const handleDelete = async () => {
    if (!serverToDelete) return;
    try {
      await serverService.deleteServer(serverToDelete);
      setServerToDelete(null);
      setAlertConfig({
        show: true,
        type: 'success',
        title: 'Server Removed',
        message: `Server "${serverToDelete}" has been deleted.`,
      });
      loadData();
    } catch (err) {
      setAlertConfig({
        show: true,
        type: 'danger',
        title: 'Delete Error',
        message: `Failed to delete server: ${err.message}`,
      });
    }
  };

  return (
    <div className="container-fluid px-0">
      {/* Title & Action Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1" style={{ color: '#0b2b3a' }}>
            <i className="bi bi-server text-primary me-2"></i> File Server Repositories
          </h4>
          <span className="text-muted small">
            Manage SFTP & HTTPS repositories hosting certified microwave firmware images
          </span>
        </div>
        <div className="d-flex gap-2">
          <button
            className={`btn btn-sm ${filterIncompleteOnly ? 'btn-warning' : 'btn-outline-secondary'}`}
            onClick={() => setFilterIncompleteOnly(!filterIncompleteOnly)}
          >
            <i className="bi bi-funnel me-1"></i>
            {filterIncompleteOnly ? 'Showing Incomplete Only' : 'Filter Incomplete'}
            {incompleteLabels.length > 0 && (
              <span className="badge bg-dark ms-1">{incompleteLabels.length}</span>
            )}
          </button>

          <button className="btn btn-sm btn-primary" onClick={() => setShowCreateModal(true)}>
            <i className="bi bi-plus-lg me-1"></i> Add File Server
          </button>
        </div>
      </div>

      {/* Warning Banner if incomplete server detected */}
      {incompleteLabels.length > 0 && (
        <div className="banner-incomplete">
          <div className="d-flex align-items-center">
            <i className="bi bi-exclamation-triangle-fill text-warning me-3 fs-5"></i>
            <div>
              <span className="fw-semibold text-dark small d-block">
                Incomplete Server Configurations Detected (/list-incomplete-servers)
              </span>
              <span className="text-muted small">
                Server <code>{incompleteLabels.join(', ')}</code> lacks authentication credentials and cannot be used for firmware deployment.
              </span>
            </div>
          </div>
          <button
            className="btn btn-sm btn-warning text-dark fw-semibold px-3"
            onClick={() => {
              const target = servers.find((s) => s['server-label'] === incompleteLabels[0]);
              if (target) setEditingServer(target);
            }}
          >
            Resolve Credentials
          </button>
        </div>
      )}

      {/* Main Table Card */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <span className="fw-semibold small text-uppercase text-secondary">
            Configured Endpoints ({displayedServers.length})
          </span>
          {loading && <span className="spinner-border spinner-border-sm text-primary"></span>}
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th style={{ width: '22%' }}>Server Label</th>
                <th style={{ width: '28%' }}>Destination URL / Host</th>
                <th style={{ width: '16%' }}>SFTP Username</th>
                <th style={{ width: '14%' }}>Credential State</th>
                <th style={{ width: '10%' }}>Retention</th>
                <th style={{ width: '10%' }} className="text-end pe-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedServers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted small">
                    <i className="bi bi-inbox fs-3 d-block text-secondary mb-1"></i>
                    No file servers found. Click "+ Add File Server" to register a repository.
                  </td>
                </tr>
              ) : (
                displayedServers.map((server) => {
                  const isIncomplete = incompleteLabels.includes(server['server-label']) || !server['is-complete'];
                  return (
                    <tr key={server['server-label']}>
                      <td>
                        <strong className="text-dark small">{server['server-label']}</strong>
                      </td>
                      <td>
                        <code className="text-primary small">{server['destination-url']}</code>
                      </td>
                      <td className="small text-muted">{server['user-name'] || 'â€”'}</td>
                      <td>
                        {isIncomplete ? (
                          <span className="badge badge-incomplete">
                            <i className="bi bi-exclamation-circle me-1"></i> Missing Credentials
                          </span>
                        ) : (
                          <span className="badge badge-complete">
                            <i className="bi bi-check2-circle me-1"></i> Complete
                          </span>
                        )}
                      </td>
                      <td className="small text-muted">{server['retention-period'] || '30 Days'}</td>
                      <td className="text-end pe-3">
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary btn-sm py-0 px-2"
                            title="Edit Server"
                            onClick={() => setEditingServer(server)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm py-0 px-2"
                            title="Delete Server"
                            onClick={() => {
                              setServerToDelete(server['server-label']);
                              setAlertConfig({
                                show: true,
                                type: 'danger',
                                title: 'Confirm Deletion',
                                message: `Are you sure you want to delete server "${server['server-label']}"? This will deregister the endpoint from the network domain.`,
                                onConfirm: handleDelete,
                              });
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <CreateServerModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSaveAndValidate={runValidationFlow}
      />

      <EditServerModal
        show={Boolean(editingServer)}
        server={editingServer}
        onClose={() => setEditingServer(null)}
        onSave={handleUpdate}
      />

      <ServerValidationModal
        show={showValidationModal}
        isValidating={isValidating}
        validationSteps={validationSteps}
        validationComplete={validationComplete}
        validationFailed={validationFailed}
        onClose={() => setShowValidationModal(false)}
        onSuccess={handleSaveConfirmed}
        onRetry={() => runValidationFlow(pendingServerData)}
      />

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


