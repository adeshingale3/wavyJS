# NameScroller Component

A dynamic, animated text scroller component built with React, TypeScript, and GSAP. Perfect for creating engaging background animations with customizable text, colors, and effects.

## Features

- 🎯 **Dynamic Text**: Customize the scrolling text content
- 🎨 **Customizable Colors**: Set text color and shadow color
- 🌟 **Shadow Effects**: Choose from multiple shadow sizes
- ⚡ **Performance Optimized**: Uses GSAP for smooth animations
- 📱 **Responsive**: Works on all screen sizes
- 🔧 **TypeScript Support**: Full type safety with exported interfaces

## Installation

```bash
npm install your-package-name
# or
yarn add your-package-name
```

## Usage

### Basic Usage

```tsx
import { NameScroller } from 'your-package-name';

function App() {
  return <NameScroller />;
}
```

### With Custom Props

```tsx
import { NameScroller } from 'your-package-name';

function App() {
  return (
    <NameScroller
      title="Your Company Name"
      textColor="blue-600"
      shadowSize="lg"
      shadowColor="blue/50"
      numberOfRows={8}
      baseDuration={15}
    />
  );
}
```

### With Opacity Colors

```tsx
<NameScroller
  title="Transparent Text"
  textColor="white/80"      // White with 80% opacity
  shadowColor="black/30"    // Black shadow with 30% opacity
  shadowSize="xl"
/>
```

## Color Format Support

The component supports various color formats for both `textColor` and `shadowColor`:

- **Basic colors**: `"red"`, `"blue"`, `"green"`, etc.
- **Tailwind scale colors**: `"blue-600"`, `"red-500"`, `"gray-400"`, etc.
- **Opacity colors**: `"white/30"`, `"black/50"`, `"blue/80"`, etc.
- **Hex colors**: `"#ff0000"`, `"#0000ff"`, etc.
- **RGB colors**: `"rgb(255, 0, 0)"`, `"rgba(0, 0, 255, 0.5)"`, etc.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"WAVY JS"` | The text to display in the scroller |
| `shadowSize` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"lg"` | Size of the text shadow |
| `shadowColor` | `string` | `"white/80"` | Color of the text shadow (supports formats like "white/30", "blue-600", "red", etc.) |
| `textColor` | `string` | `"black/30"` | Color of the text (supports formats like "black/30", "blue-600", "red", etc.) |
| `numberOfRows` | `number` | `6` | Number of scrolling rows |
| `baseDuration` | `number` | `12` | Base animation duration in seconds |
| `className` | `string` | `""` | Additional CSS classes |

## Examples

### Company Branding
```tsx
<NameScroller
  title="ACME Corp"
  textColor="white"
  shadowSize="xl"
  shadowColor="blue-600"
  numberOfRows={4}
/>
```

### Event Promotion
```tsx
<NameScroller
  title="Tech Conference 2024"
  textColor="yellow"
  shadowSize="2xl"
  shadowColor="orange-500"
  numberOfRows={8}
  baseDuration={20}
/>
```

### Minimal Style
```tsx
<NameScroller
  title="Minimal"
  textColor="gray-400"
  shadowSize="sm"
  shadowColor="white/20"
  numberOfRows={3}
  baseDuration={8}
/>
```

## Dependencies

- React 16.8+
- GSAP
- Tailwind CSS (for styling)

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT License - feel free to use in your projects!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
