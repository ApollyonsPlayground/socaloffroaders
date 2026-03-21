'use client';

import { useState } from 'react';
import { Send, MapPin, Calendar, FileText, CheckCircle, Loader2 } from 'lucide-react';

export default function SubmissionHub() {
  const [activeTab, setActiveTab] = useState<'run' | 'trail'>('run');
  const [runForm, setRunForm] = useState({
    title: '',
    date: '',
    meetupPoint: '',
    description: '',
    difficulty: 'Beginner',
    maxRigs: '10',
    userContact: ''
  });
  const [trailForm, setTrailForm] = useState({
    onxSlug: '',
    notes: '',
    userContact: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRunSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'run',
          content_payload: {
            title: runForm.title,
            date: runForm.date,
            meetupPoint: runForm.meetupPoint,
            description: runForm.description,
            difficulty: runForm.difficulty,
            maxRigs: parseInt(runForm.maxRigs)
          },
          user_contact: runForm.userContact || null
        })
      });

      const data = await response.json();

      if (response.ok) {
        setToastMessage(data.message || 'Submission received - Our team will verify and post shortly.');
        setRunForm({
          title: '',
          date: '',
          meetupPoint: '',
          description: '',
          difficulty: 'Beginner',
          maxRigs: '10',
          userContact: ''
        });
      } else {
        setToastMessage(data.error || 'Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setToastMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  const handleTrailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'trail',
          content_payload: {
            onxSlug: trailForm.onxSlug,
            notes: trailForm.notes
          },
          user_contact: trailForm.userContact || null
        })
      });

      const data = await response.json();

      if (response.ok) {
        setToastMessage(data.message || 'Submission received - Our team will verify and post shortly.');
        setTrailForm({ onxSlug: '', notes: '', userContact: '' });
      } else {
        setToastMessage(data.error || 'Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setToastMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  return (
    <div className="bg-stone-900/50 backdrop-blur-sm rounded-2xl border border-stone-700 overflow-hidden">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckCircle size={20} />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-stone-700">
        <button
          onClick={() => setActiveTab('run')}
          className={`flex-1 py-4 px-6 text-sm font-semibold transition-colors ${
            activeTab === 'run'
              ? 'text-orange-400 border-b-2 border-orange-400 bg-stone-800/50'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Calendar size={18} />
            Submit a Run
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

      {/* Form Content */}
      <div className="p-6">
        {activeTab === 'run' ? (
          <form onSubmit={handleRunSubmit} className="space-y-4">
            <div>
              <label className="block text-stone-400 text-sm font-medium mb-2">
                Run Title *
              </label>
              <input
                type="text"
                required
                value={runForm.title}
                onChange={(e) => setRunForm({ ...runForm, title: e.target.value })}
                placeholder="e.g., Sunset Ridge Trail Run"
                className="w-full bg-stone-950 border border-stone-700 rounded-lg px-4 py-3 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-400 text-sm font-medium mb-2">
                  Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={runForm.date}
                  onChange={(e) => setRunForm({ ...runForm, date: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-stone-400 text-sm font-medium mb-2">
                  Difficulty *
                </label>
                <select
                  value={runForm.difficulty}
                  onChange={(e) => setRunForm({ ...runForm, difficulty: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-orange-500 transition-colors"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Extreme">Extreme</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-stone-400 text-sm font-medium mb-2">
                Meetup Point *
              </label>
              <input
                type="text"
                required
                value={runForm.meetupPoint}
                onChange={(e) => setRunForm({ ...runForm, meetupPoint: e.target.value })}
                placeholder="e.g., Cleghorn Trailhead Parking Lot"
                className="w-full bg-stone-950 border border-stone-700 rounded-lg px-4 py-3 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-stone-400 text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                required
                rows={3}
                value={runForm.description}
                onChange={(e) => setRunForm({ ...runForm, description: e.target.value })}
                placeholder="Tell us about the run, what to bring, trail conditions, etc."
                className="w-full bg-stone-950 border border-stone-700 rounded-lg px-4 py-3 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-orange-500 transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-400 text-sm font-medium mb-2">
                  Max Rigs *
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  required
                  value={runForm.maxRigs}
                  onChange={(e) => setRunForm({ ...runForm, maxRigs: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-stone-400 text-sm font-medium mb-2">
                  Your Contact (optional)
                </label>
                <input
                  type="text"
                  value={runForm.userContact}
                  onChange={(e) => setRunForm({ ...runForm, userContact: e.target.value })}
                  placeholder="Email or Instagram"
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg px-4 py-3 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 disabled:bg-stone-600 disabled:cursor-not-allowed text-stone-50 font-semibold rounded-lg transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Run
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleTrailSubmit} className="space-y-4">
            <div>
              <label className="block text-stone-400 text-sm font-medium mb-2">
                onX Offroad Trail Link or Slug *
              </label>
              <input
                type="text"
                required
                value={trailForm.onxSlug}
                onChange={(e) => setTrailForm({ ...trailForm, onxSlug: e.target.value })}
                placeholder="e.g., https://www.onxmaps.com/offroad/trails/us/california/trail-name"
                className="w-full bg-stone-950 border border-stone-700 rounded-lg px-4 py-3 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <p className="text-stone-500 text-xs mt-2">
                Paste the full onX URL or just the trail slug (e.g., "stockton-flats")
              </p>
            </div>

            <div>
              <label className="block text-stone-400 text-sm font-medium mb-2">
                Additional Notes
              </label>
              <textarea
                rows={4}
                value={trailForm.notes}
                onChange={(e) => setTrailForm({ ...trailForm, notes: e.target.value })}
                placeholder="Any details about the trail? Conditions, rig requirements, best time to visit?"
                className="w-full bg-stone-950 border border-stone-700 rounded-lg px-4 py-3 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-orange-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-stone-400 text-sm font-medium mb-2">
                Your Contact (optional)
              </label>
              <input
                type="text"
                value={trailForm.userContact}
                onChange={(e) => setTrailForm({ ...trailForm, userContact: e.target.value })}
                placeholder="Email or Instagram"
                className="w-full bg-stone-950 border border-stone-700 rounded-lg px-4 py-3 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 disabled:bg-stone-600 disabled:cursor-not-allowed text-stone-50 font-semibold rounded-lg transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <FileText size={18} />
                  Suggest Trail
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}