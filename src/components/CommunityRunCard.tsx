import Link from 'next/link';

interface CommunityRunCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
  organizerHandle: string;
  difficulty: 'Beginner' | 'Beginner-Friendly' | 'Intermediate' | 'Advanced' | 'Expert';
  spotsAvailable?: number;
  maxSpots?: number;
}

/**
 * CommunityRunCard - Displays an upcoming off-road community run
 * 
 * Features:
 * - Links directly to organizer's Instagram for joining
 * - Shows difficulty level, date, location
 * - Displays available spots
 */
export function CommunityRunCard({
  title,
  date,
  location,
  description,
  organizerHandle,
  difficulty,
  spotsAvailable,
  maxSpots,
}: CommunityRunCardProps) {
  // Format date for display
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
  
  // Difficulty color mapping
  const difficultyColors: Record<string, string> = {
    'Beginner': 'bg-green-100 text-green-800 border-green-200',
    'Beginner-Friendly': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Intermediate': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Advanced': 'bg-orange-100 text-orange-800 border-orange-200',
    'Expert': 'bg-red-100 text-red-800 border-red-200',
  };

  const difficultyStyle = difficultyColors[difficulty] || difficultyColors['Intermediate'];
  
  // Construct Instagram URL
  const instagramUrl = `https://instagram.com/${organizerHandle}`;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Card Header with Difficulty Badge */}
      <div className="relative">
        <div className="bg-gradient-to-br from-stone-700 to-stone-900 h-32 flex items-center justify-center">
          <span className="text-4xl">🏜️</span>
        </div>
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border ${difficultyStyle}`}>
          {difficulty}
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-stone-800 mb-2">{title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-stone-600">
            <span className="mr-2">📅</span>
            <span className="text-sm">{formattedDate}</span>
          </div>
          <div className="flex items-center text-stone-600">
            <span className="mr-2">📍</span>
            <span className="text-sm">{location}</span>
          </div>
        </div>
        
        <p className="text-stone-600 text-sm mb-6">{description}</p>
        
        {/* Spots Available */}
        {spotsAvailable !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-stone-600">Spots available</span>
              <span className="font-semibold text-stone-800">
                {spotsAvailable} {maxSpots ? `/ ${maxSpots}` : ''}
              </span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${maxSpots ? (spotsAvailable / maxSpots) * 100 : 50}%` }}
              />
            </div>
          </div>
        )}
        
        {/* Join Run Button - Links to Instagram DMs */}
        <Link
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-bold py-3 rounded-lg transition duration-200"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Join Run on Instagram
          </span>
        </Link>
        
        <p className="text-center text-xs text-stone-500 mt-3">
          DM @{organizerHandle} to coordinate
        </p>
      </div>
    </div>
  );
}