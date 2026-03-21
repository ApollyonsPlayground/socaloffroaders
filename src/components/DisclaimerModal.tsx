'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('socalDisclaimerAccepted');
    if (!hasAccepted) {
      setIsOpen(true);
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
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[100] bg-stone-950/90 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Modal Container */}
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

          {/* Main Content Area */}
          <div className="p-6 space-y-4">
            <p className="text-stone-300 leading-relaxed">
              By entering, you acknowledge that <strong className="text-stone-100">off-roading is dangerous</strong>. SoCal Off-Roaders is a community platform, not a tour operator.
            </p>
            
            <div className="bg-red-900/10 border border-red-900/30 rounded-lg p-4">
              <p className="text-stone-300 text-sm font-medium mb-2 uppercase tracking-wide text-red-400">Owner Liability Waiver:</p>
              <p className="text-stone-400 text-sm leading-relaxed">
                The website owner is <strong className="text-stone-200">not responsible</strong> for cancelling/rescheduling runs or notifying participants of condition changes. Responsibility for communication and safety lies <strong className="text-stone-200">solely with the individual Run Organizer</strong>.
              </p>
            </div>

            <p className="text-stone-300 leading-relaxed">
              <strong className="text-stone-100">You assume all risk</strong> and hold SoCal Off-Roaders harmless from any liability for injury, death, or property damage.
            </p>
            
            <p className="text-stone-500 text-xs italic">
              Always verify trail closures with USFS/BLM before travel.
            </p>
          </div>

          {/* Actions / Button Area */}
          <div className="border-t border-stone-800 px-6 py-4 rounded-b-2xl flex justify-end">
            <button
              onClick={handleAccept}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-stone-50 font-bold rounded-xl transition-all shadow-lg shadow-red-900/20 uppercase tracking-widest"
            >
              I Accept & Enter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
