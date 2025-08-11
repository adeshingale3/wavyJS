import gsap from 'gsap'
import React, { useEffect } from 'react'
// Remove CSS import to prevent global style conflicts
// import './MaskedBG.css'

const MaskedBG = () => {
useEffect(() => {
    const container = document.querySelector('#masked-bg-container');
    if (!container) return;

    // Animate first circle
    gsap.fromTo('#circle1', 
        { 
            y: 50,
            x: 0,
        }, 
        { 
            y: 200,
            x: 100,
            duration: 5,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
            onUpdate: function() {
                const circle = document.querySelector('#circle1');
                if (!circle) return;
                const rect = circle.getBoundingClientRect();
                const x = (rect.left + rect.width/2) / window.innerWidth * 100;
                const y = (rect.top + rect.height/2) / window.innerHeight * 100;
                (container as HTMLElement).style.setProperty('--circle1-x', `${x}%`);
                (container as HTMLElement).style.setProperty('--circle1-y', `${y}%`);
            }
        }
    );

    // Animate second circle
    gsap.fromTo('#circle2', 
        { 
            x: 0,
            y: -50,
        }, 
        { 
            x: 50,
            y: 50,
            duration: 3,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
            onUpdate: function() {
                const circle = document.querySelector('#circle2');
                if (!circle) return;
                const rect = circle.getBoundingClientRect();
                const x = (rect.left + rect.width/2) / window.innerWidth * 100;
                const y = (rect.top + rect.height/2) / window.innerHeight * 100;
                (container as HTMLElement).style.setProperty('--circle2-x', `${x}%`);
                (container as HTMLElement).style.setProperty('--circle2-y', `${y}%`);
            }
        }
    );
    gsap.fromTo('#circle3', 
        { 
            x: 0,
            y: -50,
            
        }, 
        { 
            x: 60,
            y: 50,
            duration: 3,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
            onUpdate: function() {
                const circle = document.querySelector('#circle3');
                if (!circle) return;
                const rect = circle.getBoundingClientRect();
                const x = (rect.left + rect.width/2) / window.innerWidth * 100;
                const y = (rect.top + rect.height/2) / window.innerHeight * 100;
                (container as HTMLElement).style.setProperty('--circle3-x', `${x}%`);
                (container as HTMLElement).style.setProperty('--circle3-y', `${y}%`);
            }
        }
    );
    gsap.fromTo('#circle4', 
        { 
            x: 0,
            y: -50,
            
        }, 
        { 
            x: 50,
            y: 50,
            duration: 3,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
            onUpdate: function() {
                const circle = document.querySelector('#circle4');
                if (!circle) return;
                const rect = circle.getBoundingClientRect();
                const x = (rect.left + rect.width/2) / window.innerWidth * 100;
                const y = (rect.top + rect.height/2) / window.innerHeight * 100;
                (container as HTMLElement).style.setProperty('--circle4-x', `${x}%`);
                (container as HTMLElement).style.setProperty('--circle4-y', `${y}%`);
            }
        }
    );
}, []);

return (
    <div id="masked-bg-container" className='relative w-full h-full overflow-hidden'>
      <style dangerouslySetInnerHTML={{
        __html: `
          .background {
            position: relative;
            width: 100%;
            height: 100%;
            background: black;
          }
          .background::before {
            content: "";
            position: absolute;
            inset: 0;
            background: repeating-linear-gradient(
              to right,
              rgba(255, 255, 255, 0.1) 0 2px,
              transparent 2px 50px
            );
            -webkit-mask-image:
              radial-gradient(circle 400px at 10% 80%, black 40%, transparent 100%),
              radial-gradient(circle 250px at 80% 90%, black 40%, transparent 100%),
              radial-gradient(circle 400px at 40% 95%, black 40%, transparent 100%),
              radial-gradient(circle 250px at 60% 80%, black 40%, transparent 100%);
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-composite: destination-out;
            mask-composite: exclude;
          }
          .background::after {
            content: "";
            position: absolute;
            inset: 0;
            background:
              radial-gradient(circle 400px at 40% 95%, rgba(152, 8, 255, 0.6) 0%, transparent 100%),
              radial-gradient(circle 250px at 60% 80%, rgba(255, 0, 255, 0.6) 0%, transparent 100%);
            pointer-events: none;
          }
        `
      }} />
      <div className="relative w-full h-full overflow-hidden z-0">
        {/* Black background */}
        <div className="background absolute inset-0 bg-black" />

        {/* Circle masks */}
        <div id="circle1" className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            left: '10%',
            top: '80%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(20px)',
          }}
        />
        <div id="circle2" className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            left: '80%',
            top: '90%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(20px)',
          }}
        />
        <div id="circle3" className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            left: '40%',
            top: '95%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(20px)',
          }}
        />
        <div id="circle4" className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            left: '60%',
            top: '80%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Masked grid layer */}
        <div className="absolute inset-0">
          {/* Grid columns */}
          <div className="absolute inset-0 flex"
            style={{  
                          
              WebkitMaskImage: `
                radial-gradient(
  circle 400px at var(--circle1-x, 20%) var(--circle1-y, 40%),
  rgba(75, 0, 130, 0.6) 0%,   /* Dark Indigo inside */
  rgba(75, 0, 130, 0) 100%
),
radial-gradient(
  circle 250px at var(--circle3-x, 40%) var(--circle3-y, 95%),
  rgba(128, 0, 128, 0.6) 0%,  /* Dark Purple inside */
  rgba(128, 0, 128, 0) 100%
),
radial-gradient(
  circle 400px at var(--circle2-x, 70%) var(--circle2-y, 50%),
  rgba(75, 0, 130, 0.6) 0%,   /* Dark Indigo inside */
  rgba(75, 0, 130, 0) 100%
),
radial-gradient(
  circle 250px at var(--circle4-x, 60%) var(--circle4-y, 80%),
  rgba(128, 0, 128, 0.6) 0%,  /* Dark Purple inside */
  rgba(128, 0, 128, 0) 100%
)

              `,
              WebkitMaskRepeat: 'no-repeat',
              maskComposite: 'destination-out',
            }}
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="flex-1"
                style={{
                  backgroundColor: '#3b82f6'
                }}
              />
            ))}
          </div>
        </div>

        
      </div>
    </div>
  )
}
export default MaskedBG;

