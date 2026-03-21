import { MapPin, Clock, Navigation } from 'lucide-react';
import trailsData from '../data/trails.json';

interface Trail {
  id: string;
  name: string;
  location: string;
  difficulty: string;
  difficultyLevel: string;
  distance: string;
  time: string;
  terrain: string;
  tags: string[];
  description: string;
  onxUrl: string;
  mapsUrl: string;
}

// Terrain-appropriate nature images
const terrainImages: Record<string, string[]> = {
  mountain: [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    'https://images.unsplash.com/photo-1511884642898-4c92249f20b6?w=400&q=80',
  ],
  desert: [
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&q=80',
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80',
    'https://images.unsplash.com/photo-1545063914-1a0c695331e2?w=400&q=80',
  ],
  sand: [
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&q=80',
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80',
  ]
};

const difficultyColors: Record<string, { bg: string; text: string; border: string }> = {
  'Beginner': { bg: 'bg-[#4ade80]/20', text: 'text-[#4ade80]', border: 'border-[#4ade80]' },
  'Moderate': { bg: 'bg-[#facc15]/20', text: 'text-[#facc15]', border: 'border-[#facc15]' },
  'Advanced': { bg: 'bg-[#fb923c]/20', text: 'text-[#fb923c]', border: 'border-[#fb923c]' },
  'Extreme': { bg: 'bg-[#ef4444]/20', text: 'text-[#ef4444]', border: 'border-[#ef4444]' },
};

function TrailRow({ trail, index }: { trail: Trail; index: number }) {
  const colors = difficultyColors[trail.difficulty];
  const images = terrainImages[trail.terrain] || terrainImages.mountain;
  const imageUrl = images[index % images.length];

  return (
    <div className="bg-[#232a26] rounded-lg border border-[#2d3530] overflow-hidden hover:border-[#4a7c59] transition-colors">
      <div className="flex flex-col md:flex-row">
        {/* Image - terrain appropriate */}
        <div 
          className="w-full md:w-48 h-32 md:h-auto flex-shrink-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        
        {/* Content */}
        <div className="flex-1 p-4 md:p-5">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-[#f0f4f1]">{trail.name}</h3>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}>
                  {trail.difficultyLevel}
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-[#8a9a8e] text-sm mb-2">
                <MapPin size={14} />
                <span>{trail.location}</span>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-[#8a9a8e] mb-3">
                <span className="flex items-center gap-1">
                  <Navigation size={14} /> {trail.distance}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {trail.time}
                </span>
              </div>

              <p className="text-[#8a9a8e] text-sm mb-3">{trail.description}</p>

              <div className="flex flex-wrap gap-1">
                {trail.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="inline-block bg-[#2d3530] text-[#8a9a8e] px-2 py-0.5 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-row md:flex-col gap-2 md:min-w-[140px]">
              <a 
                href={trail.onxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none bg-[#f97316] hover:bg-[#ea580c] text-white text-center py-2 px-4 rounded font-medium text-sm transition-colors"
              >
                Open in ONX
              </a>
              <a 
                href={trail.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none bg-[#2d3530] hover:bg-[#3d4540] text-[#f0f4f1] text-center py-2 px-4 rounded font-medium text-sm transition-colors border border-[#4a7c59]"
              >
                Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrailSection({ title, description, trails, icon }: { 
  title: string; 
  description: string; 
  trails: Trail[];
  icon: string;
}) {
  if (trails.length === 0) return null;

  return (
    <section className="py-8 px-4" id={title.toLowerCase().replace(' ', '-')} >
      <div className="container mx-auto max-w-5xl">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{icon}</span>
            <h2 className="text-2xl font-bold text-[#f0f4f1]">{title}</h2>
          </div>
          <p className="text-[#8a9a8e]">{description}</p>
        </div>

        <div className="space-y-4">
          {trails.map((trail, index) => (
            <TrailRow key={trail.id} trail={trail} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const beginnerTrails = trailsData.filter(t => t.difficulty === 'Beginner');
  const moderateTrails = trailsData.filter(t => t.difficulty === 'Moderate');
  const advancedTrails = trailsData.filter(t => t.difficulty === 'Advanced');
  const extremeTrails = trailsData.filter(t => t.difficulty === 'Extreme');

  return (
    <main className="min-h-screen bg-[#1a1f1c]">
      {/* Header */}
      <header className="bg-[#232a26] border-b border-[#2d3530] py-4 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌲</span>
              <div>
                <h1 className="text-xl font-bold text-[#f0f4f1]">SoCal Off-Roaders</h1>
                <p className="text-[#8a9a8e] text-xs">Desert Runs & Trail Events</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#beginner-trails" className="text-[#8a9a8e] hover:text-[#4ade80] text-sm transition-colors">Beginner</a>
              <a href="#moderate-trails" className="text-[#8a9a8e] hover:text-[#facc15] text-sm transition-colors">Moderate</a>
              <a href="#advanced-trails" className="text-[#8a9a8e] hover:text-[#fb923c] text-sm transition-colors">Advanced</a>
              <a href="#extreme-trails" className="text-[#8a9a8e] hover:text-[#ef4444] text-sm transition-colors">Extreme</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 px-4 bg-[#232a26]">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#f0f4f1] mb-4">Discover SoCal's Best Trails</h2>
          <p className="text-[#8a9a8e] mb-8 max-w-2xl mx-auto">Your guide to Southern California's off-road destinations. From desert dunes to mountain ridges, find your next adventure.</p>
          
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="bg-[#1a1f1c] rounded-lg p-4 border border-[#2d3530]">
              <div className="text-2xl font-bold text-[#4a7c59]">{trailsData.length}</div>
              <div className="text-[#8a9a8e] text-xs">Trails Mapped</div>
            </div>
            <div className="bg-[#1a1f1c] rounded-lg p-4 border border-[#2d3530]">
              <div className="text-2xl font-bold text-[#a67c1a]">4</div>
              <div className="text-[#8a9a8e] text-xs">Difficulty Levels</div>
            </div>
            <div className="bg-[#1a1f1c] rounded-lg p-4 border border-[#2d3530]">
              <div className="text-2xl font-bold text-[#f97316]">SoCal</div>
              <div className="text-[#8a9a8e] text-xs">All Southern CA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Difficulty Nav Pills */}
      <nav className="py-4 px-4 bg-[#1a1f1c] border-b border-[#2d3530] sticky top-0 z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap gap-2 justify-center">
            <a href="#beginner-trails" className="px-4 py-2 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-sm font-medium hover:bg-[#4ade80]/30 transition-colors">🟢 Beginner</a>
            <a href="#moderate-trails" className="px-4 py-2 rounded-full bg-[#facc15]/20 text-[#facc15] text-sm font-medium hover:bg-[#facc15]/30 transition-colors">🟡 Moderate</a>
            <a href="#advanced-trails" className="px-4 py-2 rounded-full bg-[#fb923c]/20 text-[#fb923c] text-sm font-medium hover:bg-[#fb923c]/30 transition-colors">🟠 Advanced</a>
            <a href="#extreme-trails" className="px-4 py-2 rounded-full bg-[#ef4444]/20 text-[#ef4444] text-sm font-medium hover:bg-[#ef4444]/30 transition-colors">🔴 Extreme</a>
          </div>
        </div>
      </nav>

      {/* Trail Sections */}
      <TrailSection 
        title="Beginner Trails" 
        description="Stock 4WD vehicles welcome. Perfect for first-timers and families."
        trails={beginnerTrails}
        icon="🟢"
      />

      <div className="bg-[#1e2521]">
        <TrailSection 
          title="Moderate Trails" 
          description="All-terrain tires recommended. Some ground clearance and 4WD experience helpful."
          trails={moderateTrails}
          icon="🟡"
        />
      </div>

      <TrailSection 
        title="Advanced Trails" 
        description="Lift kit and skid plates recommended. Rock sliders and quality tires essential."
        trails={advancedTrails}
        icon="🟠"
      />

      <div className="bg-[#1e2521]">
        <TrailSection 
          title="Extreme Trails" 
          description="Built rigs only. Lockers, armor, and experience mandatory. Body damage highly likely."
          trails={extremeTrails}
          icon="🔴"
        />
      </div>

      {/* Recovery Section */}
      <section id="recovery" className="py-12 px-4 bg-[#232a26] border-t border-[#2d3530]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#f0f4f1] mb-2">🛠️ Recovery Resources</h2>
            <p className="text-[#8a9a8e]">Stuck, broken, or need a tow? These folks have your back. All volunteers — be respectful and compensate for their time/fuel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="bg-[#1a1f1c] rounded-lg p-5 border border-[#2d3530]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-[#f0f4f1]">SoCal Crwlr</h3>
                <span className="px-2 py-1 rounded-full bg-[#4a7c59]/20 text-[#4a7c59] text-xs font-medium">Recovery Service</span>
              </div>
              <p className="text-[#8a9a8e] text-sm mb-3">All SoCal OHV Areas</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {['Winch', 'Tow Straps', 'Hi-Lift', 'Recovery Rig'].map(tag => (
                  <span key={tag} className="text-xs bg-[#2d3530] text-[#8a9a8e] px-2 py-0.5 rounded">{tag}</span>
                ))}
              </div>
              <a 
                href="https://instagram.com/socal_crwlr" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#2d3530] hover:bg-[#3d4540] text-[#f0f4f1] px-4 py-2 rounded text-sm transition-colors border border-[#4a7c59]"
              >
                @socal_crwlr
              </a>
            </div>

            <div className="bg-[#1a1f1c] rounded-lg p-5 border border-[#2d3530]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-[#f0f4f1]">Rugged Repair</h3>
                <span className="px-2 py-1 rounded-full bg-[#8b6914]/20 text-[#a67c1a] text-xs font-medium">Mobile Tech</span>
              </div>
              <p className="text-[#8a9a8e] text-sm mb-3">Trail-Side Repairs & Recovery</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {['Mobile Repair', 'Welding', 'Winch', 'Tools'].map(tag => (
                  <span key={tag} className="text-xs bg-[#2d3530] text-[#8a9a8e] px-2 py-0.5 rounded">{tag}</span>
                ))}
              </div>
              <a 
                href="https://instagram.com/rugged_repair" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#2d3530] hover:bg-[#3d4540] text-[#f0f4f1] px-4 py-2 rounded text-sm transition-colors border border-[#4a7c59]"
              >
                @rugged_repair
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1f1c] border-t border-[#2d3530] py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-[#8a9a8e] text-sm">© 2026 SoCal Off-Roaders — Leave no trace. Stay on designated trails.</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/noah2131" target="_blank" className="text-[#8a9a8e] hover:text-[#f97316] text-sm transition-colors">@noah2131</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}