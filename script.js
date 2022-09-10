const canvas = document.querySelector("canvas");
const ctx =  canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.fillStyle = "green";

let dx = 0;
let dy = -1;

let snakeBody = [[19, 21], [20, 21], [21, 21], [22, 21], [23, 21], [24, 21]];

let foods = [];

function drawDot(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
}
function drawSnake() {
  snakeBody.forEach((e) => {
    drawDot(e[0], e[1], "green");
  });
}

function moveSnake() {
  let newX = snakeBody[0][0] + dx;
  let newY = snakeBody[0][1] + dy;
  snakeBody = [[newX, newY],].concat(snakeBody);
  snakeBody.pop();
}

function goUp() {
  dx = 0;
  dy = -1;
}
function goDown() {
  dx = 0;
  dy = 1;
}
function goLeft() {
  dx = -1;
  dy = 0;
}
function goRight() {
  dx = 1;
  dy = 0;
}

function makeFood() {
  let x = Math.floor(Math.random() * 100) % 30;
  let y = Math.floor(Math.random() * 100) % 30;
  foods.push([x, y]);
}
function drawFood() {
  foods.forEach((e) => {
    drawDot(e[0], e[1], "yellow");
  })
}

function detectEat() {
  let nextX = snakeBody[0][0] + dx;
  let nextY = snakeBody[0][1] + dy;
  foods = foods.filter((e) => {
    if(e[0] === nextX && e[1] === nextY) {
      snakeBody = [e].concat(snakeBody);
      ctx.clearRect(0, 0, 30, 30);
      drawSnake();
      drawFood();
      return false;
    } else {
      return true;
    }
  });
}

drawSnake();

setInterval(() => {
  if (Math.floor(Math.random() * 100) % 20 === 1) {
    makeFood();
  }
  moveSnake();
  ctx.clearRect(0, 0, 30, 30);
  drawSnake();
  drawFood();
  detectEat();
}, 500);

const buttonIds = ["Up", "Down", "Left", "Right"];
buttonIds.forEach((e) => {
  const element = document.querySelector("#" + e);
  element.addEventListener("click", window["go" + e]);
})