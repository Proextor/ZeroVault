import { useState, useEffect } from 'react';
import {
  Lock,
  Eye,
  Key,
  CheckCircle2,
  Shield,
  Zap,
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import StatusBadge from '../components/StatusBadge';
import ThreatCard from '../components/ThreatCard';
import { mockThreats, mockZeroTrustStatus, kpiMetrics, Threat } from '../lib/mockData';

export default function CommandCenter() {
  const [threats, setThreats] = useState<Threat[]>(mockThreats);
  const [fileCount] = useState(kpiMetrics.totalEncryptedFiles);
  const [sharedCount] = useState(kpiMetrics.activeSharedFiles);

  // Simulate real-time updates
  useEffect(() => {
    const updateThreats = setInterval(() => {
      // Randomly update threat status
      setThreats((prev) =>
        prev.map((threat) => ({
          ...threat,
          status:
            threat.status === 'Investigating'
              ? 'Resolved'
              : Math.random() > 0.7
                ? 'Investigating'
                : 'Resolved',
        }))
      );
    }, 8000);

    return () => clearInterval(updateThreats);
  }, []);

  const getIconForStatus = (iconName: string) => {
    const iconMap: Record<string, any> = {
      Lock,
      Check: CheckCircle2,
      Eye,
      Key,
    };
    return iconMap[iconName] || Lock;
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Security Command Center</h1>
        <p className="text-muted-foreground">
          Real-time monitoring and threat detection dashboard
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={Lock}
          title="Total Encrypted Files"
          value={fileCount}
          subtitle="Zero Trust Protected"
          trend="stable"
        />
        <MetricCard
          icon={Zap}
          title="Active Shared Files"
          value={sharedCount}
          subtitle="Secure collaborations"
          trend="up"
        />
        <MetricCard
          icon={CheckCircle2}
          title="Integrity Status"
          value={kpiMetrics.integrityStatus}
          subtitle="All files verified"
          trend="stable"
        />
        <MetricCard
          icon={Shield}
          title="Encryption Mode"
          value="Client-Side"
          subtitle="Only on your device"
          trend="up"
        />
      </div>

      {/* Zero Trust Status Panel */}
      <div className="glass p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Zero Trust Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockZeroTrustStatus.map((status) => {
            const Icon = getIconForStatus(status.icon);

            return (
              <div
                key={status.name}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-glow/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-glow/10">
                    <Icon className="w-5 h-5 text-cyan-glow" />
                  </div>
                  <span className="font-medium">{status.name}</span>
                </div>
                <StatusBadge
                  icon={CheckCircle2}
                  text={status.status}
                  status={status.status}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Threat Monitoring Feed */}
      <div className="glass p-6 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Threat Monitoring Feed</h2>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-red-400">{threats.length} Active</span>
          </div>
        </div>

        <div className="space-y-3">
          {threats.length > 0 ? (
            threats.map((threat) => <ThreatCard key={threat.id} threat={threat} />)
          ) : (
            <div className="py-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-2 opacity-50" />
              <p className="text-muted-foreground">No active threats detected</p>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
          <div className="flex gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-400">All Systems Secure</p>
              <p className="text-sm text-green-300/80 mt-1">
                Your Zero Trust architecture is functioning normally. No critical
                vulnerabilities detected.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-4 rounded-lg border-l-2 border-cyan-glow">
          <h3 className="font-semibold text-foreground mb-2">Encryption</h3>
          <p className="text-sm text-muted-foreground">
            All data encrypted client-side using AES-GCM with 256-bit keys
          </p>
        </div>
        <div className="glass p-4 rounded-lg border-l-2 border-green-400">
          <h3 className="font-semibold text-foreground mb-2">Authentication</h3>
          <p className="text-sm text-muted-foreground">
            Ed25519 digital signatures for all operations and file integrity
          </p>
        </div>
        <div className="glass p-4 rounded-lg border-l-2 border-blue-400">
          <h3 className="font-semibold text-foreground mb-2">Monitoring</h3>
          <p className="text-sm text-muted-foreground">
            Continuous integrity checks and anomaly detection in real-time
          </p>
        </div>
      </div>
    </div>
  );
}
