'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const hasAccepted = localStorage.getItem('socalDisclaimerAccepted');
    if (!hasAccepted) {
      setIsOpen(true);
      // Small delay for animation
      setTimeout(() => setIsVisible(true), 10);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('socalDisclaimerAccepted', 'true');
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div 
        className={`fixed inset-0 z-[100] bg-stone-950/90 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div 
          className={`bg-stone-900 border border-red-700/50 rounded-2xl max-w-2xl w-full shadow-2xl shadow-red-900/20 transition-all duration-300 ${
            isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          }`}
        >
          {/* Header */}
          <div className="bg-red-900/20 border-b border-red-700/30 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <AlertTriangle size={24} className="text-red-400" />
              <h2 className="text-xl font-bold text-stone-50">OFF-ROAD ADVISORY</h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <p className="text-stone-300 leading-relaxed">
              By entering, you acknowledge that <strong className="text-stone-100">off-roading is dangerous</strong>. 
              SoCal Off-Roaders provides data for informational purposes only. 
            </p>

            <p className="text-stone-300 leading-relaxed">
              <strong className="text-stone-100">You assume all risk</strong> and agree to hold organizers 
              harmless from any liability for injury, death, or property damage.
            </p>

            <div className="bg-stone-800/50 border border-stone-700 rounded-lg p-4">
              <p className="text-stone-400 text-sm">
                <strong className="text-stone-200">Always verify trail closures</strong> with USFS/BLM 
                before travel. Conditions change. Weather happens. Be prepared.
              </p>
            </div>

            <p className="text-stone-500 text-xs">
              This agreement is stored locally and will not be shown again on this device.
            </p>
          </div>

          {/* Actions */}
          <div className="border-t border-stone-700 px-6 py-4 rounded-b-2xl flex justify-end">
            <button
              onClick={handleAccept}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-stone-50 font-semibold rounded-lg transition-all shadow-lg shadow-red-600/20"
            >
              I Accept & Enter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
