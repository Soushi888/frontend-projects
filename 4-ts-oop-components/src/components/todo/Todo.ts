import { Component } from "../base/Component";
import { Storage } from "../../services/storage/Storage";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodoState {
  items: TodoItem[];
  filter: "all" | "active" | "completed";
}

export class Todo extends Component<TodoState> {
  private static readonly STORAGE_KEY = "todo_state";
  private readonly storage: Storage;

  constructor(storage: Storage) {
    const savedState = storage.load<TodoState>(Todo.STORAGE_KEY);
    super(savedState || { items: [], filter: "all" });
    this.storage = storage;
  }

  protected render(): void {
    if (!this.element) return;

    const filteredItems = this.getFilteredItems();

    this.element.innerHTML = `
      <div class="todo">
        <div class="todo-input">
          <input type="text" placeholder="Add new task..." class="new-todo">
          <button class="primary">Add</button>
        </div>
        <div class="todo-filters">
          <button class="outline ${
            this.state.filter === "all" ? "active" : ""
          }" data-filter="all">All</button>
          <button class="outline ${
            this.state.filter === "active" ? "active" : ""
          }" data-filter="active">Active</button>
          <button class="outline ${
            this.state.filter === "completed" ? "active" : ""
          }" data-filter="completed">Completed</button>
        </div>
        <ul class="todo-list">
          ${filteredItems
            .map(
              (item) => `
            <li class="todo-item ${item.completed ? "completed" : ""}" data-id="${
                item.id
              }">
              <label class="checkbox-container">
                <input type="checkbox" ${item.completed ? "checked" : ""}>
                <span class="checkmark"></span>
              </label>
              <span class="todo-text">${item.text}</span>
              <button class="contrast outline delete-todo" aria-label="Delete task">×</button>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    `;
  }

  protected handleEvents(): void {
    if (!this.element) return;

    const input = this.element.querySelector(".new-todo") as HTMLInputElement;
    const addButton = this.element.querySelector(".primary");
    const filters = this.element.querySelectorAll(".outline");
    const todoList = this.element.querySelector(".todo-list");

    addButton?.addEventListener("click", () => this.addTodo(input));
    input?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addTodo(input);
    });

    filters.forEach((filter) => {
      filter.addEventListener("click", () => {
        const filterType = filter.getAttribute(
          "data-filter"
        ) as TodoState["filter"];
        this.updateState({ filter: filterType });
      });
    });

    todoList?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const todoItem = target.closest(".todo-item");
      if (!todoItem) return;

      const id = todoItem.getAttribute("data-id");
      if (!id) return;

      if (target.matches(".delete-todo")) {
        this.deleteTodo(id);
      } else if (target.matches('input[type="checkbox"]')) {
        this.toggleTodo(id);
      }
    });
  }

  private addTodo(input: HTMLInputElement): void {
    const text = input.value.trim();
    if (!text) return;

    const newItem: TodoItem = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };

    this.updateState({
      items: [...this.state.items, newItem],
    });

    input.value = "";
  }

  private deleteTodo(id: string): void {
    this.updateState({
      items: this.state.items.filter((item) => item.id !== id),
    });
  }

  private toggleTodo(id: string): void {
    this.updateState({
      items: this.state.items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    });
  }

  private getFilteredItems(): TodoItem[] {
    switch (this.state.filter) {
      case "active":
        return this.state.items.filter((item) => !item.completed);
      case "completed":
        return this.state.items.filter((item) => item.completed);
      default:
        return this.state.items;
    }
  }

  private updateState(newState: Partial<TodoState>): void {
    this.setState(newState);
    this.storage.save(Todo.STORAGE_KEY, this.state);
  }
}
