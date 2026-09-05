import { Activity, Thermometer, Heart, Wind, Brain, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';

const FLOW_STEPS = [
  {
    icon: Heart,
    title: 'Physiological Signals',
    desc: 'Heart rate, SpO₂, temperature, and activity level from onboard sensors.',
    items: ['HR', 'SpO₂', 'Temp', 'Motion'],
  },
  {
    icon: Wind,
    title: 'Environment Exposure',
    desc: 'Heat index, air quality, humidity, and disaster-specific exposure data.',
    items: ['Heat', 'AQI', 'Humidity', 'Flood'],
  },
  {
    icon: Activity,
    title: 'Personal Baseline',
    desc: 'Your normal HR, SpO₂, and recovery patterns learned over time.',
    items: ['Normal HR', 'Normal SpO₂', 'Recovery'],
  },
  {
    icon: Brain,
    title: 'Multimodal Fusion',
    desc: 'On-device AI engine correlates all three signal streams into a unified health state.',
    items: ['Offline AI', 'Context Fusion'],
  },
  {
    icon: TrendingUp,
    title: 'Risk Trajectory',
    desc: 'Not just current status — PRANA projects where your condition is heading.',
    items: ['Trend', 'Forecast'],
  },
  {
    icon: ShieldCheck,
    title: 'Action',
    desc: 'Context-aware recommendations tuned to your situation and available resources.',
    items: ['Guidance', 'Emergency Share'],
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative py-24 px-6">
      <div className="absolute inset-0 grid-pattern opacity-15" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Brain className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-semibold text-blue-300 tracking-wide">THE INTELLIGENCE PIPELINE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            From sensor to action
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Normal health apps show a dashboard. PRANA interprets the
            relationship between your signals, your environment, and your
            personal baseline — entirely on device.
          </p>
        </div>

        {/* Flow diagram */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Input layer label */}
          <div className="md:col-span-3 flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-700" />
            <span className="text-xs font-semibold text-slate-500 tracking-widest">INPUT LAYER</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-700" />
          </div>

          {FLOW_STEPS.slice(0, 3).map((step, i) => (
            <FlowCard key={i} {...step} delay={i * 0.1} />
          ))}

          {/* Fusion layer label */}
          <div className="md:col-span-3 flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-700/50" />
            <ArrowRight className="w-5 h-5 text-cyan-500 rotate-90 md:rotate-0" />
            <span className="text-xs font-semibold text-cyan-400 tracking-widest">FUSION ENGINE</span>
            <ArrowRight className="w-5 h-5 text-cyan-500 rotate-90 md:rotate-0" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-700/50" />
          </div>

          <div className="md:col-span-3">
            <FlowCard {...FLOW_STEPS[3]} delay={0.3} highlight />
          </div>

          {/* Output layer label */}
          <div className="md:col-span-3 flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-700" />
            <span className="text-xs font-semibold text-slate-500 tracking-widest">OUTPUT LAYER</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-700" />
          </div>

          <div className="md:col-span-1">
            <FlowCard {...FLOW_STEPS[4]} delay={0.4} />
          </div>
          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="w-8 h-8 text-slate-600" />
          </div>
          <div className="md:col-span-1">
            <FlowCard {...FLOW_STEPS[5]} delay={0.5} />
          </div>
        </div>

        {/* Distinction callout */}
        <div className="glass rounded-3xl p-8 mt-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">The killer distinction</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-slate-500 font-mono text-xs">Other apps:</span>
                  <span className="text-slate-400">Sensor → Dashboard</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-cyan-400 font-mono text-xs font-bold">PRANA:</span>
                  <span className="text-white font-medium">Sensor → Context → Baseline → Offline AI → Risk Trajectory → Action</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 glass rounded-2xl p-4 text-center">
                <Thermometer className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                <div className="text-xs text-slate-500">Monitoring isn't the product</div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-600" />
              <div className="flex-1 glass rounded-2xl p-4 text-center border-cyan-500/20">
                <Brain className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-xs text-cyan-300 font-semibold">It's the input layer for disaster-resilience intelligence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowCard({
  icon: Icon,
  title,
  desc,
  items,
  delay,
  highlight = false,
}: {
  icon: typeof Heart;
  title: string;
  desc: string;
  items: string[];
  delay: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`glass rounded-2xl p-5 glass-hover fade-in-up ${highlight ? 'ring-1 ring-cyan-500/30 shadow-lg shadow-cyan-500/10' : ''}`}
      style={{ animationDelay: `${delay}s`, animationFillMode: 'both' }}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${highlight ? 'bg-gradient-to-br from-cyan-500 to-blue-600' : 'bg-slate-800'}`}>
        <Icon className={`w-5 h-5 ${highlight ? 'text-white' : 'text-cyan-400'}`} />
      </div>
      <h4 className="text-sm font-bold text-white mb-1.5">{title}</h4>
      <p className="text-xs text-slate-400 leading-relaxed mb-3">{desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-400 border border-slate-700/40">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
