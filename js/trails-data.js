// So Cal Off-Roaders - Complete Trails Database (30 Trails)
const trailsDB = [
  {
    "id": 1,
    "name": "Calico Ghost Town",
    "location": "Yermo, CA",
    "county": "San Bernardino",
    "difficulty": "beginner",
    "type": "desert",
    "distance": "15 miles",
    "duration": "3-4 hours",
    "description": "Historic silver mining town with easy trails through colorful rock formations. Great for beginners with stunning desert views and mining ruins to explore.",
    "coordinates": {
      "lat": 34.9483,
      "lng": -116.8642
    },
    "camping": true,
    "campingInfo": "Developed campground at Calico Ghost Town, primitive camping nearby",
    "image": "calico.jpg",
    "rating": 4.5,
    "reviews": 128,
    "onxSlug": "calico-ghost-town"
  },
  {
    "id": 2,
    "name": "Johnson Valley",
    "location": "Johnson Valley, CA",
    "county": "San Bernardino",
    "difficulty": "moderate",
    "type": "desert",
    "distance": "Various",
    "duration": "Half to full day",
    "description": "Vast OHV area famous for the King of the Hammers race. Features everything from easy desert roads to extreme rock crawling. Beautiful Joshua tree landscapes.",
    "coordinates": {
      "lat": 34.3833,
      "lng": -116.6167
    },
    "camping": true,
    "campingInfo": "Dispersed camping throughout, no facilities",
    "image": "johnson-valley.jpg",
    "rating": 4.7,
    "reviews": 203,
    "onxSlug": "johnson-valley"
  },
  {
    "id": 4,
    "name": "Holcomb Creek",
    "location": "Fawnskin, CA",
    "county": "San Bernardino",
    "difficulty": "advanced",
    "type": "canyon",
    "distance": "8 miles",
    "duration": "4-6 hours",
    "description": "Technical creek crossing trail with rocky sections and water obstacles. Beautiful canyon scenery but requires experience and proper equipment.",
    "coordinates": {
      "lat": 34.2667,
      "lng": -117.1333
    },
    "camping": true,
    "campingInfo": "Primitive camping along creek, pack it out",
    "image": "holcomb-creek.jpg",
    "rating": 4.6,
    "reviews": 89,
    "onxSlug": "holcomb-creek"
  },
  {
    "id": 5,
    "name": "Gold Mountain",
    "location": "Big Bear, CA",
    "county": "San Bernardino",
    "difficulty": "advanced",
    "type": "rock",
    "distance": "6 miles",
    "duration": "3-5 hours",
    "description": "Challenging rocky ascent with tight switchbacks and technical sections. Rewarding panoramic views of Big Bear Lake from the summit.",
    "coordinates": {
      "lat": 34.2167,
      "lng": -117.0833
    },
    "camping": false,
    "campingInfo": "No camping on trail, stay in Big Bear area",
    "image": "gold-mountain.jpg",
    "rating": 4.4,
    "reviews": 112,
    "onxSlug": "3n69-gold-mountain"
  },
  {
    "id": 6,
    "name": "Dishpan Springs",
    "location": "Big Bear, CA",
    "county": "San Bernardino",
    "difficulty": "extreme",
    "type": "rock",
    "distance": "4 miles",
    "duration": "4-8 hours",
    "description": "One of the most technical trails in SoCal. Massive boulders, steep climbs, and tight squeezes. Only for built rigs with experienced drivers.",
    "coordinates": {
      "lat": 34.25,
      "lng": -117.05
    },
    "camping": false,
    "campingInfo": "No camping, day use only",
    "image": "dishpan-springs.jpg",
    "rating": 4.9,
    "reviews": 67,
    "onxSlug": "dishpan-springs"
  },
  {
    "id": 7,
    "name": "Anza-Borrego Desert",
    "location": "Borrego Springs, CA",
    "county": "San Diego",
    "difficulty": "beginner",
    "type": "desert",
    "distance": "Various loops",
    "duration": "2-6 hours",
    "description": "Expansive desert state park with hundreds of miles of trails. From easy desert roads to moderate washes. Famous for spring wildflowers and metal sculptures.",
    "coordinates": {
      "lat": 33.2558,
      "lng": -116.4006
    },
    "camping": true,
    "campingInfo": "Multiple campgrounds and dispersed camping",
    "image": "anza-borrego.jpg",
    "rating": 4.7,
    "reviews": 245,
    "onxSlug": "anza-borrego-desert"
  },
  {
    "id": 8,
    "name": "Ocotillo Wells",
    "location": "Ocotillo Wells, CA",
    "county": "San Diego",
    "difficulty": "beginner",
    "type": "desert",
    "distance": "Unlimited",
    "duration": "Variable",
    "description": "Massive OHV area with open riding. Dunes, washes, and desert terrain. Great for all skill levels with plenty of room to explore.",
    "coordinates": {
      "lat": 33.1436,
      "lng": -116.1331
    },
    "camping": true,
    "campingInfo": "Dispersed camping throughout, no facilities",
    "image": "ocotillo-wells.jpg",
    "rating": 4.5,
    "reviews": 178,
    "onxSlug": "ocotillo-wells-svra"
  },
  {
    "id": 10,
    "name": "Truckhaven Hills",
    "location": "Salton City, CA",
    "county": "Imperial",
    "difficulty": "moderate",
    "type": "desert",
    "distance": "12 miles",
    "duration": "3-5 hours",
    "description": "Rugged desert hills with steep climbs and loose terrain. Beautiful views of the Salton Sea. Challenging but rewarding.",
    "coordinates": {
      "lat": 33.3167,
      "lng": -116.0833
    },
    "camping": true,
    "campingInfo": "Dispersed camping nearby",
    "image": "truckhaven.jpg",
    "rating": 4.3,
    "reviews": 98,
    "onxSlug": "truckhaven-trail"
  },
  {
    "id": 11,
    "name": "Joshua Tree National Park",
    "location": "Joshua Tree, CA",
    "county": "Riverside/San Bernardino",
    "difficulty": "beginner",
    "type": "desert",
    "distance": "Various",
    "duration": "Half to full day",
    "description": "Iconic desert park with easy scenic roads and moderate trails. Stunning rock formations, Joshua trees, and desert vistas.",
    "coordinates": {
      "lat": 33.8734,
      "lng": -115.9009
    },
    "camping": true,
    "campingInfo": "Nine campgrounds within the park",
    "image": "joshua-tree.jpg",
    "rating": 4.9,
    "reviews": 312,
    "onxSlug": "joshua-tree-national-park"
  },
  {
    "id": 12,
    "name": "Coxey Road",
    "location": "Joshua Tree, CA",
    "county": "Riverside",
    "difficulty": "advanced",
    "type": "rock",
    "distance": "7 miles",
    "duration": "4-6 hours",
    "description": "Rocky trail through scenic desert with technical sections and boulder fields. Beautiful views but requires experience.",
    "coordinates": {
      "lat": 33.9333,
      "lng": -116.8333
    },
    "camping": false,
    "campingInfo": "No camping on trail",
    "image": "coxey-road.jpg",
    "rating": 4.4,
    "reviews": 76,
    "onxSlug": "coxey-road"
  },
  {
    "id": 13,
    "name": "Berdoo Canyon",
    "location": "Indio, CA",
    "county": "Riverside",
    "difficulty": "moderate",
    "type": "canyon",
    "distance": "15 miles",
    "duration": "4-5 hours",
    "description": "Historic canyon trail with scenic desert views. Moderate difficulty with some rocky sections. Old mining artifacts along the route.",
    "coordinates": {
      "lat": 33.7833,
      "lng": -116.25
    },
    "camping": true,
    "campingInfo": "Primitive camping spots available",
    "image": "berdoo-canyon.jpg",
    "rating": 4.5,
    "reviews": 103,
    "onxSlug": "berdoo-canyon"
  },
  {
    "id": 14,
    "name": "Rattlesnake Canyon",
    "location": "Thermal, CA",
    "county": "Riverside",
    "difficulty": "advanced",
    "type": "canyon",
    "distance": "10 miles",
    "duration": "5-7 hours",
    "description": "Technical canyon trail with tight squeezes and rocky obstacles. Beautiful narrow sections but challenging terrain throughout.",
    "coordinates": {
      "lat": 33.6167,
      "lng": -116.1333
    },
    "camping": false,
    "campingInfo": "Day use only",
    "image": "rattlesnake-canyon.jpg",
    "rating": 4.6,
    "reviews": 82,
    "onxSlug": "rc3331-rattlesnake-canyon"
  },
  {
    "id": 15,
    "name": "Painted Canyon",
    "location": "Mecca, CA",
    "county": "Riverside",
    "difficulty": "moderate",
    "type": "canyon",
    "distance": "8 miles",
    "duration": "3-4 hours",
    "description": "Stunning canyon with colorful rock walls and ladder sections. Unique geological formations make this a must-see trail.",
    "coordinates": {
      "lat": 33.6167,
      "lng": -116.0833
    },
    "camping": true,
    "campingInfo": "Camping at canyon entrance",
    "image": "painted-canyon.jpg",
    "rating": 4.7,
    "reviews": 156,
    "onxSlug": "painted-canyon"
  },
  {
    "id": 16,
    "name": "Idyllwild Mountain",
    "location": "Idyllwild, CA",
    "county": "Riverside",
    "difficulty": "moderate",
    "type": "mountain",
    "distance": "14 miles",
    "duration": "4-6 hours",
    "description": "Beautiful mountain trail through pine forests with seasonal creek crossings. Cooler temps make this a summer favorite.",
    "coordinates": {
      "lat": 33.7469,
      "lng": -116.7158
    },
    "camping": true,
    "campingInfo": "Multiple campgrounds in the area",
    "image": "idyllwild.jpg",
    "rating": 4.8,
    "reviews": 124,
    "onxSlug": "idyllwild-mountain-road"
  },
  {
    "id": 17,
    "name": "Thomas Mountain",
    "location": "Garner Valley, CA",
    "county": "Riverside",
    "difficulty": "advanced",
    "type": "mountain",
    "distance": "11 miles",
    "duration": "5-7 hours",
    "description": "Challenging mountain ascent with steep grades and rocky sections. Beautiful views of Garner Valley and Lake Hemet.",
    "coordinates": {
      "lat": 33.6833,
      "lng": -116.6333
    },
    "camping": true,
    "campingInfo": "Primitive camping at various spots",
    "image": "thomas-mountain.jpg",
    "rating": 4.5,
    "reviews": 91,
    "onxSlug": "6s13-thomas-mountain-road"
  },
  {
    "id": 18,
    "name": "San Jacinto Peak",
    "location": "Idyllwild, CA",
    "county": "Riverside",
    "difficulty": "extreme",
    "type": "mountain",
    "distance": "16 miles",
    "duration": "8-12 hours",
    "description": "Extreme high-altitude trail to 10,834ft peak. Technical rock sections, steep climbs, and challenging weather. Only for experienced drivers with proper equipment.",
    "coordinates": {
      "lat": 33.8147,
      "lng": -116.6794
    },
    "camping": false,
    "campingInfo": "No camping on trail, base camp at Idyllwild",
    "image": "san-jacinto.jpg",
    "rating": 4.9,
    "reviews": 45,
    "onxSlug": "san-jacinto-ridge-trail-fs-5s09"
  },
  {
    "id": 19,
    "name": "Mojave Road",
    "location": "Mojave Desert, CA",
    "county": "San Bernardino",
    "difficulty": "moderate",
    "type": "desert",
    "distance": "147 miles",
    "duration": "2-3 days",
    "description": "Historic pioneer route across the Mojave Desert. Multi-day adventure with camping, historic sites, and diverse desert landscapes. Bucket list trail.",
    "coordinates": {
      "lat": 35.0125,
      "lng": -115.6533
    },
    "camping": true,
    "campingInfo": "Camp along route, multiple established sites",
    "image": "mojave-road.jpg",
    "rating": 4.8,
    "reviews": 287,
    "onxSlug": "mojave-road"
  },
  {
    "id": 20,
    "name": "Afton Canyon",
    "location": "Barstow, CA",
    "county": "San Bernardino",
    "difficulty": "beginner",
    "type": "canyon",
    "distance": "6 miles",
    "duration": "2-3 hours",
    "description": "Scenic canyon known as the 'Grand Canyon of the Mojave'. Easy trail following a historic railroad route with beautiful canyon walls.",
    "coordinates": {
      "lat": 34.9833,
      "lng": -116.3833
    },
    "camping": true,
    "campingInfo": "Campground at canyon entrance",
    "image": "afton-canyon.jpg",
    "rating": 4.6,
    "reviews": 167,
    "onxSlug": "afton-canyon"
  },
  {
    "id": 21,
    "name": "Dumont Dunes",
    "location": "Baker, CA",
    "county": "San Bernardino",
    "difficulty": "beginner",
    "type": "desert",
    "distance": "Open area",
    "duration": "Variable",
    "description": "Famous sand dune area with dunes up to 500 feet tall. From easy cruising to extreme hill climbs. Popular for sand sports.",
    "coordinates": {
      "lat": 35.75,
      "lng": -116.3
    },
    "camping": true,
    "campingInfo": "Developed campground with facilities",
    "image": "dumont-dunes.jpg",
    "rating": 4.7,
    "reviews": 198,
    "onxSlug": "dumont-dunes"
  },
  {
    "id": 22,
    "name": "Rasor OHV Area",
    "location": "Baker, CA",
    "county": "San Bernardino",
    "difficulty": "moderate",
    "type": "desert",
    "distance": "Open area",
    "duration": "Variable",
    "description": "Less crowded alternative to Dumont with varied terrain. Dunes, washes, and desert trails. Great for all skill levels.",
    "coordinates": {
      "lat": 35.0833,
      "lng": -116.45
    },
    "camping": true,
    "campingInfo": "Dispersed camping, no facilities",
    "image": "rasor.jpg",
    "rating": 4.4,
    "reviews": 87,
    "onxSlug": "rasor-ohv-area"
  },
  {
    "id": 23,
    "name": "El Mirage Dry Lake",
    "location": "Adelanto, CA",
    "county": "San Bernardino",
    "difficulty": "beginner",
    "type": "desert",
    "distance": "Open play area",
    "duration": "Variable",
    "description": "Famous dry lake bed for high-speed runs and land speed racing. Flat, open, and perfect for testing your vehicle's capabilities.",
    "coordinates": {
      "lat": 34.6667,
      "lng": -117.6
    },
    "camping": true,
    "campingInfo": "Dispersed camping around lake bed",
    "image": "el-mirage.jpg",
    "rating": 4.5,
    "reviews": 134,
    "onxSlug": "el-mirage-dry-lake"
  },
  {
    "id": 24,
    "name": "Cleghorn Ridge",
    "location": "Cajon Pass, CA",
    "county": "San Bernardino",
    "difficulty": "moderate",
    "type": "mountain",
    "distance": "12 miles",
    "duration": "3-5 hours",
    "description": "Scenic ridge trail with beautiful mountain and valley views. Moderate difficulty with some rocky sections. Popular year-round trail.",
    "coordinates": {
      "lat": 34.3167,
      "lng": -117.4667
    },
    "camping": true,
    "campingInfo": "Multiple camping spots along ridge",
    "image": "cleghorn-ridge.jpg",
    "rating": 4.6,
    "reviews": 145,
    "onxSlug": "cleghorn-ridge"
  },
  {
    "id": 25,
    "name": "John Bull Trail",
    "location": "Big Bear, CA",
    "county": "San Bernardino",
    "difficulty": "extreme",
    "type": "rock",
    "distance": "5 miles",
    "duration": "4-8 hours",
    "description": "Infamous extreme rock crawling trail. Massive boulders, ledges, and technical sections. Only for heavily modified rigs with experienced spotters.",
    "coordinates": {
      "lat": 34.2333,
      "lng": -117.05
    },
    "camping": false,
    "campingInfo": "No camping on trail",
    "image": "john-bull.jpg",
    "rating": 4.8,
    "reviews": 56,
    "onxSlug": "john-bull-trail"
  },
  {
    "id": 26,
    "name": "Pilot Rock",
    "location": "Crestline, CA",
    "county": "San Bernardino",
    "difficulty": "advanced",
    "type": "rock",
    "distance": "4 miles",
    "duration": "3-5 hours",
    "description": "Technical rock trail leading to iconic Pilot Rock formation. Challenging obstacles with stunning views of the Cajon Pass.",
    "coordinates": {
      "lat": 34.2333,
      "lng": -117.3167
    },
    "camping": false,
    "campingInfo": "No camping, nearby Crestline for lodging",
    "image": "pilot-rock.jpg",
    "rating": 4.5,
    "reviews": 78,
    "onxSlug": "pilot-rock"
  },
  {
    "id": 27,
    "name": "Silverwood Lake",
    "location": "Hesperia, CA",
    "county": "San Bernardino",
    "difficulty": "beginner",
    "type": "mountain",
    "distance": "8 miles",
    "duration": "2-3 hours",
    "description": "Easy scenic trail around Silverwood Lake with mountain and lake views. Great for beginners and families. Beautiful in fall.",
    "coordinates": {
      "lat": 34.25,
      "lng": -117.3167
    },
    "camping": true,
    "campingInfo": "Lake campgrounds available",
    "image": "silverwood.jpg",
    "rating": 4.4,
    "reviews": 112,
    "onxSlug": "silverwood-lake"
  },
  {
    "id": 28,
    "name": "Arrowhead Trail",
    "location": "Lake Arrowhead, CA",
    "county": "San Bernardino",
    "difficulty": "moderate",
    "type": "mountain",
    "distance": "10 miles",
    "duration": "3-4 hours",
    "description": "Scenic mountain trail through pine forests with views of Lake Arrowhead. Moderate difficulty with some rocky sections.",
    "coordinates": {
      "lat": 34.25,
      "lng": -117.1833
    },
    "camping": true,
    "campingInfo": "Forest Service campgrounds nearby",
    "image": "arrowhead.jpg",
    "rating": 4.6,
    "reviews": 98,
    "onxSlug": "arrowhead-north-loop"
  },
  {
    "id": 29,
    "name": "Santa Rosa Mountains",
    "location": "La Quinta, CA",
    "county": "Riverside",
    "difficulty": "advanced",
    "type": "mountain",
    "distance": "18 miles",
    "duration": "6-8 hours",
    "description": "Remote mountain range with challenging trails and spectacular desert-to-mountain transitions. Less crowded than other areas.",
    "coordinates": {
      "lat": 33.5833,
      "lng": -116.4167
    },
    "camping": true,
    "campingInfo": "Dispersed camping, bring all supplies",
    "image": "santa-rosa.jpg",
    "rating": 4.7,
    "reviews": 67,
    "onxSlug": "santa-rosa-mountains"
  },
  {
    "id": 30,
    "name": "Borrego Mountain",
    "location": "Borrego Springs, CA",
    "county": "San Diego",
    "difficulty": "moderate",
    "type": "desert",
    "distance": "9 miles",
    "duration": "3-4 hours",
    "description": "Scenic desert mountain trail with varied terrain. Great views of the Salton Sea and surrounding desert. Beautiful wildflowers in spring.",
    "coordinates": {
      "lat": 33.2667,
      "lng": -116.3167
    },
    "camping": true,
    "campingInfo": "Camping at base of mountain",
    "image": "borrego-mountain.jpg",
    "rating": 4.5,
    "reviews": 89,
    "onxSlug": "borrego-mountain"
  }
];

// Get featured trails (highest rated)
function getFeaturedTrails() {
    return trailsDB
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);
}

// Filter trails
function filterTrails(filters) {
    return trailsDB.filter(trail => {
        if (filters.difficulty && trail.difficulty !== filters.difficulty) return false;
        if (filters.type && trail.type !== filters.type) return false;
        if (filters.county && !trail.county.toLowerCase().includes(filters.county.toLowerCase())) return false;
        return true;
    });
}

// Get trail by ID
function getTrailById(id) {
    return trailsDB.find(trail => trail.id === id);
}

// Get trails by difficulty
function getTrailsByDifficulty(difficulty) {
    return trailsDB.filter(trail => trail.difficulty === difficulty);
}

// Get trails by type
function getTrailsByType(type) {
    return trailsDB.filter(trail => trail.type === type);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { trailsDB, getFeaturedTrails, filterTrails, getTrailById };
}