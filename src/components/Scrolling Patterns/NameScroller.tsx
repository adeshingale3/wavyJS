import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export interface NameScrollerProps {
  title?: string;
  shadowSize?: "sm" | "md" | "lg" | "xl" | "2xl";
  shadowColor?: string;
  textColor?: string;
  numberOfRows?: number;
  baseDuration?: number;
  className?: string;
}

const NameScroller: React.FC<NameScrollerProps> = ({
  title = "WAVY JS",
  shadowSize = "lg",
  shadowColor = "white/80",
  textColor = "black/30",
  numberOfRows = 6,
  baseDuration = 12,
  className = ""
}) => {
  const rowRefs = useRef<HTMLDivElement[]>([]);

  // Helper function to parse color and opacity
  const parseColor = (colorString: string) => {
    if (colorString.includes('/')) {
      const [color, opacity] = colorString.split('/');
      return { color, opacity: parseFloat(opacity) / 100 };
    }
    return { color: colorString, opacity: 1 };
  };

  // Helper function to get shadow styles
  const getShadowStyles = (size: string, color: string) => {
    const { color: shadowColor, opacity } = parseColor(color);
    
    // Base shadow templates without opacity
    const shadowTemplates = {
      sm: '0 1px 2px 0',
      md: '0 4px 6px -1px',
      lg: '0 10px 15px -3px',
      xl: '0 20px 25px -5px',
      "2xl": '0 25px 50px -12px'
    };

    // Convert common color names to RGB values
    const colorMap: Record<string, string> = {
      'black': '0, 0, 0',
      'white': '255, 255, 255',
      'red': '239, 68, 68',
      'blue': '59, 130, 246',
      'green': '34, 197, 94',
      'yellow': '234, 179, 8',
      'purple': '147, 51, 234',
      'pink': '236, 72, 153',
      'gray': '107, 114, 128',
      'indigo': '99, 102, 241',
      'teal': '20, 184, 166',
      'orange': '249, 115, 22',
      'cyan': '6, 182, 212',
      'lime': '132, 204, 22',
      'emerald': '16, 185, 129',
      'amber': '245, 158, 11',
      'rose': '244, 63, 94',
      'violet': '139, 92, 246',
      'fuchsia': '217, 70, 239',
      'sky': '14, 165, 233',
      'slate': '100, 116, 139',
      'zinc': '113, 113, 122',
      'neutral': '115, 115, 115',
      'stone': '120, 113, 108'
    };

    // Get the base shadow template
    const shadowTemplate = shadowTemplates[size as keyof typeof shadowTemplates];
    
    let finalColor = '0, 0, 0'; // Default to black
    
    // Handle Tailwind color scale (e.g., blue-600)
    if (shadowColor.includes('-')) {
      const [colorName, scale] = shadowColor.split('-');
      const baseColor = colorMap[colorName];
      if (baseColor) {
        finalColor = baseColor;
      }
    }
    // Handle basic color names
    else if (colorMap[shadowColor]) {
      finalColor = colorMap[shadowColor];
    }
    // If it's a hex color, convert to RGB
    else if (shadowColor.startsWith('#')) {
      const hex = shadowColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      finalColor = `${r}, ${g}, ${b}`;
    }
    // If it's already an RGB format, extract the values
    else if (shadowColor.startsWith('rgb')) {
      finalColor = shadowColor.replace('rgb', '').replace('rgba', '').replace('(', '').replace(')', '');
    }

    // Return the final shadow with the correct color and opacity
    return `${shadowTemplate} rgba(${finalColor}, ${opacity})`;
  };

  // Helper function to get text color with opacity support
  const getTextColor = (colorString: string) => {
    const { color, opacity } = parseColor(colorString);
    
    const colorMap: Record<string, string> = {
      'black': '0, 0, 0',
      'white': '255, 255, 255',
      'red': '239, 68, 68',
      'blue': '59, 130, 246',
      'green': '34, 197, 94',
      'yellow': '234, 179, 8',
      'purple': '147, 51, 234',
      'pink': '236, 72, 153',
      'gray': '107, 114, 128',
      'indigo': '99, 102, 241',
      'teal': '20, 184, 166',
      'orange': '249, 115, 22',
      'cyan': '6, 182, 212',
      'lime': '132, 204, 22',
      'emerald': '16, 185, 129',
      'amber': '245, 158, 11',
      'rose': '244, 63, 94',
      'violet': '139, 92, 246',
      'fuchsia': '217, 70, 239',
      'sky': '14, 165, 233',
      'slate': '100, 116, 139',
      'zinc': '113, 113, 122',
      'neutral': '115, 115, 115',
      'stone': '120, 113, 108'
    };

    // Handle Tailwind color scale (e.g., blue-600)
    if (color.includes('-')) {
      const [colorName, scale] = color.split('-');
      const baseColor = colorMap[colorName];
      if (baseColor) {
        // For now, return the base color. You can expand this for more accurate scaling
        return `rgba(${baseColor}, ${opacity})`;
      }
    }

    // Handle basic color names
    if (colorMap[color]) {
      return `rgba(${colorMap[color]}, ${opacity})`;
    }

    // If it's a hex color, convert to RGBA
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    // If it's already an RGB/RGBA format, return as is
    if (color.startsWith('rgb')) {
      return color;
    }

    // Default fallback
    return color;
  };

  useEffect(() => {
    rowRefs.current.forEach((row, index) => {
      if (!row) return;

      const totalWidth = row.scrollWidth / 2;
      const isEvenRow = index % 2 === 0;
      
      // Alternate speeds: even rows are faster, odd rows are slower
      const duration = isEvenRow ? baseDuration : baseDuration * 1.8;

      // All rows move to the left (right to left)
      gsap.fromTo(row,
        { x: 0 },
        {
          x: -totalWidth,
          duration: duration,
          ease: "linear",
          repeat: -1,
          modifiers: {
            x: (x) => {
              const num = parseFloat(x);
              return `${((num % -totalWidth) - totalWidth) % -totalWidth}px`;
            },
          },
        }
      );
    });
  }, [baseDuration]);

  const textSet = Array.from({ length: 8 }).map((_, idx) => (
    <h1 
      key={idx} 
      className="text-8xl md:text-9xl font-bold mx-6 md:mx-8 whitespace-nowrap"
      style={{
        color: getTextColor(textColor),
        textShadow: getShadowStyles(shadowSize, shadowColor)
      }}
    >
      {title}
    </h1>
  ));

  const rows = Array.from({ length: numberOfRows }).map((_, rowIndex) => (
    <div
      key={rowIndex}
      ref={(el) => {
        if (el) rowRefs.current[rowIndex] = el;
      }}
      className="flex whitespace-nowrap"
      style={{ willChange: "transform" }}
    >
      {textSet}
      {textSet} {/* Duplicate for seamless loop */}
    </div>
  ));

  return (
    <div className={`relative z-[-999] w-full h-screen bg-black overflow-hidden flex flex-col justify-center gap-6 md:gap-10 ${className}`}>
      {rows}
    </div>
  );
};

export default NameScroller;
