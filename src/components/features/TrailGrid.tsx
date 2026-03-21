// src/components/features/TrailGrid.tsx
import React from 'react';

// Placeholder for trail data structure
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

type TrailGridProps = {
  trails: Trail[];
};

export default function TrailGrid({ trails }: TrailGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trails.map((trail) => (
        <div key={trail.id} className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mb-2">{trail.name}</h2>
            <p className="text-sm text-gray-600 mb-1">📍 {trail.location}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {trail.tags.map((tag) => (
                <span key={tag} className="badge badge-outline badge-sm">{tag}</span>
              ))}
            </div>
            <p className="text-sm text-gray-700 mb-4">{trail.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm">View</button>
              <button className="btn btn-secondary btn-sm">Map</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
