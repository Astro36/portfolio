const CIRCLE = Math.PI * 2;

const canvas = document.querySelector('#particles');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

let generator = null;
let stars = null;
let meteor = null;

const random = (n) => Math.random() * n;
const randomRange = (min, max) => random(max - min) + min;

const initObjects = () => {
  const STAR_COUNT = (width * height) / 10000;
  const STAR_X_RANGE = width;
  const STAR_Y_RANGE = height;
  const STAR_SIZE_RANGE = 1.5;
  const STAR_COLOR_ALPHA_MIN = 128;
  const STAR_COLOR_ALPHA_MAX = 256;
  const STAR_COLOR_RED_MIN = 128;
  const STAR_COLOR_RED_MAX = 256;

  const METEOR_X_RANGE = width;
  const METEOR_Y_RANGE = height / 2;
  const METEOR_SPEED_MIN = 64;
  const METEOR_SPEED_MAX = 128;

  const createStar = () => {
    const x = random(STAR_X_RANGE);
    const y = random(STAR_Y_RANGE);
    const size = random(STAR_SIZE_RANGE);
    const colorAlpha = Math.floor(randomRange(STAR_COLOR_ALPHA_MIN, STAR_COLOR_ALPHA_MAX));
    const colorRed = Math.floor(randomRange(STAR_COLOR_RED_MIN, STAR_COLOR_RED_MAX));
    const color = `rgba(${colorRed},255,255,${colorAlpha})`;
    return {
      x, y, size, color,
    };
  };

  const createMeteor = () => {
    let x;
    let y;
    if (Math.random() < METEOR_X_RANGE / (METEOR_X_RANGE + METEOR_Y_RANGE)) {
      x = random(METEOR_X_RANGE);
      y = 0;
    } else {
      x = width;
      y = random(METEOR_Y_RANGE);
    }
    const speed = randomRange(METEOR_SPEED_MIN, METEOR_SPEED_MAX);
    return {
      x, y, speed,
    };
  };

  const draw = () => {
    // Erase the canvas
    ctx.clearRect(0, 0, width, height);

    // Draw the stars
    for (let i = 0, len = stars.length; i < len; i += 1) {
      const star = stars[i];
      ctx.beginPath();
      ctx.fillStyle = star.color;
      ctx.arc(star.x, star.y, star.size, 0, CIRCLE);
      ctx.fill();
      star.x += 0.01;
    }

    // Draw the meteor
    const speedX = meteor.speed * 0.78;
    const speedY = meteor.speed * 0.61;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,128)';
    ctx.moveTo(meteor.x, meteor.y);
    ctx.lineTo(meteor.x + speedX, meteor.y - speedY);
    ctx.stroke();
    meteor.x -= speedX / 8;
    meteor.y += speedY / 8;

    // Check the meteor position and create new one
    if (meteor.x <= -METEOR_SPEED_MAX || meteor.y >= height + METEOR_SPEED_MAX) {
      meteor = generator.createMeteor();
    }
  };

  stars = Array.from({ length: STAR_COUNT }, createStar);
  meteor = createMeteor();

  return {
    createMeteor,
    createStar,
    draw,
  };
};

canvas.width = width;
canvas.height = height;

generator = initObjects();

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  generator = initObjects();
  canvas.width = width;
  canvas.height = height;
});

const frameRequetCallback = () => {
  generator.draw();
  window.requestAnimationFrame(frameRequetCallback);
};

window.requestAnimationFrame(frameRequetCallback);
