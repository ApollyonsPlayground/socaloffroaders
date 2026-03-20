// So Cal Off-Roaders - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initDisclaimer();
    initNavigation();
    initFeaturedTrails();
    initUpcomingEvents();
    initFilters();
    initSmoothScroll();
});

// Legal Disclaimer Modal
function initDisclaimer() {
    const modal = document.getElementById('disclaimerModal');
    const checkbox = document.getElementById('acceptDisclaimer');
    const enterBtn = document.getElementById('enterSiteBtn');
    
    // Check if user has already accepted
    if (localStorage.getItem('disclaimerAccepted') === 'true') {
        modal.classList.add('hidden');
        return;
    }
    
    // Handle checkbox
    checkbox.addEventListener('change', function() {
        enterBtn.disabled = !this.checked;
    });
    
    // Handle enter button
    enterBtn.addEventListener('click', function() {
        if (checkbox.checked) {
            localStorage.setItem('disclaimerAccepted', 'true');
            modal.classList.add('hidden');
        }
    });
}

// Mobile Navigation
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Load Featured Trails
function initFeaturedTrails() {
    const container = document.getElementById('featuredTrails');
    if (!container) return;
    
    const featured = getFeaturedTrails();
    
    container.innerHTML = featured.map(trail => createTrailCard(trail)).join('');
}

// Create Trail Card HTML
function createTrailCard(trail) {
    const difficultyClass = `badge-${trail.difficulty}`;
    const difficultyLabel = trail.difficulty.charAt(0).toUpperCase() + trail.difficulty.slice(1);
    
    // Get gradient based on trail type
    const typeGradients = {
        'desert': 'linear-gradient(135deg, #d4854a, #c9a227)',
        'mountain': 'linear-gradient(135deg, #4a6b8a, #2d5a3d)',
        'canyon': 'linear-gradient(135deg, #8b7355, #3d2f1f)',
        'rock': 'linear-gradient(135deg, #3d3d3d, #1a1a1a)'
    };
    const gradient = typeGradients[trail.type] || 'linear-gradient(135deg, #2d5a3d, #4a7c59)';
    
    // Get emoji for trail type
    const typeEmojis = {
        'desert': '🏜️',
        'mountain': '🏔️',
        'canyon': '🏞️',
        'rock': '🪨'
    };
    const typeEmoji = typeEmojis[trail.type] || '🗺️';
    
    return `
        <a href="trails.html?id=${trail.id}" class="trail-card">
            <div class="trail-image" style="background: ${gradient};">
                <span class="trail-badge ${difficultyClass}">${difficultyLabel}</span>
                <div class="trail-type-emoji" style="position: absolute; bottom: 1rem; right: 1rem; font-size: 2rem; opacity: 0.8;">${typeEmoji}</div>
            </div>
            <div class="trail-info">
                <h3>${trail.name}</h3>
                <div class="trail-meta">
                    <span>📍 ${trail.location}</span>
                    <span>${typeEmoji} ${trail.type}</span>
                    <span>📏 ${trail.distance}</span>
                </div>
                <p class="trail-description">${trail.description.substring(0, 100)}...</p>
                <div class="trail-footer">
                    <div class="rating">
                        ${generateStars(trail.rating)}
                    </div>
                    <span>${trail.reviews} reviews</span>
                </div>
            </div>
        </a>
    `;
}

// Generate Star Rating HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<span class="star">★</span>';
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            stars += '<span class="star">½</span>';
        } else {
            stars += '<span class="star empty">★</span>';
        }
    }
    return stars;
}

// Load Upcoming Events
function initUpcomingEvents() {
    const container = document.getElementById('upcomingEvents');
    if (!container) return;
    
    const events = getUpcomingEvents(3);
    
    if (events.length === 0) {
        container.innerHTML = '<p class="text-center">No upcoming events. Check back soon!</p>';
        return;
    }
    
    container.innerHTML = events.map(event => createEventCard(event)).join('');
}

// Create Event Card HTML
function createEventCard(event) {
    const difficultyClass = `badge-${event.difficulty}`;
    const difficultyLabel = event.difficulty.charAt(0).toUpperCase() + event.difficulty.slice(1);
    
    return `
        <div class="event-card">
            <div class="event-date">
                <span class="month">${getMonthAbbr(event.date)}</span>
                <span class="day">${getDayNumber(event.date)}</span>
            </div>
            <div class="event-info">
                <h4>${event.title}</h4>
                <p>📍 ${event.trail} • ${event.time}</p>
            </div>
            <span class="event-difficulty ${difficultyClass}">${difficultyLabel}</span>
        </div>
    `;
}

// Initialize Filter Buttons
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const typeBtns = document.querySelectorAll('.type-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            window.location.href = `trails.html?difficulty=${filter}`;
        });
    });
    
    typeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            typeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const type = this.dataset.type;
            window.location.href = `trails.html?type=${type}`;
        });
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}



// Helper: Get URL Parameters
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Helper: Format Date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Helper: Scroll to Element
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Helper: Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Helper: Throttle Function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Animation on Scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements with animation class
document.querySelectorAll('.trail-card, .event-card, .stat-item').forEach(el => {
    observer.observe(el);
});

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .trail-card, .event-card, .stat-item {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Console Welcome Message
console.log('%c🏔️ So Cal Off-Roaders', 'font-size: 24px; font-weight: bold; color: #2d4a3e;');
console.log('%cExplore 30+ trails across Southern California', 'font-size: 14px; color: #6b6b6b;');
console.log('%cBuilt for the off-roading community 🚙', 'font-size: 12px; color: #d4854a;');