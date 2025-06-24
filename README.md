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
| [useSessionTimeout](#useSessionTimeOut) | Detects and handles session inactivity/timeouts             | `timeout`, `onTimeout`, `isActive`                          |
| [useHover](#useHover)               | Detects hover state of any DOM element                  | `isHovered`, `hoverRef`                   |
| [useSpeechSynthesis](#useSpeechSynthesis) | Converts text to speech using Web Speech API        | `speak`, `cancel`, `speaking`, `voices`   |
| [useToggle](#useToggle)             | Toggles a boolean value easily                          | `value`, `toggle`, `setTrue`, `setFalse`  |
| [useFetch](#useFetch)               | Handles API requests with built-in loading and error states | `data`, `error`, `loading`, `refetch`     |

## 🧠 Hook Usage Details

### 🖱️ useHover

```tsx
const { isHovered, hoverRef } = useHover();

return <div ref={hoverRef}>{isHovered ? "Hovered!" : "Hover me!"}</div>;
```

### 🔊 useSpeechSynthesis

```tsx
const { speak, cancel, speaking, voices } = useSpeechSynthesis();

const handleClick = () => {
  speak({ text: "Hello, world!", voice: voices[0], rate: 1 });
};
```

### 🔁 useToggle

```tsx
const [isOn, toggle] = useToggle();

return <button onClick={toggle}>{isOn ? "ON" : "OFF"}</button>;

```

### 📡 useFetch

```tsx
const { data, loading, error, refetch } = useFetch("https://api.example.com/data");

if (loading) return <p>Loading...</p>;
if (error) return <p>Error occurred</p>;

return (
  <>
    <pre>{JSON.stringify(data, null, 2)}</pre>
    <button onClick={refetch}>Refetch</button>
  </>
);


```

### ⏳ useSessionTimeOut

```tsx
const { isActive } = useSessionTimeout({
  timeout: 300000, // 5 minutes
  onTimeout: () => {
    alert("Session has expired. Logging out...");
    // Perform logout or redirect
  },
});
```
