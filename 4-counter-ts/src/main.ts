import "./style.css";
import { setupCounter } from "./counter";

const counter = setupCounter();

counter.subscribe();

// console.log(counter.count);
