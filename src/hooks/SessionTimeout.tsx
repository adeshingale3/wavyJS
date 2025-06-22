import { useEffect, useRef } from "react";

type UseSessionTimeoutProps = {
  timeout: number; // In milliseconds
  onTimeout: () => void;
  warningTime?: number; // Optional warning before logout
  onWarning?: () => void;
};

export function useSessionTimeout({
  timeout,
  onTimeout,
  warningTime = 0,
  onWarning,
}: UseSessionTimeoutProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimers = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);

    if (warningTime > 0 && onWarning) {
      warningRef.current = setTimeout(onWarning, timeout - warningTime);
    }

    timeoutRef.current = setTimeout(onTimeout, timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "touchstart"];

    const handleActivity = () => resetTimers();

    for (const event of events) {
      window.addEventListener(event, handleActivity);
    }

    resetTimers(); // Set initial timeout

    return () => {
      for (const event of events) {
        window.removeEventListener(event, handleActivity);
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
    };
  }, [timeout, onTimeout, warningTime, onWarning]);
}
