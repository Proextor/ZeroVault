import { useState } from 'react';
import { Share2, Key, Lock, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { generateFingerprint } from '../lib/mockData';

interface ShareRecord {
  id: string;
  action: 'Key Encrypted' | 'Access Granted' | 'Access Revoked' | 'Unauthorized Access Attempt';
  recipient: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error';
}

export default function Sharing() {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [shareHistory, setShareHistory] = useState<ShareRecord[]>([
    {
      id: '1',
      action: 'Key Encrypted',
      recipient: 'alice@company.com',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'success',
    },
    {
      id: '2',
      action: 'Access Granted',
      recipient: 'alice@company.com',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'success',
    },
    {
      id: '3',
      action: 'Key Encrypted',
      recipient: 'bob@company.com',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'success',
    },
    {
      id: '4',
      action: 'Unauthorized Access Attempt',
      recipient: 'unknown@malicious.com',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      status: 'error',
    },
  ]);

  const handleAddRecipient = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() && !recipients.includes(searchInput)) {
      setRecipients([...recipients, searchInput]);
      setShareHistory([
        ...shareHistory,
        {
          id: String(Date.now()),
          action: 'Key Encrypted',
          recipient: searchInput,
          timestamp: new Date(),
          status: 'success',
        },
        {
          id: String(Date.now() + 1),
          action: 'Access Granted',
          recipient: searchInput,
          timestamp: new Date(),
          status: 'success',
        },
      ]);
      setSearchInput('');
    }
  };

  const handleRemoveRecipient = (recipient: string) => {
    setRecipients(recipients.filter((r) => r !== recipient));
    setShareHistory([
      ...shareHistory,
      {
        id: String(Date.now()),
        action: 'Access Revoked',
        recipient,
        timestamp: new Date(),
        status: 'warning',
      },
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'error':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Secure Sharing</h1>
        <p className="text-muted-foreground">
          Share encrypted files with public key cryptography
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Share Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Share Form */}
          <div className="glass p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Share File</h2>
            
            <form onSubmit={handleAddRecipient} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Search by Public Key / Username
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="alice@company.com or key fingerprint"
                    className="cyber-input flex-1 px-4 py-2"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-cyan-glow text-background font-medium hover:shadow-glow-cyan transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>

            {/* Recipients List */}
            {recipients.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Recipients</h3>
                {recipients.map((recipient) => (
                  <div
                    key={recipient}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-glow/10">
                        <Key className="w-4 h-4 text-cyan-glow" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{recipient}</p>
                        <p className="text-xs text-muted-foreground">
                          AES key encrypted using recipient public key (X25519)
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveRecipient(recipient)}
                      className="px-2 py-1 rounded text-red-400 hover:bg-red-500/20 transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {recipients.length === 0 && (
              <div className="py-8 text-center">
                <Share2 className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-30" />
                <p className="text-muted-foreground">No recipients yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add a recipient to share encrypted files
                </p>
              </div>
            )}

            {recipients.length > 0 && (
              <button className="w-full px-4 py-2 rounded-lg bg-cyan-glow/20 text-cyan-glow border border-cyan-glow/50 font-medium hover:bg-cyan-glow/30 transition-colors">
                Share File: enterprise-config.enc
              </button>
            )}
          </div>

          {/* Encryption Details */}
          <div className="glass p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-semibold text-foreground">How It Works</h2>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-cyan-glow/10 flex-shrink-0">
                  <Lock className="w-4 h-4 text-cyan-glow" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Client-Side Encryption</p>
                  <p className="text-muted-foreground mt-1">
                    File encrypted with AES-GCM before leaving your device
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-cyan-glow/10 flex-shrink-0">
                  <Key className="w-4 h-4 text-cyan-glow" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Public Key Cryptography</p>
                  <p className="text-muted-foreground mt-1">
                    Symmetric key encrypted with recipient's public key (X25519)
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-cyan-glow/10 flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-cyan-glow" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Zero Trust Verification</p>
                  <p className="text-muted-foreground mt-1">
                    Recipient's identity verified before access granted
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sharing Timeline */}
        <div className="glass p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Sharing Timeline</h2>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {shareHistory
              .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
              .map((record) => (
                <div key={record.id} className={`p-3 rounded-lg border ${getStatusColor(record.status)}`}>
                  <div className="flex items-start gap-2">
                    {record.status === 'success' && <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                    {record.status === 'warning' && <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                    {record.status === 'error' && <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{record.action}</p>
                      <p className="text-xs opacity-80 mt-1">{record.recipient}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {record.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
