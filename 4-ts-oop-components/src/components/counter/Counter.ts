import { Component } from "../base/Component";
import { Storage } from "../../services/storage/Storage";

interface CounterState {
  value: number;
  step: number;
}

export class Counter extends Component<CounterState> {
  private static readonly STORAGE_KEY = "counter_state";
  private readonly storage: Storage;

  constructor(storage: Storage, initialStep: number = 1) {
    const savedState = storage.load<CounterState>(Counter.STORAGE_KEY);
    super(savedState || { value: 0, step: initialStep });
    this.storage = storage;
  }

  protected render(): void {
    if (!this.element) return;

    this.element.innerHTML = `
      <div class="counter">
        <h2 class="text-2xl font-bold mb-4">Counter</h2>
        <div class="counter-value text-3xl font-bold mb-4">${this.state.value}</div>
        <div class="counter-controls flex gap-4 mb-4">
          <button class="btn btn-secondary" data-action="decrement">-</button>
          <button class="btn btn-primary" data-action="reset">Reset</button>
          <button class="btn btn-secondary" data-action="increment">+</button>
        </div>
        <div class="counter-step">
          <label class="block mb-2">
            Step:
            <input type="number" value="${this.state.step}" min="1" max="10" class="input w-full p-2 mb-4">
          </label>
        </div>
      </div>
    `;
  }

  protected handleEvents(): void {
    if (!this.element) return;

    const increment = this.element.querySelector("[data-action='increment']");
    const decrement = this.element.querySelector("[data-action='decrement']");
    const reset = this.element.querySelector("[data-action='reset']");
    const stepInput = this.element.querySelector(
      ".step-input"
    ) as HTMLInputElement;

    increment?.addEventListener("click", () => this.increment());
    decrement?.addEventListener("click", () => this.decrement());
    reset?.addEventListener("click", () => this.reset());
    stepInput?.addEventListener("change", (e) =>
      this.setStep(Number((e.target as HTMLInputElement).value))
    );
  }

  private increment(): void {
    this.updateState({ value: this.state.value + this.state.step });
  }

  private decrement(): void {
    this.updateState({ value: this.state.value - this.state.step });
  }

  private reset(): void {
    this.updateState({ value: 0 });
  }

  private setStep(step: number): void {
    if (step < 1) step = 1;
    this.updateState({ step });
  }

  private updateState(newState: Partial<CounterState>): void {
    this.setState(newState);
    this.storage.save(Counter.STORAGE_KEY, this.state);
  }
}
