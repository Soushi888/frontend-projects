export interface StateManager<T> {
  getState(): T;
  setState(newState: Partial<T>): void;
  subscribe(callback: (state: T) => void): () => void;
}

export class SimpleStateManager<T> implements StateManager<T> {
  private state: T;
  private subscribers: ((state: T) => void)[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  public getState(): T {
    return this.state;
  }

  public setState(newState: Partial<T>): void {
    this.state = { ...this.state, ...newState };
    this.notifySubscribers();
  }

  public subscribe(callback: (state: T) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    };
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((callback) => callback(this.state));
  }
}
