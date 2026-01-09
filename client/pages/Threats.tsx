import { useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import ThreatCard from '../components/ThreatCard';
import StatusBadge from '../components/StatusBadge';
import { mockThreats, Threat } from '../lib/mockData';

export default function Threats() {
  const [threats, setThreats] = useState<Threat[]>(mockThreats);
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);

  const highSeverityCount = threats.filter((t) => t.severity === 'HIGH').length;
  const resolvedCount = threats.filter((t) => t.status === 'Resolved').length;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Threat Detection Center</h1>
        <p className="text-muted-foreground">
          Monitor security alerts and verify file integrity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Total Threats</p>
          <p className="text-2xl font-bold text-cyan-glow">{threats.length}</p>
        </div>
        <div className="glass p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">High Severity</p>
          <p className="text-2xl font-bold text-red-400">{highSeverityCount}</p>
        </div>
        <div className="glass p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Investigating</p>
          <p className="text-2xl font-bold text-yellow-400">
            {threats.filter((t) => t.status === 'Investigating').length}
          </p>
        </div>
        <div className="glass p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Resolved</p>
          <p className="text-2xl font-bold text-green-400">{resolvedCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Threats List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Active Threats</h2>

            {threats.length > 0 ? (
              <div className="space-y-3">
                {threats.map((threat) => (
                  <div
                    key={threat.id}
                    onClick={() => setSelectedThreat(threat.id)}
                    className={`cursor-pointer transition-all ${
                      selectedThreat === threat.id ? '' : ''
                    }`}
                  >
                    <ThreatCard threat={threat} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No threats detected</p>
              </div>
            )}
          </div>
        </div>

        {/* Threat Details */}
        <div className="space-y-4">
          {selectedThreat && (
            <div className="glass p-6 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Threat Details</h2>
                <button
                  onClick={() => setSelectedThreat(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              {(() => {
                const threat = threats.find((t) => t.id === selectedThreat);
                if (!threat) return null;

                return (
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Type</p>
                      <p className="font-medium text-foreground">{threat.type}</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground mb-1">Description</p>
                      <p className="font-medium text-foreground">{threat.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-muted-foreground mb-1">Severity</p>
                        <StatusBadge
                          icon={AlertTriangle}
                          text={threat.severity}
                          status={threat.severity as any}
                        />
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Status</p>
                        <StatusBadge
                          icon={CheckCircle2}
                          text={threat.status}
                          status={threat.status === 'Resolved' ? 'VERIFIED' : 'WARNING'}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-muted-foreground mb-2">Response Details</p>
                      <div className="bg-white/5 p-3 rounded border border-white/10 space-y-2">
                        {threat.severity === 'HIGH' && (
                          <p className="text-red-400 text-xs">
                            ⚠️ Critical threat detected - Immediate action taken
                          </p>
                        )}
                        <p className="text-cyan-400 text-xs">
                          ✓ Zero Trust validation enforced
                        </p>
                        <p className="text-green-400 text-xs">
                          ✓ Encryption remains verified
                        </p>
                        <p className="text-cyan-400 text-xs">
                          ✓ Signature verification: PASSED
                        </p>
                      </div>
                    </div>

                    {threat.status === 'Investigating' && (
                      <button className="w-full px-3 py-2 rounded border border-cyan-glow/50 text-cyan-glow hover:bg-cyan-glow/10 transition-colors text-sm font-medium">
                        View Live Logs
                      </button>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* Security Recommendations */}
          <div className="glass p-6 rounded-lg space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Security Status</h2>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-green-400">Client-side encryption active</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-green-400">All signatures verified</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-green-400">Zero Trust intact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
