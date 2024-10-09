export function setupCounter() {
  let count = 0;

  const countEl: HTMLSpanElement = document.querySelector("#count")!;
  const decrementBtn: HTMLButtonElement =
    document.querySelector("#decrement-btn")!;
  const incrementBtn: HTMLButtonElement =
    document.querySelector("#increment-btn")!;
  const resetBtn: HTMLButtonElement = document.querySelector("#reset-btn")!;

  const formEl: HTMLFormElement = document.querySelector("#add-form")!;
  const amount: HTMLInputElement = document.querySelector("#amount")!;
  const addBtn: HTMLButtonElement = document.querySelector("#add-btn")!;

  console.log(countEl, decrementBtn, incrementBtn, resetBtn, amount, addBtn);

  countEl!.textContent = count.toString();
  1;

  function addANumber(number = 2) {
    count += number;

    if (count > 20) count = 20;
    if (count < 0) count = 0;

    changeColorClass(count);

    countEl.textContent = count.toString();
    amount.value = "";
  }

  incrementBtn!.addEventListener("click", () => addANumber(1));

  decrementBtn!.addEventListener("click", () => addANumber(-1));

  function reset() {
    count = 0;
    countEl!.textContent = count.toString();
    countEl!.className = "";
  }

  resetBtn!.addEventListener("click", reset);

  formEl!.addEventListener("submit", (event) => {
    event.preventDefault();
    amount!.value ? addANumber(Number(amount!.value)) : addANumber();
  });

  function changeColorClass(count: number) {
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

  function subscribe() {
    countEl.addEventListener("change", () => {
      console.log("count changed:", count);
    });
  }

  return { count, addANumber, reset, subscribe };
}
