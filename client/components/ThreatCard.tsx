import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Threat } from '../lib/mockData';

interface ThreatCardProps {
  threat: Threat;
  className?: string;
}

export default function ThreatCard({ threat, className = '' }: ThreatCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'HIGH':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'MEDIUM':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'LOW':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Investigating'
      ? 'bg-orange-500/20 text-orange-400'
      : 'bg-green-500/20 text-green-400';
  };

  return (
    <div className={`glass p-4 rounded-lg border border-white/10 hover:border-cyan-glow/50 transition-all ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{threat.type}</h3>
            <p className="text-sm text-muted-foreground mt-1">{threat.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className={`text-xs font-medium px-2 py-1 rounded border ${getSeverityColor(threat.severity)}`}>
          {threat.severity}
        </span>
        <span className={`text-xs font-medium px-2 py-1 rounded border ${getStatusColor(threat.status)}`}>
          {threat.status}
        </span>
        <span className="text-xs text-muted-foreground ml-auto">
          {threat.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
