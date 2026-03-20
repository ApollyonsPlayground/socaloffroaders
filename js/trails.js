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
    
    return `
        <div class="trail-card-extended" data-trail-id="${trail.id}">
            <div class="trail-image-wrap">
                <div class="trail-badges">
                    <span class="badge badge-${trail.difficulty}">${difficultyLabel}</span>
                    <span class="badge badge-type">${typeLabel}</span>
                </div>
                <div class="trail-quick-stats">
                    <span>📏 ${trail.distance}</span>
                    <span>⏱️ ${trail.duration}</span>
                    <span>📍 ${trail.county}</span>
                </div>
            </div>
            <div class="trail-content">
                <h3>${trail.name}</h3>
                <div class="trail-location">
                    <span>📍</span> ${trail.location}
                </div>
                <p class="trail-description">${trail.description.substring(0, 120)}...</p>
                <div class="trail-footer-bar">
                    <div class="trail-rating">
                        <span class="stars">${'★'.repeat(Math.floor(trail.rating))}${trail.rating % 1 >= 0.5 ? '½' : ''}</span>
                        <span>${trail.rating} (${trail.reviews})</span>
                    </div>
                    <button class="view-trail-btn">View Details</button>
                </div>
            </div>
        </div>
    `;
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
                <div class="stat-box">
                    <span class="label">Rating</span>
                    <span class="value">${trail.rating} ⭐</span>
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
                <p>Lat: ${trail.coordinates.lat}, Lng: ${trail.coordinates.lng}</p>
            </div>
            
            <div class="trail-actions">
                <a href="https://webmap.onxmaps.com/offroad/map#12/${trail.coordinates.lat}/${trail.coordinates.lng}" 
                   target="_blank" class="action-btn primary">
                    <span>🗺️</span> Open in ONX
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