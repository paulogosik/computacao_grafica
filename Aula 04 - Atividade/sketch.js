let angulo = 0;
let estrelas = [];

function setup() {
  createCanvas(800, 600);

  for (let i = 0; i < 200; i++) {
    estrelas.push({
      x: random(width),
      y: random(height / 1.5)
    });
  }
}

function draw() {
  let centroX = width / 2;
  let centroY = height;
  let raio = width / 2.2;

  let astroX = centroX + raio * cos(angulo);
  let astroY = centroY + raio * sin(angulo);

  let corCeu = map(astroY, height, height / 3, 0, 200);
  background(0, corCeu / 2.5, corCeu);

  if (astroY > height / 2) {
    fill(255, 255, 255, 150);
    noStroke();
    for (let i = 0; i < estrelas.length; i++) {
      ellipse(estrelas[i].x, estrelas[i].y, 3, 3);
    }
  }

  let eSol = astroY < height;

  if (eSol) {
    fill(255, 255, 0);
  } else {
    fill(200, 200, 200);
  }
  noStroke();
  ellipse(astroX, astroY, 80, 80);

  fill(0, 150, 0);
  noStroke();
  rect(0, height - 100, width, 100);

  angulo += 0.005;
}