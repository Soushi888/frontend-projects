const rollBtnEl = document.querySelector("#roll-btn");
const themeSwitcherEl = document.querySelector("#theme-switcher");
const diceResultEl = document.querySelector("#dice-result");
const diceImagesEL = document.querySelector("#dice-images");

function rollDices(event) {
  event.preventDefault();

  const diceNumberEl = document.querySelector("#dice-number");
  const diceNumber = Number(diceNumberEl.value);
  const values = [];
  const images = [];

  if (diceNumber < 1 || diceNumber > 10) {
    alert("Please enter a number between 1 and 10");
    diceNumberEl.value = 1;
    return;
  }

  for (let i = 0; i < diceNumber; ++i) {
    const value = Math.floor(Math.random() * 6) + 1;
    values.push(value);
    images.push(
      `<img src="./images/${value}.png" alt="dice number ${value}" />`
    );
  }

  diceResultEl.innerHTML = `Dices: ${values.join(", ")}`;
  diceImagesEL.innerHTML = images.join(" ");
}

rollBtnEl.addEventListener("click", rollDices);

function switchTheme() {
  const bodyEl = document.querySelector("body");
  bodyEl.classList.toggle("dark-mode");
}

themeSwitcherEl.addEventListener("click", switchTheme);
