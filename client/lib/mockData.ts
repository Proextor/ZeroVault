export interface EncryptedFile {
  id: string;
  name: string;
  encryption: string;
  hash: string;
  signature: 'verified' | 'invalid';
  sharedCount: number;
  size: string;
  uploadedAt: Date;
}

export interface Threat {
  id: string;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'Investigating' | 'Resolved';
  timestamp: Date;
  description: string;
}

export interface ZeroTrustStatus {
  name: string;
  status: 'VERIFIED' | 'ACTIVE' | 'MONITORING' | 'WARNING';
  icon: string;
}

export interface AttackScenario {
  id: string;
  name: string;
  description: string;
  attemptCount: number;
  outcome: 'BLOCKED' | 'PREVENTED' | 'FAILED';
  logs: string[];
}

// Generate random public key fingerprint
export const generateFingerprint = (): string => {
  const chars = 'ABCDEF0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) result += ':';
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

// Mock data generators
export const mockFiles: EncryptedFile[] = [
  {
    id: '1',
    name: 'enterprise-config.enc',
    encryption: 'AES-GCM',
    hash: '5d41402abc4b2a76b9719d911017c592',
    signature: 'verified',
    sharedCount: 3,
    size: '2.4 MB',
    uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    name: 'security-audit.pdf.enc',
    encryption: 'AES-GCM',
    hash: 'c4ca4238a0b923820dcc509a6f75849b',
    signature: 'verified',
    sharedCount: 1,
    size: '1.8 MB',
    uploadedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    name: 'compliance-report.enc',
    encryption: 'AES-GCM',
    hash: 'c81e728d9d4c2f636f067f89cc14862c',
    signature: 'verified',
    sharedCount: 5,
    size: '3.2 MB',
    uploadedAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
];

export const mockThreats: Threat[] = [
  {
    id: '1',
    type: 'Unauthorized Access Attempt',
    severity: 'HIGH',
    status: 'Investigating',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    description: 'Multiple failed login attempts detected from unknown IP',
  },
  {
    id: '2',
    type: 'Signature Verification Failed',
    severity: 'MEDIUM',
    status: 'Resolved',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    description: 'Invalid signature on enterprise-config.enc - Access blocked',
  },
  {
    id: '3',
    type: 'Integrity Check Passed',
    severity: 'LOW',
    status: 'Resolved',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    description: 'All files verified - Zero modification detected',
  },
  {
    id: '4',
    type: 'Suspicious Decryption Request',
    severity: 'HIGH',
    status: 'Investigating',
    timestamp: new Date(Date.now() - 90 * 60 * 1000),
    description: 'Decryption attempt with invalid key material detected',
  },
];

export const mockZeroTrustStatus: ZeroTrustStatus[] = [
  {
    name: 'Client-Side Encryption',
    status: 'VERIFIED',
    icon: 'Lock',
  },
  {
    name: 'Digital Signatures',
    status: 'ACTIVE',
    icon: 'Check',
  },
  {
    name: 'Integrity Monitoring',
    status: 'MONITORING',
    icon: 'Eye',
  },
  {
    name: 'Key Management',
    status: 'VERIFIED',
    icon: 'Key',
  },
];

export const mockAttackScenarios: AttackScenario[] = [
  {
    id: '1',
    name: 'Man-in-the-Middle Attack',
    description: 'Attacker attempts to intercept and modify encrypted data',
    attemptCount: 12,
    outcome: 'BLOCKED',
    logs: [
      '[12:34:56] Connection intercepted at gateway',
      '[12:34:57] TLS verification failed',
      '[12:34:58] Signature mismatch detected - access denied',
      '[12:34:59] Alert sent to security team',
    ],
  },
  {
    id: '2',
    name: 'Brute Force Key Attack',
    description: 'Attempting to decrypt files through brute force',
    attemptCount: 45,
    outcome: 'PREVENTED',
    logs: [
      '[12:35:00] Key generation rate limit exceeded',
      '[12:35:01] Rate limiting activated',
      '[12:35:02] Account locked for 30 minutes',
      '[12:35:03] Incident logged',
    ],
  },
  {
    id: '3',
    name: 'Zero-Day Exploit Attempt',
    description: 'Unknown vulnerability exploitation detected',
    attemptCount: 3,
    outcome: 'FAILED',
    logs: [
      '[12:35:30] Anomalous behavior detected',
      '[12:35:31] AI-based threat detection triggered',
      '[12:35:32] Execution blocked',
      '[12:35:33] Threat signature updated',
    ],
  },
];

export const kpiMetrics = {
  totalEncryptedFiles: 47,
  activeSharedFiles: 12,
  integrityStatus: '100%',
  encryptionMode: 'Client-Side Only',
};
