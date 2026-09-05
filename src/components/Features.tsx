import {
  TrendingUp,
  ShieldCheck,
  Siren,
  Lock,
  Radio,
  MapPin,
  Brain,
  HeartPulse,
  Cloud,
  Battery,
  Cpu,
  Share2,
} from 'lucide-react';

const FEATURES = [
  {
    icon: TrendingUp,
    title: 'Risk Forecast',
    desc: 'PRANA doesn\'t just tell you where you are — it projects where your condition is heading over the next 60 minutes based on trend analysis and environmental exposure.',
    points: ['Trend-based trajectory', 'Exposure debt tracking', 'Resilience window estimate'],
  },
  {
    icon: ShieldCheck,
    title: 'Personal Resilience',
    desc: 'Your health isn\'t compared to population averages. PRANA learns your individual baseline and measures deviations relative to what\'s normal for you.',
    points: ['Personal baseline learning', 'Recovery deficit analysis', 'Adaptive thresholds'],
  },
  {
    icon: Siren,
    title: 'Emergency Sharing',
    desc: 'When connectivity is available, PRANA can broadcast your health state and location to emergency contacts or rescue services with a single tap.',
    points: ['One-tap emergency broadcast', 'Location + vitals payload', 'Works offline, syncs later'],
  },
  {
    icon: Lock,
    title: 'Privacy by Design',
    desc: 'All AI inference runs on your device. Your physiological data never leaves your phone unless you explicitly share it. No cloud, no tracking, no data harvesting.',
    points: ['On-device AI inference', 'Zero cloud dependency', 'Explicit consent for sharing'],
  },
];

const TECH = [
  { icon: Cpu, label: 'On-device AI' },
  { icon: Battery, label: 'Low-power sensing' },
  { icon: Cloud, label: 'Offline-first' },
  { icon: Radio, label: 'Mesh networking ready' },
  { icon: MapPin, label: 'Location awareness' },
  { icon: Share2, label: 'Emergency broadcast' },
  { icon: Brain, label: 'Multimodal fusion' },
  { icon: HeartPulse, label: 'Continuous monitoring' },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 px-6">
      <div className="absolute inset-0 grid-pattern opacity-15" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Brain className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-300 tracking-wide">CAPABILITIES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Built for the worst conditions
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Every feature is designed to work when nothing else does — no
            internet, no power grid, no hospitals, no emergency services
            available.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="glass rounded-3xl p-7 glass-hover fade-in-up"
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 flex items-center justify-center shrink-0">
                  <f.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{f.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {f.points.map((p) => (
                      <span key={p} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800/50 text-slate-300 border border-slate-700/40">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech strip */}
        <div className="glass rounded-3xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-sm font-semibold text-slate-400 tracking-wide">TECHNOLOGY STACK</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TECH.map((t) => (
              <div key={t.label} className="flex items-center gap-3 glass rounded-xl p-3.5 glass-hover">
                <t.icon className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-sm text-slate-300 font-medium">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
