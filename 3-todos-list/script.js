// DOM elements
const todoFormEl = document.getElementById("todo-form");
const todoInputEl = document.getElementById("todo-input");
const todoListEl = document.getElementById("todo-list");
const totalCountEl = document.getElementById("total-count");
const leftCountEl = document.getElementById("left-count");
const progressBarEl = document.getElementById("progress-bar");
const progressPercentageEl = document.getElementById("progress-percentage");

// Global variables
let todos = [];
let totalCount = 0;
let leftCount = 0;

// Event listener for form submission
todoFormEl.addEventListener("submit", handleFormSubmit);

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  // Get user input
  const newTodoName = todoInputEl.value.trim();

  if (!newTodoName) return;

  // Create new todo object
  const newTodo = {
    name: newTodoName,
    done: false,
  };

  // Add new todo to array
  todos.push(newTodo);
  todoInputEl.value = "";

  // Update counts
  totalCount++;
  totalCountEl.textContent = totalCount;
  countRemainingTodos();

  // Render new todo
  renderTodos(todos.length - 1);
}

// Function to count remaining todos
function countRemainingTodos() {
  leftCount = todos.filter((todo) => !todo.done).length;
  leftCountEl.textContent = leftCount;

  // Calculate percentage completed
  let completedPercentage = ((totalCount - leftCount) / totalCount) * 100;
  if (Number.isNaN(completedPercentage)) {
    completedPercentage = 0;
  }

  // Update progress bar
  progressBarEl.value = completedPercentage;
  if (totalCount === 0) {
    progressBarEl.value = 0;
  }

  // Update text content of progress element
  progressPercentageEl.textContent = `${completedPercentage.toFixed(
    0
  )}% completed`;
  if (totalCount === 0) {
    progressPercentageEl.textContent = `0% completed`;
  }
}

// Function to render todos
function renderTodos(index) {
  todoListEl.innerHTML = "";

  // Iterate through todos and create list items
  for (let todo of todos) {
    const liEl = document.createElement("li");

    // Create checkbox and label
    const checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.checked = todo.done;
    const checkboxLabel = document.createElement("label");
    checkboxLabel.className = checkboxEl.checked ? "done" : "";
    checkboxLabel.appendChild(checkboxEl);
    checkboxLabel.appendChild(document.createTextNode(todo.name));

    // Create delete button
    const deleteBtnEl = document.createElement("span");
    deleteBtnEl.className = "delete-btn";
    deleteBtnEl.textContent = "X";

    // Append elements to li
    liEl.appendChild(checkboxLabel);
    liEl.appendChild(deleteBtnEl);

    todoListEl.appendChild(liEl);

    // Add event listeners
    addTodoEventListeners(liEl, todo);
  }
}

// Helper function to add event listeners
function addTodoEventListeners(liEl, todo) {
  const checkboxEl = liEl.querySelector("input");
  const deleteBtnEl = liEl.querySelector(".delete-btn");

  // Add event listener for checkbox
  checkboxEl.addEventListener("change", () => {
    todo.done = checkboxEl.checked;

    countRemainingTodos();
    leftCountEl.textContent = leftCount;

    // Re-render list
    renderTodos();
  });

  // Add event listener for delete button
  deleteBtnEl.addEventListener("click", () => {
    const pos = todos.indexOf(todo);
    todos.splice(pos, 1);
    totalCount--;
    totalCountEl.textContent = totalCount;
    countRemainingTodos();

    // Re-render list
    renderTodos();
  });
}
