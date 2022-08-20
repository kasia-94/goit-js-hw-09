import '../css/common.css';
const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
const color = {
  colorId: null,
  isActive: false,
};

start.addEventListener('click', onStartClick);
stop.addEventListener('click', onStopClick);

function onStartClick() {
  if (color.isActive) {
    return;
  }
  color.isActive = true;
  color.colorId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  clearInterval(color.colorId);
  color.isActive = false;
  console.log('Stop');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
