import { LucideIcon } from 'lucide-react';

type Status = 'VERIFIED' | 'ACTIVE' | 'MONITORING' | 'WARNING' | 'LOW' | 'MEDIUM' | 'HIGH' | 'BLOCKED' | 'PREVENTED';

interface StatusBadgeProps {
  icon: LucideIcon;
  text: string;
  status: Status;
  className?: string;
}

export default function StatusBadge({ icon: Icon, text, status, className = '' }: StatusBadgeProps) {
  const getStatusColor = (s: Status) => {
    switch (s) {
      case 'VERIFIED':
      case 'ACTIVE':
      case 'BLOCKED':
      case 'PREVENTED':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'MONITORING':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'WARNING':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'LOW':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'MEDIUM':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'HIGH':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border ${getStatusColor(
        status
      )} ${className}`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
