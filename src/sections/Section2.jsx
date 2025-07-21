import React, { useEffect, useRef } from "react";

const Section2 = () => {
  const sectionRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const loadGSAP = async () => {
      if (typeof window !== "undefined" && !window.gsap) {
        // Load core GSAP
        const script1 = document.createElement("script");
        script1.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
        document.head.appendChild(script1);

        // Load ScrollTrigger plugin
        const script2 = document.createElement("script");
        script2.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
        document.head.appendChild(script2);

        await new Promise((resolve) => {
          script2.onload = resolve;
        });

        window.gsap.registerPlugin(window.ScrollTrigger);
      }

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      if (gsap && ScrollTrigger) {
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

        // Scroll upward - first image
        gsap.fromTo(
          image1Ref.current,
          { y: 0 },
          {
            y: -300,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        // Scroll upward - second image (slightly slower for parallax)
        gsap.fromTo(
          image2Ref.current,
          { y: 0 },
          {
            y: -150,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        // Clean up
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
      }
    };

    loadGSAP();
  }, []);

  return (
    <div>
      {/* Main scrollable section */}
      <div ref={sectionRef} className="w-full bg-[#191512] relative pt-[5rem] pb-[15rem] overflow-visible">
        {/* Center text block */}
        <div
          ref={textRef}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white text-2xl flex flex-col gap-[2rem]"
        >
          <h1 className="text-[5rem] leading-tight text-center">
            Cultivated <br /> art <br /> coffee
          </h1>
          <p className="w-[27rem] text-lg leading-relaxed text-center mx-auto">
            The passion for exceptional coffees continues to be transmitted in this centuries-old roasting workshop, a warm
            place which offers lively and vibrant coffee, coming from the most beautiful origins and always roasted according
            to the rules of the art. Between passion and tradition, Maison DEUZA perpetuates local history with one of the
            most consumed drinks in the world.
          </p>
        </div>

        {/* Top Image (left) */}
        <div className="px-[10rem] flex items-start">
          <div className="h-[40rem] overflow-visible relative z-10">
            <img
              ref={image1Ref}
              className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-105"
              src="https://plus.unsplash.com/premium_photo-1675435644687-562e8042b9db?q=80&w=749&auto=format&fit=crop"
              alt="Coffee roasting process"
            />
          </div>
        </div>

        {/* Bottom Image (right, with parallax scroll) */}
        <div className="px-[10rem] flex justify-end py-[2rem]">
          <div className="h-[40rem] overflow-visible relative z-10">
            <img
              ref={image2Ref}
              className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-105"
              src="https://plus.unsplash.com/premium_photo-1675435644687-562e8042b9db?q=80&w=749&auto=format&fit=crop"
              alt="Coffee equipment view"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
