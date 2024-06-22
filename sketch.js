const hueSpinner = document.getElementById("hueSpinner");
const satSpinner = document.getElementById("satSpinner");
const valSpinner = document.getElementById("valSpinner");

const attemptCounter = document.getElementById("attemptCounter");
const accuracyLabel = document.getElementById("accuracyLabel");
let attempts = 0;

let secretColor;
let playerColor;

let sH, sS, sV;
let pH, pS, pV;

let alreadyWon = false;


// Called when the program starts
function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 100);
  
  Reset();
}


// Draws every frame
function draw() {
  background(0);
  
  // Wrap spinners
  if (hueSpinner.value < 0) {
    hueSpinner.value = 100;
  } else if (hueSpinner.value > 100) {
    hueSpinner.value = 0;
  }
  if (satSpinner.value < 0) {
    satSpinner.value = 100;
  } else if (satSpinner.value > 100) {
    satSpinner.value = 0;
  }
  if (valSpinner.value < 0) {
    valSpinner.value = 100;
  } else if (valSpinner.value > 100) {
    valSpinner.value = 0;
  }
  
  // Type safety clamping
  pH = constrain(hueSpinner.value, 0, 100);
  pS = constrain(satSpinner.value, 0, 100);
  pV = constrain(valSpinner.value, 0, 100);
  
  // Draw left circle
  playerColor = color(pH, pS, pV);
  fill(playerColor);
  circle(100, 200, 100);
  
  // Draw right circle
  fill(secretColor);
  circle(300, 200, 100);
}


// Starts a new game
function Reset() {
  alreadyWon = false;
  
  document.getElementById("secret").innerHTML = "";
  accuracyLabel.innerHTML = "Accuracy: ?.??%";
  
  attempts = 0;
  attemptCounter.innerHTML = "Attempts: 0"
  
  hueSpinner.value = 50;
  satSpinner.value = 50;
  valSpinner.value = 50;
  
  sH = round(random(0, 100));
  sS = round(random(0, 100));
  sV = round(random(0, 100));
  
  secretColor = color(sH, sS, sV);
}


// Checks the current guess
function Check() {
  if (!alreadyWon) {
    attempts++;
  }
  
  if (pH == sH && pS == sS && pV == sV) {
    // Correct guess
    alreadyWon = true;
    document.getElementById("secret").innerHTML = "Secret Color: (" +
      str(sH) + ", " + str(sS) + ", " + str(sV) + ")";
  }  
  
  attemptCounter.innerHTML = "Attempts: " + str(attempts);
  
  difference = abs((
    min(abs(pH -sH), abs(abs(pH - 101) - sH)) +
    min(abs(pS -sS), abs(abs(pS - 101) - sS)) +
    min(abs(pV -sV), abs(abs(pV - 101) - sV))
    )- 150);
  ratio = floor(sq((difference / 150)) * 10000) / 100;
  accuracyLabel.innerHTML = "Accuracy: " + str(ratio) + "%";
}