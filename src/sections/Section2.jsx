import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
  const sectionRef = useRef(null);
  const image1DivRef = useRef(null);
  const image2DivRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Fade-in & slide-up text
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Scale animation for first image div (from large to normal)
    gsap.fromTo(
      image1DivRef.current,
      { scale: 2.2 },
      {
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Scale animation for second image div (from large to normal, with slight delay)
    gsap.fromTo(
      image2DivRef.current,
      { scale: 2.2 },
      {
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Clean up
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div>
      {/* Main scrollable section */}
      <div ref={sectionRef} className="w-full bg-[#191512] relative pt-[3rem] sm:pt-[5rem] pb-[8rem] sm:pb-[15rem] overflow-hidden">
        {/* Center text block */}
        <div
          ref={textRef}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white flex flex-col gap-[1rem] sm:gap-[2rem] px-4"
        >
          <h1 className="text-[2.5rem] sm:text-[3.5rem] lg:text-[5rem] leading-tight text-center">
            Cultivated <br /> art <br /> coffee
          </h1>
          <p className="w-full max-w-[20rem] sm:max-w-[25rem] lg:max-w-[27rem] text-sm sm:text-base lg:text-lg leading-relaxed text-center mx-auto">
            The passion for exceptional coffees continues to be transmitted in this centuries-old roasting workshop, a warm
            place which offers lively and vibrant coffee, coming from the most beautiful origins and always roasted according
            to the rules of the art. Between passion and tradition, Maison DEUZA perpetuates local history with one of the
            most consumed drinks in the world.
          </p>
        </div>

        {/* Images Container */}
        <div className="flex flex-col lg:block">
          {/* First Image */}
          <div className="px-[2rem] sm:px-[5rem] lg:px-[10rem] flex items-start mb-[2rem] lg:mb-0">
            <div 
              ref={image1DivRef}
              className="h-[20rem] sm:h-[30rem] lg:h-[40rem] w-full lg:w-auto overflow-hidden relative z-10"
            >
              <img
                className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-105"
                src="https://plus.unsplash.com/premium_photo-1675435644687-562e8042b9db?q=80&w=749&auto=format&fit=crop"
                alt="Coffee roasting process"
              />
            </div>
          </div>

          {/* Second Image */}
          <div className="px-[2rem] sm:px-[5rem] lg:px-[10rem] flex justify-start lg:justify-end py-[1rem] lg:py-[2rem]">
            <div 
              ref={image2DivRef}
              className="h-[20rem] sm:h-[30rem] lg:h-[40rem] w-full lg:w-auto overflow-hidden relative z-10"
            >
              <img
                className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-105"
                src="https://plus.unsplash.com/premium_photo-1675435644687-562e8042b9db?q=80&w=749&auto=format&fit=crop"
                alt="Coffee equipment view"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
