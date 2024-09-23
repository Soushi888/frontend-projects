"use strict";

let count = 0;

const countEl = document.getElementById("count");
const decrementBtn = document.querySelector("#decrement-btn");
const incrementBtn = document.getElementById("increment-btn");
const resetBtn = document.querySelector("#reset-btn");

const formEl = document.querySelector("form");
const amount = document.querySelector("#amount");
const addBtn = document.querySelector("#add-btn");

console.log(countEl, decrementBtn, incrementBtn, resetBtn, amount, addBtn);

countEl.textContent = count;

// function increment() {
//   count++;
//   countEl.textContent = count;
//   changeColorClass(count);
// }

incrementBtn.addEventListener("click", () => addANumber(1));

// function decrement() {
//   if (count > 0) {
//     count--;
//     countEl.textContent = count;
//     changeColorClass(count);
//   }
// }

decrementBtn.addEventListener("click", () => addANumber(-1));

function reset() {
  count = 0;
  countEl.textContent = count;
  countEl.className = "";
}
resetBtn.addEventListener("click", reset);

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  amount.value ? addANumber(amount.value) : addANumber();
});

function changeColorClass(count) {
  countEl.className = "";

  if (count >= 5 && count < 10) {
    console.log("green");
    countEl.classList.add("green");
  } else if (count >= 10 && count < 15) {
    console.log("yellow");
    countEl.classList.add("yellow");
  } else if (count >= 15) {
    console.log("red");
    countEl.classList.add("red");
  }
}

function addANumber(number = 2) {
  count += Number(number);

  if (count > 20) count = 20;
  if (count < 0) count = 0;

  changeColorClass(count);

  countEl.textContent = count;
  amount.value = "";
}
