let osc;
let freqSlider;
let playing = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(20);

  osc = new p5.Oscillator("sawtooth");
  osc.amp(0.3);

  freqSlider = createSlider(100, 800, 440, 1);
  freqSlider.position(width / 2 - 150, height - 80);
  freqSlider.style("width", "300px");
}

function draw() {
  background(200, 230, 255);

  drawTrombone();

  fill(0);
  noStroke();
  text("Slide to change pitch", width / 2, height - 120);

  let freq = freqSlider.value();

  if (playing) {
    osc.freq(freq);
  }
}

function drawTrombone() {
  let slideX = map(
    freqSlider.value(),
    100,
    800,
    width / 2 - 200,
    width / 2 + 250
  );
  let y = height / 2;

  let brass = color(240, 200, 60);
  let brassDark = color(190, 150, 40);
  let brassShadow = color(160, 120, 30, 160);
  let metal = color(180);

  // darker top ellipse
  fill(brassShadow);
  ellipse(width / 2, y - 40, 640, 60);

  // lighter base ellipse
  fill(230, 190, 50, 150);
  ellipse(width / 2, y - 10, 650, 70);

  // Trombone body tubing
  strokeWeight(16);
  stroke(brass);
  line(width / 2 - 300, y, slideX, y);
  line(width / 2 - 300, y - 30, slideX, y - 30);

  // Slide section
  stroke(metal);
  strokeWeight(8);
  line(slideX, y, slideX + 100, y);
  line(slideX, y - 30, slideX + 100, y - 30);

  // Slide handle
  strokeWeight(6);
  line(slideX + 100, y - 30, slideX + 100, y);
  // Curved tubing
  noFill();
  stroke(brassDark);
  strokeWeight(14);
  arc(width / 2 + 270, y - 15, 120, 80, PI / 2, PI);

  // Bell
  noStroke();
  fill(brass);
  ellipse(width / 2 + 340, y - 15, 140, 100);
  fill(255, 230, 120, 100);
  ellipse(width / 2 + 340, y - 15, 90, 60);

  // Braces
  stroke(brassDark);
  strokeWeight(4);
  line(width / 2 - 200, y - 30, width / 2 - 200, y);
  line(width / 2, y - 30, width / 2, y);
}

function mousePressed() {
  if (!playing) {
    userStartAudio();
    osc.start();
    playing = true;
  }
}

function mouseReleased() {
  if (playing) {
    osc.stop();
    playing = false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  freqSlider.position(width / 2 - 150, height - 80);
}
