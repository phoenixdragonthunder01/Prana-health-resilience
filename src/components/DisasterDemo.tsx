import { useEffect, useRef, useState } from 'react';
import {
  Heart,
  Activity,
  Thermometer,
  Wind,
  Droplets,
  Gauge,
  TrendingUp,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
} from 'lucide-react';
import { SCENARIOS } from '@/lib/scenarios';
import { computeSimState, STATE_CONFIG } from '@/lib/simulation';
import type { DisasterScenario, SimState } from '@/lib/types';

export default function DisasterDemo() {
  const [selected, setSelected] = useState<DisasterScenario>(SCENARIOS[0]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const sim: SimState = computeSimState(selected, step);
  const stateCfg = STATE_CONFIG[sim.state];
  const maxStep = selected.progression.length - 1;

  useEffect(() => {
    if (playing && step < maxStep) {
      timerRef.current = setInterval(() => {
        setStep((s) => {
          if (s >= maxStep) {
            setPlaying(false);
            return s;
          }
          return s + 1;
        });
      }, 2200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, step, maxStep]);

  const selectScenario = (s: DisasterScenario) => {
    setSelected(s);
    setStep(0);
    setPlaying(false);
  };

  const reset = () => {
    setStep(0);
    setPlaying(false);
  };

  return (
    <section id="demo" className="relative py-24 px-6">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-300 tracking-wide">LIVE DEMONSTRATION</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Choose a disaster scenario
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Watch PRANA interpret physiological signals in real time as the
            situation deteriorates. The AI moves through three health states
            based on multimodal signal fusion — not a single threshold.
          </p>
        </div>

        {/* Scenario selector */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => selectScenario(s)}
              className={`group relative rounded-2xl p-4 text-center transition-all duration-300 ${
                selected.id === s.id
                  ? 'glass border-cyan-500/40 shadow-lg shadow-cyan-500/10 scale-105'
                  : 'glass glass-hover opacity-70 hover:opacity-100'
              }`}
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className={`text-sm font-semibold ${selected.id === s.id ? 'text-cyan-300' : 'text-slate-300'}`}>
                {s.name}
              </div>
            </button>
          ))}
        </div>

        {/* Scenario description */}
        <div className="glass rounded-2xl p-5 mb-8 flex items-start gap-3">
          <div className="text-2xl shrink-0">{selected.icon}</div>
          <div>
            <div className="text-sm font-semibold text-white mb-1">{selected.tagline}</div>
            <div className="text-sm text-slate-400">{selected.description}</div>
          </div>
        </div>

        {/* Main simulation panel */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT: Health State Display */}
          <div className="lg:col-span-2">
            <div className={`relative glass rounded-3xl p-8 overflow-hidden ring-1 ${stateCfg.ring} shadow-2xl ${stateCfg.glow} transition-all duration-500`}>
              {/* Disaster mode banner */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 blink" />
                  <span className="text-xs font-bold text-red-400 tracking-widest">DISASTER MODE ACTIVE</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  T+{String(sim.elapsed).padStart(2, '0')}:00 / T+{String(maxStep).padStart(2, '0')}:00
                </div>
              </div>

              {/* State indicator */}
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <div className={`w-24 h-24 rounded-full ${stateCfg.bg} opacity-20 absolute inset-0 pulse-ring`} />
                  <div className={`relative w-24 h-24 rounded-full ${stateCfg.bg} flex items-center justify-center shadow-lg`}>
                    {sim.state === 'normal' ? <ShieldCheck className="w-10 h-10 text-white" /> : <AlertTriangle className="w-10 h-10 text-white" />}
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <div className={`text-4xl font-bold ${stateCfg.text} mb-1`}>
                  {stateCfg.label}
                </div>
                <div className="text-sm text-slate-500">
                  {sim.state === 'normal' && 'Stable relative to personal baseline'}
                  {sim.state === 'at_risk' && 'Significant deviation or accumulating stress'}
                  {sim.state === 'critical' && 'Severe or rapidly deteriorating condition'}
                </div>
              </div>

              {/* Risk metrics */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <MetricCard
                  icon={Gauge}
                  label="Resilience Index"
                  value={`${sim.metrics.resilienceIndex}/100`}
                  bar={sim.metrics.resilienceIndex}
                  color={stateCfg.color}
                />
                <MetricCard
                  icon={TrendingUp}
                  label="Risk Momentum"
                  value={`↑ ${sim.metrics.riskMomentum}%`}
                  bar={sim.metrics.riskMomentum}
                  color={stateCfg.color}
                  reverse
                />
                <MetricCard
                  icon={Activity}
                  label="Exposure Debt"
                  value={`${sim.metrics.exposureDebt}/100`}
                  bar={sim.metrics.exposureDebt}
                  color={stateCfg.color}
                  reverse
                />
                <MetricCard
                  icon={Clock}
                  label="Recovery Deficit"
                  value={sim.metrics.recoveryDeficit}
                  bar={
                    sim.metrics.recoveryDeficit === 'LOW' ? 20
                    : sim.metrics.recoveryDeficit === 'MODERATE' ? 45
                    : sim.metrics.recoveryDeficit === 'HIGH' ? 70 : 95
                  }
                  color={stateCfg.color}
                  reverse
                />
              </div>

              {/* Vitals grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                <VitalCard icon={Heart} label="Heart Rate" value={`${sim.vitals.heartRate}`} unit="BPM" trend={sim.vitals.heartRate > 72 ? 'up' : 'flat'} color="text-rose-400" />
                <VitalCard icon={Activity} label="SpO₂" value={`${sim.vitals.spo2}`} unit="%" trend={sim.vitals.spo2 < 98 ? 'down' : 'flat'} color="text-cyan-400" />
                <VitalCard icon={Thermometer} label="Temperature" value={sim.vitals.temperature.toFixed(1)} unit="°C" trend={sim.vitals.temperature > 36.7 ? 'up' : 'flat'} color="text-amber-400" />
                <VitalCard icon={Wind} label="Movement" value={sim.vitals.movement} unit="" trend="flat" color="text-slate-300" />
                <VitalCard icon={Droplets} label="Environment" value={sim.environment.label} unit="" trend="flat" color="text-blue-400" small />
                <VitalCard icon={Gauge} label="Humidity" value={`${sim.environment.humidity}`} unit="%" trend="flat" color="text-sky-400" />
              </div>

              {/* Forecast */}
              <div className="glass rounded-xl p-4 mb-4 border-l-2" style={{ borderColor: stateCfg.color }}>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-400 tracking-wide">NEXT 60 MINUTES</span>
                </div>
                <p className="text-sm text-slate-200">{sim.forecast}</p>
              </div>

              {/* Resilience window */}
              <div className="flex items-center gap-3 glass rounded-xl p-4">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-sm text-slate-400">Estimated resilience window: </span>
                  <span className="text-sm font-bold text-white">{sim.resilienceWindow} minutes</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setPlaying(!playing)}
                  disabled={step >= maxStep}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {playing ? 'Pause' : step >= maxStep ? 'Simulation Complete' : 'Play Simulation'}
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass glass-hover text-slate-300 text-sm font-semibold"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              {/* Progress timeline */}
              <div className="mt-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: maxStep + 1 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                        i <= step ? stateCfg.bg : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-slate-500 font-mono">Hour 0</span>
                  <span className="text-xs text-slate-500 font-mono">Hour {maxStep}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: AI Interpretation */}
          <div className="space-y-4">
            {/* Why am I at risk panel */}
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-8 h-8 rounded-lg ${stateCfg.bg} flex items-center justify-center`}>
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-white">AI Interpretation</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 ${stateCfg.text}`} />
                  <p className="text-slate-300">
                    {sim.vitals.heartRate > 100
                      ? 'Heart rate is significantly above your personal baseline.'
                      : sim.vitals.heartRate > 85
                      ? 'Heart rate is moderately elevated above baseline.'
                      : 'Heart rate is within normal range.'}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 ${stateCfg.text}`} />
                  <p className="text-slate-300">
                    {sim.vitals.spo2 < 92
                      ? `SpO₂ has fallen below your baseline to ${sim.vitals.spo2}%, indicating reduced oxygenation.`
                      : sim.vitals.spo2 < 96
                      ? 'SpO₂ is slightly below baseline, monitoring closely.'
                      : 'Oxygen saturation is stable.'}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 ${stateCfg.text}`} />
                  <p className="text-slate-300">
                    {sim.vitals.temperature > 38
                      ? `Elevated temperature (${sim.vitals.temperature.toFixed(1)}°C) with prolonged inactivity and ${sim.environment.label} exposure detected.`
                      : sim.vitals.temperature > 37.2
                      ? 'Mild temperature elevation with environmental exposure.'
                      : 'Temperature is within normal range.'}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-slate-700/50">
                <div className="text-xs font-semibold text-slate-400 mb-2 tracking-wide">PRIMARY CONCERN</div>
                <div className="text-sm font-semibold text-white">
                  {sim.state === 'critical'
                    ? 'Severe physiological stress / hypoxia risk'
                    : sim.state === 'at_risk'
                    ? 'Physiological stress / dehydration'
                    : 'No immediate concern'}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Trend: {sim.state === 'normal' ? 'stable' : 'deteriorating'}
                </div>
              </div>
            </div>

            {/* Recommendation panel */}
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-8 h-8 rounded-lg ${stateCfg.bg} flex items-center justify-center`}>
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-white">Recommended Action</h3>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {sim.recommendation}
              </p>
            </div>

            {/* Personal baseline comparison */}
            <div className="glass rounded-3xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">vs. Personal Baseline</h3>
              <div className="space-y-3">
                <BaselineBar label="Heart Rate" current={sim.vitals.heartRate} baseline={72} unit=" BPM" />
                <BaselineBar label="SpO₂" current={sim.vitals.spo2} baseline={98} unit="%" reverse />
                <BaselineBar label="Temperature" current={sim.vitals.temperature} baseline={36.7} unit="°C" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  bar,
  color,
  reverse = false,
}: {
  icon: typeof Gauge;
  label: string;
  value: string;
  bar: number;
  color: string;
  reverse?: boolean;
}) {
  return (
    <div className="glass rounded-xl p-3.5">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <div className="text-lg font-bold text-white mb-2">{value}</div>
      <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
        <div
          className="h-full rounded-full progress-bar"
          style={{
            width: `${Math.min(bar, 100)}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

function VitalCard({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  color,
  small = false,
}: {
  icon: typeof Heart;
  label: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'flat';
  color: string;
  small?: boolean;
}) {
  return (
    <div className="glass rounded-xl p-3.5 glass-hover">
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className={`w-3.5 h-3.5 ${color}`} />
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`${small ? 'text-sm' : 'text-xl'} font-bold text-white`}>{value}</span>
        {unit && <span className="text-xs text-slate-500">{unit}</span>}
        {trend === 'up' && <span className="text-xs text-amber-400 ml-1">↑</span>}
        {trend === 'down' && <span className="text-xs text-red-400 ml-1">↓</span>}
      </div>
    </div>
  );
}

function BaselineBar({
  label,
  current,
  baseline,
  unit,
  reverse = false,
}: {
  label: string;
  current: number;
  baseline: number;
  unit: string;
  reverse?: boolean;
}) {
  const diff = current - baseline;
  const isWorse = reverse ? diff < 0 : diff > 0;
  const pct = reverse
    ? Math.min(100, Math.max(0, 100 - Math.abs(diff) * 5))
    : Math.min(100, Math.max(0, 100 - Math.abs(diff) * 2));

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-slate-400">{label}</span>
        <span className="text-xs font-mono text-white">
          {current}{unit} <span className="text-slate-600">/ {baseline}{unit}</span>
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
        <div
          className="h-full rounded-full progress-bar"
          style={{
            width: `${pct}%`,
            backgroundColor: isWorse && Math.abs(diff) > 2 ? '#f59e0b' : '#22c55e',
          }}
        />
      </div>
    </div>
  );
}
