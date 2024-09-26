const rollBtn = document.getElementById("roll-btn");
const diceResultEl = document.getElementById("dice-result");
const diceImagesEL = document.getElementById("dice-images");

function rollDices(event) {
  event.preventDefault();
  const diceNumberEl = document.getElementById("dice-number");
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
    images.push(`<img src="./images/${value}.png" alt="dice #${value}" />`);
  }

  diceResultEl.innerHTML = `Dices: ${values.join(", ")}`;
  diceImagesEL.innerHTML = images.join(" ");
}

rollBtn.addEventListener("click", rollDices);
