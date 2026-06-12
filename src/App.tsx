import Navbar from './components/navigation/Navbar';
import DOATelemetry from './components/visual-data/DOATelemetry';
import LifespanBanner from './components/metrics/LifespanBanner';
import LiveSlaughterFeed from './components/metrics/LiveSlaughterFeed';
import MarqueeTicker from './components/visual-data/MarqueeTicker';
import MetricsGrid from './components/metrics/MetricsGrid';
import TopPredators from './components/metrics/TopPredators';
import WhyBroken from './components/display/WhyBroken';

export default function App() {
  // simple deterministic metrics to drive the UI
  const total = 100;
  const instaDead = 40;
  const gradRugged = 25;
  const survived = 35;

  return (
    <div className="min-h-screen text-[#f0f0f0] font-mono bg-[#050505]">
      <div className="crt-overlay" />

      <Navbar />
      
      <main id="snapshot-area" className="max-w-6xl mx-auto px-4 pb-12 pt-6 relative z-10">
        <MarqueeTicker />

        <div className="mb-6">
          <LifespanBanner />
        </div>

        {/* === DOA TELEMETRY (Rug‑O‑Meter + Chain‑of‑Pain) === */}
        <div className="mb-6">
          <DOATelemetry />
        </div>

        {/* toppredators (50%) - liveslaughterfeed (50%) */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <TopPredators />
          </div>
          <div>
            <LiveSlaughterFeed />
          </div>
        </div>

        <div className="mt-6">
          <MetricsGrid
            total={total}
            instaDead={instaDead}
            gradRugged={gradRugged}
            survived={survived}
          />
        </div>

        <WhyBroken />
      </main>
    </div>
  );
}
