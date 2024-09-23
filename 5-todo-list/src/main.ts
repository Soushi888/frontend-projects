import "./style.css";
import { TodoList } from "./todo-list";

const todoList = new TodoList();
todoList.loadFromLocalStorage();

console.log(todoList);

const saveIconEl: HTMLDivElement = document.querySelector("#save-icon")!;
console.log(saveIconEl);

saveIconEl.addEventListener("click", () => todoList.saveToLocalStorage());
