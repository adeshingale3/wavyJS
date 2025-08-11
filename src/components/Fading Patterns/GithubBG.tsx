import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react'

const GithubBG = () => {
    const [boxCount, setBoxCount] = useState(0);
    const boxRefs = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        function calculateBoxes() {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            // Box size (including margin/padding) in px
            const boxSize = 16; // 4 Tailwind units = 16px
            const cols = Math.floor(screenWidth / boxSize);
            const rows = Math.floor(screenHeight / boxSize);

            setBoxCount(cols * rows);
        }

        calculateBoxes();
        window.addEventListener("resize", calculateBoxes);
        return () => window.removeEventListener("resize", calculateBoxes);
    }, []);

    useEffect(() => {
        if (boxCount > 0) {
            // Random blink loop
            const interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * boxCount);
                const box = boxRefs.current[randomIndex];
                if (box) {
                    gsap.fromTo(
                        box,
                        { opacity: 0.2, color: "green" },
                        {
                            opacity: 1,
                            duration: 0.3,
                            yoyo: true,
                            repeat: 1,
                            ease: "power1.inOut"
                        }
                    );
                }
            }, 100); // every 100ms, blink a random box

            return () => clearInterval(interval);
        }
    }, [boxCount]);
    const getRandomColor = () => {
        const colors = [
            "rgba(0, 0, 0, 0.5)", // empty
            "rgba(155, 233, 168, 0.5)", // light
            "rgba(64, 196, 99, 0.5)",   // medium
            "rgba(48, 161, 78, 0.5)",   // dark
            "rgba(33, 110, 57, 0.5)"  // yellow
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    return (
        <div className='relative w-full h-full bg-black overflow-hidden'>
            <div className='absolute z-2 h-full w-full' style={{
                background: 'radial-gradient(circle at center, black 80%, transparent 100%)'
            }} />
            <div className='absolute z-1 h-full w-full grid grid-cols-[repeat(auto-fill,minmax(1rem,1fr))] gap-2 py-6 px-6 bottom-2'>
                {Array.from({ length: boxCount }).map((_, i) => (
                    <div key={i} style={{ backgroundColor: getRandomColor() }}
                        ref={(el) => (boxRefs.current[i] = el)} className="box w-4 h-4 rounded-md" />
                ))}
            </div>



        </div>
    )
}

export default GithubBG