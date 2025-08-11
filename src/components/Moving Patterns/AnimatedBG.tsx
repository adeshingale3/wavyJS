
import gsap from 'gsap'
import React, { useEffect } from 'react'

export const AnimatedBG = () => {
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
    <div className='w-full h-full bg-black overflow-hidden relative'>
            <div className="relative w-full h-full">
  <div className="green absolute bg-green-500/40 rounded-full 
                  w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 
                  left-[10%] top-[2%]"/>
<div className="green absolute bg-blue-500/40 rounded-full 
                  w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 
                  left-[10%] top-[60%]"/>
  
  <div className="red absolute bg-red-500/40 rounded-full 
                  w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 
                  left-[60%] top-[2%]"/>
  
  <div className="pink absolute bg-pink-500/40 rounded-full 
                  w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 
                  left-[40%] top-[50%]"/>
    <div className="pink absolute bg-yellow-500/40 rounded-full 
                  w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 
                  left-[80%] top-[40%]"/>
  
  <div className="absolute w-full h-full bg-black/30 backdrop-blur-2xl"/>
</div>

            
        </div>
  )
}

AnimatedBG.displayName = 'AnimatedBG'