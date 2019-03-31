let canvas, canvasContext;
let backgroundTheme = "#111111";
let themeColor = "#bada55";

//Ball Variables
let ballWidth = 8;
let ballHeight = 10;
let ballX = 50;
let ballSpeedX = 5;
let ballY = 50;
let ballSpeedY = 4;

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
  drawRectangle(0, 0, canvas.width, canvas.height, backgroundTheme);

  //Ball
  drawCircle(ballX, ballY, themeColor);

  //Left Paddle
  drawRectangle(10, 210, 10, 100, themeColor);
}

//Template function to draw rectangles/squares
function drawRectangle(x, y, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

//Tempate function to draw circles
function drawCircle(x, y, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  //Arc Paramters (xPos, yPos, radius (size), angle, radian, clockwise(T) || CounterClockwise(F))
  canvasContext.arc(x, y, ballWidth, 0, Math.PI * 2, true);
  canvasContext.fill();
}

//Moves the movable pieces to the game
function moveAssets() {
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  if (ballX >= canvas.width - ballWidth / 2 || ballX <= ballWidth / 2) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY >= canvas.height - ballWidth / 2 || ballY <= ballWidth / 2) {
    ballSpeedY = -ballSpeedY;
  }
}
