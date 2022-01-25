let config = {
  turnsNumber: 1,
  initialAngle: 0,
  animate: true,
  sidesNumber: 6,
  radiusSize: 100,
  shift3D: 0,
  radiusDecreasePercent: 90,
  radiusDecreasePerSize: 1,
};

window.onload = function() {
  let gui = new dat.GUI();
  gui.add(config, "turnsNumber").min(1).max(999).step(1);
  gui.add(config, "initialAngle").min(0).max(360).step(1).listen();
  gui.add(config, "animate");
  gui.add(config, "sidesNumber").min(1).max(999).step(1);
  gui.add(config, "radiusSize").min(1).max(999).step(1);
  gui.add(config, "shift3D").min(-10).max(10).step(1);
  gui.add(config, "radiusDecreasePercent").min(1).max(200).step(1);
  gui.add(config, "radiusDecreasePerSize").min(1).max(20).step(1);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(30);
}

function draw() {
  orbitControl();
  background(0);
  stroke(255);
  noFill();
 
  if(config.animate) config.initialAngle = (config.initialAngle + 1) % 361;
 
  beginShape(CURVE);
  for (let i = 0; i <= config.sidesNumber * config.turnsNumber; i++) {
    let radius = config.radiusSize * Math.pow(config.radiusDecreasePercent / 100, i / config.radiusDecreasePerSize);
    let angle = 2 * Math.PI / config.sidesNumber * i + config.initialAngle * 2 * Math.PI / 360;
    let x = radius * Math.cos(angle);
    let y = radius * Math.sin(angle);
    vertex(x, y, config.shift3D * i);
  }
  endShape();
}

function windowResized() { resizeCanvas(windowWidth, windowHeight); }