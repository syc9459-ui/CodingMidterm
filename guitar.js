let strings = [];
let frets = 6;
let noteNames = ["E", "A", "D", "G", "B", "E"];
let baseFreqs = [82.41, 110, 146.83, 196, 246.94, 329.63];
let noteClicked = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Arial");
  textAlign(CENTER, CENTER);

  let topMargin = height / 2 - 70;
  let spacing = 30;
  strings = [];

  for (let i = 0; i < noteNames.length; i++) {
    strings.push({
      y: topMargin + i * spacing,
      freq: baseFreqs[i],
      note: noteNames[i],
    });
  }
}

function draw() {
  background(230, 200, 150);
  drawGuitarBody();
  drawFrets();
  drawStrings();
  drawLabels();

  fill(0);
  textSize(22);
  text("🎸 Click a String", width / 2, 60);
}

function drawGuitarBody() {
  let centerX = width / 2;

  // guitar neck
  fill(130, 100, 70);
  rectMode(CENTER);
  rect(centerX + 260, height / 2, 400, 175, 20);

  // guitar body
  fill(190, 140, 80);
  ellipse(centerX - 150, height / 2, 290, 360);
  ellipse(centerX, height / 2, 290, 285);

  fill(50, 30, 15);
  ellipse(centerX - 60, height / 2, 140, 130);
}

function drawFrets() {
  let centerX = width / 2;
  stroke(90);
  for (let i = 0; i <= frets; i++) {
    let x = map(i, 0, frets, centerX - 50, centerX + 350);
    strokeWeight(2);
    line(x, height / 2 - 70, x, height / 2 + 80);
  }
}

function drawStrings() {
  let centerX = width / 2;
  for (let i = 0; i < strings.length; i++) {
    let s = strings[i];
    stroke(60);
    strokeWeight(map(i, 0, 5, 4, 2));
    line(centerX - 50, s.y, centerX + 450, s.y);
  }
}

function drawLabels() {
  noStroke();
  fill(0);
  textSize(16);
  let centerX = width / 2;
  for (let i = 0; i < strings.length; i++) {
    let s = strings[i];
    text(s.note, centerX - 80, s.y);
  }
}

function mousePressed() {
  let centerX = width / 2;
  for (let i = 0; i < strings.length; i++) {
    let s = strings[i];
    if (abs(mouseY - s.y) < 10) {
      for (let f = 0; f <= frets; f++) {
        let x1 = map(f, 0, frets, centerX - 50, centerX + 350);
        let x2 = map(f + 1, 0, frets, centerX - 50, centerX + 200);
        if (mouseX > x1 && mouseX < x2) {
          let freq = s.freq * pow(2, f / 12);
          playGuitarSound(freq);
          noteClicked = { string: i, fret: f };
          return;
        }
      }
    }
  }
}

function playGuitarSound(freq) {
  let osc = new p5.Oscillator("triangle");
  let env = new p5.Envelope();
  osc.freq(freq);
  osc.amp(0);
  osc.start();
  env.setADSR(0.01, 0.1, 0.2, 0.3);
  env.setRange(0.4, 0);
  env.play(osc);
  setTimeout(() => {
    osc.stop();
    osc.disconnect();
  }, 500);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
