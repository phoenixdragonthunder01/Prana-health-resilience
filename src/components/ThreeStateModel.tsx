import { ShieldCheck, AlertTriangle, HeartCrack } from 'lucide-react';
import { STATE_CONFIG } from '@/lib/simulation';

const STATES = [
  {
    key: 'normal' as const,
    icon: ShieldCheck,
    title: 'Normal',
    desc: 'Stable relative to personal baseline.',
    detail: 'All physiological signals are within expected ranges based on your individual patterns. No intervention needed.',
    signals: ['HR near baseline', 'SpO₂ ≥ 96%', 'Temp < 37.2°C', 'Stable trend'],
  },
  {
    key: 'at_risk' as const,
    icon: AlertTriangle,
    title: 'At Risk',
    desc: 'Significant deviation or accumulating environmental/physiological stress.',
    detail: 'Multiple signals show meaningful deviation from your baseline, or environmental exposure is building physiological stress over time.',
    signals: ['HR elevated >15 BPM', 'SpO₂ 92-95%', 'Temp 37.5-38.5°C', 'Deteriorating trend'],
  },
  {
    key: 'critical' as const,
    icon: HeartCrack,
    title: 'Critical',
    desc: 'Severe or rapidly deteriorating physiological state requiring urgent intervention.',
    detail: 'Severe deviation across multiple signals, or rapid deterioration detected. Immediate action and emergency sharing recommended.',
    signals: ['HR > 130 BPM', 'SpO₂ < 90%', 'Temp > 38.5°C', 'Rapid deterioration'],
  },
];

export default function ThreeStateModel() {
  return (
    <section id="states" className="relative py-24 px-6">
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-red-500/5 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-700/30 border border-slate-600/30 mb-4">
            <HeartCrack className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-xs font-semibold text-slate-300 tracking-wide">THREE-STATE MODEL</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Health states that adapt to you
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Transitions depend on multiple signals and trends — not a single
            arbitrary threshold. Your baseline is personal; what's "at risk" for
            you might be normal for someone else.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {STATES.map((s, i) => {
            const cfg = STATE_CONFIG[s.key];
            return (
              <div
                key={s.key}
                className={`relative glass rounded-3xl p-7 fade-in-up ring-1 ${cfg.ring} ${cfg.glow} shadow-2xl`}
                style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'both' }}
              >
                {/* State number */}
                <div className="absolute top-5 right-5 text-5xl font-bold text-slate-800/50 font-mono">
                  {i + 1}
                </div>

                {/* Icon */}
                <div className="relative mb-5">
                  <div className={`w-16 h-16 rounded-2xl ${cfg.bg} flex items-center justify-center shadow-lg`}>
                    <s.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className={`text-2xl font-bold ${cfg.text} mb-2`}>{s.title}</div>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">{s.desc}</p>
                <p className="text-xs text-slate-500 mb-5 leading-relaxed">{s.detail}</p>

                <div className="space-y-2">
                  {s.signals.map((sig) => (
                    <div key={sig} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      <span className="text-xs font-mono text-slate-400">{sig}</span>
                    </div>
                  ))}
                </div>

                {/* Transition arrow */}
                {i < 2 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
