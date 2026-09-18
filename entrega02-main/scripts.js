let canvas;
let ctx;

const player = {
  x: 50,
  y: 0,
  speed: 4,
  speedX: 0,
  speedY: 0,
  size: 50,
  gravity: 0.5,     
  jumpForce: -14,    
  onGround: false  
};

const platforms = [
    { x: 150, y: 400, width: 200, height: 20 },
    { x: 450, y: 300, width: 250, height: 20 },
    { x: 250, y: 180, width: 180, height: 20 }
];

const keys = {
  a: false,
  d: false,
  w: false
};

window.addEventListener("load", start);

function start() {
  canvas = document.getElementById("GameCanvas");
  ctx = canvas.getContext("2d");

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
  
  gameLoop();
}

function onKeyDown(e) {
  if (e.key === "d") keys.d = true;
  if (e.key === "a") keys.a = true;
  if (e.key === "w" || e.key === " ") keys.w = true;
}

function onKeyUp(e) {
  if (e.key === "d") keys.d = false;
  if (e.key === "a") keys.a = false;
  if (e.key === "w" || e.key === " ") keys.w = false;
}

function update() {
  if (keys.d) {
    player.speedX = player.speed;
  } else if (keys.a) {
    player.speedX = -player.speed;
  } else {
    player.speedX = 0;
  }

  player.speedY += player.gravity;

  if (keys.w && player.onGround) {
    player.speedY = player.jumpForce;
    player.onGround = false;
  }

  player.x += player.speedX;
  if (player.x < 0) {
    player.x = 0;
  } else if (player.x + player.size > canvas.width) {
    player.x = canvas.width - player.size;
  }

  player.y += player.speedY;
  player.onGround = false;

  for (let plat of platforms) {
    if (player.x + player.size > plat.x &&
        player.x < plat.x + plat.width &&
        player.y + player.size > plat.y &&
        player.y < plat.y + plat.height) {
        
        if (player.speedY > 0 && (player.y + player.size - player.speedY) <= plat.y) {
            player.y = plat.y - player.size;
            player.speedY = 0;
            player.onGround = true;
        }
    }
  }

  if (player.y + player.size > canvas.height) {
    player.y = canvas.height - player.size;
    player.speedY = 0;
    player.onGround = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#334155";
  for (let plat of platforms) {
    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
  }

  ctx.fillStyle = "#10B981"; 
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}
