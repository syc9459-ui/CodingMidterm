let notes = ["C", "D", "E", "F", "G", "A", "B"];
let freqs = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88];
let osc;
let keyWidth;

function setup() {
  createCanvas(windowWidth, 300);
  keyWidth = width / notes.length;
  osc = new p5.Oscillator("sine");
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(255);
  for (let i = 0; i < notes.length; i++) {
    fill(255);
    stroke(0);
    rect(i * keyWidth, 0, keyWidth, height);
    fill(0);
    text(notes[i], i * keyWidth + keyWidth / 2, height - 40);
  }
}

function mousePressed() {
  let i = floor(mouseX / keyWidth);
  if (i >= 0 && i < notes.length) {
    osc.start();
    osc.freq(freqs[i]);
  }
}

function mouseReleased() {
  osc.stop();
}

function windowResized() {
  resizeCanvas(windowWidth, 300);
  keyWidth = width / notes.length;
}
