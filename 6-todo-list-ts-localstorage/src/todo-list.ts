type TodoItem = {
  name: string;
  done: boolean;
};

export class TodoList {
  private todos: TodoItem[] = [];
  private totalCountElement: HTMLSpanElement;
  private leftCountElement: HTMLSpanElement;

  constructor() {
    this.totalCountElement = document.getElementById("total-count")!;
    this.leftCountElement = document.getElementById("left-count")!;

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
  }

  private renderTodos(): void {
    const todoListEl: HTMLUListElement = document.querySelector("#todo-list")!;
    todoListEl.innerHTML = "";

    this.todos.forEach((todo, index) => {
      const li = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.done;
      checkbox.addEventListener("change", () => this.toggleTodo(index));

      const span = document.createElement("span");
      span.textContent = todo.name;
      span.className = todo.done ? "done" : "";

      const deleteBtn = document.createElement("span");
      deleteBtn.textContent = "X";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => this.deleteTodo(index));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);

      todoListEl.appendChild(li);
    });
  }

  private toggleTodo(index: number): void {
    this.todos[index].done = !this.todos[index].done;
    this.updateCounts();
    this.renderTodos();
  }

  private deleteTodo(index: number): void {
    this.todos.splice(index, 1);
    this.updateCounts();
    this.renderTodos();
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
