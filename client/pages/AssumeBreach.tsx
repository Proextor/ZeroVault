import { useState, useEffect } from 'react';
import { AlertTriangle, Play, Pause, RotateCcw, Download, CheckCircle2, Lock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockAttackScenarios, AttackScenario } from '../lib/mockData';

interface ChartData {
  time: string;
  attempts: number;
  blocked: number;
  prevented: number;
  failed: number;
}

export default function AssumeBreach() {
  const [isRunning, setIsRunning] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([
    { time: '00:00', attempts: 5, blocked: 5, prevented: 0, failed: 0 },
    { time: '05:00', attempts: 15, blocked: 12, prevented: 2, failed: 1 },
    { time: '10:00', attempts: 28, blocked: 22, prevented: 4, failed: 2 },
    { time: '15:00', attempts: 45, blocked: 35, prevented: 8, failed: 2 },
    { time: '20:00', attempts: 67, blocked: 52, prevented: 12, failed: 3 },
    { time: '25:00', attempts: 89, blocked: 68, prevented: 18, failed: 3 },
    { time: '30:00', attempts: 112, blocked: 85, prevented: 24, failed: 3 },
  ]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setChartData((prev) => {
        const lastData = prev[prev.length - 1];
        const newTime = `${(parseInt(lastData.time) + 5) % 60}:00`;
        return [
          ...prev,
          {
            time: newTime,
            attempts: lastData.attempts + Math.floor(Math.random() * 30),
            blocked: lastData.blocked + Math.floor(Math.random() * 20),
            prevented: lastData.prevented + Math.floor(Math.random() * 8),
            failed: lastData.failed + Math.floor(Math.random() * 2),
          },
        ];
      });
    }, 2000 / simulationSpeed);

    return () => clearInterval(interval);
  }, [isRunning, simulationSpeed]);

  const handleExportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      simulationDuration: '30 minutes',
      totalAttempts: chartData[chartData.length - 1].attempts,
      successfulBlocks: chartData[chartData.length - 1].blocked,
      preventedAttacks: chartData[chartData.length - 1].prevented,
      failedDefenses: chartData[chartData.length - 1].failed,
      scenarios: mockAttackScenarios,
      status: 'All systems protected',
    };

    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `breach-simulation-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const scenarioClicked = (scenario: AttackScenario) => {
    setSelectedScenario(selectedScenario === scenario.id ? null : scenario.id);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Assume Breach Mode</h1>
        <p className="text-muted-foreground">
          Simulate advanced attack scenarios and verify Zero Trust resilience
        </p>
      </div>

      {/* Status Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-4 rounded-lg border-l-2 border-red-400">
          <p className="text-sm text-muted-foreground mb-1">Server Status</p>
          <p className="text-lg font-bold text-red-400">⚠️ Compromised</p>
        </div>
        <div className="glass p-4 rounded-lg border-l-2 border-green-400">
          <p className="text-sm text-muted-foreground mb-1">Data Protection</p>
          <p className="text-lg font-bold text-green-400">✓ Protected</p>
        </div>
        <div className="glass p-4 rounded-lg border-l-2 border-cyan-glow">
          <p className="text-sm text-muted-foreground mb-1">Zero Trust</p>
          <p className="text-lg font-bold text-cyan-glow">✓ Active</p>
        </div>
      </div>

      {/* Simulation Control Panel */}
      <div className="glass p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Simulation Control Panel</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Attack Vector</label>
            <select className="cyber-input w-full px-4 py-2">
              <option>Man-in-the-Middle Attack</option>
              <option>Brute Force Key Attack</option>
              <option>Zero-Day Exploit Attempt</option>
              <option>All Scenarios</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Simulation Speed: {simulationSpeed}x
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={simulationSpeed}
              onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              isRunning
                ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                : 'bg-cyan-glow text-background hover:shadow-glow-cyan'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Run
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setChartData([
                { time: '00:00', attempts: 5, blocked: 5, prevented: 0, failed: 0 },
                { time: '05:00', attempts: 15, blocked: 12, prevented: 2, failed: 1 },
                { time: '10:00', attempts: 28, blocked: 22, prevented: 4, failed: 2 },
                { time: '15:00', attempts: 45, blocked: 35, prevented: 8, failed: 2 },
                { time: '20:00', attempts: 67, blocked: 52, prevented: 12, failed: 3 },
                { time: '25:00', attempts: 89, blocked: 68, prevented: 18, failed: 3 },
                { time: '30:00', attempts: 112, blocked: 85, prevented: 24, failed: 3 },
              ]);
            }}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Re-run
          </button>

          <button
            onClick={handleExportReport}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-colors flex items-center gap-2 ml-auto"
          >
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attack Attempts Over Time */}
        <div className="glass p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-foreground mb-4">Attack Attempts Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30,30,50,0.9)',
                  border: '1px solid rgba(0,255,255,0.3)',
                }}
              />
              <Line
                type="monotone"
                dataKey="attempts"
                stroke="#00ffff"
                dot={{ fill: '#00ffff' }}
                isAnimationActive={isRunning}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Defense Outcomes */}
        <div className="glass p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-foreground mb-4">Defense Outcomes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30,30,50,0.9)',
                  border: '1px solid rgba(0,255,255,0.3)',
                }}
              />
              <Legend />
              <Bar dataKey="blocked" stackId="a" fill="#22c55e" />
              <Bar dataKey="prevented" stackId="a" fill="#3b82f6" />
              <Bar dataKey="failed" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attack Scenarios */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Attack Scenarios</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockAttackScenarios.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => scenarioClicked(scenario)}
              className="glass p-6 rounded-lg cursor-pointer hover:border-cyan-glow/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-cyan-glow transition-colors">
                    {scenario.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{scenario.description}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  scenario.outcome === 'BLOCKED'
                    ? 'bg-green-500/20 text-green-400'
                    : scenario.outcome === 'PREVENTED'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {scenario.outcome}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {scenario.attemptCount} attempts detected
                </span>
                <span className="text-cyan-glow">→</span>
              </div>

              {/* Expandable Details */}
              {selectedScenario === scenario.id && (
                <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Live Logs</p>
                    <div className="bg-black/40 p-3 rounded font-mono text-xs space-y-1 max-h-48 overflow-y-auto">
                      {scenario.logs.map((log, idx) => (
                        <p key={idx} className="text-green-400">
                          {log}
                        </p>
                      ))}
                    </div>
                  </div>

                  {scenario.outcome === 'BLOCKED' && (
                    <div className="p-3 rounded bg-red-500/10 border border-red-500/30">
                      <p className="text-xs text-red-400 font-medium">
                        🚨 Server compromised - Data encrypted and protected
                      </p>
                    </div>
                  )}

                  <div className="p-3 rounded bg-green-500/10 border border-green-500/30">
                    <p className="text-xs text-green-400 font-medium">
                      ✓ Zero Trust protected entire operation
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="glass p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Simulation Summary</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Attempts</p>
            <p className="text-2xl font-bold text-red-400">
              {chartData[chartData.length - 1].attempts}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Blocked</p>
            <p className="text-2xl font-bold text-green-400">
              {chartData[chartData.length - 1].blocked}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Prevented</p>
            <p className="text-2xl font-bold text-blue-400">
              {chartData[chartData.length - 1].prevented}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Failed Defenses</p>
            <p className="text-2xl font-bold text-yellow-400">
              {chartData[chartData.length - 1].failed}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-400">Resilience Verified</p>
            <p className="text-sm text-green-300 mt-1">
              Your Zero Trust architecture successfully protected data even under severe breach
              conditions. All encryption remained intact and all unauthorized access was blocked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
