import { Activity, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-slate-800/60">
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white">PRANA</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              An offline AI health companion for people trapped or isolated
              during disasters. Built for SIH 2025.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Explore</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Live Demo', href: '#demo' },
                { label: 'How It Works', href: '#how' },
                { label: 'Risk States', href: '#states' },
                { label: 'Features', href: '#features' },
                { label: 'Privacy', href: '#privacy' },
                { label: 'Home', href: '#home' },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Mission */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Our Mission</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              When connectivity fails, when hospitals are unreachable, when
              every minute matters — PRANA ensures you're never alone with your
              health.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2025 PRANA · Smart India Hackathon
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            Built with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for those who need it most
          </div>
        </div>
      </div>
    </footer>
  );
}
