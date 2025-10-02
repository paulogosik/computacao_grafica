// ======================================================
// EXEMPLO 1: Coordenadas Polares - ponto girando em círculo
// ======================================================
let angulo1 = 0;
let raio1 = 100;

function exemploPolar() {
  push();
  translate(width / 2, height / 2);
  stroke(200);
  noFill();
  ellipse(0, 0, raio1 * 2);

  let x = raio1 * cos(angulo1);
  let y = raio1 * sin(angulo1);

  fill(255, 0, 0);
  ellipse(x, y, 12);

  angulo1 = (angulo1 + 2) % 360;
  pop();
}

// ======================================================
// EXEMPLO 2: Trigonometria - onda senoidal
// ======================================================
let offset = 0;

function exemploSeno() {
  push();
  translate(0, height / 2);
  stroke(0, 255, 0);
  noFill();
  beginShape();
  for (let x = 0; x < width; x += 5) {
    let y = sin(x + offset) * 50;
    vertex(x, y);
  }
  endShape();
  offset += 5;
  pop();
}

// ======================================================
// EXEMPLO 3: Vetores - movimento de uma bolinha
// ======================================================
let pos, vel;

function setupVetores() {
  pos = createVector(width / 2, height / 2);
  vel = createVector(2, 3);
}

function exemploVetores() {
  pos.add(vel);
  if (pos.x > width || pos.x < 0) vel.x *= -1;
  if (pos.y > height || pos.y < 0) vel.y *= -1;

  fill(0, 0, 255);
  ellipse(pos.x, pos.y, 20);
}

// ======================================================
// EXEMPLO 4: Transformações 2D - quadrado rotacionando
// ======================================================
let angulo2 = 0;

function exemploTransformacoes() {
  push();
  translate(width / 2, height / 2);
  rotate(radians(angulo2));
  fill(255, 200, 0);
  rectMode(CENTER);
  rect(0, 0, 100, 100);
  angulo2 += 2;
  pop();
}

// ======================================================
// EXEMPLO 5: Robô Articulado - braço com duas juntas
// ======================================================
let angBraco = 45;
let angAnte = 30;

function exemploRobo() {
  push();
  translate(width / 2, height / 2 + 150);

  fill(150);
  rect(-25, -50, 50, 100);

  translate(0, -50);
  rotate(radians(angBraco));
  fill(200);
  rect(0, -10, 80, 20);

  translate(80, 0);
  rotate(radians(angAnte));
  fill(180);
  rect(0, -8, 60, 16);

  pop();

  angBraco = 45 + sin(frameCount * 2) * 30;
  angAnte = 30 + cos(frameCount * 2) * 20;
}

// ======================================================
// SETUP e DRAW PRINCIPAIS
// ======================================================
function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  setupVetores();
}

function draw() {
  background(30);

  // Ative/desative os exemplos comentando/descomentando:
  exemploPolar();
  // exemploSeno();
  // exemploVetores();
  // exemploTransformacoes();
  // exemploRobo();
}
