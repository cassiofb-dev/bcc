let controlPoints = [[-100, 0], [-140, -100], [100, -120], [200, 0]], colors, config = {
  clickToAddControl: false,
  drawCurve: true,
  drawLines: true,
  animate: true,
  goalRatio: 0,
  increment: 0.01,
  scale: 1,
  resetControlPoints: () => controlPoints = [],
  colorize: () => colors = Array.from(Array(32), () => randomColor()),
};

window.onload = function() {
  var gui = new dat.GUI();
  gui.add(config, 'clickToAddControl');
  gui.add(config, 'drawCurve');
  gui.add(config, 'drawLines');
  gui.add(config, 'animate');
  gui.add(config, 'goalRatio').min(0).max(1).step(0.001).listen();
  gui.add(config, 'increment').min(0.001).max(1);
  gui.add(config, 'scale').min(0).max(5);
  gui.add(config, 'resetControlPoints');
  gui.add(config, 'colorize');
};

function getBezierLines(controlPoints, goalRatio) {
  const bezierLines = [controlPoints];
  for(let bezierLineIndex = 1; bezierLineIndex < bezierLines[0].length; bezierLineIndex++) {
    const newBezierLine = [];
    const points = bezierLines[bezierLineIndex - 1];
    for(let pointIndex = 0; pointIndex < points.length - 1; pointIndex++) {
      let [x0, y0] = points[pointIndex];
      let [x1, y1] = points[pointIndex + 1];
      let deltaX = x1 - x0;
      let deltaY = y1 - y0;
      let newX = deltaX * goalRatio + x0;
      let newY = deltaY * goalRatio + y0;
      let newPoint = [newX, newY];
      newBezierLine.push(newPoint);
    }
    bezierLines.push(newBezierLine);
  }
  return bezierLines;
}

function getBezierCurve(controlPoints, increase) {
  let curve = [];
  for (let goalRatio = 0; goalRatio <= 1; goalRatio += increase) {
    curve.push(...getBezierLines(controlPoints, goalRatio).at(-1));
  }
  return curve;
}

function drawBezierCurve() {
  stroke(255);
  beginShape(CURVE);
  for(const point of getBezierCurve(controlPoints, config.increment))
    vertex(...point);
  endShape();
}

function drawBezierLines() {
  let colorIndex = 0;
  for(const bezierLine of getBezierLines(controlPoints, config.goalRatio)) {
    colorIndex = (colorIndex + 1) % colors.length;
    stroke(...colors[colorIndex]);
    if(bezierLine.length > 1) {
      beginShape(CURVE);
      for(const point of bezierLine)
        vertex(...point);
      endShape();
    } else {
      if (controlPoints.length > 1) circle(...bezierLine[0], 10);
    } 
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(20);
  strokeWeight(2);
  config.colorize();
}

function draw() {
  orbitControl();
  scale(config.scale);
  background(0);
  noFill();

  if(config.animate) config.goalRatio = (config.goalRatio + config.increment) % 1;
  if(config.drawCurve) drawBezierCurve();
  if(config.drawLines) drawBezierLines();
}

function randomColor() { return Array(3).fill().map(x => Math.floor(Math.random() * 255)); }
function windowResized() { resizeCanvas(windowWidth, windowHeight); }
function mouseClicked() { if(config.clickToAddControl) controlPoints.push([mouseX - windowWidth / 2, mouseY - windowHeight / 2]); }