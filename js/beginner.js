// Beginner Guide JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initGearTabs();
    initNavigation();
});

// Gear checklists by difficulty
const gearChecklists = {
    beginner: {
        title: 'Beginner Trail Gear',
        description: 'Essential items for easy, well-maintained trails',
        items: [
            { name: 'Water (1 gallon per person)', essential: true },
            { name: 'Spare tire & jack', essential: true },
            { name: 'Tire pressure gauge', essential: true },
            { name: 'Basic tool kit', essential: true },
            { name: 'First aid kit', essential: true },
            { name: 'Snacks/food', essential: true },
            { name: 'Cell phone + charger', essential: true },
            { name: 'Flashlight/headlamp', essential: false },
            { name: 'Tow strap (rated)', essential: false },
            { name: 'Shovel', essential: false },
            { name: 'Fire extinguisher', essential: false },
            { name: 'Sunscreen & hat', essential: false }
        ]
    },
    moderate: {
        title: 'Moderate Trail Gear',
        description: 'Additional gear for more challenging terrain',
        items: [
            { name: 'Water (2+ gallons per person)', essential: true },
            { name: 'Spare tire & jack', essential: true },
            { name: 'Tire repair kit', essential: true },
            { name: 'Air compressor', essential: true },
            { name: 'Tow strap + shackles', essential: true },
            { name: 'Recovery boards', essential: true },
            { name: 'Basic tool kit', essential: true },
            { name: 'First aid kit', essential: true },
            { name: 'Fire extinguisher', essential: true },
            { name: 'Shovel', essential: true },
            { name: 'Ham/CB radio', essential: false },
            { name: 'GPS/Offline maps', essential: false },
            { name: 'Extra fuel (if needed)', essential: false },
            { name: 'Emergency blanket', essential: false }
        ]
    },
    advanced: {
        title: 'Advanced Trail Gear',
        description: 'Full recovery setup for technical trails',
        items: [
            { name: 'Water (3+ gallons per person)', essential: true },
            { name: 'Two spare tires or repair kit', essential: true },
            { name: 'Air compressor (high CFM)', essential: true },
            { name: 'Recovery straps (2)', essential: true },
            { name: 'D-rings/shackles (4)', essential: true },
            { name: 'Winch or come-along', essential: true },
            { name: 'Recovery boards (2)', essential: true },
            { name: 'Hi-Lift jack + base', essential: true },
            { name: 'Complete tool set', essential: true },
            { name: 'Advanced first aid kit', essential: true },
            { name: 'Fire extinguisher', essential: true },
            { name: 'Ham radio', essential: true },
            { name: 'GPS/Satellite communicator', essential: true },
            { name: 'Spare fluids (oil, coolant)', essential: true },
            { name: 'Spare CV axles/U-joints', essential: false },
            { name: 'Tree saver strap', essential: false }
        ]
    },
    extreme: {
        title: 'Extreme Trail Gear',
        description: 'Professional-grade recovery for rock crawling and extreme terrain',
        items: [
            { name: 'Water (5+ gallons)', essential: true },
            { name: 'Multiple spare tires', essential: true },
            { name: 'Onboard air or high-output compressor', essential: true },
            { name: 'Winch (rated 1.5x vehicle weight)', essential: true },
            { name: 'Synthetic winch line', essential: true },
            { name: 'Snatch block (pulley)', essential: true },
            { name: 'Recovery straps (3+)', essential: true },
            { name: 'D-rings/shackles (6+)', essential: true },
            { name: 'Recovery boards (2-4)', essential: true },
            { name: 'Hi-Lift jack + accessories', essential: true },
            { name: 'Spotter/guide', essential: true },
            { name: 'Ham radio + spare battery', essential: true },
            { name: 'Satellite communicator', essential: true },
            { name: 'Welder or trail repair kit', essential: true },
            { name: 'Spare axles/driveshafts', essential: true },
            { name: 'Hydraulic jack', essential: false },
            { name: 'Oxygen/acetylene torch', essential: false },
            { name: 'Extraction equipment', essential: false }
        ]
    }
};

function initGearTabs() {
    const tabs = document.querySelectorAll('.gear-tab');
    const content = document.getElementById('gearContent');
    
    // Load beginner gear by default
    loadGearContent('beginner');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
            
            const difficulty = this.dataset.difficulty;
            loadGearContent(difficulty);
        });
    });
}

function loadGearContent(difficulty) {
    const content = document.getElementById('gearContent');
    const data = gearChecklists[difficulty];
    
    if (!data) return;
    
    const essentialItems = data.items.filter(i => i.essential);
    const optionalItems = data.items.filter(i => !i.essential);
    
    content.innerHTML = `
        <h3>${data.title}</h3>
        <p class="gear-description">${data.description}</p>
        
        <div class="gear-section">
            <h4>Essential Items</h4>
            <div class="gear-list">
                ${essentialItems.map(item => `
                    <div class="gear-item">
                        <span class="essential">★</span>
                        <span>${item.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        ${optionalItems.length > 0 ? `
            <div class="gear-section">
                <h4>Recommended</h4>
                <div class="gear-list">
                    ${optionalItems.map(item => `
                        <div class="gear-item">
                            <span>○</span>
                            <span>${item.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;
}

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