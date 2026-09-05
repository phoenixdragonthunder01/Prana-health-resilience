export type HealthState = 'normal' | 'at_risk' | 'critical';

export type DisasterType = 'flood' | 'heatwave' | 'airpollution' | 'cyclone' | 'earthquake';

export interface Vitals {
  heartRate: number;
  spo2: number;
  temperature: number;
  movement: 'HIGH' | 'MODERATE' | 'LOW' | 'STILL';
}

export interface Environment {
  label: string;
  humidity: number;
  aqi: number;
  heatIndex: number;
  detail: string;
}

export interface RiskMetrics {
  resilienceIndex: number;
  riskMomentum: number;
  exposureDebt: number;
  recoveryDeficit: 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';
}

export interface SimState {
  state: HealthState;
  vitals: Vitals;
  environment: Environment;
  metrics: RiskMetrics;
  resilienceWindow: number;
  forecast: string;
  recommendation: string;
  elapsed: number;
}

export interface DisasterScenario {
  id: DisasterType;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  env: Environment;
  progression: {
    hr: number;
    spo2: number;
    temp: number;
    movement: Vitals['movement'];
  }[];
}
