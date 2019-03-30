let canvas, canvasContext;
let backgroundTheme = "#111111";
let themeColor = "#bada55";
let ballX = 50;

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
  canvasContext.fillRect(ballX, 200, 10, 10);

  //Left Paddle
  canvasContext.fillStyle = themeColor;
  canvasContext.fillRect(10, 210, 10, 100);
}

//Moves the movable pieces to the game
function moveAssets() {
  ballX = ballX + 5;
}
