import React, { useEffect, useRef } from "react";

const Section1 = () => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadGSAP = async () => {
        if (!window.gsap) {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
          document.head.appendChild(script);
          await new Promise((resolve) => {
            script.onload = resolve;
          });
        }

        const gsap = window.gsap;
        const image = imageRef.current;
        const container = containerRef.current;

        if (image && container) {
          // Mouse move liquid effect
          const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate mouse position relative to center
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            // Normalize values for smooth effect
            const rotateX = (mouseY / rect.height) * 15;
            const rotateY = (mouseX / rect.width) * -15;
            const skewX = (mouseX / rect.width) * 5;
            const skewY = (mouseY / rect.height) * 3;
            
            // Apply liquid distortion with GSAP
            gsap.to(image, {
              duration: 0.3,
              rotationX: rotateX,
              rotationY: rotateY,
              skewX: skewX,
              skewY: skewY,
              scale: 1.02 + Math.abs(mouseX + mouseY) / 10000,
              transformPerspective: 1000,
              ease: "power2.out"
            });
          };

          // Mouse leave - reset to normal
          const handleMouseLeave = () => {
            gsap.to(image, {
              duration: 0.8,
              rotationX: 0,
              rotationY: 0,
              skewX: 0,
              skewY: 0,
              scale: 1,
              ease: "elastic.out(1, 0.3)"
            });
          };

          // Mouse enter - start liquid effect
          const handleMouseEnter = () => {
            gsap.to(image, {
              duration: 0.5,
              scale: 1.05,
              ease: "power2.out"
            });
          };

          // Add event listeners
          container.addEventListener('mousemove', handleMouseMove);
          container.addEventListener('mouseleave', handleMouseLeave);
          container.addEventListener('mouseenter', handleMouseEnter);

          // Cleanup
          return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeEventListener('mouseenter', handleMouseEnter);
          };
        }
      };

      loadGSAP();
    }
  }, []);

  return (
    <div className="bg-[#BDB2A7] w-full min-h-screen px-4 sm:px-6 md:px-16 lg:px-[8rem] font-[Helvativa_Now_Display] py-[2rem] pb-[8rem] relative overflow-hidden">
      <div className="flex items-center flex-col leading-tight text-center">
        <h1 className="text-orange-500 text-[1rem] sm:text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem] hover:text-orange-400 transition-colors duration-300 ease-out">
          Pure Caffine Nothing Extra
        </h1>
        <h1 className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[14rem] xl:text-[20rem] pb-[2rem] md:pb-[4rem] lg:pb-[4.8rem] hover:scale-105 transition-transform duration-500 ease-out cursor-default">
          ColdBrew
        </h1>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        <div className="flex flex-col gap-[2rem] md:gap-[3rem] items-center md:items-start">
          <p className="w-full md:w-[15rem] text-center md:text-left text-sm sm:text-base">
           Born from a passion for exceptional coffee, Sleepy Owl revolutionizes your daily brew experience. From our signature cold brew to artisanal blends, we bring café-quality coffee to your home with innovative brewing methods and premium beans sourced from the finest origins.
          </p>
          <button className="bg-black w-fit px-[2rem] sm:px-[3rem] py-2 rounded-lg text-white text-sm sm:text-base hover:bg-orange-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-out hover:shadow-lg">
            Buy Now
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 pr-0 md:pr-[4rem]">
          <h1 className="p-2 sm:p-3 bg-gray-300 rounded-r-[2rem] text-sm sm:text-base hover:bg-gray-400 hover:scale-105 hover:shadow-md transition-all duration-300 ease-out cursor-pointer">
            65% less acidity
          </h1>
          <h1 className="p-2 sm:p-3 bg-gray-300 rounded-r-[2rem] text-sm sm:text-base hover:bg-gray-400 hover:scale-105 hover:shadow-md transition-all duration-300 ease-out cursor-pointer">
            100% Natural Caffeine
          </h1>
          <h1 className="p-2 sm:p-3 bg-gray-300 rounded-r-[2rem] text-sm sm:text-base hover:bg-gray-400 hover:scale-105 hover:shadow-md transition-all duration-300 ease-out cursor-pointer">
            Cold Steeped
          </h1>
        </div>
      </div>

      {/* Vertical "BoldBrew" text with low opacity - Hidden on mobile */}
      <div className="hidden lg:block absolute right-[-19rem] top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <h1 className="text-[10rem] xl:text-[12rem] font-bold text-black opacity-10 whitespace-nowrap">
          BoldBrew
        </h1>
      </div>

      {/* Water liquid effect container */}
      <div 
        ref={containerRef}
        className="absolute -bottom-[1rem] sm:-bottom-[2rem] md:-bottom-[3rem] left-1/2 -translate-x-1/2 w-[14rem] sm:w-[18rem] md:w-[20rem] lg:w-[25rem] xl:w-[30rem] h-[18rem] sm:h-[23rem] md:h-[30rem] lg:h-[35rem] xl:h-[40rem] cursor-pointer"
      >
        {/* Orange blur background */}
        <div className="absolute inset-0 bg-orange-400 opacity-60 blur-3xl rounded-full transform scale-110 -z-10"></div>

        {/* Coffee image with liquid effect */}
        <img
          ref={imageRef}
          className="w-full h-full object-cover relative z-10 transition-transform duration-700 ease-out"
          src="coffee.png"
          alt=""
          style={{
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
            transformStyle: 'preserve-3d'
          }}
        />
      </div>
    </div>
  );
};

export default Section1;
