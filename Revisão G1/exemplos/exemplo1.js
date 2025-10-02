// Atividade 01: Coordenadas Polares e Trigonometria

let angulo = 0; // Ângulo inicial
let raio = 150; // Raio da circunferência

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES); // Trabalhar com ângulos em graus
}

function draw() {
  background(30);
  translate(width / 2, height / 2); // Centraliza o sistema de coordenadas

  // Desenha a circunferência base
  stroke(100);
  noFill();
  ellipse(0, 0, raio * 2);

  // Calcula posição usando coordenadas polares
  let x = raio * cos(angulo);
  let y = raio * sin(angulo);

  // Desenha o ponto girando
  fill(255, 0, 0);
  noStroke();
  ellipse(x, y, 12);

  // Linha do centro até o ponto
  stroke(255);
  line(0, 0, x, y);

  // Atualiza o ângulo para animar o movimento circular
  angulo = (angulo + 1) % 360;

  // Exibe os valores trigonométricos
  fill(255);
  noStroke();
  textSize(14);
  text(`Ângulo: ${angulo}°`, -width / 2 + 20, -height / 2 + 20);
  text(`x = raio * cos(θ) = ${x.toFixed(2)}`, -width / 2 + 20, -height / 2 + 40);
  text(`y = raio * sin(θ) = ${y.toFixed(2)}`, -width / 2 + 20, -height / 2 + 60);
}

// Atividade 02: Robô Articulado com Vetores e Transformações 2D

// Define os ângulos das articulações
let anguloBraco = 45;
let anguloAntebraco = 30;

function drawRobo() {
  push();
  translate(width / 2, height / 2 + 200); // Posição base do robô

  // Corpo
  fill(100, 150, 255);
  rect(-25, -50, 50, 100);

  // Ombro
  translate(0, -50);
  rotate(radians(anguloBraco));

  // Braço
  fill(200);
  rect(0, -10, 80, 20);

  // Cotovelo
  translate(80, 0);
  rotate(radians(anguloAntebraco));

  // Antebraço
  fill(180);
  rect(0, -8, 60, 16);

  pop();

  // Atualiza os ângulos para animar
  anguloBraco = 45 + sin(frameCount * 2) * 30;
  anguloAntebraco = 30 + cos(frameCount * 2) * 20;
}

// Adiciona o robô à simulação
function draw() {
  background(30);
  drawRobo(); // Robô articulado
  drawPolar(); // Movimento circular
}

function drawPolar() {
  push();
  translate(width / 2, height / 2 - 200);
  stroke(255);
  noFill();
  ellipse(0, 0, raio * 2);

  let x = raio * cos(angulo);
  let y = raio * sin(angulo);

  fill(255, 0, 0);
  noStroke();
  ellipse(x, y, 12);
  stroke(255);
  line(0, 0, x, y);

  angulo = (angulo + 1) % 360;
  pop();
}
