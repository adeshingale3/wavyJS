# WavyJS - React UI Components & Hooks Library

A comprehensive React + TypeScript component and hooks library with Tailwind CSS, Framer Motion, and GSAP animations.
[DOCS](https://wavyjs.vercel.app/)

## 🚀 Features

- **UI Components**: Beautiful, customizable components including buttons and animated backgrounds, Icons
- **Custom Hooks**: Useful React hooks for common functionality
- **Animation Ready**: Built with GSAP and Framer Motion for smooth animations
- **TypeScript**: Full TypeScript support with proper type definitions
- **Tailwind CSS**: Modern utility-first CSS framework
- **Zero Dependencies**: Only peer dependencies, no bundle bloat

## 📦 Installation

```bash
npm install wavyjs
```

## 🔧 Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install react react-dom framer-motion gsap
```

## 🎯 Components

### Background Components

#### FadingBG

Animated dots that fade in and out across the entire screen.

```tsx
import { FadingBG } from 'wavyjs';

<FadingBG />
```

#### GithubBG

Matrix-style animated background with blinking boxes.

```tsx
import { GithubBG } from 'wavyjs';

<GithubBG />
```

#### AnimatedBG

Floating colored circles with smooth animations.

```tsx
import { AnimatedBG } from 'wavyjs';

<AnimatedBG />
```

#### MaskedBG

Advanced masked background with animated grid patterns.

```tsx
import { MaskedBG } from 'wavyjs';

<MaskedBG />
```

#### Icons

Animated React logo with customizable size and color, featuring rotating ellipses and a moving circle.

```tsx
import { ReactIcon } from 'wavyjs';

// Basic usage
<ReactIcon />

// Custom size and color
<ReactIcon size={300} color="#ff6b6b" />

// Available props
<ReactIcon 
  size={200}     // Default: 200
  color="cyan"   // Default: "cyan"
/>
```

**Props:**
- `size`: number - Icon size in pixels (default: 200)
- `color`: string - Color for both the logo ellipses and moving circle (default: "cyan")


## 🪝 Hooks

### useCursor

Track mouse cursor position.

```tsx
import { useCursor } from 'wavyjs';

const { x, y } = useCursor();
```

### useFetch

Simplified data fetching hook.

```tsx
import { useFetch } from 'wavyjs';

const { data, loading, error } = useFetch('https://api.example.com/data');
```

### useHover

Track hover state with event handlers.

```tsx
import { useHover } from 'wavyjs';

const [isHovered, eventHandlers] = useHover();

<div {...eventHandlers}>
  {isHovered ? 'Hovering!' : 'Not hovering'}
</div>
```

### useSessionTimeout

Session timeout management with warning support.

```tsx
import { useSessionTimeout } from 'wavyjs';

useSessionTimeout({
  timeout: 300000, // 5 minutes
  onTimeout: () => logout(),
  warningTime: 60000, // 1 minute warning
  onWarning: () => showWarning(),
});
```

### useSpeechSynthesis

Text-to-speech functionality.

```tsx
import { useSpeechSynthesis } from 'wavyjs';

const { speak, stop } = useSpeechSynthesis();

speak('Hello, world!', { rate: 0.8, pitch: 1.2 });
stop(); // Stop current speech
```

### useToggle

Simple boolean toggle hook.

```tsx
import { useToggle } from 'wavyjs';

const [isOpen, toggle] = useToggle(false);

<button onClick={toggle}>
  {isOpen ? 'Close' : 'Open'}
</button>
```

## 🎨 Styling

All components use Tailwind CSS classes and are fully customizable. You can override styles by passing `className` props or modifying the component source.

## 📱 Responsive Design

Components are built with responsive design in mind and work seamlessly across all device sizes.

## 🔄 Animation

- **GSAP**: Used for complex animations and timeline control
- **Framer Motion**: Provides smooth component transitions and motion
- **CSS Transitions**: Fallback animations for better performance

## 🚀 Getting Started

1. **Install the package:**
   ```bash
   npm install wavyjs
   ```

2. **Import components:**
   ```tsx
   import { Button, FadingBG, useCursor } from 'wavyjs';
   ```

3. **Use in your app:**
   ```tsx
   function App() {
     const { x, y } = useCursor();
     
     return (
       <div>
         <FadingBG />
         <Button variant="primary">Hello WavyJS!</Button>
         <p>Cursor: {x}, {y}</p>
       </div>
     );
   }
   ```

## 📋 Requirements

- React 18.2.0+
- React DOM 18.2.0+
- Framer Motion 11.0.0+
- GSAP 3.12.0+
- Node.js 18+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ by Adesh Ingale
