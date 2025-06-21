# WavyJS

NPM Package for React Hooks and UI Components.

## Installation

```bash
npm install wavyjs
```

## Usage

1. Import and use components:

```tsx
import { useToggle } from 'wavyjs';

function DemoComponent() {
  const[isOn, toggle] = useToggle();
  return (
    <div>
        <button onClick={toggle}>Click Me</button>
        <div classname={`h-10 w-10 ${isOn ? 'bg-red-600' : 'bg-white'}`}></div>
    </div>
  );
}
```

2. import DemoComponent in App.js

```tsx
functino App() {
  return(
    <div>
        <DemoComponent/>
    </div>
  )
}
```


