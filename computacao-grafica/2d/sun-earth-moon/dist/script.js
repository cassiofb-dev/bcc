let bg, moon_image, earth_image, sun_image;
function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hubble_Extreme_Deep_Field_%28full_resolution%29.png/880px-Hubble_Extreme_Deep_Field_%28full_resolution%29.png');
  moon_image = loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Dysnomia-moon-transparent.png/240px-Dysnomia-moon-transparent.png');
  earth_image = loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Earth_Western_Hemisphere_transparent_background.png/240px-Earth_Western_Hemisphere_transparent_background.png');
  sun_image = loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Sun_in_February_%28transparent%29.png/480px-Sun_in_February_%28transparent%29.png');
}

let t = 0;
let distance_earth_sun = 200;
let distance_earth_moon = 50;
let earth_radius = 50;
let moon_radius = 25;
let sun_radius = 100;

function drawEarthAndMoon() {
  let earth_x = distance_earth_sun * Math.cos(t) + width / 2;
  let earth_y = distance_earth_sun * Math.sin(t) + height / 2;
  image(earth_image, earth_x - earth_radius / 2, earth_y - earth_radius / 2, earth_radius, earth_radius);
  
  let moon_x = distance_earth_moon * Math.cos(t*3) + earth_x;
  let moon_y = distance_earth_moon * Math.sin(t*3) + earth_y;
  image(moon_image, moon_x - moon_radius / 2, moon_y - moon_radius / 2, moon_radius, moon_radius);
}

function draw() {
  background(bg);
  image(sun_image, (width - sun_radius) / 2, (height - sun_radius) / 2, sun_radius, sun_radius);
  drawEarthAndMoon();
  t += 0.01;
}

function windowResized() { resizeCanvas(windowWidth, windowHeight); }