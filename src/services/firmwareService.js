import apiClient from '../api/apiClient';
import { initialMockFirmwareResources } from './mockData';

let mockFirmwareResources = [...initialMockFirmwareResources];

export const firmwareService = {
  /**
   * Fetch all registered firmware resources (TELSDN-7071, TELSDN-7160)
   */
  async listExistingFirmwareResources() {
    try {
      const res = await apiClient.post('/v1/list-existing-firmware-resources', {}, { journey: 'firmware-catalog' });
      return res.data;
    } catch (err) {
      if (import.meta.env.VITE_ENABLE_MOCK_FALLBACK === 'true') {
        console.warn('Backend unavailable, using mock firmware catalog:', err.message);
        return [...mockFirmwareResources];
      }
      throw err;
    }
  },

  /**
   * Register a new firmware resource
   */
  async createFirmwareResource(resourceData) {
    try {
      const res = await apiClient.post('/v1/create-firmware-resource', resourceData, { journey: 'firmware-catalog' });
      return res.data;
    } catch (err) {
      if (import.meta.env.VITE_ENABLE_MOCK_FALLBACK === 'true') {
        mockFirmwareResources.push(resourceData);
        return { success: true };
      }
      throw err;
    }
  },

  /**
   * Delete a firmware resource
   */
  async deleteFirmwareResource(resourceName) {
    try {
      const res = await apiClient.post('/v1/delete-firmware-resource', { 'firmware-resource-name': resourceName }, { journey: 'firmware-catalog' });
      return res.data;
    } catch (err) {
      if (import.meta.env.VITE_ENABLE_MOCK_FALLBACK === 'true') {
        mockFirmwareResources = mockFirmwareResources.filter(
          (r) => r['firmware-resource-name'] !== resourceName
        );
        return { success: true };
      }
      throw err;
    }
  },
};

export default firmwareService;


