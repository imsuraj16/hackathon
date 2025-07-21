import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section6 = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const numbersRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const statElements = statsRef.current;
    const numberElements = numbersRef.current;

    // Ensure all refs are available
    if (!section || statElements.length === 0 || numberElements.length === 0) {
      return;
    }

    // Counter animation function
    const animateCounter = (element, target) => {
      if (!element) return;
      
      const numericTarget = parseInt(target.replace(/[^\d]/g, ''));
      const suffix = target.replace(/[\d]/g, '');
      
      gsap.fromTo(element, 
        { textContent: '0' },
        {
          textContent: numericTarget,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate: function() {
            const currentNum = Math.round(this.targets()[0].textContent);
            element.textContent = currentNum + suffix;
          }
        }
      );
    };

    // Create unique context for this section
    let ctx = gsap.context(() => {
      // Main timeline with unique trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          id: 'section6-main', // Unique ID
          refreshPriority: -10 // Lower priority than Section5
        }
      });

      // Animate heading first
      tl.fromTo('.section6-heading', // More specific class
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: 'power2.out'
        }
      )
      .fromTo('.section6-subtext', // More specific class
        { 
          y: 30, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.4')
      
      // Animate stat circles with stagger
      .fromTo(statElements,
        {
          scale: 0,
          rotation: -180,
          opacity: 0
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.2,
          onComplete: () => {
            // Start counter animations after circles are visible
            numberElements.forEach((el, index) => {
              const targets = ['10K+', '50K+', '50+'];
              animateCounter(el, targets[index]);
            });
          }
        }, '-=0.2');

    }, section);

    // Cleanup function
    return () => {
      ctx.revert(); // Clean up all GSAP animations in this context
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 bg-[#E6E5E1] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-orange-300 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-orange-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-orange-300 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Updated class names for specificity */}
        <h2 className="section6-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Brewing success one sip at a time
        </h2>
        
        <p className="section6-subtext text-lg md:text-xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed">
          Thousands of cups brewed, fueling energy for creators, dreamers, and go-getters. 
          Pure, bold, and unstoppable—one sip at a time.
        </p>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          
          {/* Stat 1 - Cups Served */}
          <div 
            ref={el => statsRef.current[0] = el}
            className="relative"
          >
            {/* Decorative star */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-6 text-orange-500">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            
            {/* Circular progress background */}
            <div className="relative w-48 h-48 mx-auto">
              {/* Background circle */}
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              
              {/* Progress circle */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="url(#section6-gradient1)"
                  strokeWidth="8"
                  strokeDasharray="276"
                  strokeDashoffset="69"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="section6-gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div 
                  ref={el => numbersRef.current[0] = el}
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-2"
                >
                  0K+
                </div>
                <div className="text-gray-600 font-medium">Cups Served</div>
              </div>
            </div>
          </div>

          {/* Stat 2 - Orders Shipped (Center) */}
          <div 
            ref={el => statsRef.current[1] = el}
            className="relative"
          >
            {/* Decorative star */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-6 text-orange-500">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            
            {/* Full circle for center stat */}
            <div className="relative w-52 h-52 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 208 208">
                <circle
                  cx="104"
                  cy="104"
                  r="96"
                  fill="none"
                  stroke="url(#section6-gradient2)"
                  strokeWidth="8"
                  strokeDasharray="603"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="section6-gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div 
                  ref={el => numbersRef.current[1] = el}
                  className="text-5xl md:text-6xl font-bold text-gray-900 mb-2"
                >
                  0K+
                </div>
                <div className="text-gray-600 font-medium">Orders Shipped</div>
              </div>
            </div>
          </div>

          {/* Stat 3 - Cities Reached */}
          <div 
            ref={el => statsRef.current[2] = el}
            className="relative"
          >
            {/* Decorative star */}
            <div className="absolute -top-8 right-1/2 transform translate-x-1/2">
              <div className="w-6 h-6 text-orange-500">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="url(#section6-gradient3)"
                  strokeWidth="8"
                  strokeDasharray="276"
                  strokeDashoffset="69"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="section6-gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div 
                  ref={el => numbersRef.current[2] = el}
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-2"
                >
                  0+
                </div>
                <div className="text-gray-600 font-medium">Cities Reached</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Section6;
