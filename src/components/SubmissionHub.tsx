'use client';

import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function SubmissionHub() {
  const [activeTab, setActiveTab] = useState<'events' | 'trail'>('events');

  return (
    <div className="bg-stone-900/50 backdrop-blur-sm rounded-2xl border border-stone-700 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-stone-700">
        <button
          onClick={() => setActiveTab('events')}
          className={`flex-1 py-4 px-6 text-sm font-semibold transition-colors ${
            activeTab === 'events'
              ? 'text-orange-400 border-b-2 border-orange-400 bg-stone-800/50'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Calendar size={18} />
            Host a Run
          </div>
        </button>
        <button
          onClick={() => setActiveTab('trail')}
          className={`flex-1 py-4 px-6 text-sm font-semibold transition-colors ${
            activeTab === 'trail'
              ? 'text-orange-400 border-b-2 border-orange-400 bg-stone-800/50'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <MapPin size={18} />
            Suggest a Trail
          </div>
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'events' ? (
          <div className="space-y-4">
            <p className="text-stone-400 text-sm mb-4">
              Want to host your own trail run? Submit your event on Luma and we'll help promote it to the community.
            </p>
            <a
              href="https://lu.ma/socaloffroaders/propose"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-stone-50 font-semibold rounded-lg transition-all shadow-lg shadow-orange-600/20"
            >
              <ExternalLink size={18} />
              Submit Event on Luma
            </a>
            <p className="text-stone-500 text-xs text-center mt-2">
              You'll be redirected to our Luma submission page
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-stone-400 text-sm mb-4">
              Know a great trail that should be on our list? Send us the details.
            </p>
            <a
              href="mailto:trails@socaloffroaders.org?subject=Trail%20Suggestion"
              className="block w-full py-3 px-4 bg-stone-700 hover:bg-stone-600 text-stone-50 font-semibold rounded-lg transition-all text-center"
            >
              Suggest a Trail via Email
            </a>
            <p className="text-stone-500 text-xs text-center mt-2">
              Include the trail name, location, and difficulty level
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
