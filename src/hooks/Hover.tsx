import { useState } from "react";

const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  const eventHandlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  return [isHovered, eventHandlers] as const;
}

export { useHover };