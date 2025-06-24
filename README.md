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

## 📦 Available Hooks

| Hook Name       | Description                                      | Attributes                                                   |
|-----------------|--------------------------------------------------|--------------------------------------------------------------|
| [useSessionTimeout](#usesessiontimeout) | Detects and handles session inactivity/timeouts             | `timeout`, `onTimeout`, `isActive`                          |
| [useHover](#usehover)               | Detects hover state of any DOM element                  | `isHovered`, `hoverRef`                   |
| [useSpeechSynthesis](#usespeechsynthesis) | Converts text to speech using Web Speech API        | `speak`, `cancel`, `speaking`, `voices`   |
| [useToggle](#usetoggle)             | Toggles a boolean value easily                          | `value`, `toggle`, `setTrue`, `setFalse`  |
| [useFetch](#usefetch)               | Handles API requests with built-in loading and error states | `data`, `error`, `loading`, `refetch`     |

## 🧠 Hook Usage Details

### 🖱️ useHover

```ts
const { isHovered, hoverRef } = useHover();

return <div ref={hoverRef}>{isHovered ? "Hovered!" : "Hover me!"}</div>;


