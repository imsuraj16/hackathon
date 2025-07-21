// components/Loader.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = ({ onLoadingComplete }) => {
  const loaderRef = useRef(null);
  const coffeeRef = useRef(null);
  const steamRef = useRef(null);
  const owlRef = useRef(null);
  const taglineRef = useRef(null);
  const eyesRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ 
      onComplete: () => {
        // Add a small delay before calling onLoadingComplete for smoother UX
        setTimeout(() => {
          onLoadingComplete();
        }, 100);
      }
    });

    // Initial setup - hide elements
    gsap.set([coffeeRef.current, steamRef.current, taglineRef.current], { opacity: 0 });
    gsap.set(eyesRef.current, { scaleY: 0, transformOrigin: 'center' });
    gsap.set('.coffee-fill', { height: '0%' });

    // Main animation sequence
    tl.to(eyesRef.current, {
      scaleY: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1
    })
    .to([coffeeRef.current, taglineRef.current], {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.3')
    .to('.coffee-fill', {
      height: '75%',
      duration: 1.5,
      ease: 'power2.inOut'
    })
    .to(steamRef.current, {
      opacity: 1,
      duration: 0.5
    }, '-=1.2')
    .to('.steam-particle', {
      y: -40,
      opacity: 0,
      duration: 1.8,
      ease: 'power1.out',
      stagger: 0.2,
      repeat: 1,
      repeatDelay: 0.3
    }, '-=0.8')
    .to({}, { duration: 0.3 })
    .to(loaderRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.7,
      ease: 'power2.inOut'
    });

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, [onLoadingComplete]);

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-900"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Sleepy Owl Logo */}
      <div ref={owlRef} className="mb-12">
        <div className="relative w-24 h-24">
          {/* Owl body */}
          <div className="w-full h-full bg-amber-100 rounded-full relative overflow-hidden shadow-lg">
            {/* Owl face */}
            <div className="absolute inset-3 bg-amber-50 rounded-full border border-amber-200">
              {/* Eyes */}
              <div 
                className="absolute top-4 left-4 w-3 h-3 bg-stone-800 rounded-full" 
                ref={el => eyesRef.current[0] = el}
              >
                <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-80"></div>
              </div>
              <div 
                className="absolute top-4 right-4 w-3 h-3 bg-stone-800 rounded-full"
                ref={el => eyesRef.current[1] = el}
              >
                <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full opacity-80"></div>
              </div>
              {/* Sleepy expression */}
              <div className="absolute top-6 left-4 w-3 h-0.5 bg-stone-600 rounded-full opacity-30"></div>
              <div className="absolute top-6 right-4 w-3 h-0.5 bg-stone-600 rounded-full opacity-30"></div>
              {/* Beak */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-sm rotate-45"></div>
            </div>
            {/* Owl ears/horns */}
            <div className="absolute -top-3 left-3 w-5 h-5 bg-amber-100 rounded-full transform rotate-45 shadow-sm"></div>
            <div className="absolute -top-3 right-3 w-5 h-5 bg-amber-100 rounded-full transform -rotate-45 shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* Coffee Cup Animation */}
      <div ref={coffeeRef} className="relative mb-8">
        <div className="relative w-28 h-36">
          {/* Cup shadow */}
          <div className="absolute bottom-0 left-1 w-24 h-28 bg-black opacity-10 rounded-b-lg blur-sm"></div>
          
          {/* Main cup */}
          <div className="absolute bottom-2 w-24 h-28 bg-stone-100 rounded-b-3xl border-4 border-amber-200 overflow-hidden shadow-lg">
            {/* Coffee fill with gradient */}
            <div className="coffee-fill absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900 via-amber-800 to-amber-700 rounded-b-3xl h-0 transition-all">
              {/* Coffee surface foam */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-amber-100 opacity-60 rounded-full"></div>
            </div>
          </div>
          
          {/* Cup handle */}
          <div className="absolute right-1 top-10 w-7 h-10 border-4 border-amber-200 rounded-r-full bg-transparent shadow-inner"></div>
          
          {/* Saucer */}
          <div className="absolute -bottom-1 -left-2 w-28 h-5 bg-gradient-to-b from-stone-200 to-stone-300 rounded-full shadow-md"></div>
        </div>

        {/* Steam Animation */}
        <div ref={steamRef} className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0">
          <div className="steam-particle w-1 h-10 bg-gradient-to-t from-stone-300 via-stone-400 to-transparent rounded-full opacity-70 absolute transform -translate-x-2"></div>
          <div className="steam-particle w-1.5 h-8 bg-gradient-to-t from-stone-300 via-stone-400 to-transparent rounded-full opacity-50 absolute"></div>
          <div className="steam-particle w-1 h-12 bg-gradient-to-t from-stone-300 via-stone-400 to-transparent rounded-full opacity-60 absolute transform translate-x-2"></div>
        </div>
      </div>

      {/* Brand tagline */}
      <div ref={taglineRef} className="text-center opacity-0">
        <p className="text-amber-100 text-xl font-light tracking-wider mb-2">
          Brewing your perfect cup...
        </p>
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto opacity-60"></div>
      </div>

      {/* Loading dots */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
