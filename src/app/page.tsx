import HeroCinematic from '../components/HeroCinematic';
import TrailCard from '../components/TrailCard';
import CommunityRunCard from '../components/CommunityRun';
import trailsData from '../data/trails.json';
import runsData from '../data/runs.json';
import { MapPin, Instagram, Wrench } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-950">
      {/* Hero Section */}
      <HeroCinematic />

      {/* Trail Explorer Section */}
      <section id="trail-explorer" className="py-20 px-4 bg-stone-950">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-600/10 border border-orange-600/30 text-orange-400 text-sm font-medium uppercase tracking-wider mb-4">
              Trail Explorer
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-50 mb-4">
              Choose Your <span className="italic text-orange-500">Adventure</span>
            </h2>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto">
              From fire roads to rock crawls. Each trail includes rig requirements, 
              navigation links, and real-time status.
            </p>
          </div>

          {/* Trail Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {trailsData.map((trail, index) => (
              <TrailCard key={trail.id} trail={trail} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Runs Section */}
      <section id="community-runs" className="py-20 px-4 bg-stone-900 border-y border-stone-800">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-600/10 border border-emerald-600/30 text-emerald-400 text-sm font-medium uppercase tracking-wider mb-4">
              Community
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-50 mb-4">
              Upcoming <span className="italic text-emerald-500">Trail Runs</span>
            </h2>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto">
              Join the community. Meet fellow wheelers, explore new trails, 
              and make memories. All skill levels welcome.
            </p>
          </div>

          {/* Run Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {runsData.map((run) => (
              <CommunityRunCard key={run.id} run={run} />
            ))}
          </div>
        </div>
      </section>

      {/* Recovery Resources Section */}
      <section className="py-20 px-4 bg-stone-950">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-stone-700/50 border border-stone-600 text-stone-400 text-sm font-medium uppercase tracking-wider mb-4">
              Support
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-50 mb-4">
              Recovery <span className="italic text-stone-400">Resources</span>
            </h2>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto">
              Stuck, broken, or need a tow? These trail angels have your back. 
              All volunteers — be respectful and compensate for their time/fuel.
            </p>
          </div>

          {/* Recovery Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* SoCal Crwlr */}
            <div className="bg-stone-900/50 backdrop-blur-sm rounded-2xl border border-stone-700 p-8 hover:border-orange-600/30 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-stone-50">SoCal Crwlr</h3>
                <span className="px-3 py-1 bg-emerald-600/20 text-emerald-400 rounded-full text-sm font-medium border border-emerald-600/30">
                  Available
                </span>
              </div>
              
              <p className="text-stone-400 mb-6">
                Full-service recovery throughout Southern California OHV areas. 
                Winch, tow straps, hi-lift, and recovery rig ready to roll.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {['Winch', 'Tow Straps', 'Hi-Lift', 'Recovery Rig', 'All SoCal'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-stone-800 text-stone-400 rounded-full text-xs border border-stone-700">
                    {tag}
                  </span>
                ))}
              </div>

              <a 
                href="https://instagram.com/socal_crwlr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition-all border border-stone-600"
              >
                <Instagram size={18} />
                <span className="font-medium">@socal_crwlr</span>
              </a>
            </div>

            {/* Rugged Repair */}
            <div className="bg-stone-900/50 backdrop-blur-sm rounded-2xl border border-stone-700 p-8 hover:border-orange-600/30 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-stone-50">Rugged Repair</h3>
                <span className="px-3 py-1 bg-orange-600/20 text-orange-400 rounded-full text-sm font-medium border border-orange-600/30">
                  Mobile Tech
                </span>
              </div>
              
              <p className="text-stone-400 mb-6">
                Trail-side repairs and mobile mechanic services. Welding, tools, 
                and expertise to get you rolling again. No trail too remote.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {['Mobile Repair', 'Welding', 'Tools', 'Trail-Side', 'Recovery'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-stone-800 text-stone-400 rounded-full text-xs border border-stone-700">
                    {tag}
                  </span>
                ))}
              </div>

              <a 
                href="https://instagram.com/rugged_repair"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition-all border border-stone-600"
              >
                <Wrench size={18} />
                <span className="font-medium">@rugged_repair</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-stone-900 border-t border-stone-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌲</span>
              <div>
                <h4 className="font-bold text-stone-50">SoCal Off-Roaders</h4>
                <p className="text-stone-500 text-sm">Tread lightly. Leave no trace.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a 
                href="https://instagram.com/noah2131" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-orange-500 transition-colors"
              >
                @noah2131
              </a>
              <span className="text-stone-600">|</span>
              <span className="text-stone-500">© 2026 SoCal Off-Roaders</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
