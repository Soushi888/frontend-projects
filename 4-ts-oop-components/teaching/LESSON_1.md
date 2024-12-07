# Session 1: Foundations - Lesson Plan

## Pre-Session Setup
- Ensure student has Node.js and npm/pnpm installed
- Have VSCode or preferred IDE ready
- Prepare a simple JavaScript component example for TypeScript conversion

## Initial Knowledge Assessment (15 minutes)
### JavaScript Knowledge Check
Quick discussion questions:
1. "How comfortable are you with ES6+ features?"
   - Arrow functions
   - Destructuring
   - Classes
   - Modules

2. "What's your experience with DOM manipulation?"
   - Creating elements
   - Event handling
   - DOM traversal

3. "Have you worked with any frontend frameworks?"
   - React
   - Vue
   - Angular

### Development Environment Check
- IDE preferences
- Git experience
- Package manager familiarity

## Part 1: Project Setup (20 minutes)

### 1. Create Project with Vite
```bash
# Create a new project using Vite
pnpm create vite my-ts-components --template vanilla-ts
cd my-ts-components

# Install dependencies
pnpm install

# Install Tailwind CSS and its dependencies
pnpm add -D tailwindcss postcss autoprefixer
pnpm exec tailwindcss init -p
```

### 2. Configure Tailwind CSS
Create or update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `style.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles can go here */
@layer components {
  .btn {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors;
  }
  
  .btn-danger {
    @apply px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors;
  }
}
```

### 3. Project Structure Overview
Default Vite structure:
```
my-ts-components/
├── public/
│   └── vite.svg
├── src/
│   ├── counter.ts      # We'll modify this
│   ├── main.ts
│   ├── style.css
│   ├── typescript.svg
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js  # New file
├── postcss.config.js   # New file
└── tsconfig.json
```

### 4. Modify Project Structure
```bash
# Create our component structure
mkdir -p src/components/base
mkdir -p src/services/state
```

New structure:
```
my-ts-components/
├── src/
│   ├── components/
│   │   ├── base/
│   │   │   └── Component.ts    # Base component class
│   │   └── button/
│   │       └── Button.ts       # Our first component
│   ├── services/
│   │   └── state/
│   │       └── StateManager.ts # Coming in next session
│   ├── main.ts
│   └── style.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

### 5. Update index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TypeScript Components</title>
  </head>
  <body class="bg-gray-100 min-h-screen">
    <div id="app">
      <!-- Our components will be mounted here -->
    </div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### 6. Update main.ts
```typescript
import './style.css'

// We'll import our components here later
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-gray-800">TypeScript Components</h1>
    <div id="components" class="space-y-4">
      <!-- Components will be mounted here -->
    </div>
  </main>
`
```

### 7. Start Development Server
```bash
pnpm dev
```

## Part 2: TypeScript Basics (40 minutes)

### 1. Type System Introduction
```typescript
// Basic Types
let name: string = "Button";
let count: number = 0;
let isActive: boolean = false;

// Arrays and Objects
let items: string[] = ["Item 1", "Item 2"];
let config: { id: number; label: string } = {
  id: 1,
  label: "Click me"
};

// Type Inference
let inferred = "TypeScript infers this as string";
```

### 2. Interfaces and Types
```typescript
// Interface for component props
interface ButtonProps {
  label: string;
  onClick?: () => void;
  class?: string;
}

// Type for component state
type ButtonState = {
  isPressed: boolean;
  pressCount: number;
};
```

### 3. Classes and Inheritance
```typescript
abstract class Component {
  protected element: HTMLElement;
  
  constructor(tagName: string = 'div') {
    this.element = document.createElement(tagName);
  }
  
  abstract render(): void;
}
```

### 4. Example Button Component with Tailwind
```typescript
class Button extends Component {
  private props: ButtonProps;
  private state: ButtonState;

  constructor(props: ButtonProps) {
    super('button');
    this.props = props;
    this.state = {
      isPressed: false,
      pressCount: 0
    };
    this.setupEvents();
    this.element.className = 'btn';  // Using our Tailwind component class
  }

  private setupEvents(): void {
    this.element.addEventListener('click', this.handleClick.bind(this));
  }

  private handleClick(): void {
    this.state.pressCount++;
    this.props.onClick?.();
    this.render();
  }

  render(): void {
    this.element.textContent = this.props.label;
    this.element.className = `btn ${this.props.className || ''}`;
    
    if (this.state.isPressed) {
      this.element.classList.add('bg-blue-600');
    }
  }
}
```

## Hands-on Exercise
Create a Button component that:
1. Uses Tailwind classes for styling
2. Changes appearance on hover using Tailwind's hover utilities
3. Counts number of clicks
4. Updates its text with the click count
5. Uses different color schemes (primary, danger, success)

## Homework Assignment
1. Extend the Button component:
   - Add disabled state using Tailwind's disabled: utilities
   - Implement different sizes (sm, md, lg)
   - Add tooltip functionality with Tailwind positioning
   - Create a ripple effect using Tailwind animations

2. Reading Materials:
   - TypeScript Handbook: Classes and Interfaces
   - Tailwind CSS Documentation
   - DOM Manipulation in TypeScript

## Next Session Preparation
1. Review the completed homework
2. Prepare questions about state management
3. Think about real-world use cases for components

## Additional Resources
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
