export abstract class Component<T> {
  protected state: T;
  protected element: HTMLElement | null = null;

  constructor(initialState: T) {
    this.state = initialState;
  }

  protected abstract render(): void;
  protected abstract handleEvents(): void;

  public mount(element: HTMLElement): void {
    this.element = element;
    this.render();
    this.handleEvents();
  }

  public unmount(): void {
    if (this.element) {
      this.element.innerHTML = "";
      this.element = null;
    }
  }

  protected setState(newState: Partial<T>): void {
    this.state = { ...this.state, ...newState };
    if (this.element) {
      this.render();
      this.handleEvents(); // Re-bind event handlers after rendering
    }
  }
}
