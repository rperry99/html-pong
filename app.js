let canvas, canvasContext;
let backgroundTheme = "#111111";
let themeColor = "#bada55";

//Ball Variables
let ballWidth = 10;
let ballHeight = 10;
let ballX = 50;
let ballSpeedX = 5;

window.onload = () => {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  let fps = 30;
  setInterval(() => {
    drawAssets();
    moveAssets();
  }, 1000 / fps);
};

//Draws the pieces to the game
function drawAssets() {
  //Canvas
  drawShape(0, 0, canvas.width, canvas.height, backgroundTheme);

  //Ball
  canvasContext.fillStyle = themeColor;
  canvasContext.beginPath();
  //Arc Paramters (xPos, yPos, radius (size), angle, radian, clockwise(T) || CounterClockwise(F))
  canvasContext.arc(ballX, 100, 5, 0, Math.PI * 2, true);
  canvasContext.fill();

  //Left Paddle
  drawShape(10, 210, 10, 100, themeColor);
}

//Template function to draw shapes
function drawShape(x, y, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

//Moves the movable pieces to the game
function moveAssets() {
  ballX = ballX + ballSpeedX;
  if (ballX >= canvas.width - ballWidth / 2 || ballX <= ballWidth / 2) {
    ballSpeedX = -ballSpeedX;
  }
}
