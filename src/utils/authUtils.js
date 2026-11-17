/**
 * Authentication and correlation header utility for openBackhaul SDN microservices
 */
import { v4 as uuidv4 } from 'uuid';

export const authUtils = {
  /**
   * Save user credentials in sessionStorage
   */
  saveCredentials(username, password) {
    const token = btoa(`${username}:${password}`);
    sessionStorage.setItem('fwm_auth_token', token);
    sessionStorage.setItem('fwm_user', username);
  },

  /**
   * Retrieve stored session credentials
   */
  getCredentials() {
    const token = sessionStorage.getItem('fwm_auth_token');
    const user = sessionStorage.getItem('fwm_user') || 'admin';
    return { token, user };
  },

  /**
   * Generate required ONF openBackhaul SDN correlation headers
   * @param {string} journey - Customer journey context
   */
  getHeaders(journey = 'general') {
    const { token, user } = this.getCredentials();
    return {
      'Content-Type': 'application/json',
      'x-correlator': uuidv4(),
      'trace-indicator': '1.0',
      'user': user,
      'originator': 'FirmWareManagementGui',
      'customer-journey': journey,
      ...(token ? { 'Authorization': `Basic ${token}` } : {}),
    };
  },

  /**
   * Clear user session
   */
  clearAuth() {
    sessionStorage.removeItem('fwm_auth_token');
    sessionStorage.removeItem('fwm_user');
  },
};

export default authUtils;


