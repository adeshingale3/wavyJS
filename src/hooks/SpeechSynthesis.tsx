import { useCallback, useRef } from "react";

const useSpeechSynthesis = () => {
  const synth = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, options: Partial<SpeechSynthesisUtterance> = {}) => {
    if (!synth) return;

    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    Object.assign(utterance, options); // pitch, rate, voice, etc.
    synth.speak(utterance);
    utteranceRef.current = utterance;
  }, [synth]);

  const stop = useCallback(() => {
    synth?.cancel();
  }, [synth]);

  return { speak, stop };
}

export {useSpeechSynthesis}



