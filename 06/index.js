const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

const images = {
  bird: new Image(),
  background: new Image(),
  column: new Image(),
};

// Start
images.bird.src = 'bird.png';
images.background.src = 'bg.png';
images.column.src = 'column.png';

window.addEventListener('keydown', (event) => {
  if (event.keyCode === 38) {
    bird.vy = -300;
  }
})

const bird = {
  x: 50,
  y: canvas.height / 2 - 25,
  width: 30,
  height: 50,
  
  vy: 0,   // px/s
  ay: 250,    // px/s^2
};
let points = 0;

const columns = []
const GAP = 150;    // px, the gap between the upper and lower column
const COLUMN_DISTANCE = 300;  // px, distance between consecutive columns
const COLUMN_VELOCITY = -2;  // px, horizontal speed of columns

let isEnd = false

// State = data
let prevTime = performance.now();

function gameLoop(now = performance.now()) {
    const dt = (now - prevTime) / 1000;
    prevTime = now;

    update(dt);
    draw();

    if (!isEnd) requestAnimationFrame(gameLoop);
}

function update(dt) {
  // Updating application state
  // TBD
  // Changing velocity: da = v * dt
  // Changing position: ds = v * dt
  if (bird.vy < 0) {
    bird.vy += 10;
  }
  
  let newY = bird.y + bird.vy * dt + 2;
  if (newY > canvas.height - bird.height) {
    newY = canvas.height - bird.height;
  }
  else if (newY < 0) {
    newY = 0;
  }
  bird.y = newY;



  // moving columns
  columns.forEach(column => {
    column.x += COLUMN_VELOCITY;
  });


  // Add a pair of columns
  // If the last column moved from the right edge of canvas to COLUMN_DISTANCE,
  // then add a new pair of column
  if (columns[0].x + columns[0].width === COLUMN_DISTANCE) {
    newColumn();
  }

    // removing columns
    // If the column on the beginning of the array has left the canvas, remove the first two columns (array.shift())
  if (columns[0].x + columns[0].width < 0) {
    columns.shift();
    columns.shift();
    points++;
  }

  columns.forEach(column => {
    if (isCollide(column, bird)) {
      isEnd = true;
    };
  });

  
  if (bird.y === 0 || (bird.y === canvas.height - bird.height)) {
    isEnd = true;
  };
}

function draw() {
  drawBackground();
  drawBird();
  drawColumns();
  drawPoints();
  
  // The end
  if (isEnd) {
    ctx.fillStyle = 'red';
    ctx.font = '100px serif';
    ctx.fillText('Game over', 10, 50);
  }

}
function drawPoints() {
  ctx.fillStyle = 'red';
  ctx.font = '100px serif';
  ctx.fillText(points, canvas.width-50, 50);
}

function drawBackground() {
  ctx.fillStyle = "lightblue";
  ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);
}

function drawBird() {
  ctx.fillStyle = "brown";
  ctx.drawImage(images.bird, bird.x, bird.y, bird.width, bird.height);
}

function drawColumns() {
  ctx.fillStyle = "white";
  columns.forEach(column => {
    ctx.drawImage(images.column, column.x, column.y, column.width, column.height);
  });
}

function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}
function newColumn() {
  const h = random(10, canvas.height / 2);
  columns.push(
      {
          x: canvas.width,
          y: 0,
          width: 30,
          height: h,
      },
      {
          x: canvas.width,
          y: h + GAP,
          width: 30,
          height: canvas.height - GAP - h,
      },
  );
}

function isCollide(a, b) {
  return !(
      b.y + b.height  < a.y ||
      a.x + a.width < b.x ||
      a.y + a.height  < b.y ||
      b.x + b.width < a.x
  );
}

// Start
newColumn()

// Start
gameLoop();