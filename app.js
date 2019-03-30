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
  canvasContext.fillStyle = backgroundTheme;
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  //Ball
  canvasContext.fillStyle = themeColor;
  canvasContext.fillRect(ballX, 200, ballWidth, ballHeight);

  //Left Paddle
  canvasContext.fillStyle = themeColor;
  canvasContext.fillRect(10, 210, 10, 100);
}

//Moves the movable pieces to the game
function moveAssets() {
  ballX = ballX + ballSpeedX;
  if (ballX >= canvas.width - ballWidth / 2 || ballX <= ballWidth / 2) {
    ballSpeedX = -ballSpeedX;
  }
}
