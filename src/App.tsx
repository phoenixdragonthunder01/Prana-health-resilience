import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DisasterDemo from '@/components/DisasterDemo';
import HowItWorks from '@/components/HowItWorks';
import ThreeStateModel from '@/components/ThreeStateModel';
import Features from '@/components/Features';
import Privacy from '@/components/Privacy';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#06080f] text-slate-200 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <DisasterDemo />
        <HowItWorks />
        <ThreeStateModel />
        <Features />
        <Privacy />
      </main>
      <Footer />
    </div>
  );
}

export default App;
