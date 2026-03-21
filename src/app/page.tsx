import { Suspense } from 'react';
import { CommunityRunCard } from '@/components/CommunityRunCard';
import { SubmissionHub } from '@/components/SubmissionHub';

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 to-stone-800 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            SoCal Off-Roaders
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-2xl mx-auto">
            Where the dirt meets the pavement. Building trails, friendships, and memories across Southern California.
          </p>
        </div>
      </section>

      {/* Upcoming Runs Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-stone-800 mb-12 text-center">
            Upcoming Community Runs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example runs - replace with dynamic data */}
            <CommunityRunCard 
              title="Glamis Sand Dunes"
              date="2026-04-05"
              location="Glamis, CA"
              description="Weekend camping and dune riding. All skill levels welcome."
              organizerHandle="socaloffroaders"
              difficulty="Intermediate"
              spotsAvailable={8}
            />
            <CommunityRunCard 
              title="Big Bear Trail Day"
              date="2026-04-12"
              location="Big Bear, CA"
              description="Mountain trails with scenic views. Lunch provided."
              organizerHandle="socaloffroaders"
              difficulty="Beginner-Friendly"
              spotsAvailable={12}
            />
            <CommunityRunCard 
              title="Johnson Valley OHV"
              date="2026-04-19"
              location="Johnson Valley, CA"
              description="Rock crawling and desert exploration. Bring plenty of water."
              organizerHandle="socaloffroaders"
              difficulty="Advanced"
              spotsAvailable={6}
            />
          </div>
        </div>
      </section>

      {/* Recovery Resources Section */}
      <section className="py-20 px-4 bg-stone-100 border-y border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-stone-800 mb-8">
            Recovery Resources
          </h2>
          <p className="text-lg text-stone-600 mb-8">
            Stuck, broke down, or need a tow? The off-road community has your back. 
            These community members are here to help. Reach out directly to coordinate 
            assistance and discuss details.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
              <div className="text-3xl mb-4">🚛</div>
              <h3 className="font-bold text-stone-800 mb-2">Tow Service</h3>
              <p className="text-sm text-stone-600">Local operators familiar with trail access and recovery points.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
              <div className="text-3xl mb-4">🔧</div>
              <h3 className="font-bold text-stone-800 mb-2">Trail Mechanics</h3>
              <p className="text-sm text-stone-600">Experienced wrenchers who can get you rolling again.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="font-bold text-stone-800 mb-2">Volunteer Recovery</h3>
              <p className="text-sm text-stone-600">Community members ready to help pull you out. Reach out and coordinate.</p>
            </div>
          </div>
          <p className="mt-8 text-sm text-stone-500">
            List curated by the community. Always confirm availability before heading out.
          </p>
        </div>
      </section>

      {/* Submission Hub Section */}
      <section className="py-20 px-4 bg-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-stone-800 mb-8">
            Submit a Recovery Resource
          </h2>
          <p className="text-lg text-stone-600 mb-8">
            Know a reliable tow operator, mechanic, or volunteer? Help the community by submitting their info.
          </p>
          <SubmissionHub />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4">© 2026 SoCal Off-Roaders. Built for the community.</p>
          <div className="flex justify-center gap-6">
            <a href="https://instagram.com/socaloffroaders" target="_blank" rel="noopener" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">Discord</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}