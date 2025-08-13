
import gsap from 'gsap'
import React, { useEffect } from 'react'

export const AnimatedBG: React.FC = () => {
    useEffect(() => {
        const randomX = gsap.utils.random(100, 100)
        const randomY = gsap.utils.random(100, 100)
        gsap.to('.green', {
            x: randomX,
            y: randomY,
            scale: 1,
            opacity: 1,
            duration: gsap.utils.random(2, 10), // slow speed
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
        gsap.to('.red', {
            x: randomX,
            y: randomY,
            scale: 1,
            opacity: 1,
            duration: gsap.utils.random(2, 8), // slow speed
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
        gsap.to('.pink', {
            x: randomX,
            y: randomY,
            scale: 1,
            opacity: 1,
            duration: gsap.utils.random(2, 4), // slow speed
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    }, [])
    
    return (
        <div
            aria-hidden
            style={{
                height: '100%',
                width:'100%',
                zIndex: 0,
                backgroundColor: 'black',
                overflow: 'hidden',
                pointerEvents: 'none',
                userSelect: 'none',
            }}
        >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <div
                    className="green"
                    style={{
                        position: 'absolute',
                        backgroundColor: 'rgba(34, 197, 94, 0.4)',
                        borderRadius: 9999,
                        width: 128,
                        height: 128,
                        left: '10%',
                        top: '2%'
                    }}
                />
                <div
                    className="green"
                    style={{
                        position: 'absolute',
                        backgroundColor: 'rgba(59, 130, 246, 0.4)',
                        borderRadius: 9999,
                        width: 128,
                        height: 128,
                        left: '10%',
                        top: '60%'
                    }}
                />

                <div
                    className="red"
                    style={{
                        position: 'absolute',
                        backgroundColor: 'rgba(239, 68, 68, 0.4)',
                        borderRadius: 9999,
                        width: 128,
                        height: 128,
                        left: '60%',
                        top: '2%'
                    }}
                />

                <div
                    className="pink"
                    style={{
                        position: 'absolute',
                        backgroundColor: 'rgba(236, 72, 153, 0.4)',
                        borderRadius: 9999,
                        width: 128,
                        height: 128,
                        left: '40%',
                        top: '50%'
                    }}
                />
                <div
                    className="pink"
                    style={{
                        position: 'absolute',
                        backgroundColor: 'rgba(234, 179, 8, 0.4)',
                        borderRadius: 9999,
                        width: 128,
                        height: 128,
                        left: '80%',
                        top: '40%'
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        backdropFilter: 'blur(24px)'
                    }}
                />
            </div>
        </div>
    )
}

AnimatedBG.displayName = 'AnimatedBG'