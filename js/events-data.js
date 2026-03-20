// So Cal Off-Roaders - Events Database
// Real events only - submitted by users or approved by admin

const eventsDB = [
    // Events will be added here as users submit them
    // Empty for now - no fake/planned events
];

// Get upcoming events
function getUpcomingEvents(limit = 5) {
    const today = new Date().toISOString().split('T')[0];
    return eventsDB
        .filter(event => event.date >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, limit);
}

// Get events by difficulty
function getEventsByDifficulty(difficulty) {
    return eventsDB.filter(event => event.difficulty === difficulty);
}

// Get events by trail
function getEventsByTrail(trailId) {
    return eventsDB.filter(event => event.trailId === trailId);
}

// Delete event by ID (admin function)
function deleteEvent(eventId) {
    const index = eventsDB.findIndex(e => e.id === eventId);
    if (index > -1) {
        eventsDB.splice(index, 1);
        return true;
    }
    return false;
}

// Format date for display
function formatEventDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Get month abbreviation
function getMonthAbbr(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short' });
}

// Get day number
function getDayNumber(dateString) {
    const date = new Date(dateString);
    return date.getDate();
}
