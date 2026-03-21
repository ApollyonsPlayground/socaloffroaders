'use client';

import { useState } from 'react';
import TrailGrid from '../components/features/TrailGrid';
import trailsData from '../data/trails.json';

interface Trail {
  id: string;
  name: string;
  location: string;
  difficulty: string;
  coordinates: string;
  status: string;
  tags: string[];
  description: string;
}

export default function HomePage() {
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);

  return (
    <main className="min-h-screen bg-[#faf8f3]">
      {/* Hero with nature background */}
      <header 
        className="relative py-16 px-4 shadow-lg"
        style={{
          backgroundImage: 'linear-gradient(rgba(45, 90, 39, 0.85), rgba(45, 90, 39, 0.9)), url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🏔️</span>
              <div>
                <h1 className="text-4xl font-bold text-[#f5f5dc]">SoCal Off-Roaders</h1>
                <p className="text-[#f5f5dc]/80 text-sm">Explore Southern California's wilderness</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#trails" className="text-[#f5f5dc] hover:text-[#d2691e] transition-colors">Trails</a>
              <a href="#recovery" className="text-[#f5f5dc] hover:text-[#d2691e] transition-colors">Recovery</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Desert landscape section */}
      <section 
        className="relative py-12"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/90 backdrop-blur rounded-lg shadow-lg p-6">
              <div className="text-4xl font-bold text-[#2d5a27]">{trailsData.length}</div>
              <div className="text-[#5d4e37] font-medium">Trails Mapped</div>
            </div>
            <div className="bg-white/90 backdrop-blur rounded-lg shadow-lg p-6">
              <div className="text-4xl font-bold text-[#8b4513]">4</div>
              <div className="text-[#5d4e37] font-medium">Difficulty Levels</div>
            </div>
            <div className="bg-white/90 backdrop-blur rounded-lg shadow-lg p-6">
              <div className="text-4xl font-bold text-[#d2691e]">SoCal</div>
              <div className="text-[#5d4e37] font-medium">Wilderness Areas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trails Section */}
      <section id="trails" className="py-16 px-4 bg-[#f0ebe0]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2c2416] mb-2">🌄 Trail Guides</h2>
            <p className="text-[#5d4e37]">Discover pristine off-road trails through mountains, deserts, and wilderness</p>
          </div>
          <TrailGrid trails={trailsData} onSelectTrail={setSelectedTrail} />
        </div>
      </section>

      {/* Mountain valley divider */}
      <section 
        className="relative h-64"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#2d5a27]/60 to-[#8b4513]/60"></div>
        <div className="container mx-auto h-full flex items-center justify-center relative z-10">
          <p className="text-white text-2xl font-bold text-center">"Leave no trace, take only memories" 🌲</p>
        </div>
      </section>

      {/* Recovery Section */}
      <section id="recovery" className="py-16 px-4 bg-[#faf8f3]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2c2416] mb-2">🦅 Recovery Resources</h2>
            <p className="text-[#5d4e37]">Stuck in the wilderness? These trail angels have your back</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-[#2d5a27]">
              <div 
                className="h-32"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2c2416] mb-2">SoCal Crwlr</h3>
                <span className="inline-block bg-[#2d5a27] text-[#f5f5dc] px-3 py-1 rounded-full text-sm mb-3">Available Now</span>
                <p className="text-[#5d4e37] text-sm mb-4">All SoCal OHV Areas • Winch • Tow Straps • Recovery Rig</p>
                <a 
                  href="https://instagram.com/socal_crwlr" 
                  target="_blank"
                  className="inline-block bg-[#8b4513] text-[#f5f5dc] px-4 py-2 rounded hover:bg-[#d2691e] transition-colors"
                >
                  Contact @socal_crwlr
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-[#8b4513]">
              <div 
                className="h-32"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=800&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2c2416] mb-2">Rugged Repair</h3>
                <span className="inline-block bg-[#8b4513] text-[#f5f5dc] px-3 py-1 rounded-full text-sm mb-3">Mobile Tech</span>
                <p className="text-[#5d4e37] text-sm mb-4">Trail-Side Repairs • Welding • Tools • Get you rolling again</p>
                <a 
                  href="https://instagram.com/rugged_repair" 
                  target="_blank"
                  className="inline-block bg-[#2d5a27] text-[#f5f5dc] px-4 py-2 rounded hover:bg-[#d2691e] transition-colors"
                >
                  Contact @rugged_repair
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2c2416] text-[#f5f5dc] py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🏔️</span>
                <h4 className="font-bold text-lg">SoCal Off-Roaders</h4>
              </div>
              <p className="text-[#f5f5dc]/70 text-sm">Your guide to Southern California's wilderness trails. Respect the land, tread lightly, and preserve these wild places for future generations.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://instagram.com/noah2131" target="_blank" className="text-[#f5f5dc]/70 hover:text-[#d2691e] transition-colors">@noah2131</a></li>
                <li><a href="https://instagram.com/chevys.offroad" target="_blank" className="text-[#f5f5dc]/70 hover:text-[#d2691e] transition-colors">@chevys.offroad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Trail Ethics</h4>
              <ul className="space-y-2 text-sm text-[#f5f5dc]/70">
                <li>🌲 Stay on designated trails</li>
                <li>🗑️ Pack it in, pack it out</li>
                <li>🐾 Respect wildlife</li>
                <li>🤝 Help fellow wheelers</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#f5f5dc]/20 text-center text-sm text-[#f5f5dc]/50">
            <p>&copy; 2026 SoCal Off-Roaders — Tread Lightly • Leave No Trace</p>
          </div>
        </div>
      </footer>

      {/* Trail Detail Modal */}
      {selectedTrail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#faf8f3] rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div 
              className="h-48 relative"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <button 
                onClick={() => setSelectedTrail(null)}
                className="absolute top-4 right-4 bg-black/50 text-white w-8 h-8 rounded-full hover:bg-black/70"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#2c2416] mb-2">{selectedTrail.name}</h3>
              <p className="text-[#5d4e37] mb-4">📍 {selectedTrail.location}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block bg-[#2d5a27] text-[#f5f5dc] px-3 py-1 rounded-full text-sm">
                  {selectedTrail.difficulty}
                </span>
                {selectedTrail.tags.map(tag => (
                  <span key={tag} className="inline-block bg-[#8b4513]/20 text-[#8b4513] px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-[#2c2416] mb-4">{selectedTrail.description}</p>
              
              <div className="bg-[#f0ebe0] p-4 rounded mb-4">
                <p className="text-sm text-[#5d4e37]"><strong>Status:</strong> {selectedTrail.status}</p>
                <p className="text-sm text-[#5d4e37]"><strong>Coordinates:</strong> {selectedTrail.coordinates}</p>
              </div>
              
              <div className="flex gap-3">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedTrail.name + ' ' + selectedTrail.location)}`}
                  target="_blank"
                  className="flex-1 bg-[#2d5a27] text-[#f5f5dc] text-center py-3 rounded hover:bg-[#1e3d1a] transition-colors"
                >
                  🗺️ Open in Maps
                </a>
                <button 
                  onClick={() => setSelectedTrail(null)}
                  className="flex-1 bg-[#8b4513] text-[#f5f5dc] py-3 rounded hover:bg-[#d2691e] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}