import "./style.css";
import { TodoList } from "./todo-list";

const todoList = new TodoList();
todoList.loadFromLocalStorage();

const saveIconEl: HTMLDivElement = document.querySelector("#save-icon")!;
saveIconEl.addEventListener("click", () => todoList.saveToLocalStorage());
