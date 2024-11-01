type TodoItem = {
  name: string;
  done: boolean;
};

export class TodoList {
  private todos: TodoItem[] = [];

  private totalCountElement: HTMLSpanElement;
  private leftCountElement: HTMLSpanElement;
  private progressMessageElement: HTMLSpanElement;
  private progressBarEl: HTMLProgressElement;

  constructor() {
    this.totalCountElement = document.getElementById("total-count")!;
    this.leftCountElement = document.getElementById("left-count")!;
    this.progressBarEl = document.querySelector("#progress-bar")!;
    this.progressMessageElement = document.querySelector("#progress-message")!;

    this.renderTodos();
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", (event) => this.handleFormSubmit(event));
  }

  private handleFormSubmit(event: SubmitEvent): void {
    event.preventDefault();
    const input: HTMLInputElement | null =
      document.querySelector("#todo-input");
    if (!input) return;

    const newTodo: TodoItem = {
      name: input.value.trim(),
      done: false,
    };

    if (newTodo.name) {
      this.todos.push(newTodo);
      input.value = "";

      this.updateCounts();
      this.renderTodos();
    }
  }

  private updateCounts(): void {
    this.totalCountElement.textContent = this.todos.length.toString();
    this.leftCountElement.textContent = this.todos
      .filter((todo) => !todo.done)
      .length.toString();

    this.updateProgressBar();
  }

  private updateProgressBar(): void {
    let totalCount = Number(this.totalCountElement.innerText);
    let leftCount = Number(this.leftCountElement.innerText);
    let completedPercentage = ((totalCount - leftCount) / totalCount) * 100;
    if (Number.isNaN(completedPercentage)) {
      completedPercentage = 0;
    }

    this.progressBarEl.value = completedPercentage;
    if (totalCount === 0) {
      this.progressBarEl.value = 0;
    }

    this.progressMessageElement.textContent = `${completedPercentage.toFixed(
      0
    )}% completed`;

    this.saveToLocalStorage();
  }

  private renderTodos(): void {
    const todoListEl: HTMLUListElement = document.querySelector("#todo-list")!;
    todoListEl.innerHTML = "";

    this.todos.forEach((todo, index) => {
      const li = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.done;
      checkbox.id = `todo-${index}`;
      checkbox.addEventListener("change", () => this.toggleTodo(index));

      const label = document.createElement("label");
      label.textContent = todo.name;
      label.setAttribute("for", checkbox.id);
      label.className = todo.done ? "done" : "";

      const deleteBtn = document.createElement("span");
      deleteBtn.textContent = "X";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => this.deleteTodo(index));

      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(deleteBtn);

      todoListEl.appendChild(li);
    });
  }

  private toggleTodo(index: number): void {
    this.todos[index].done = !this.todos[index].done;
    this.updateCounts();
    this.renderTodos();

    this.saveToLocalStorage();
  }

  private deleteTodo(index: number): void {
    this.todos.splice(index, 1);
    this.updateCounts();
    this.renderTodos();

    this.saveToLocalStorage();
  }

  public saveToLocalStorage(): void {
    console.log("saveToLocalStorage", this.todos);

    if (!this.todos) return;

    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  public loadFromLocalStorage(): void {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
      this.updateCounts();
      this.renderTodos();
    }
  }
}
