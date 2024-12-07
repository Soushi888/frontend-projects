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
      <div class="todo-container">
        <h2 class="text-2xl font-bold mb-4">Todo List</h2>
        <div class="todo-input flex gap-2 mb-4">
          <input 
            type="text" 
            placeholder="Add new task..." 
            class="input flex-grow p-2 rounded-md border"
            data-input="todo-text"
          >
          <button 
            class="btn btn-primary px-4 py-2"
            data-action="add-todo"
          >
            Add
          </button>
        </div>
        
        <div class="todo-filters flex gap-2 mb-4">
          <button 
            class="btn ${this.state.filter === 'all' ? 'btn-primary' : 'btn-secondary'} flex-1" 
            data-filter="all"
          >
            All
          </button>
          <button 
            class="btn ${this.state.filter === 'active' ? 'btn-primary' : 'btn-secondary'} flex-1" 
            data-filter="active"
          >
            Active
          </button>
          <button 
            class="btn ${this.state.filter === 'completed' ? 'btn-primary' : 'btn-secondary'} flex-1" 
            data-filter="completed"
          >
            Completed
          </button>
        </div>
        
        <ul class="todo-list">
          ${filteredItems.map(item => `
            <li class="todo-item ${item.completed ? 'completed' : ''} flex items-center gap-2 p-2 bg-white rounded-md" data-id="${item.id}">
              <input 
                type="checkbox" 
                ${item.completed ? 'checked' : ''} 
                data-action="toggle-todo" 
                class="mr-2 cursor-pointer"
              >
              <span class="todo-text flex-grow ${item.completed ? 'line-through text-gray-500' : ''}">
                ${item.text}
              </span>
              <button 
                class="delete-todo text-red-500 hover:bg-red-100 p-1 rounded" 
                data-action="delete-todo"
              >
                🗑️
              </button>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  protected handleEvents(): void {
    if (!this.element) return;

    const addTodoInput = this.element.querySelector('[data-input="todo-text"]') as HTMLInputElement;
    const addTodoButton = this.element.querySelector('[data-action="add-todo"]');
    const filterButtons = this.element.querySelectorAll('[data-filter]');
    const todoList = this.element.querySelector('.todo-list');

    addTodoButton?.addEventListener('click', () => this.addTodo(addTodoInput));
    
    filterButtons?.forEach(button => {
      button.addEventListener('click', (e) => {
        const filter = (e.target as HTMLButtonElement).dataset.filter as TodoState['filter'];
        this.updateState({ filter });
      });
    });

    todoList?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const todoId = target.closest('.todo-item')?.getAttribute('data-id');
      
      if (target.getAttribute('data-action') === 'toggle-todo' && todoId) {
        this.toggleTodo(todoId);
      }
      
      if (target.getAttribute('data-action') === 'delete-todo' && todoId) {
        this.deleteTodo(todoId);
      }
    });
  }

  private addTodo(input: HTMLInputElement): void {
    const text = input.value.trim();
    if (text) {
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
  }

  private toggleTodo(id: string): void {
    this.updateState({
      items: this.state.items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    });
  }

  private deleteTodo(id: string): void {
    this.updateState({
      items: this.state.items.filter(item => item.id !== id),
    });
  }

  private getFilteredItems(): TodoItem[] {
    switch (this.state.filter) {
      case "active":
        return this.state.items.filter(item => !item.completed);
      case "completed":
        return this.state.items.filter(item => item.completed);
      default:
        return this.state.items;
    }
  }

  private updateState(newState: Partial<TodoState>): void {
    this.setState(newState);
    this.storage.save(Todo.STORAGE_KEY, this.state);
  }
}
