import "./style.css";
import { Counter } from "./components/counter/Counter";
import { Todo } from "./components/todo/Todo";
import { LocalStorage } from "./services/storage/Storage";

// Initialize storage
const storage = new LocalStorage();

// Initialize and mount components
const counter = new Counter(storage);
counter.mount(document.querySelector<HTMLDivElement>("#counter-component")!);

const todo = new Todo(storage);
todo.mount(document.querySelector<HTMLDivElement>("#todo-component")!);
