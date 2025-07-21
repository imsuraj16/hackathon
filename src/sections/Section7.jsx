import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section7 = () => {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const logo = logoRef.current;
    const content = contentRef.current;

    if (!section || !logo || !content) return;

    // Continuous rotation animation for SVG
    gsap.to(logo, {
      rotation: 360,
      duration: 20,
      ease: 'none',
      repeat: -1
    });

    // ScrollTrigger animation for content
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo('.section7-content', 
        { 
          y: 100, 
          opacity: 0,
          scale: 0.9
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out'
        }
      )
      .fromTo('.section7-logo', 
        { 
          scale: 0,
          rotation: -180,
          opacity: 0
        },
        { 
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'back.out(1.7)'
        }, '-=0.8');

    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-900 py-[3rem]"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2061&q=80')`
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Coffee beans pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-6 h-6 bg-amber-600 rounded-full transform rotate-45"></div>
          <div className="absolute top-32 right-32 w-4 h-4 bg-amber-600 rounded-full transform rotate-12"></div>
          <div className="absolute bottom-40 left-40 w-5 h-5 bg-amber-600 rounded-full transform -rotate-30"></div>
          <div className="absolute bottom-20 right-20 w-7 h-7 bg-amber-600 rounded-full transform rotate-60"></div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="section7-content relative z-10 text-center max-w-4xl mx-auto px-6">
        
        {/* Rotating SVG Logo */}
        <div 
          ref={logoRef}
          className="section7-logo mb-12 flex justify-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96" 
            viewBox="0 0 338 338"
          >
            <g transform="translate(169 169)">
              {/* Outer circle */}
              <circle cx="0" cy="0" r="168.5" fill="none" stroke="#f97316" strokeWidth="3" opacity="0.8"></circle>
              
              {/* Inner circle */}
              <circle cx="0" cy="0" r="103.5" fill="none" stroke="#ea580c" strokeWidth="2" opacity="0.6"></circle>
              
              {/* First "SLEEPY OWL" text - Top half of outer circle */}
              <g className="text-amber-100" fontSize="18" fontFamily="Inter, sans-serif" fontWeight="600">
                <text transform="rotate(-90) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">S</text>
                <text transform="rotate(-78) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">L</text>
                <text transform="rotate(-66) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">E</text>
                <text transform="rotate(-54) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">E</text>
                <text transform="rotate(-42) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">P</text>
                <text transform="rotate(-30) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">Y</text>
                <text transform="rotate(-18) translate(0, -145)" textAnchor="middle" fill="#f3f4f6"> </text>
                <text transform="rotate(-6) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">O</text>
                <text transform="rotate(6) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">W</text>
                <text transform="rotate(18) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">L</text>
              </g>
              
              {/* Second "SLEEPY OWL" text - Bottom half of outer circle */}
              <g className="text-amber-100" fontSize="18" fontFamily="Inter, sans-serif" fontWeight="600">
                <text transform="rotate(90) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">S</text>
                <text transform="rotate(102) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">L</text>
                <text transform="rotate(114) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">E</text>
                <text transform="rotate(126) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">E</text>
                <text transform="rotate(138) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">P</text>
                <text transform="rotate(150) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">Y</text>
                <text transform="rotate(162) translate(0, -145)" textAnchor="middle" fill="#f3f4f6"> </text>
                <text transform="rotate(174) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">O</text>
                <text transform="rotate(186) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">W</text>
                <text transform="rotate(198) translate(0, -145)" textAnchor="middle" fill="#f3f4f6">L</text>
              </g>
              
              {/* Coffee text on inner ring */}
              <g className="text-orange-200" fontSize="16" fontFamily="Inter, sans-serif" fontWeight="500">
                <text transform="rotate(30) translate(0, -85)" textAnchor="middle" fill="#fed7aa">C</text>
                <text transform="rotate(60) translate(0, -85)" textAnchor="middle" fill="#fed7aa">O</text>
                <text transform="rotate(90) translate(0, -85)" textAnchor="middle" fill="#fed7aa">F</text>
                <text transform="rotate(120) translate(0, -85)" textAnchor="middle" fill="#fed7aa">F</text>
                <text transform="rotate(150) translate(0, -85)" textAnchor="middle" fill="#fed7aa">E</text>
                <text transform="rotate(180) translate(0, -85)" textAnchor="middle" fill="#fed7aa">E</text>
                <text transform="rotate(210) translate(0, -85)" textAnchor="middle" fill="#fed7aa">C</text>
                <text transform="rotate(240) translate(0, -85)" textAnchor="middle" fill="#fed7aa">O</text>
                <text transform="rotate(270) translate(0, -85)" textAnchor="middle" fill="#fed7aa">F</text>
                <text transform="rotate(300) translate(0, -85)" textAnchor="middle" fill="#fed7aa">F</text>
                <text transform="rotate(330) translate(0, -85)" textAnchor="middle" fill="#fed7aa">E</text>
                <text transform="rotate(0) translate(0, -85)" textAnchor="middle" fill="#fed7aa">E</text>
              </g>
              
              {/* Central owl icon */}
              <g transform="translate(0, -10)">
                {/* Owl body */}
                <ellipse cx="0" cy="0" rx="35" ry="40" fill="#deb887" stroke="#8b4513" strokeWidth="3"/>
                
                {/* Owl ears */}
                <path d="M-20,-30 L-12,-45 L-5,-30 Z" fill="#deb887" stroke="#8b4513" strokeWidth="2"/>
                <path d="M20,-30 L12,-45 L5,-30 Z" fill="#deb887" stroke="#8b4513" strokeWidth="2"/>
                
                {/* Sleepy eyes */}
                <path d="M-15,-10 Q-10,-15 -5,-10" fill="none" stroke="#8b4513" strokeWidth="3" strokeLinecap="round"/>
                <path d="M15,-10 Q10,-15 5,-10" fill="none" stroke="#8b4513" strokeWidth="3" strokeLinecap="round"/>
                
                {/* Beak */}
                <path d="M0,2 L-4,8 L4,8 Z" fill="#f97316"/>
                
                {/* Coffee steam */}
                <g opacity="0.8">
                  <path d="M-12,20 Q-8,12 -12,4" fill="none" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M0,20 Q4,12 0,4" fill="none" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12,20 Q16,12 12,4" fill="none" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round"/>
                </g>
              </g>
              
              {/* Decorative coffee beans */}
              <g opacity="0.7">
                <ellipse cx="60" cy="-60" rx="4" ry="8" fill="#8b4513" transform="rotate(45 60 -60)"/>
                <path d="M60,-60 Q63,-57 60,-54" fill="none" stroke="#deb887" strokeWidth="1"/>
                
                <ellipse cx="-60" cy="60" rx="4" ry="8" fill="#8b4513" transform="rotate(-45 -60 60)"/>
                <path d="M-60,60 Q-57,63 -60,66" fill="none" stroke="#deb887" strokeWidth="1"/>
                
                <ellipse cx="80" cy="20" rx="3" ry="6" fill="#8b4513" transform="rotate(30 80 20)"/>
                <path d="M80,20 Q82,22 80,24" fill="none" stroke="#deb887" strokeWidth="1"/>
                
                <ellipse cx="-80" cy="-20" rx="3" ry="6" fill="#8b4513" transform="rotate(-30 -80 -20)"/>
                <path d="M-80,-20 Q-78,-18 -80,-16" fill="none" stroke="#deb887" strokeWidth="1"/>
              </g>
            </g>
          </svg>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Wake Up to 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            {' '}Excellence
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Experience the perfect blend of tradition and innovation with our premium cold brew coffee. 
          Crafted for those who never settle for ordinary.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <span className="relative z-10">Shop Now</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full transform transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-105">
            Learn More
          </button>
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="group">
            <h3 className="text-4xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors">50K+</h3>
            <p className="text-gray-300 mt-2">Happy Customers</p>
          </div>
          <div className="group">
            <h3 className="text-4xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors">100%</h3>
            <p className="text-gray-300 mt-2">Premium Quality</p>
          </div>
          <div className="group">
            <h3 className="text-4xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors">24/7</h3>
            <p className="text-gray-300 mt-2">Energy Boost</p>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-orange-500 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-amber-300 rounded-full animate-bounce opacity-60"></div>
      </div>
    </section>
  );
};

export default Section7;
