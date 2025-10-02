// Este sketch combina as duas atividades:
// 1. Simulação com coordenadas polares e trigonometria
// 2. Robô articulado com vetores, transformações 2D e animação

// Variáveis para a simulação polar
let angulo = 0;      // Ângulo inicial em graus
let raio = 150;      // Raio da circunferência

// Variáveis para o robô articulado
let anguloBraco = 45;       // Ângulo do braço principal
let anguloAntebraco = 30;   // Ângulo do antebraço

function setup() {
  // Cria uma tela de 600x600 pixels
  createCanvas(600, 600);

  // Define que os ângulos serão trabalhados em graus (padrão é radianos)
  angleMode(DEGREES);
}

function draw() {
  // Limpa a tela a cada frame com cor de fundo escura
  background(30);

  // Chama a função que desenha o robô articulado
  desenharRobo();

  // Chama a função que desenha a simulação polar
  desenharPolar();
}

// Função que desenha o robô articulado
function desenharRobo() {
  push(); // Salva o estado atual da transformação

  // Move o sistema de coordenadas para a base do robô
  translate(width / 2, height / 2 + 200);

  // Desenha o corpo do robô
  fill(100, 150, 255); // Cor azulada
  rect(-25, -50, 50, 100); // Corpo central

  // Move para o ombro
  translate(0, -50);

  // Rotaciona o braço principal
  rotate(radians(anguloBraco));

  // Desenha o braço
  fill(200); // Cor cinza clara
  rect(0, -10, 80, 20); // Braço horizontal

  // Move para o cotovelo
  translate(80, 0);

  // Rotaciona o antebraço
  rotate(radians(anguloAntebraco));

  // Desenha o antebraço
  fill(180); // Cor cinza escura
  rect(0, -8, 60, 16); // Antebraço

  pop(); // Restaura o estado anterior da transformação

  // Anima os ângulos com funções trigonométricas
  // Isso cria um movimento suave e contínuo
  anguloBraco = 45 + sin(frameCount * 2) * 30;
  anguloAntebraco = 30 + cos(frameCount * 2) * 20;
}

// Função que desenha a simulação com coordenadas polares
function desenharPolar() {
  push(); // Salva o estado atual da transformação

  // Move o sistema de coordenadas para o topo da tela
  translate(width / 2, height / 2 - 200);

  // Desenha a circunferência base
  stroke(255); // Cor branca
  noFill();    // Sem preenchimento
  ellipse(0, 0, raio * 2); // Circunferência com diâmetro = 2 * raio

  // Calcula a posição do ponto usando trigonometria
  // Fórmulas de coordenadas polares:
  // x = r * cos(θ)
  // y = r * sin(θ)
  let x = raio * cos(angulo);
  let y = raio * sin(angulo);

  // Desenha o ponto girando
  fill(255, 0, 0); // Vermelho
  noStroke();
  ellipse(x, y, 12); // Ponto circular

  // Desenha uma linha do centro até o ponto
  stroke(255);
  line(0, 0, x, y);

  // Atualiza o ângulo para girar o ponto
  angulo = (angulo + 1) % 360;

  // Exibe os valores trigonométricos na tela
  fill(255);
  noStroke();
  textSize(14);
  text(`Ângulo: ${angulo}°`, -width / 2 + 20, -height / 2 + 20);
  text(`x = raio * cos(θ) = ${x.toFixed(2)}`, -width / 2 + 20, -height / 2 + 40);
  text(`y = raio * sin(θ) = ${y.toFixed(2)}`, -width / 2 + 20, -height / 2 + 60);

  pop(); // Restaura o estado anterior da transformação
}
