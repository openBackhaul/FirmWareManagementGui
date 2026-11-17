/**
 * Mock datasets matching backend tickets TELSDN-7227, TELSDN-7228
 * Used when backend RDS/CDS is offline or during prototype demos
 */
export const initialMockServers = [
  {
    'server-label': 'SFTP_Repo_01',
    'destination-url': 'sftp://10.244.18.25/firmware',
    'user-name': 'fw_admin',
    'password': 'â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢',
    'ssh-key': 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ...',
    'retention-period': '30 Days',
    'is-complete': true,
  },
  {
    'server-label': 'SFTP_Primary_DE',
    'destination-url': 'sftp://10.244.30.22/packages',
    'user-name': 'deployer',
    'password': 'â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢',
    'ssh-key': '',
    'retention-period': '60 Days',
    'is-complete': true,
  },
  {
    'server-label': 'SFTP_Backup_02',
    'destination-url': 'sftp://10.244.18.77/backups',
    'user-name': 'admin_backup',
    'password': '',
    'ssh-key': '',
    'retention-period': '30 Days',
    'is-complete': false,
  },
];

export const initialMockFirmwareResources = [
  {
    'firmware-resource-name': 'V200R021C00',
    'firmware-resource-version': 'v2.1',
    'server-label': 'SFTP_Repo_01',
    'source-uri': 'sftp://10.244.18.25/firmware',
    'file-name': 'rtn950-v210.bin',
  },
  {
    'firmware-resource-name': 'V200R019C10',
    'firmware-resource-version': 'v1.9',
    'server-label': 'SFTP_Primary_DE',
    'source-uri': 'sftp://10.244.30.22/packages',
    'file-name': 'rtn950-v190.bin',
  },
  {
    'firmware-resource-name': 'ML8600_SYS',
    'firmware-resource-version': 'R14B',
    'server-label': 'SFTP_Primary_DE',
    'source-uri': 'sftp://10.244.30.22/packages',
    'file-name': 'ml8600_r14b.pkg',
  },
  {
    'firmware-resource-name': 'ALC_CORE',
    'firmware-resource-version': 'v4.8.2',
    'server-label': 'SFTP_Primary_DE',
    'source-uri': 'sftp://10.244.30.22/packages',
    'file-name': 'alc_482.img',
  },
];


