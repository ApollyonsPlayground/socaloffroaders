// So Cal Off-Roaders - Events Data
const eventsDB = [
    {
        id: 1,
        title: "Calico Ghost Town Run",
        date: "2026-03-28",
        time: "9:00 AM",
        trail: "Calico Ghost Town",
        trailId: 1,
        difficulty: "beginner",
        host: "Noah H.",
        description: "Easy beginner-friendly run through historic Calico. Perfect for first-timers! We'll explore the ghost town and surrounding trails.",
        maxParticipants: 15,
        participants: 8,
        meetingPoint: "Calico Ghost Town entrance",
        requirements: ["4WD vehicle", "CB radio or ham radio", "Water and snacks"]
    },
    {
        id: 2,
        title: "Johnson Valley Adventure",
        date: "2026-04-05",
        time: "8:00 AM",
        trail: "Johnson Valley",
        trailId: 2,
        difficulty: "moderate",
        host: "SoCal4x4 Club",
        description: "Full day exploring Johnson Valley OHV area. Multiple trail options for different skill levels. Lunch at the Hammertown area.",
        maxParticipants: 20,
        participants: 12,
        meetingPoint: "Johnson Valley OHV Staging Area",
        requirements: ["4WD with at least 33\" tires", "Recovery gear", "Radio", "Full tank of gas"]
    },
    {
        id: 3,
        title: "Big Bear Spring Run",
        date: "2026-04-12",
        time: "10:00 AM",
        trail: "Big Bear Alpine Trail",
        trailId: 3,
        difficulty: "moderate",
        host: "Mountain Trail Riders",
        description: "Scenic mountain run with beautiful spring wildflowers. Great views and moderate difficulty. Family friendly.",
        maxParticipants: 12,
        participants: 6,
        meetingPoint: "Big Bear Discovery Center",
        requirements: ["4WD recommended", "Chains/cables if weather changes", "Warm layers"]
    },
    {
        id: 4,
        title: "Holcomb Creek Challenge",
        date: "2026-04-19",
        time: "8:30 AM",
        trail: "Holcomb Creek",
        trailId: 4,
        difficulty: "advanced",
        host: "Rock Crawlers Unite",
        description: "Technical creek crossing trail. Water levels should be good this time of year. Experienced drivers only.",
        maxParticipants: 8,
        participants: 5,
        meetingPoint: "Holcomb Valley Road entrance",
        requirements: ["Lifted 4WD with lockers", "Winch recommended", "Waterproofing", "Experienced spotter"]
    },
    {
        id: 5,
        title: "Anza-Borrego Wildflower Tour",
        date: "2026-03-22",
        time: "7:00 AM",
        trail: "Anza-Borrego Desert",
        trailId: 7,
        difficulty: "beginner",
        host: "Desert Explorers",
        description: "Early morning run to catch the wildflower bloom at peak. Easy trails, beautiful scenery. Photography opportunities.",
        maxParticipants: 25,
        participants: 18,
        meetingPoint: "Borrego Springs Visitor Center",
        requirements: ["Any vehicle OK", "Camera", "Water"]
    },
    {
        id: 6,
        title: "Gold Mountain Summit",
        date: "2026-04-26",
        time: "9:00 AM",
        trail: "Gold Mountain",
        trailId: 5,
        difficulty: "advanced",
        host: "Big Bear Off-Road",
        description: "Challenging climb to Gold Mountain summit. Technical sections and tight switchbacks. Amazing views from the top.",
        maxParticipants: 10,
        participants: 7,
        meetingPoint: "Big Bear Blvd & Division",
        requirements: ["Modified 4WD", "33\"+ tires", "Recovery gear", "Body armor recommended"]
    },
    {
        id: 7,
        title: "Mojave Road Expedition",
        date: "2026-05-10",
        time: "6:00 AM",
        trail: "Mojave Road",
        trailId: 19,
        difficulty: "moderate",
        host: "Mojave Travelers",
        description: "2-3 day expedition across the historic Mojave Road. Camping at established sites. Full support vehicle included.",
        maxParticipants: 12,
        participants: 9,
        meetingPoint: "Afton Canyon Campground",
        requirements: ["Reliable 4WD", "Camping gear", "2+ days supplies", "HAM radio preferred"]
    },
    {
        id: 8,
        title: "Superstition Sunset Run",
        date: "2026-03-29",
        time: "4:00 PM",
        trail: "Superstition Mountain",
        trailId: 9,
        difficulty: "moderate",
        host: "Noah H.",
        description: "Late afternoon run to catch sunset from the summit. Moderate difficulty, beautiful views. Bring camp chairs for the top.",
        maxParticipants: 15,
        participants: 10,
        meetingPoint: "Superstition Mountain OHV Area entrance",
        requirements: ["4WD", "Flashlights/headlamps", "Jacket for evening"]
    }
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