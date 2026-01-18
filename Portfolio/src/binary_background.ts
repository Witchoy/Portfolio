import "./style.css";

const canvas = document.getElementById(
  "profile_background",
) as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

let offsetX = 0;
let offsetY = 0;
const speed = 0.5;
let cols: number, rows: number, cellSize: number;

function drawGrid() {
  cellSize = 30;

  // Calculate columns and rows based on window size
  const maxWidth = window.innerWidth - 40; // Leave some margin
  const maxHeight = window.innerHeight - 40;

  cols = Math.floor(maxWidth / cellSize) + 2; // Extra cells for seamless loop
  rows = Math.floor(maxHeight / cellSize) + 2;

  // Set canvas size to fit grid perfectly
  canvas.width = (cols - 2) * cellSize;
  canvas.height = (rows - 2) * cellSize;
}

function animate() {
  if (!ctx) return;
  
  ctx.fillStyle = "#0F1116";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update offset for diagonal movement
  offsetX -= speed;
  offsetY -= speed;

  // Reset offset when it reaches cellSize for seamless loop
  if (offsetX <= -cellSize) offsetX = 0;
  if (offsetY <= -cellSize) offsetY = 0;

  // Draw grid of alternating 0 and 1
  ctx.fillStyle = "#88C9DD";
  ctx.font = '20px "Consolas", "Courier New", monospace';

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const value = (i + j) % 2 === 0 ? "0" : "1";
      const x = i * cellSize + 10 + offsetX;
      const y = j * cellSize + 20 + offsetY;
      ctx.fillText(value, x, y);
    }
  }

  requestAnimationFrame(animate);
}

// Initialize and start animation
drawGrid();
animate();

// Redraw on window resize
window.addEventListener("resize", drawGrid);
