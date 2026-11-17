import apiClient from '../api/apiClient';
import { initialMockServers } from './mockData';

// In-memory store for mock fallback
let mockServers = [...initialMockServers];

export const serverService = {
  /**
   * Fetch all configured servers (TELSDN-7066, TELSDN-7155)
   */
  async listExistingServers() {
    try {
      const res = await apiClient.post('/v1/list-existing-servers', {}, { journey: 'server-configuration' });
      return res.data;
    } catch (err) {
      if (import.meta.env.VITE_ENABLE_MOCK_FALLBACK === 'true') {
        console.warn('Backend unavailable, using mock server list:', err.message);
        return [...mockServers];
      }
      throw err;
    }
  },

  /**
   * Fetch servers with incomplete credentials (TELSDN-7067, TELSDN-7157)
   */
  async listIncompleteServers() {
    try {
      const res = await apiClient.post('/v1/list-incomplete-servers', {}, { journey: 'server-configuration' });
      return res.data;
    } catch (err) {
      if (import.meta.env.VITE_ENABLE_MOCK_FALLBACK === 'true') {
        return mockServers.filter((s) => !s['is-complete']).map((s) => s['server-label']);
      }
      throw err;
    }
  },

  /**
   * Create a new server (TELSDN-7068, TELSDN-7163, TELSDN-7164)
   */
  async createServer(serverData) {
    const payload = {
      'server-label': serverData.serverLabel,
      'destination-url': serverData.destinationUrl || '',
      'user-name': serverData.userName || '',
      'password': serverData.password || '',
      'ssh-key': serverData.sshKey || '',
      'retention-period': serverData.retentionPeriod || '30 Days',
    };

    try {
      const res = await apiClient.post('/v1/create-server', payload, { journey: 'server-creation' });
      return res.data;
    } catch (err) {
      if (import.meta.env.VITE_ENABLE_MOCK_FALLBACK === 'true') {
        const isComplete = Boolean((payload['password'] || payload['ssh-key']) && payload['user-name']);
        const newServer = {
          ...payload,
          'is-complete': isComplete,
        };
        mockServers.push(newServer);
        return { success: true, message: 'Server created in mock mode' };
      }
      throw err;
    }
  },

  /**
   * Update an existing server (TELSDN-7069, TELSDN-7165)
   */
  async updateServer(serverData) {
    const payload = {
      'server-label': serverData.serverLabel,
      ...(serverData.destinationUrl && { 'destination-url': serverData.destinationUrl }),
      ...(serverData.userName && { 'user-name': serverData.userName }),
      ...(serverData.password && { 'password': serverData.password }),
      ...(serverData.sshKey && { 'ssh-key': serverData.sshKey }),
      ...(serverData.retentionPeriod && { 'retention-period': serverData.retentionPeriod }),
    };

    try {
      const res = await apiClient.post('/v1/update-server', payload, { journey: 'server-update' });
      return res.data;
    } catch (err) {
      if (import.meta.env.VITE_ENABLE_MOCK_FALLBACK === 'true') {
        mockServers = mockServers.map((s) => {
          if (s['server-label'] === serverData.serverLabel) {
            const hasCreds = Boolean(serverData.password || serverData.sshKey || s.password || s['ssh-key']);
            return {
              ...s,
              ...payload,
              'is-complete': hasCreds,
            };
          }
          return s;
        });
        return { success: true, message: 'Server updated in mock mode' };
      }
      throw err;
    }
  },

  /**
   * Delete an existing server
   */
  async deleteServer(serverLabel) {
    try {
      const res = await apiClient.post('/v1/delete-server', { 'server-label': serverLabel }, { journey: 'server-deletion' });
      return res.data;
    } catch (err) {
      if (import.meta.env.VITE_ENABLE_MOCK_FALLBACK === 'true') {
        mockServers = mockServers.filter((s) => s['server-label'] !== serverLabel);
        return { success: true };
      }
      throw err;
    }
  },
};

export default serverService;


