const bodyEl = document.getElementsByTagName("body")[0];

const redBtnEl = document.getElementById("red-btn");
const greenBtnEl = document.getElementById("green-btn");
const blueBtnEl = document.getElementById("blue-btn");
const randomBtnEl = document.getElementById("random-btn");

console.log(bodyEl, redBtnEl, greenBtnEl, blueBtnEl, randomBtnEl);

function setBackgroundColor(color) {
  bodyEl.style.backgroundColor = color;
}

function randomColor() {
  const red = Math.round(Math.random() * 255);
  const green = Math.round(Math.random() * 255);
  const blue = Math.round(Math.random() * 255);

  const color = `rgb(${red}, ${green}, ${blue})`;

  setBackgroundColor(color);
}

redBtnEl.addEventListener("click", () => setBackgroundColor("red"));
blueBtnEl.addEventListener("click", () => setBackgroundColor("blue"));
greenBtnEl.addEventListener("click", () => setBackgroundColor("green"));
randomBtnEl.addEventListener("click", randomColor);
