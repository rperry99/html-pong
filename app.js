let canvas;
let canvasContext;

window.onload = () => {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  drawAssets();
};

function drawAssets() {
  canvasContext.fillStyle = "#111";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}
