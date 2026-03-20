// Events Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initEventsList();
    initViewToggle();
    initCalendar();
    initModal();
    checkUrlParams();
});

// Current view and filter state
let currentView = 'list';
let difficultyFilter = '';

function initEventsList() {
    renderEventsList(eventsDB);
}

function renderEventsList(events) {
    const container = document.getElementById('eventsList');
    
    // Filter events
    let filtered = events;
    if (difficultyFilter) {
        filtered = events.filter(e => e.difficulty === difficultyFilter);
    }
    
    // Sort by date
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="no-events">
                <div class="no-events-icon">📅</div>
                <h3>No upcoming events</h3>
                <p>Check back soon or host your own trail run!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(event => createEventCard(event)).join('');
    
    // Add click handlers
    document.querySelectorAll('.event-card-full').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('join-btn')) {
                const eventId = parseInt(this.dataset.eventId);
                openEventModal(eventId);
            }
        });
    });
}

function createEventCard(event) {
    const trail = getTrailById(event.trailId);
    const difficultyLabel = event.difficulty.charAt(0).toUpperCase() + event.difficulty.slice(1);
    const spotsLeft = event.maxParticipants - event.participants;
    const spotsClass = spotsLeft <= 3 ? 'low' : '';
    
    return `
        <div class="event-card-full" data-event-id="${event.id}">
            <div class="event-card-header">
                <div class="event-date-box">
                    <span class="month">${getMonthAbbr(event.date)}</span>
                    <span class="day">${getDayNumber(event.date)}</span>
                    <span class="time">${event.time}</span>
                </div>
                <div class="event-main-info">
                    <span class="event-difficulty-badge badge-${event.difficulty}">${difficultyLabel}</span>
                    <h3>${event.title}</h3>
                    <div class="event-meta">
                        <span>📍 ${trail ? trail.name : event.trail}</span>
                        <span>👤 ${event.host}</span>
                    </div>
                </div>
            </div>
            <div class="event-card-body">
                <p class="event-description">${event.description}</p>
                <div class="event-requirements">
                    <h4>Requirements</h4>
                    <ul>
                        ${event.requirements.slice(0, 3).map(r => `<li>${r}</li>`).join('')}
                        ${event.requirements.length > 3 ? `<li>+ ${event.requirements.length - 3} more</li>` : ''}
                    </ul>
                </div>
                <div class="event-footer">
                    <span class="spots-available ${spotsClass}">${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} available</span>
                    <button class="join-btn" onclick="joinEvent(${event.id})">Join Run</button>
                </div>
            </div>
        </div>
    `;
}

function initViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const listView = document.getElementById('listView');
    const calendarView = document.getElementById('calendarView');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentView = this.dataset.view;
            
            if (currentView === 'list') {
                listView.style.display = 'block';
                calendarView.style.display = 'none';
            } else {
                listView.style.display = 'none';
                calendarView.style.display = 'block';
                renderCalendar();
            }
        });
    });
}

function initCalendar() {
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    
    let currentDate = new Date();
    
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });
    
    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });
    
    renderCalendar(currentDate);
}

function renderCalendar(date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    document.getElementById('currentMonth').textContent = 
        date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    let html = `
        <div class="calendar-day-header">Sun</div>
        <div class="calendar-day-header">Mon</div>
        <div class="calendar-day-header">Tue</div>
        <div class="calendar-day-header">Wed</div>
        <div class="calendar-day-header">Thu</div>
        <div class="calendar-day-header">Fri</div>
        <div class="calendar-day-header">Sat</div>
    `;
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        html += `<div class="calendar-day other-month"><span class="calendar-day-number">${daysInPrevMonth - i}</span></div>`;
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = eventsDB.filter(e => e.date === dateStr);
        
        let eventsHtml = dayEvents.map(e => 
            `<div class="calendar-event ${e.difficulty}" onclick="openEventModal(${e.id})">${e.title}</div>`
        ).join('');
        
        html += `
            <div class="calendar-day">
                <span class="calendar-day-number">${day}</span>
                ${eventsHtml}
            </div>
        `;
    }
    
    // Next month days
    const remainingCells = 42 - (firstDay + daysInMonth);
    for (let day = 1; day <= remainingCells; day++) {
        html += `<div class="calendar-day other-month"><span class="calendar-day-number">${day}</span></div>`;
    }
    
    document.getElementById('calendarGrid').innerHTML = html;
}

function initModal() {
    const modal = document.getElementById('eventModal');
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', closeEventModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeEventModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeEventModal(); });
}

function openEventModal(eventId) {
    const event = eventsDB.find(e => e.id === eventId);
    if (!event) return;
    
    const trail = getTrailById(event.trailId);
    const difficultyLabel = event.difficulty.charAt(0).toUpperCase() + event.difficulty.slice(1);
    const spotsLeft = event.maxParticipants - event.participants;
    
    document.getElementById('eventDetailContent').innerHTML = `
        <div class="event-detail-header">
            <span class="event-difficulty-badge badge-${event.difficulty}">${difficultyLabel}</span>
            <h2>${event.title}</h2>
            <p>📅 ${formatEventDate(event.date)} at ${event.time}</p>
            <p>📍 ${trail ? trail.name : event.trail}</p>
        </div>
        <div class="event-detail-body">
            <div class="event-detail-section">
                <h3>About This Run</h3>
                <p>${event.description}</p>
            </div>
            <div class="event-detail-section">
                <h3>Host</h3>
                <p>Led by ${event.host}</p>
            </div>
            <div class="event-detail-section">
                <h3>Meeting Point</h3>
                <p>${event.meetingPoint}</p>
            </div>
            <div class="event-detail-section">
                <h3>Requirements</h3>
                <ul>
                    ${event.requirements.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>
            <div class="event-detail-section">
                <h3>Availability</h3>
                <p>${spotsLeft} of ${event.maxParticipants} spots available (${event.participants} registered)</p>
            </div>
            <div class="event-actions">
                <button class="btn btn-primary" onclick="joinEvent(${event.id})">Join This Run</button>
                <a href="${trail ? 'trails.html?id=' + trail.id : '#'}" class="btn btn-outline">View Trail</a>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEventModal() {
    document.getElementById('eventModal').classList.remove('active');
    document.body.style.overflow = '';
}

function joinEvent(eventId) {
    alert('To join this run, please contact the host or check the Instagram @noah2131 for registration details.');
}

function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const trailId = urlParams.get('trail');
    
    if (trailId) {
        // Filter events for this trail
        const trailEvents = eventsDB.filter(e => e.trailId === parseInt(trailId));
        renderEventsList(trailEvents);
    }
}

// Difficulty filter
document.getElementById('difficultyFilter')?.addEventListener('change', function() {
    difficultyFilter = this.value;
    renderEventsList(eventsDB);
});