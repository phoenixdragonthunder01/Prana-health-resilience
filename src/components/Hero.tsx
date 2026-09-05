import { Activity, WifiOff, Shield, Zap, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06080f]" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 fade-in-up">
          <span className="w-2 h-2 rounded-full bg-emerald-400 blink" />
          <span className="text-xs font-medium text-slate-300 tracking-wide">
            SIH 2025 · Offline AI Health Intelligence
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          Your health companion
          <br />
          when <span className="gradient-text">help can't reach you</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          Offline AI health intelligence for people trapped, isolated, or exposed
          during disasters. No internet. No cloud dependency. No constant
          connectivity required.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <a
            href="#demo"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:scale-105 transition-all"
          >
            Experience Live Simulation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#how"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl glass glass-hover text-slate-200 font-semibold"
          >
            How It Works
          </a>
        </div>

        {/* Feature pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          {[
            { icon: WifiOff, label: 'Fully Offline', desc: 'No internet needed' },
            { icon: Activity, label: 'Real-time Vitals', desc: 'HR · SpO₂ · Temp' },
            { icon: Zap, label: 'AI Risk Engine', desc: 'On-device inference' },
            { icon: Shield, label: 'Private by Design', desc: 'Data never leaves phone' },
          ].map((f) => (
            <div key={f.label} className="glass rounded-2xl p-4 text-left glass-hover">
              <f.icon className="w-5 h-5 text-cyan-400 mb-2" />
              <div className="text-sm font-semibold text-white">{f.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
