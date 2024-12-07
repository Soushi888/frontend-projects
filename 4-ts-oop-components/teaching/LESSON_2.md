# Session 2: State Management and Reactivity - Lesson Plan

## Pre-Session Review (10 minutes)
- Review Component base class from previous session
- Discuss TypeScript interfaces and generics
- Check understanding of event handling

## Part 1: Introduction to Reactivity (30 minutes)

### 1. What is Reactivity?
- Definition of reactive programming
- Key principles of reactive systems
- Difference between imperative and reactive approaches

### 2. Reactive Principles in UI Development
```typescript
// Reactive Pattern Example
class ReactiveComponent<T> {
  private _state: T;
  private observers: Array<(state: T) => void> = [];

  constructor(initialState: T) {
    this._state = initialState;
  }

  // Reactive state getter and setter
  get state(): T {
    return this._state;
  }

  set state(newState: T) {
    this._state = newState;
    this.notifyObservers();
  }

  // Observer pattern for reactivity
  subscribe(observer: (state: T) => void): () => void {
    this.observers.push(observer);
    return () => {
      this.observers = this.observers.filter(obs => obs !== observer);
    };
  }

  private notifyObservers(): void {
    this.observers.forEach(observer => observer(this._state));
  }
}
```

### 3. Reactive Patterns in Our Component Architecture
- Automatic UI updates
- Immutable state management
- Event-driven state changes

### 4. Practical Reactivity Demonstration
```typescript
class Counter extends ReactiveComponent<number> {
  constructor() {
    super(0);
  }

  increment() {
    // Automatically triggers observers
    this.state = this.state + 1;
  }

  decrement() {
    // Automatically triggers observers
    this.state = this.state - 1;
  }
}

// Usage example
const counterDisplay = document.getElementById('counter-display');
const counter = new Counter();

// Subscribe to state changes
counter.subscribe(value => {
  counterDisplay.textContent = value.toString();
});

// State changes automatically update the UI
counter.increment(); // Display updates to 1
counter.increment(); // Display updates to 2
```

## Part 2: Component Lifecycle and Architecture (30 minutes)

### 1. Understanding Component Lifecycle
```typescript
abstract class Component<T> {
  protected state: T;
  protected element: HTMLElement | null = null;

  // Lifecycle Method: Mount
  public mount(element: HTMLElement): void {
    this.element = element;
    this.render();     // Initial rendering
    this.handleEvents(); // Set up event listeners
  }

  // Lifecycle Method: Unmount
  public unmount(): void {
    if (this.element) {
      // Clean up the component
      this.element.innerHTML = "";
      
      // Remove event listeners
      this.removeEventListeners();
      
      // Clear references
      this.element = null;
    }
  }
}
```

### 2. Component Lifecycle Explained

#### Mount Method
- Attaches the component to a DOM element
- Performs initial rendering
- Sets up event listeners
- Prepares the component for interaction

#### Unmount Method
- Removes the component from the DOM
- Cleans up resources
- Prevents memory leaks
- Ensures proper component disposal

### 3. Practical Lifecycle Management
```typescript
class Counter extends Component<CounterState> {
  private incrementButton: HTMLButtonElement | null = null;

  // Specialized mount with additional setup
  public mount(element: HTMLElement): void {
    super.mount(element);
    
    // Additional setup specific to Counter
    this.incrementButton = this.element.querySelector('.increment-btn');
    this.setupAnalytics();
  }

  // Specialized unmount with cleanup
  public unmount(): void {
    // Perform Counter-specific cleanup
    this.saveStateBeforeUnmount();
    
    // Call parent unmount method
    super.unmount();
  }

  private saveStateBeforeUnmount(): void {
    // Optional: Save state to storage before removing
    localStorage.setItem('counter-state', JSON.stringify(this.state));
  }

  private setupAnalytics(): void {
    // Optional: Set up tracking or logging
    console.log('Counter component mounted');
  }
}
```

### 4. Lifecycle Patterns and Best Practices
- Always call `super.mount()` and `super.unmount()`
- Clean up event listeners
- Save important state before unmounting
- Avoid memory leaks
- Handle potential null references

### 5. Real-World Lifecycle Scenarios
- Dynamically adding/removing components
- Implementing tabbed interfaces
- Creating modal or overlay components
- Managing complex UI interactions

## Part 3: State Management in Components (30 minutes)

### 1. Understanding State Management
- What is state in UI components?
- TypeScript interfaces for type-safe state
- Component-based state management

### 2. State Management in Base Component
```typescript
abstract class Component<T> {
  protected state: T;

  constructor(initialState: T) {
    this.state = initialState;
  }

  // Reactive state update method
  protected setState(newState: Partial<T>): void {
    // Immutable update
    this.state = { ...this.state, ...newState };
    
    // Automatic re-rendering
    if (this.element) {
      this.render();
      this.handleEvents();
    }
  }
}
```

### 3. Practical Example: Counter Component State
```typescript
interface CounterState {
  value: number;
  step: number;
}

class Counter extends Component<CounterState> {
  constructor(initialStep: number = 1) {
    super({ value: 0, step: initialStep });
  }

  // Reactive state updates
  increment() {
    this.setState({ 
      value: this.state.value + this.state.step 
    });
  }

  decrement() {
    this.setState({ 
      value: this.state.value - this.state.step 
    });
  }
}
```

## Break (10 minutes)

## Part 4: Storage Implementation (50 minutes)

### 1. Browser Storage Overview
- LocalStorage API basics
- Type-safe storage operations
- Error handling in storage operations

### 2. Storage Interface and Implementation
```typescript
interface Storage {
  save<T>(key: string, data: T): void;
  load<T>(key: string): T | null;
  remove(key: string): void;
}

class LocalStorage implements Storage {
  public save<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  public load<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return null;
    }
  }

  public remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  }
}
```

### 3. Integrating Storage with Components
Example with Counter component:
```typescript
class Counter extends Component<CounterState> {
  private static readonly STORAGE_KEY = "counter_state";
  private readonly storage: Storage;

  constructor(storage: Storage, initialStep: number = 1) {
    const savedState = storage.load<CounterState>(Counter.STORAGE_KEY);
    super(savedState || { value: 0, step: initialStep });
    this.storage = storage;
  }

  increment() {
    const newState = { 
      value: this.state.value + this.state.step 
    };
    this.setState(newState);
    this.storage.save(Counter.STORAGE_KEY, { ...this.state, ...newState });
  }
}
```

## Part 5: Comparative Reactivity Analysis (20 minutes)

### 1. Reactive Patterns Across Frameworks
- Vanilla TypeScript (Our Approach)
  - Manual observer pattern
  - Explicit state management
  - Fine-grained control

- React
  - useState hook
  - Automatic re-renders
  - Virtual DOM diffing

- Svelte
  - Compiler-based reactivity
  - Automatic tracking of state dependencies
  - Minimal overhead

- Vue
  - Reactive data properties
  - Computed and watch methods
  - Dependency tracking

### 2. Pros and Cons of Different Reactive Approaches
- Performance considerations
- Complexity of implementation
- Learning curve
- Use case suitability

## Practical Exercises (30 minutes)
1. Implement a reactive timer component
   - Create a timer that updates automatically
   - Use observer pattern
   - Handle start, stop, and reset actions

2. Build a temperature converter
   - Reactive updates between Celsius and Fahrenheit
   - Demonstrate bidirectional state changes

## Homework and Practice
1. Extend the Counter component
   - Add more complex reactive behaviors
   - Implement validation on state changes
   - Create custom observers

2. Design a small reactive application
   - Choose a domain (e.g., shopping cart, quiz app)
   - Implement reactive state management
   - Use TypeScript for type safety

## Additional Resources
- Reactive Programming Fundamentals
- TypeScript State Management
- Reactive Extensions (RxJS)
- Framework-specific reactivity patterns

## Next Session Preview
- Component composition
- Advanced reactive techniques
- Event-driven programming
