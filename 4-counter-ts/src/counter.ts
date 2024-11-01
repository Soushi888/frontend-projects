export function setupCounter() {
  let count = 0;

  const counterEl: HTMLSpanElement = document.querySelector("#counter")!;
  const decrementBtn: HTMLButtonElement =
    document.querySelector("#decrement-btn")!;
  const incrementBtn: HTMLButtonElement =
    document.querySelector("#increment-btn")!;
  const resetBtn: HTMLButtonElement = document.querySelector("#reset-btn")!;

  const formEl: HTMLFormElement = document.querySelector("#add-form")!;
  const amount: HTMLInputElement = document.querySelector("#amount")!;
  const addBtn: HTMLButtonElement = document.querySelector("#add-btn")!;

  console.log(counterEl, decrementBtn, incrementBtn, resetBtn, amount, addBtn);

  counterEl!.textContent = `Count is ${count}`;

  function addANumber(number = 2) {
    count += number;

    if (count > 20) count = 20;
    if (count < 0) count = 0;

    changeColorClass(count);

    counterEl.textContent = `Count is ${count}`;
    amount.value = "";
  }

  counterEl!.addEventListener("click", () => addANumber(1));
  counterEl!.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    addANumber(-1);
  });

  function reset() {
    count = 0;
    counterEl!.textContent = `Count is ${count}`;
    counterEl!.className = "";
  }

  resetBtn!.addEventListener("click", reset);

  formEl!.addEventListener("submit", (event) => {
    event.preventDefault();
    amount!.value ? addANumber(Number(amount!.value)) : addANumber();
  });

  function changeColorClass(count: number) {
    counterEl.className = "";

    if (count >= 5 && count < 10) {
      console.log("green");
      counterEl.classList.add("green");
    } else if (count >= 10 && count < 15) {
      console.log("yellow");
      counterEl.classList.add("yellow");
    } else if (count >= 15) {
      console.log("red");
      counterEl.classList.add("red");
    }
  }

  function subscribe() {
    counterEl.addEventListener("change", () => {
      console.log("count changed:", count);
    });
  }

  return { count, addANumber, reset, subscribe };
}
