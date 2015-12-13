var backendUrl = process.env.BACKEND_URL || "localhost:3000";

var ceres = new Asteroid(backendUrl);

module.exports = ceres;