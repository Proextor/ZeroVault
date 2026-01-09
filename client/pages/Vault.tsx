import { useState } from 'react';
import {
  Lock,
  Download,
  Share2,
  Trash2,
  Eye,
  MoreVertical,
  Shield,
} from 'lucide-react';
import { mockFiles, EncryptedFile } from '../lib/mockData';
import StatusBadge from '../components/StatusBadge';

export default function Vault() {
  const [files, setFiles] = useState<EncryptedFile[]>(mockFiles);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (fileId: string) => {
    setFiles(files.filter((f) => f.id !== fileId));
    setShowDeleteConfirm(null);
  };

  const handleDownload = (file: EncryptedFile) => {
    // Simulate download
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,Mock encrypted blob for ${file.name}`);
    element.setAttribute('download', file.name);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Secure Vault</h1>
        <p className="text-muted-foreground">
          Manage your encrypted files with Zero Trust protection
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Total Files</p>
          <p className="text-2xl font-bold text-cyan-glow">{files.length}</p>
        </div>
        <div className="glass p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Total Size</p>
          <p className="text-2xl font-bold text-cyan-glow">7.4 MB</p>
        </div>
        <div className="glass p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Shared With</p>
          <p className="text-2xl font-bold text-cyan-glow">{files.reduce((sum, f) => sum + f.sharedCount, 0)}</p>
        </div>
        <div className="glass p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Verified</p>
          <p className="text-2xl font-bold text-green-400">
            {files.filter((f) => f.signature === 'verified').length}/{files.length}
          </p>
        </div>
      </div>

      {/* Encrypted File Table */}
      <div className="glass p-6 rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold text-foreground mb-4">Encrypted Files</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                  File Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground hidden md:table-cell">
                  Encryption
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground hidden lg:table-cell">
                  Hash
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Signature
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Shared
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr
                  key={file.id}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                    selectedFile === file.id ? 'bg-cyan-glow/10' : ''
                  }`}
                  onClick={() => setSelectedFile(file.id)}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-glow/10">
                        <Lock className="w-4 h-4 text-cyan-glow" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{file.name}</span>
                        <span className="text-xs text-muted-foreground">{file.size}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{file.encryption}</span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-xs font-mono text-muted-foreground">
                      {file.hash.substring(0, 12)}...
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge
                      icon={Shield}
                      text={file.signature === 'verified' ? 'Verified' : 'Invalid'}
                      status={file.signature === 'verified' ? 'VERIFIED' : 'WARNING'}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium text-muted-foreground">{file.sharedCount}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(file);
                        }}
                        className="p-2 rounded hover:bg-white/10 text-foreground/70 hover:text-foreground transition-colors"
                        title="Download & Decrypt"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-2 rounded hover:bg-white/10 text-foreground/70 hover:text-foreground transition-colors"
                        title="Share Securely"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteConfirm(file.id);
                        }}
                        className="p-2 rounded hover:bg-red-500/20 text-foreground/70 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {files.length === 0 && (
          <div className="py-12 text-center">
            <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No encrypted files yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Upload your first file to get started
            </p>
          </div>
        )}
      </div>

      {/* File Details Panel */}
      {selectedFile && (
        <div className="glass p-6 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">File Details</h2>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>

          {(() => {
            const file = files.find((f) => f.id === selectedFile);
            if (!file) return null;

            return (
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground mb-1">File Name</p>
                    <p className="font-medium text-foreground">{file.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Size</p>
                    <p className="font-medium text-foreground">{file.size}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Uploaded</p>
                    <p className="font-medium text-foreground">{formatDate(file.uploadedAt)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Encryption</p>
                    <p className="font-medium text-foreground">{file.encryption}</p>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground mb-1">SHA-256 Hash</p>
                  <p className="font-mono text-foreground text-xs break-all bg-white/5 p-2 rounded border border-white/10">
                    {file.hash}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground mb-2">Status Badges</p>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge
                      icon={Shield}
                      text="Zero Trust Protected"
                      status="VERIFIED"
                    />
                    <StatusBadge
                      icon={Eye}
                      text={`Shared with ${file.sharedCount}`}
                      status="ACTIVE"
                    />
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass p-6 rounded-lg max-w-sm mx-4 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Confirm Delete</h2>
            <p className="text-muted-foreground">
              Are you sure you want to permanently delete this file? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
