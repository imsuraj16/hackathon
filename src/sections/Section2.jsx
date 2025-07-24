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

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div>
      <div
        ref={sectionRef}
        className="w-full bg-[#191512] relative pt-[3rem] sm:pt-[5rem] sm:pb-[10rem] overflow-hidden"
      >
        <div
          ref={textRef}
          className="
      absolute 
      left-1/2 
      top-1/2 
      -translate-x-1/2 
      -translate-y-1/2 
      lg:top-1/3 
      lg:-translate-y-1/3 
      z-20 
      text-white 
      flex flex-col 
      gap-[1rem] sm:gap-[2rem] 
      px-4
    "
        >
          <h1 className="text-[2.5rem] sm:text-[3.5rem] lg:text-[5rem] leading-tight text-center">
            Cultivated <br /> art <br /> coffee
          </h1>
          <p className="w-full max-w-[20rem] sm:max-w-[25rem] lg:max-w-[27rem] text-sm sm:text-base lg:text-lg leading-relaxed text-center mx-auto">
            The passion for exceptional coffees continues to be transmitted in
            this centuries-old roasting workshop, a warm place which offers
            lively and vibrant coffee, coming from the most beautiful origins
            and always roasted according to the rules of the art. Between
            passion and tradition, Maison DEUZA perpetuates local history with
            one of the most consumed drinks in the world.
          </p>
        </div>

        <div className="flex flex-col lg:block">
          <div className="px-[2rem] sm:px-[5rem] lg:px-[10rem] flex items-start mb-[2rem] lg:mb-0">
            <div
              ref={image1DivRef}
              className="h-[20rem] sm:h-[30rem] lg:h-[40rem] w-full lg:w-auto overflow-hidden relative z-10"
            >
              <img
                className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-105"
                src="https://cdn.shopify.com/s/files/1/0109/2327/8417/files/rsz_jimmys_x_sleepy_owl_espresso_martini_-_available_exclusively_on_drinkjimmyscom-min.jpg?v=1675748554"
                alt="Coffee roasting process"
              />
            </div>
          </div>

          <div className="px-[2rem] sm:px-[5rem] lg:px-[10rem] flex justify-start lg:justify-end py-[1rem] lg:py-[2rem]">
            <div
              ref={image2DivRef}
              className="h-[20rem] sm:h-[30rem] lg:h-[40rem] w-full lg:w-auto overflow-hidden relative z-10"
            >
              <img
                className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-105"
                src="https://imgmediagumlet.lbb.in/media/2020/05/5ec25bc938738b2d37c1d450_1589795785214.jpg"
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
