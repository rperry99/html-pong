let canvas, canvasContext;
let backgroundTheme = "#111111";
let themeColor = "#bada55";

//Ball Variables
let ballWidth = 8;
let ballHeight = 10;
let ballX = 50;
let ballY = 50;
const BALL_SPEED_X = 10;
let ballSpeedX = BALL_SPEED_X;
const BALL_SPEED_Y = 4;
let ballSpeedY = BALL_SPEED_Y;

//Player Paddle Variables
let playerPaddleY = 250;
let playerPaddleHeight = 100;
let playerPaddleWidth = 10;

//Computer Paddle Variables
let comPaddleY = 250;
let comPaddleHeight = 100;
let comPaddleWidth = 10;

//Scores & Game End
let playerScore = 0;
let comScore = 0;
const WINNING_SCORE = 5;
let showingWinner = false;

window.onload = () => {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  let fps = 30;
  setInterval(() => {
    moveAssets();
    drawAssets();
  }, 1000 / fps);
  canvas.addEventListener("mousemove", event => {
    let mousePos = mousePosition(event);
    playerPaddleY = mousePos.y - playerPaddleHeight / 2;
  });
  canvas.addEventListener("mousedown", event => {
    if (showingWinner) {
      playerScore = 0;
      comScore = 0;
      showingWinner = false;
    }
  });
};

//Draws the pieces to the game
function drawAssets() {
  //Canvas
  drawRectangle(0, 0, canvas.width, canvas.height, backgroundTheme);

  if (showingWinner) {
    canvasContext.fillStyle = themeColor;
    playerScore >= WINNING_SCORE
      ? canvasContext.fillText("Player Wins!", 350, 200)
      : canvasContext.fillText("Computer Wins!", 350, 200);
    canvasContext.fillText("click to continue", 350, 500);
    return;
  }

  //Net
  drawNet();

  //Ball
  drawCircle(ballX, ballY, themeColor);

  //Player (left) Paddle
  drawRectangle(0, playerPaddleY, playerPaddleWidth, 100, themeColor);

  //Computer (right) Paddle
  drawRectangle(
    canvas.width - comPaddleWidth,
    comPaddleY,
    comPaddleWidth,
    100,
    themeColor
  );

  //Score display
  canvasContext.fillText(playerScore, 100, 100);
  canvasContext.fillText(comScore, canvas.width - 100, 100);
}

//Template function to draw the net
function drawNet() {
  for (let i = 0; i < canvas.height; i += 40) {
    drawRectangle(canvas.width / 2 - 1, i, 2, 20, themeColor);
  }
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

function computerAI() {
  let comPaddleYCenter = comPaddleY + comPaddleHeight / 2;
  if (comPaddleYCenter < ballY - 35) {
    comPaddleY += 6;
  } else if (comPaddleYCenter > ballY + 35) {
    comPaddleY -= 6;
  }
}

//Moves the movable pieces to the game
function moveAssets() {
  //Did someone win?
  if (showingWinner) {
    return;
  }

  //Computer AI
  computerAI();

  //Rebounding
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballX > canvas.width - ballWidth / 2) {
    if (ballY > comPaddleY && ballY < comPaddleY + comPaddleHeight) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (comPaddleY + comPaddleHeight / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      playerScore++;
      resetBall();
    }
  }
  if (ballX < ballWidth / 2) {
    if (ballY > playerPaddleY && ballY < playerPaddleY + playerPaddleHeight) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (playerPaddleY + playerPaddleHeight / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      comScore++;
      resetBall();
    }
  }
  if (ballY >= canvas.height - ballWidth / 2 || ballY <= ballWidth / 2) {
    ballSpeedY = -ballSpeedY;
  }
}

//Function to find mouse position
function mousePosition(event) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = event.clientX - rect.left - root.scrollLeft;
  let mouseY = event.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

//Function to Reset the ball when it misses the paddle
function resetBall() {
  if (playerScore >= WINNING_SCORE || comScore >= WINNING_SCORE) {
    showingWinner = true;
  }
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = BALL_SPEED_X;
  ballSpeedY = BALL_SPEED_Y;
}
