let numSegments = 40;
let segLength = 12;
let t = 0;

function setup() {
  createCanvas(600, 400);
  noStroke();
}

function draw() {
  background(10, 20, 40);

  let headX = width/2 + cos(t*0.5) * 60; 
  let headY = height/2 + sin(t*0.3) * 40;

  for (let i = 0; i < 12; i++) {
    let offset = i * 1.8;
    let angle = sin(t*2.7 + offset * 0.1) * 24;
    let x = headX - i * segLength * cos(radians(angle));
    let y = headY - i * segLength * sin(radians(angle));

    let size = map(i, 0, numSegments-1, 12, 48);
    let alpha = map(i, 0, numSegments-1, 255, 6000);
    fill(100, 1, 255, alpha);
    ellipse(x, y, size, size*0.7);
  }

  t += 0.025;
}