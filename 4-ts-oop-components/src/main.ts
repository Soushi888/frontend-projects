import "./style.css";
import { Counter } from "./components/counter/Counter";
import { Todo } from "./components/todo/Todo";
import { LocalStorage } from "./services/storage/Storage";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <h1>TypeScript OOP Components</h1>
    
    <div class="component-container">
      <section class="component-section">
        <h2>Counter</h2>
        <div id="counter"></div>
      </section>

      <section class="component-section">
        <h2>Todo List</h2>
        <div id="todo"></div>
      </section>
    </div>
  </div>
`;

// Initialize storage
const storage = new LocalStorage();

// Initialize and mount components
const counter = new Counter(storage);
counter.mount(document.querySelector<HTMLDivElement>("#counter")!);

const todo = new Todo(storage);
todo.mount(document.querySelector<HTMLDivElement>("#todo")!);
