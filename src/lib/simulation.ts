import type { DisasterScenario, HealthState, RiskMetrics, SimState, Vitals } from './types';

const BASELINE = { hr: 72, spo2: 98, temp: 36.7 };

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function computeHealthState(vitals: Vitals): HealthState {
  const hrDev = Math.abs(vitals.heartRate - BASELINE.hr);
  const spo2Dev = BASELINE.spo2 - vitals.spo2;
  const tempDev = vitals.temperature - BASELINE.temp;

  const stressScore =
    hrDev * 0.4 + spo2Dev * 3.5 + tempDev * 8;

  if (stressScore >= 45 || vitals.spo2 <= 85) return 'critical';
  if (stressScore >= 18 || vitals.spo2 <= 93) return 'at_risk';
  return 'normal';
}

function computeMetrics(vitals: Vitals, step: number): RiskMetrics {
  const hrDev = vitals.heartRate - BASELINE.hr;
  const spo2Dev = BASELINE.spo2 - vitals.spo2;
  const tempDev = vitals.temperature - BASELINE.temp;

  const resilienceIndex = clamp(
    Math.round(100 - (hrDev * 0.5 + spo2Dev * 4 + tempDev * 10 + step * 2)),
    0,
    100,
  );

  const riskMomentum = clamp(Math.round(hrDev * 0.3 + spo2Dev * 2 + tempDev * 5 + step * 3), 0, 60);

  const exposureDebt = clamp(Math.round(step * 10 + spo2Dev * 3 + tempDev * 8), 0, 100);

  const recoveryDeficit: RiskMetrics['recoveryDeficit'] =
    resilienceIndex < 20 ? 'SEVERE'
    : resilienceIndex < 40 ? 'HIGH'
    : resilienceIndex < 60 ? 'MODERATE'
    : 'LOW';

  return { resilienceIndex, riskMomentum, exposureDebt, recoveryDeficit };
}

function computeForecast(state: HealthState, scenario: DisasterScenario, step: number): string {
  if (step >= scenario.progression.length - 1) {
    return state === 'critical'
      ? 'Condition is deteriorating rapidly. Immediate intervention required.'
      : 'Risk expected to increase significantly over the next hour.';
  }
  if (state === 'critical') return 'Risk expected to worsen sharply in the next 60 minutes.';
  if (state === 'at_risk') return 'Risk expected to increase over the next 60 minutes.';
  return 'Condition stable but monitoring continues.';
}

function computeRecommendation(state: HealthState, scenario: DisasterScenario): string {
  switch (state) {
    case 'critical':
      return 'Seek emergency assistance immediately if available. Activate emergency sharing. Minimize all physical exertion.';
    case 'at_risk':
      switch (scenario.id) {
        case 'flood':
          return 'Conserve energy, hydrate if safe, move to a cooler and drier location.';
        case 'heatwave':
          return 'Hydrate immediately, seek shade or lower floor, remove excess clothing, cool body with water if available.';
        case 'airpollution':
          return 'Move indoors, seal gaps, use any available mask or cloth over nose and mouth, reduce physical activity.';
        case 'cyclone':
          return 'Stay away from windows, shelter in the strongest interior room, conserve resources for a prolonged wait.';
        case 'earthquake':
          return 'Conserve energy and air, tap periodically to signal location, protect airway from dust.';
      }
    default:
      return 'Maintain current activity level. Stay hydrated and continue monitoring.';
  }
}

function computeResilienceWindow(metrics: RiskMetrics): number {
  return clamp(Math.round(metrics.resilienceIndex * 0.6 + 10), 5, 60);
}

export function computeSimState(scenario: DisasterScenario, step: number): SimState {
  const prog = scenario.progression[clamp(step, 0, scenario.progression.length - 1)];

  const vitals: Vitals = {
    heartRate: prog.hr,
    spo2: prog.spo2,
    temperature: prog.temp,
    movement: prog.movement,
  };

  const state = computeHealthState(vitals);
  const metrics = computeMetrics(vitals, step);
  const resilienceWindow = computeResilienceWindow(metrics);
  const forecast = computeForecast(state, scenario, step);
  const recommendation = computeRecommendation(state, scenario);

  return {
    state,
    vitals,
    environment: scenario.env,
    metrics,
    resilienceWindow,
    forecast,
    recommendation,
    elapsed: step,
  };
}

export const STATE_CONFIG = {
  normal: { label: 'NORMAL', color: '#22c55e', bg: 'bg-emerald-500', text: 'text-emerald-400', ring: 'ring-emerald-500/40', glow: 'shadow-emerald-500/20', dot: 'bg-emerald-400' },
  at_risk: { label: 'AT RISK', color: '#f59e0b', bg: 'bg-amber-500', text: 'text-amber-400', ring: 'ring-amber-500/40', glow: 'shadow-amber-500/20', dot: 'bg-amber-400' },
  critical: { label: 'CRITICAL', color: '#ef4444', bg: 'bg-red-500', text: 'text-red-400', ring: 'ring-red-500/40', glow: 'shadow-red-500/20', dot: 'bg-red-400' },
} as const;
