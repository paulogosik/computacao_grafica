let angulo = 0;
let raio = 100;
let anguloBraco = 45;
let anguloAntebraco = 30;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
}

function draw() {
  background(20);
  simulacaoPolar();
  roboArticulado();
}

function simulacaoPolar() {
  push();
  translate(width / 2, height / 2 - 150);
  stroke(255);
  noFill();
  ellipse(0, 0, raio * 2);
  let x = raio * cos(angulo);
  let y = raio * sin(angulo);
  fill(255, 0, 0);
  noStroke();
  ellipse(x, y, 10);
  stroke(255);
  line(0, 0, x, y);
  angulo = (angulo + 1) % 360;
  pop();
}

function roboArticulado() {
  push();
  translate(width / 2, height / 2 + 150);
  fill(100, 150, 255);
  rect(-25, -50, 50, 100);
  translate(0, -50);
  rotate(radians(anguloBraco));
  fill(200);
  rect(0, -10, 80, 20);
  translate(80, 0);
  rotate(radians(anguloAntebraco));
  fill(180);
  rect(0, -8, 60, 16);
  pop();
  anguloBraco = 45 + sin(frameCount * 2) * 30;
  anguloAntebraco = 30 + cos(frameCount * 2) * 20;
}
