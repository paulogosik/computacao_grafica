// Arena radial com efeitos visuais robustos (p5.js)
// Controles:
// - ← →: gira o jogador
// - Espaço (segurar): carrega potência
// - Soltar Espaço: dispara
// - R: reinicia alvos
// Autor: Paulo (CG)

// =========================
// Configuração geral
// =========================
let angle = 0;             // Ângulo do jogador (rad)
let playerR = 160;         // Raio do jogador (distância do centro)
let minPower = 4;
let maxPower = 16;
let power = minPower;      // Potência atual (carregada)
let charging = false;

let projectiles = [];
let particles = [];
let targets = [];
let score = 0;

function setup() {
  createCanvas(900, 700);
  angleMode(RADIANS);
  resetTargets();
}

function draw() {
  drawRadialGradientBackground();

  // Centro visual da arena
  push();
  translate(width/2, height/2);
  drawArenaRings();

  // Atualização de ângulo com leve inércia visual (opcional)
  // angle += 0; // (ângulo é pelas teclas)

  // Alvos
  updateTargets();

  // Jogador na borda da arena
  const playerPos = polarToCartesian(playerR, angle);
  drawPlayer(playerPos);

  // Vetor de carregamento (HUD radial)
  drawAimVector(playerPos, angle, power);

  // Projetis
  updateProjectiles();

  // Partículas
  updateParticles();

  pop();

  // HUD e UI
  drawHUD();

  // Carregamento da potência
  if (charging) {
    power = lerp(power, maxPower, 0.08);
  } else {
    power = lerp(power, minPower, 0.12);
  }
}

// =========================
// Arena, HUD e Visual
// =========================
function drawRadialGradientBackground() {
  // Gradiente radial suave
  noStroke();
  const cx = width/2;
  const cy = height/2;
  const maxR = dist(0,0,cx,cy) * 1.2;
  for (let r = maxR; r > 0; r -= 6) {
    const t = r / maxR;
    const c = lerpColor(color(18, 24, 38), color(35, 68, 120), 1 - t);
    fill(red(c), green(c), blue(c), 210);
    ellipse(cx, cy, 2*r, 2*r);
  }
}

function drawArenaRings() {
  noFill();
  // Anéis com leve brilho
  for (let i = 0; i < 5; i++) {
    const rr = 120 + i*70;
    stroke(255, 255, 255, 18);
    strokeWeight(2);
    ellipse(0, 0, rr*2, rr*2);
    // Marcas angulares
    for (let k = 0; k < 12; k++) {
      const a = k * TWO_PI/12;
      const p1 = polarToCartesian(rr-6, a);
      const p2 = polarToCartesian(rr+6, a);
      stroke(255, 255, 255, 28);
      line(p1.x, p1.y, p2.x, p2.y);
    }
  }

  // Núcleo
  for (let g = 16; g > 0; g--) {
    const alpha = map(g, 16, 1, 10, 90);
    fill(120, 210, 255, alpha);
    noStroke();
    ellipse(0, 0, g*4, g*4);
  }
}

function drawPlayer(p) {
  // Traço ao centro
  stroke(120, 210, 255, 60);
  strokeWeight(2);
  line(0, 0, p.x, p.y);

  // Corpo com brilho
  noStroke();
  drawGlow(p.x, p.y, 20, color(120, 210, 255, 220), 6);
  fill(20, 220, 255);
  ellipse(p.x, p.y, 16, 16);

  // "Canhão" (retângulo orientado)
  push();
  translate(p.x, p.y);
  rotate(angle);
  fill(200);
  rect(0, -4, 26, 8, 3);
  pop();
}

function drawAimVector(p, a, pow) {
  const len = map(pow, minPower, maxPower, 40, 100);
  const tip = { x: p.x + len*cos(a), y: p.y + len*sin(a) };

  // Linha com efeito de “energia”
  stroke(255, 255, 255, 80);
  strokeWeight(2);
  line(p.x, p.y, tip.x, tip.y);

  // Ponta brilhante
  drawGlow(tip.x, tip.y, 18, color(255, 240, 120, 180), 5);
  noStroke();
  fill(255, 240, 120);
  ellipse(tip.x, tip.y, 6, 6);
}

function drawHUD() {
  noStroke();
  fill(255, 255, 255, 220);
  textFont('monospace');
  textSize(14);
  const deg = degrees(angle) % 360;
  text(`Ângulo: ${nf((deg<0?deg+360:deg),2,0)}°`, 16, 28);
  text(`Potência: ${power.toFixed(1)} / ${maxPower}`, 16, 48);
  text(`Pontuação: ${score}`, 16, 68);
  text(`Controles: ← → girar | Segure Espaço para carregar e solte para disparar | R reinicia alvos`, 16, height-16);
}

// =========================
// Alvos
// =========================
function resetTargets() {
  targets = [];
  score = 0;
  const rings = [240, 310, 380];
  const perRing = [8, 10, 12];

  for (let rIdx = 0; rIdx < rings.length; rIdx++) {
    const R = rings[rIdx];
    const n = perRing[rIdx];
    for (let i = 0; i < n; i++) {
      const baseA = i * TWO_PI / n;
      targets.push({
        R,
        baseA,
        a: baseA,
        hit: false,
        pulse: random(0, TWO_PI),
        spin: random([-1,1]) * random(0.0015, 0.004), // rotação lenta
        hue: random(180, 360)
      });
    }
  }
}

function updateTargets() {
  for (let t of targets) {
    if (t.hit) continue;
    // Pulsação radial
    t.pulse += 0.08;
    const p = sin(t.pulse)*4;
    // Rotação lenta
    t.a += t.spin;

    const pos = polarToCartesian(t.R + p, t.a);

    // Brilho pulsante
    const alpha = map(sin(t.pulse), -1, 1, 60, 140);
    const baseCol = color(255, 90, 120, alpha);
    drawGlow(pos.x, pos.y, 24, baseCol, 6);

    // Corpo
    noStroke();
    fill(255, 120, 140);
    ellipse(pos.x, pos.y, 18, 18);

    // Anel externo leve
    noFill();
    stroke(255, 180, 200, 80);
    strokeWeight(2);
    ellipse(pos.x, pos.y, 26, 26);

    t._pos = pos; // cache posição para colisão
  }
}

// =========================
/* Projetis e Partículas */
// =========================
function spawnProjectile(origin, a, speed) {
  const vx = speed * cos(a);
  const vy = speed * sin(a);
  projectiles.push({
    x: origin.x,
    y: origin.y,
    vx,
    vy,
    life: 280,
    trail: []
  });
}

function updateProjectiles() {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i];

    // Movimento retilíneo (sem gravidade para manter radial)
    p.x += p.vx;
    p.y += p.vy;

    // Trilhas (rastro brilhante)
    p.trail.push({ x: p.x, y: p.y, alpha: 180 });
    if (p.trail.length > 20) p.trail.shift();
    for (let j = 0; j < p.trail.length; j++) {
      const t = p.trail[j];
      const a = map(j, 0, p.trail.length-1, 30, 120);
      drawGlow(t.x, t.y, 12, color(255, 230, 120, a), 3);
    }

    // Render projétil com glow
    drawGlow(p.x, p.y, 22, color(255, 250, 150, 200), 6);
    noStroke();
    fill(255, 250, 180);
    ellipse(p.x, p.y, 6, 6);

    // Colisão com alvos
    for (let t of targets) {
      if (t.hit || !t._pos) continue;
      const d = dist(p.x, p.y, t._pos.x, t._pos.y);
      if (d < 14) {
        t.hit = true;
        score += 10;
        explode(t._pos.x, t._pos.y, color(255, 180, 120), color(255, 240, 180));
      }
    }

    // Vida e descarte
    p.life--;
    const out = abs(p.x) > width || abs(p.y) > height; // coordenadas relativas ao centro
    if (p.life <= 0 || out) {
      projectiles.splice(i, 1);
    }
  }
}

function explode(x, y, c1, c2) {
  // Flash central
  for (let i = 0; i < 10; i++) {
    particles.push({
      x, y,
      vx: random(-0.6, 0.6),
      vy: random(-0.6, 0.6),
      r: random(10, 28),
      col: c2,
      life: 24
    });
  }
  // Fragmentos
  for (let i = 0; i < 40; i++) {
    const a = random(TWO_PI);
    const sp = random(1.2, 3.2);
    particles.push({
      x, y,
      vx: cos(a)*sp,
      vy: sin(a)*sp,
      r: random(2, 5),
      col: c1,
      life: random(30, 60),
      grav: 0.02
    });
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.grav ? p.grav : 0;
    p.life--;

    // brilho
    const a = map(p.life, 0, 60, 0, 180);
    drawGlow(p.x, p.y, p.r*2, color(red(p.col), green(p.col), blue(p.col), a), 4);

    noStroke();
    fill(red(p.col), green(p.col), blue(p.col), a);
    ellipse(p.x, p.y, p.r, p.r);

    if (p.life <= 0) particles.splice(i, 1);
  }
}

// =========================
// Utilidades visuais e matemáticas
// =========================
function drawGlow(x, y, radius, col, layers=4) {
  push();
  noStroke();
  for (let i = layers; i > 0; i--) {
    const r = map(i, 1, layers, radius*0.3, radius);
    const a = map(i, 1, layers, 220, 20);
    fill(red(col), green(col), blue(col), a);
    ellipse(x, y, r, r);
  }
  pop();
}

function polarToCartesian(r, theta) {
  return { x: r * cos(theta), y: r * sin(theta) };
}

// =========================
// Entrada
// =========================
function keyPressed() {
  if (keyCode === LEFT_ARROW) angle -= 0.1;
  if (keyCode === RIGHT_ARROW) angle += 0.1;

  if (key === ' ' && !charging) {
    charging = true;
  }

  if (key === 'r' || key === 'R') {
    resetTargets();
  }
}

function keyReleased() {
  if (key === ' ' && charging) {
    charging = false;
    // Origem do tiro na posição do jogador
    const origin = polarToCartesian(playerR, angle);
    spawnProjectile(origin, angle, power);
  }
}