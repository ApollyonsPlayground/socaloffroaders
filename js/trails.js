// Trails Page JavaScript

// Utility function for formatting dates (needed for events)
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Nature images for trail types
const trailTypeImages = {
    'desert': 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',
    'mountain': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    'canyon': 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',
    'rock': 'https://images.unsplash.com/photo-1542662565-7e4b66b529d4?w=800&q=80'
};

// Get image for trail
function getTrailImage(trail) {
    // If trail has a specific image property, use it
    if (trail.image && trail.image !== 'default.jpg') {
        // For now, use type-based images since we don't have actual trail photos
        return trailTypeImages[trail.type] || trailTypeImages['desert'];
    }
    return trailTypeImages[trail.type] || trailTypeImages['desert'];
}
function getOnxUrl(trail) {
    // If trail has onxSlug, use the public trail page
    if (trail.onxSlug) {
        return `https://www.onxmaps.com/offroad/trails/us/california/${trail.onxSlug}`;
    }
    // Otherwise, fall back to coordinate view
    return `https://webmap.onxmaps.com/offroad/map#14/${trail.coordinates.lat.toFixed(6)}/${trail.coordinates.lng.toFixed(6)}`;
}

// Get ONX button label based on trail data
function getOnxLabel(trail) {
    return trail.onxSlug ? "View on ONX" : "View Area in ONX";
}

document.addEventListener('DOMContentLoaded', function() {
    initTrailsPage();
    initFilters();
    initModal();
    checkUrlParams();
});

// Current filter state
let currentFilters = {
    difficulty: '',
    type: '',
    county: '',
    sort: 'rating'
};

// Initialize trails page
function initTrailsPage() {
    renderTrails(trailsDB);
    updateTrailCount(trailsDB.length);
}

// Render trails grid
function renderTrails(trails) {
    const container = document.getElementById('trailsGrid');
    
    if (trails.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>No trails found</h3>
                <p>Try adjusting your filters to see more results.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = trails.map(trail => createTrailCard(trail)).join('');
    
    // Add click handlers
    document.querySelectorAll('.trail-card-extended').forEach(card => {
        card.addEventListener('click', function() {
            const trailId = parseInt(this.dataset.trailId);
            openTrailModal(trailId);
        });
    });
}

// Create trail card HTML
function createTrailCard(trail) {
    const difficultyLabel = trail.difficulty.charAt(0).toUpperCase() + trail.difficulty.slice(1);
    const typeLabel = trail.type.charAt(0).toUpperCase() + trail.type.slice(1);
    const trailImage = getTrailImage(trail);
    
    return `
        <div class="trail-card-extended" data-trail-id="${trail.id}">
            <div class="trail-image-wrap" style="background-image: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('${trailImage}'); background-size: cover; background-position: center; height: 200px; position: relative; border-radius: 8px 8px 0 0;">
                <div class="trail-badges" style="position: absolute; top: 1rem; left: 1rem; display: flex; gap: 0.5rem;">
                    <span class="badge badge-${trail.difficulty}" style="background: ${getDifficultyColor(trail.difficulty)}; color: #0a0a0a; padding: 0.25rem 0.75rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px;">${difficultyLabel}</span>
                    <span class="badge badge-type" style="background: rgba(255,255,255,0.9); color: #0a0a0a; padding: 0.25rem 0.75rem; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px;">${typeLabel}</span>
                </div>
                <div class="trail-quick-stats" style="position: absolute; bottom: 1rem; left: 1rem; right: 1rem; display: flex; gap: 1rem; color: white; font-size: 0.875rem; text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">
                    <span>📏 ${trail.distance}</span>
                    <span>⏱️ ${trail.duration}</span>
                </div>
            </div>
            <div class="trail-content" style="padding: 1.5rem; background: #1a1a1a; border-radius: 0 0 8px 8px;">
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--ap-gold);">${trail.name}</h3>
                <div class="trail-location" style="color: var(--ap-light-gray); font-size: 0.875rem; margin-bottom: 0.75rem;">
                    📍 ${trail.location} • ${trail.county}
                </div>
                <p class="trail-description" style="color: #888; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">${trail.description.substring(0, 140)}...</p>
                
                <div class="trail-footer-bar" style="display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid #2d2d2d;">
                    <div class="trail-rating" style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="color: var(--ap-gold); font-weight: 700;">${trail.rating} ★</span>
                        <span style="color: #666; font-size: 0.875rem;">(${trail.reviews})</span>
                    </div>
                    <button class="view-trail-btn" style="background: var(--ap-gold); color: #0a0a0a; border: none; padding: 0.5rem 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 0.75rem; cursor: pointer; border-radius: 4px; transition: all 0.3s;">View Details</button>
                </div>
            </div>
        </div>
    `;
}

// Get difficulty color
function getDifficultyColor(difficulty) {
    const colors = {
        'beginner': '#4caf50',
        'moderate': '#ff9800',
        'advanced': '#f44336',
        'extreme': '#9c27b0'
    };
    return colors[difficulty] || '#c9a227';
}

// Initialize filters
function initFilters() {
    const difficultyFilter = document.getElementById('difficultyFilter');
    const typeFilter = document.getElementById('typeFilter');
    const countyFilter = document.getElementById('countyFilter');
    const sortBy = document.getElementById('sortBy');
    const resetBtn = document.getElementById('resetFilters');
    
    difficultyFilter.addEventListener('change', function() {
        currentFilters.difficulty = this.value;
        applyFilters();
    });
    
    typeFilter.addEventListener('change', function() {
        currentFilters.type = this.value;
        applyFilters();
    });
    
    countyFilter.addEventListener('change', function() {
        currentFilters.county = this.value;
        applyFilters();
    });
    
    sortBy.addEventListener('change', function() {
        currentFilters.sort = this.value;
        applyFilters();
    });
    
    resetBtn.addEventListener('click', function() {
        difficultyFilter.value = '';
        typeFilter.value = '';
        countyFilter.value = '';
        sortBy.value = 'rating';
        currentFilters = { difficulty: '', type: '', county: '', sort: 'rating' };
        applyFilters();
    });
}

// Apply filters and sort
function applyFilters() {
    let filtered = trailsDB.filter(trail => {
        if (currentFilters.difficulty && trail.difficulty !== currentFilters.difficulty) return false;
        if (currentFilters.type && trail.type !== currentFilters.type) return false;
        if (currentFilters.county && trail.county !== currentFilters.county) return false;
        return true;
    });
    
    // Sort
    filtered.sort((a, b) => {
        switch(currentFilters.sort) {
            case 'rating':
                return b.rating - a.rating;
            case 'difficulty':
                const diffOrder = { beginner: 1, moderate: 2, advanced: 3, extreme: 4 };
                return diffOrder[a.difficulty] - diffOrder[b.difficulty];
            case 'name':
                return a.name.localeCompare(b.name);
            case 'county':
                return a.county.localeCompare(b.county);
            default:
                return 0;
        }
    });
    
    renderTrails(filtered);
    updateTrailCount(filtered.length);
}

// Update trail count display
function updateTrailCount(count) {
    document.getElementById('trailCount').textContent = count;
}

// Check URL parameters for direct filtering
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const difficulty = urlParams.get('difficulty');
    const type = urlParams.get('type');
    const id = urlParams.get('id');
    
    if (difficulty) {
        document.getElementById('difficultyFilter').value = difficulty;
        currentFilters.difficulty = difficulty;
        applyFilters();
    }
    
    if (type) {
        document.getElementById('typeFilter').value = type;
        currentFilters.type = type;
        applyFilters();
    }
    
    if (id) {
        openTrailModal(parseInt(id));
    }
}

// Modal Functions
function initModal() {
    const modal = document.getElementById('trailModal');
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', closeTrailModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeTrailModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeTrailModal();
        }
    });
}

function openTrailModal(trailId) {
    const trail = getTrailById(trailId);
    if (!trail) return;
    
    const modal = document.getElementById('trailModal');
    const content = document.getElementById('trailDetailContent');
    
    content.innerHTML = createTrailDetailHTML(trail);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTrailModal() {
    const modal = document.getElementById('trailModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Create detailed trail HTML
function createTrailDetailHTML(trail) {
    const difficultyLabel = trail.difficulty.charAt(0).toUpperCase() + trail.difficulty.slice(1);
    const typeLabel = trail.type.charAt(0).toUpperCase() + trail.type.slice(1);
    
    // Get related events
    const relatedEvents = getEventsByTrail(trail.id);
    const eventsHTML = relatedEvents.length > 0 
        ? relatedEvents.map(e => `<li><strong>${formatDate(e.date)}:</strong> ${e.title}</li>`).join('')
        : '<li>No upcoming events scheduled</li>';
    
    const onxUrl = getOnxUrl(trail);
    const onxLabel = getOnxLabel(trail);
    const onxNote = trail.onxSlug ? '' : '<p class="small-note" style="font-size: 0.85rem; color: #888; margin-top: 0.25rem;">Coordinates approximate. Trail may not be exact.</p>';
    
    return `
        <div class="trail-detail-header">
            <div class="trail-detail-overlay">
                <span class="badge badge-${trail.difficulty}">${difficultyLabel}</span>
                <h2>${trail.name}</h2>
                <p>📍 ${trail.location}, ${trail.county} County</p>
            </div>
        </div>
        
        
        
        <div class="trail-detail-body">
            <div class="trail-stats-grid">
                <div class="stat-box">
                    <span class="label">Distance</span>
                    <span class="value">${trail.distance}</span>
                </div>
                <div class="stat-box">
                    <span class="label">Duration</span>
                    <span class="value">${trail.duration}</span>
                </div>
                <div class="stat-box">
                    <span class="label">Type</span>
                    <span class="value">${typeLabel}</span>
                </div>
            </div>
            
            <div class="trail-detail-section">
                <h3>About This Trail</h3>
                <p>${trail.description}</p>
            </div>
            
            <div class="trail-detail-section">
                <h3>Camping Information</h3>
                <p>${trail.camping ? trail.campingInfo : 'No camping available on this trail. Nearby lodging options available.'}</p>
            </div>
            
            <div class="trail-detail-section">
                <h3>Upcoming Trail Runs</h3>
                <ul>${eventsHTML}</ul>
            </div>
            
            <div class="trail-detail-section">
                <h3>Coordinates</h3>
                <p>Lat: ${trail.coordinates.lat.toFixed(6)}, Lng: ${trail.coordinates.lng.toFixed(6)}</p>
                ${onxNote}
            </div>
            
            <div class="trail-actions">
                <a href="${onxUrl}" 
                   target="_blank" class="action-btn primary">
                    <span>🗺️</span> ${onxLabel}
                </a>
                <a href="https://www.google.com/maps/search/?api=1&query=${trail.coordinates.lat},${trail.coordinates.lng}" 
                   target="_blank" class="action-btn secondary">
                    <span>📍</span> Google Maps
                </a>
                <a href="events.html?trail=${trail.id}" class="action-btn outline">
                    <span>📅</span> View Events
                </a>
            </div>
        </div>
    `;
}