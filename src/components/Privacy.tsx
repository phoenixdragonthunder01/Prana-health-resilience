import { Lock, Shield, Eye, Server, KeyRound, Cpu } from 'lucide-react';

const PRIVACY_POINTS = [
  {
    icon: Cpu,
    title: 'On-Device Inference',
    desc: 'All AI models run locally on your phone. No data is sent to any server for processing.',
  },
  {
    icon: Eye,
    title: 'No Tracking',
    desc: 'PRANA doesn\'t track your location, behavior, or health data in the background. You initiate every session.',
  },
  {
    icon: Server,
    title: 'No Cloud Storage',
    desc: 'Your physiological data is stored only on your device. There is no cloud account, no sync, no backup unless you choose it.',
  },
  {
    icon: KeyRound,
    title: 'Explicit Consent',
    desc: 'Emergency sharing requires your explicit action. PRANA never broadcasts your data without a deliberate tap.',
  },
];

export default function Privacy() {
  return (
    <section id="privacy" className="relative py-24 px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-300 tracking-wide">PRIVACY FIRST</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Your body, your data, your control
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            In a disaster, the last thing you should worry about is who has
            access to your health data. PRANA is engineered so that question has
            a simple answer: no one, unless you decide otherwise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {PRIVACY_POINTS.map((p, i) => (
            <div
              key={p.title}
              className="glass rounded-2xl p-6 glass-hover fade-in-up flex items-start gap-4"
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <p.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1.5">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="glass rounded-3xl p-8 mt-8 text-center border-emerald-500/20">
          <Shield className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <p className="text-lg font-semibold text-white mb-1">
            Offline. Private. Yours.
          </p>
          <p className="text-sm text-slate-400">
            No internet required. No cloud dependency. No constant connectivity needed.
          </p>
        </div>
      </div>
    </section>
  );
}
