function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES); // Trabalhar com ângulos em graus
}

function draw() {
  background(30);
  translate(width / 2, height / 2); // Centro da tela

  stroke(255);
  noFill();

  let r = 200; // Raio
  let numPoints = 360;

  beginShape();
  for (let a = 0; a < numPoints; a += 1) {
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);

  // Ponto girando
  let t = frameCount % 360;
  let px = r * cos(t);
  let py = r * sin(t);

  fill(255, 0, 0);
  noStroke();
  ellipse(px, py, 10, 10);
}