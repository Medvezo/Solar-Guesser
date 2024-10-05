import Earth from '../components/planets/Earth';
import Saturn from '../components/planets/Saturn';

export const SUN_MASS = 1.989e30;
export const G = 6.67430e-11;

export const primaryLayers = [
    { name: "Planets", icon: "○", src: "/icons/circleUI.png" },
    { name: "Asteroids", icon: "△", src: "/icons/triangleUI.png" },
    { name: "Comets", icon: "□", src: "/icons/squareUI.png" },
    { name: "Spacecrafts", icon: "⬟", src: "/icons/pentagonUI.png" },
];

export const secondaryLayers = [
    { name: "User Interface", icon: null },
    { name: "Labels", icon: null },
    { name: "Icons", icon: null },
    { name: "Orbits", icon: null },
    { name: "Trails", icon: null },
];

export const timeSpeedOptions = [
    { value: -600, label: "-1 year/s" },
    { value: -296, label: "-6 months/s" },
    { value: -148, label: "-3 months/s" },
    { value: -99, label: "-2 months/s" },
    { value: -49, label: "-1 month/s" },
    { value: -35, label: "-3 weeks/s" },
    { value: -23, label: "-2 weeks/s" },
    { value: -12, label: "-1 week/s" },
    { value: -8, label: "-5 days/s" },
    { value: -5, label: "-3 days/s" },
    { value: -3, label: "-2 days/s" },
    { value: -1.64, label: "-1 day/s" },
    { value: -1.44, label: "-21 hrs/s" },
    { value: -1.23, label: "-18 hrs/s" },
    { value: -1.10, label: "-16 hrs/s" },
    { value: -0.89, label: "-13 hrs/s" },
    { value: -0.68, label: "-10 hrs/s" },
    { value: -0.55, label: "-8 hrs/s" },
    { value: -0.34, label: "-5 hrs/s" },
    { value: -0.21, label: "-3 hrs/s" },
    { value: -0.07, label: "-1 hr/s" },
    { value: -0.06, label: "-50 mins/s" },
    { value: -0.05, label: "-40 mins/s" },
    { value: -0.03, label: "-30 mins/s" },
    { value: -0.02, label: "-20 mins/s" },
    { value: -0.01, label: "-10 mins/s" },
    { value: -0.009, label: "-8 mins/s" },
    { value: -0.006, label: "-5 mins/s" },
    { value: -0.003, label: "-3 mins/s" },
    { value: -0.001, label: "-1 min/s" },
    { value: -0.0010, label: "-50 secs/s" },
    { value: -0.0008, label: "-40 secs/s" },
    { value: -0.0006, label: "-30 secs/s" },
    { value: -0.0004, label: "-20 secs/s" },
    { value: -0.0002, label: "-10 secs/s" },
    { value: -0.0001, label: "-5 secs/s" },
    { value: -0.00006, label: "-3 secs/s" },
    { value: 0.00002, label: "Real Rate" },
    { value: 0.00006, label: "3 secs/s" },
    { value: 0.0001, label: "5 secs/s" },
    { value: 0.0002, label: "10 secs/s" },
    { value: 0.0004, label: "20 secs/s" },
    { value: 0.0006, label: "30 secs/s" },
    { value: 0.0008, label: "40 secs/s" },
    { value: 0.0010, label: "50 secs/s" },
    { value: 0.001, label: "1 min/s" },
    { value: 0.003, label: "3 mins/s" },
    { value: 0.006, label: "5 mins/s" },
    { value: 0.009, label: "8 mins/s" },
    { value: 0.01, label: "10 mins/s" },
    { value: 0.02, label: "20 mins/s" },
    { value: 0.03, label: "30 mins/s" },
    { value: 0.05, label: "40 mins/s" },
    { value: 0.06, label: "50 mins/s" },
    { value: 0.07, label: "1 hr/s" },
    { value: 0.21, label: "3 hrs/s" },
    { value: 0.34, label: "5 hrs/s" },
    { value: 0.55, label: "8 hrs/s" },
    { value: 0.68, label: "10 hrs/s" },
    { value: 0.89, label: "13 hrs/s" },
    { value: 1.10, label: "16 hrs/s" },
    { value: 1.23, label: "18 hrs/s" },
    { value: 1.44, label: "21 hrs/s" },
    { value: 1.64, label: "1 day/s" },
    { value: 3, label: "2 days/s" },
    { value: 5, label: "3 days/s" },
    { value: 8, label: "5 days/s" },
    { value: 12, label: "1 week/s" },
    { value: 23, label: "2 weeks/s" },
    { value: 35, label: "3 weeks/s" },
    { value: 49, label: "1 month/s" },
    { value: 99, label: "2 months/s" },
    { value: 148, label: "3 months/s" },
    { value: 296, label: "6 months/s" },
    { value: 600, label: "1 year/s" },
];

export const planets = [
    { name: "Mercury", radius: 0.128, semiMajorAxis: 5.7, eccentricity: 0.206, rotationSpeed: 0.01, orbitSpeed: 0.04, textureMap: "/textures/mercury.jpg", description: "Mercury is the smallest planet in the Solar System and the closest to the Sun.", type: "TERRESTRIAL", moons: "None", gravity: "3.7 m/s2", dayLength: "58d 15h 30m", radiusInKm: "2,439.7 km", orbitalPeriod: "88 days", distanceFromSun: "57.9 million km", coordinates: "RA 2h 15m 36s" },
    { name: "Venus", radius: 0.316, semiMajorAxis: 10.8, eccentricity: 0.007, rotationSpeed: 0.004, orbitSpeed: 0.015, textureMap: "/textures/venus.jpg", description: "Venus is the second planet from the Sun and is Earth's closest planetary neighbor.", type: "TERRESTRIAL", moons: "None", gravity: "8.87 m/s2", dayLength: "116d 18h 0m", radiusInKm: "6,051.8 km", orbitalPeriod: "225 days", distanceFromSun: "108.2 million km", coordinates: "RA 3h 20m 54s" },
    { name: "Earth", component: Earth, radius: 0.333, semiMajorAxis: 15, eccentricity: 0.017, rotationSpeed: 0.01, orbitSpeed: 0.01, textureMap: "/textures/earth_daymap.jpg", description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life.", type: "TERRESTRIAL", moons: "Moon", gravity: "9.81 m/s2", dayLength: "23h 56m 4s", radiusInKm: "6,371 km", orbitalPeriod: "365.25 days", distanceFromSun: "149.6 million km", coordinates: "RA 4h 26m 12s" },
    { name: "Mars", radius: 0.177, semiMajorAxis: 22.8, eccentricity: 0.093, rotationSpeed: 0.01, orbitSpeed: 0.008, textureMap: "/textures/mars.jpg", description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.", type: "TERRESTRIAL", moons: "Phobos, Deimos", gravity: "3.71 m/s2", dayLength: "1d 0h 37m", radiusInKm: "3,389.5 km", orbitalPeriod: "687 days", distanceFromSun: "227.9 million km", coordinates: "RA 7h 9m 42s" },
    { name: "Jupiter", radius: 3.737, semiMajorAxis: 77.8, eccentricity: 0.048, rotationSpeed: 0.02, orbitSpeed: 0.002, textureMap: "/textures/jupiter.jpg", description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System.", type: "GAS GIANT", moons: "79 known moons", gravity: "24.79 m/s2", dayLength: "9h 56m", radiusInKm: "69,911 km", orbitalPeriod: "11.86 years", distanceFromSun: "778.5 million km", coordinates: "RA 11h 15m 30s" },
    { name: "Saturn", component: Saturn, radius: 3.047, semiMajorAxis: 143, eccentricity: 0.0565, rotationSpeed: 0.034, orbitSpeed: 0.001, textureMap: "/textures/saturn.jpg", ringTexture: "/textures/saturn_ring.png", description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, known for its prominent ring system.", type: "GAS GIANT", moons: "82 known moons", gravity: "10.44 m/s2", dayLength: "10h 42m", radiusInKm: "58,232 km", orbitalPeriod: "29.45 years", distanceFromSun: "1.43 billion km", coordinates: "RA 15h 21m 48s" },
    { name: "Uranus", radius: 1.333, semiMajorAxis: 287, eccentricity: 0.047, rotationSpeed: 0.012, orbitSpeed: 0.0004, textureMap: "/textures/uranus.jpg", description: "Uranus is the seventh planet from the Sun and has the third-largest diameter in our solar system.", type: "ICE GIANT", moons: "27 known moons", gravity: "8.69 m/s2", dayLength: "17h 14m", radiusInKm: "25,362 km", orbitalPeriod: "84 years", distanceFromSun: "2.87 billion km", coordinates: "RA 19h 28m 6s" },
    { name: "Neptune", radius: 1.293, semiMajorAxis: 450, eccentricity: 0.009, rotationSpeed: 0.014, orbitSpeed: 0.0001, textureMap: "/textures/neptune.jpg", description: "Neptune is the eighth and farthest-known Solar planet from the Sun.", type: "ICE GIANT", moons: "14 known moons", gravity: "11.15 m/s2", dayLength: "16h 6m", radiusInKm: "24,622 km", orbitalPeriod: "164.79 years", distanceFromSun: "4.5 billion km", coordinates: "RA 23h 39m 54s" },
];

export const orbitColors = [
    "#8B4513", // Mercury (brown)
    "#FFA500", // Venus (orange)
    "#1E90FF", // Earth (blue)
    "#FF4500", // Mars (red-orange)
    "#F0E68C", // Jupiter (khaki)
    "#DAA520", // Saturn (goldenrod)
    "#00CED1", // Uranus (dark turquoise)
    "#4169E1", // Neptune (royal blue)
];

