import TrailGrid from '../components/features/TrailGrid';
import trailsData from '../data/trails.json';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-base-100">
      {/* Header */}
      <header className="bg-primary text-primary-content py-6 px-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌲</span>
              <h1 className="text-3xl font-bold">SoCal Off-Roaders</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#trails" className="hover:underline">Trails</a>
              <a href="#recovery" className="hover:underline">Recovery</a>
            </nav>
          </div>
          <p className="mt-2 text-primary-content/80">Your guide to Southern California's best off-road trails</p>
        </div>
      </header>

      {/* Hero Stats */}
      <section className="bg-base-200 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-value text-primary">{trailsData.length}</div>
              <div className="stat-title">Trails Mapped</div>
            </div>
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-value text-primary">4</div>
              <div className="stat-title">Difficulty Levels</div>
            </div>
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-value text-primary">SoCal</div>
              <div className="stat-title">All Southern CA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trails Section */}
      <section id="trails" className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2">🗺️ Trail Guides</h2>
          <p className="text-gray-600 mb-8">Detailed trail info, difficulty ratings, and locations. Know before you go.</p>
          <TrailGrid trails={trailsData} />
        </div>
      </section>

      {/* Recovery Section */}
      <section id="recovery" className="py-12 px-4 bg-base-200">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2">🛠️ Recovery Resources</h2>
          <p className="text-gray-600 mb-8">Stuck, broken, or need a tow? These folks have your back.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">SoCal Crwlr</h3>
                <span className="badge badge-success">Available</span>
                <p className="text-sm text-gray-600 mt-2">All SoCal OHV Areas</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge badge-outline badge-sm">Winch</span>
                  <span className="badge badge-outline badge-sm">Tow Straps</span>
                  <span className="badge badge-outline badge-sm">Recovery Rig</span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <a href="https://instagram.com/socal_crwlr" target="_blank" className="btn btn-primary btn-sm">@socal_crwlr</a>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Rugged Repair</h3>
                <span className="badge badge-success">Mobile Tech</span>
                <p className="text-sm text-gray-600 mt-2">Trail-Side Repairs & Recovery</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge badge-outline badge-sm">Mobile Repair</span>
                  <span className="badge badge-outline badge-sm">Welding</span>
                  <span className="badge badge-outline badge-sm">Tools</span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <a href="https://instagram.com/rugged_repair" target="_blank" className="btn btn-primary btn-sm">@rugged_repair</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral text-neutral-content py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-2">SoCal Off-Roaders</h4>
              <p className="text-sm text-neutral-content/70">Your guide to Southern California's best off-road trails. Tread lightly, pack it out, and help each other.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Connect</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="https://instagram.com/noah2131" target="_blank" className="hover:underline">@noah2131</a></li>
                <li><a href="https://instagram.com/chevys.offroad" target="_blank" className="hover:underline">@chevys.offroad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Recovery</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="https://instagram.com/socal_crwlr" target="_blank" className="hover:underline">@socal_crwlr</a></li>
                <li><a href="https://instagram.com/rugged_repair" target="_blank" className="hover:underline">@rugged_repair</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-neutral-content/20 text-center text-sm text-neutral-content/50">
            <p>&copy; 2026 SoCal Off-Roaders — Leave no trace. Stay on designated trails.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}