import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

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
        // Increased delay to allow app to fully load
        setTimeout(() => {
          onLoadingComplete();
        }, 500); // Increased from 100ms to 500ms
      },
    });

    gsap.set([coffeeRef.current, steamRef.current, taglineRef.current], {
      opacity: 0,
    });
    gsap.set(eyesRef.current, { scaleY: 0, transformOrigin: "center" });
    gsap.set(".coffee-fill", { height: "0%" });

    tl
      // Initial pause to let things settle
      .to({}, { duration: 0.8 }) // Added initial delay
      
      // Owl eyes opening - slower and more deliberate
      .to(eyesRef.current, {
        scaleY: 1,
        duration: 1.2, // Increased from 0.8s
        ease: "power2.out",
        stagger: 0.2, // Increased stagger
      })
      
      // Show coffee cup and tagline
      .to(
        [coffeeRef.current, taglineRef.current],
        {
          opacity: 1,
          duration: 0.8, // Increased from 0.5s
          ease: "power2.out",
        },
        "-=0.5"
      )
      
      // Coffee filling - much slower for dramatic effect
      .to(".coffee-fill", {
        height: "75%",
        duration: 3.5, // Increased from 1.5s
        ease: "power2.inOut",
      })
      
      // Steam appears
      .to(
        steamRef.current,
        {
          opacity: 1,
          duration: 0.8, // Increased from 0.5s
        },
        "-=2.5" // Adjusted timing
      )
      
      // Steam particles animation - longer and more cycles
      .to(
        ".steam-particle",
        {
          y: -50, // Increased distance
          opacity: 0,
          duration: 2.5, // Increased duration
          ease: "power1.out",
          stagger: 0.3, // Increased stagger
          repeat: 3, // Increased from 1 to 3 repeats
          repeatDelay: 0.5, // Increased delay between repeats
        },
        "-=2.0"
      )
      
      // Additional brewing phase with text changes
      .to(taglineRef.current, {
        opacity: 0.7,
        duration: 0.5,
      }, "-=3")
      .set(taglineRef.current, {
        innerHTML: '<p class="text-amber-100 text-xl font-light tracking-wider mb-2">Almost ready...</p><div class="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto opacity-60"></div>'
      })
      .to(taglineRef.current, {
        opacity: 1,
        duration: 0.5,
      })
      
      // Hold the final state longer
      .to({}, { duration: 1.5 }) // Extended hold time
      
      // Final fade out
      .to(loaderRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1.0, // Increased fade out duration
        ease: "power2.inOut",
      });

    return () => {
      tl.kill();
    };
  }, [onLoadingComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-900"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div ref={owlRef} className="mb-12">
        <div className="relative w-24 h-24">
          <div className="w-full h-full bg-amber-100 rounded-full relative overflow-hidden shadow-lg">
            <div className="absolute inset-3 bg-amber-50 rounded-full border border-amber-200">
              <div
                className="absolute top-4 left-4 w-3 h-3 bg-stone-800 rounded-full"
                ref={(el) => (eyesRef.current[0] = el)}
              >
                <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-80"></div>
              </div>
              <div
                className="absolute top-4 right-4 w-3 h-3 bg-stone-800 rounded-full"
                ref={(el) => (eyesRef.current[1] = el)}
              >
                <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full opacity-80"></div>
              </div>

              <div className="absolute top-6 left-4 w-3 h-0.5 bg-stone-600 rounded-full opacity-30"></div>
              <div className="absolute top-6 right-4 w-3 h-0.5 bg-stone-600 rounded-full opacity-30"></div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-sm rotate-45"></div>
            </div>

            <div className="absolute -top-3 left-3 w-5 h-5 bg-amber-100 rounded-full transform rotate-45 shadow-sm"></div>
            <div className="absolute -top-3 right-3 w-5 h-5 bg-amber-100 rounded-full transform -rotate-45 shadow-sm"></div>
          </div>
        </div>
      </div>

      <div ref={coffeeRef} className="relative mb-8">
        <div className="relative w-28 h-36">
          <div className="absolute bottom-0 left-1 w-24 h-28 bg-black opacity-10 rounded-b-lg blur-sm"></div>

          <div className="absolute bottom-2 w-24 h-28 bg-stone-100 rounded-b-3xl border-4 border-amber-200 overflow-hidden shadow-lg">
            <div className="coffee-fill absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900 via-amber-800 to-amber-700 rounded-b-3xl h-0 transition-all">
              <div className="absolute top-0 left-0 right-0 h-2 bg-amber-100 opacity-60 rounded-full"></div>
            </div>
          </div>

          <div className="absolute right-1 top-10 w-7 h-10 border-4 border-amber-200 rounded-r-full bg-transparent shadow-inner"></div>

          <div className="absolute -bottom-1 -left-2 w-28 h-5 bg-gradient-to-b from-stone-200 to-stone-300 rounded-full shadow-md"></div>
        </div>

        <div
          ref={steamRef}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0"
        >
          <div className="steam-particle w-1 h-10 bg-gradient-to-t from-stone-300 via-stone-400 to-transparent rounded-full opacity-70 absolute transform -translate-x-2"></div>
          <div className="steam-particle w-1.5 h-8 bg-gradient-to-t from-stone-300 via-stone-400 to-transparent rounded-full opacity-50 absolute"></div>
          <div className="steam-particle w-1 h-12 bg-gradient-to-t from-stone-300 via-stone-400 to-transparent rounded-full opacity-60 absolute transform translate-x-2"></div>
        </div>
      </div>

      <div ref={taglineRef} className="text-center opacity-0">
        <p className="text-amber-100 text-xl font-light tracking-wider mb-2">
          Brewing your perfect cup...
        </p>
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto opacity-60"></div>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;