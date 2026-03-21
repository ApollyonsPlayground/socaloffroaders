"use client";

import { useState } from 'react';

interface Trail {
  id: string;
  name: string;
  location: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Extreme';
  distance: string;
  imageUrl?: string;
  description?: string;
}

interface TrailCardProps {
  trail: Trail;
  onSelect?: (trail: Trail) => void;
}

/**
 * TrailCard - Displays a trail listing with interactive features
 * 
 * Features:
 * - Expandable details
 * - Select for trip planning
 * - Difficulty badge
 */
export function TrailCard({ trail, onSelect }: TrailCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const difficultyColors: Record<string, string> = {
    'Easy': 'bg-green-100 text-green-800 border-green-200',
    'Moderate': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Hard': 'bg-orange-100 text-orange-800 border-orange-200',
    'Extreme': 'bg-red-100 text-red-800 border-red-200',
  };

  const difficultyStyle = difficultyColors[trail.difficulty] || difficultyColors['Moderate'];

  return (
    <div 
      className={`bg-white rounded-2xl shadow-md border border-stone-200 overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-xl scale-[1.02]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Trail Image */}
      <div className="relative h-48 bg-gradient-to-br from-stone-600 to-stone-800">
        {trail.imageUrl ? (
          <img 
            src={trail.imageUrl} 
            alt={trail.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🏔️
          </div>
        )}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border ${difficultyStyle}`}>
          {trail.difficulty}
        </div>
      </div>

      {/* Trail Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-stone-800 mb-2">{trail.name}</h3>
        
        <div className="flex items-center text-stone-600 mb-4">
          <span className="mr-2">📍</span>
          <span className="text-sm">{trail.location}</span>
          <span className="mx-2 text-stone-300">|</span>
          <span className="text-sm">{trail.distance}</span>
        </div>

        {/* Expandable Description */}
        {isExpanded && trail.description && (
          <p className="text-stone-600 text-sm mb-4 animate-in fade-in duration-200">
            {trail.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium py-2 rounded-lg transition duration-200"
          >
            {isExpanded ? 'Show Less' : 'Details'}
          </button>
          
          {onSelect && (
            <button
              onClick={() => onSelect(trail)}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 rounded-lg transition duration-200"
            >
              Plan Trip
            </button>
          )}
        </div>
      </div>
    </div>
  );
}