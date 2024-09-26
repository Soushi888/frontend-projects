// DOM elements
const todoFormEl = document.getElementById("todo-form");
const todoInputEl = document.getElementById("todo-input");
const todoListEl = document.getElementById("todo-list");
const totalCountEl = document.getElementById("total-count");
const leftCountEl = document.getElementById("left-count");

// Global variables
let todos = [];
let totalCount = 0;
let leftCount = 0;

// Function to count remaining todos
function countRemainingTodos() {
  leftCount = todos.filter((todo) => !todo.done).length;
  leftCountEl.textContent = leftCount;
}

// Event listener for form submission
todoFormEl.addEventListener("submit", handleFormSubmit);

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const newTodo = {
    name: todoInputEl.value,
    done: false,
  };

  if (newTodo.name.trim()) {
    todos.push(newTodo);
    todoInputEl.value = "";

    countRemainingTodos();

    totalCount++;
    totalCountEl.textContent = totalCount;

    renderTodos();
  }
}

// Function to render todos
function renderTodos() {
  todoListEl.innerHTML = "";

  for (let todo of todos) {
    const liEl = document.createElement("li");

    liEl.innerHTML = `
      <label>
        <input type="checkbox" ${todo.done ? "checked" : ""} />
        <span class="${todo.done ? "done" : ""}">${todo.name}</span>
      </label>
      <span class="delete-btn">X</span>
    `;

    todoListEl.appendChild(liEl);

    // Add event listeners for checkbox and delete button
    const checkboxEl = liEl.querySelector("input");
    const deleteBtnEl = liEl.querySelector(".delete-btn");

    checkboxEl.addEventListener("change", () => {
      todo.done = checkboxEl.checked;
      leftCount = todos.filter((todo) => !todo.done).length;
      countRemainingTodos();
      leftCountEl.textContent = leftCount;

      renderTodos();
    });

    deleteBtnEl.addEventListener("click", () => {
      todos.splice(index, 1);
      countRemainingTodos();

      totalCount--;
      totalCountEl.textContent = totalCount;

      renderTodos();
    });
  }
}
