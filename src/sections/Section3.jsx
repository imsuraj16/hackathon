import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mockImages from "../utils/images";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: "FILTER KAAPI",
    price: "FROM ₹425",
    image: "//sleepyowl.co/cdn/shop/files/Filter_Kaapi_FOP_1080x.jpg?v=1748328537",
    intensity: 4,
    notes: "BOLD & RICH"
  },
  {
    name: "XPRESSO",
    price: "FROM ₹449",
    image: "//sleepyowl.co/cdn/shop/files/1_50c981b5-ac1a-42de-9f6f-2eb722705b05_1080x.jpg?v=1696421633",
    intensity: 5,
    notes: "STRONG & AROMATIC"
  },
  {
    name: "INSTANT COFFEE",
    price: "FROM ₹1299",
    image: "//sleepyowl.co/cdn/shop/files/PO96_02_1080x.jpg?v=1706685858",
    intensity: 3,
    notes: "SMOOTH & REFRESHING"
  }
];

const sleepyOwlSelections = [
  "Original Cold Brew",
  "Dark Roast Blend",
  "French Vanilla",
  "Hazelnut Delight",
  "Signature Blend",
  "Premium Arabica",
  "Espresso Roast"
];

const Section3 = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const selectionsRef = useRef(null);
  const imageRef = useRef(null);
  const imageContainerRef = useRef(null);
  const cardsRef = useRef(null);
  const selectionItemsRef = useRef([]);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Preload all images for smoother transition
    sleepyOwlSelections.forEach((_, i) => {
      const img = new Image();
      img.src = mockImages[i];
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse"
          }
        }
      );

      // Selection items animation
      gsap.fromTo(selectionItemsRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
          scrollTrigger: {
            trigger: selectionsRef.current,
            start: "top 70%", end: "bottom 30%", toggleActions: "play none none reverse"
          }
        }
      );

      // Image container animation
      gsap.fromTo(imageContainerRef.current,
        { scale: 0.8, opacity: 0, rotation: -5 },
        {
          scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse"
          }
        }
      );

      // Product cards animation
      gsap.fromTo(cardsRef.current.children,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const cinematicImageTransition = (newIndex) => {
    if (isTransitioning || newIndex === imageIndex) return;

    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setImageIndex(newIndex);
        setIsTransitioning(false);
      }
    });

    tl
      .to(imageRef.current, {
        scale: 0.7,
        opacity: 0.3,
        rotation: -8,
        filter: "blur(8px)",
        duration: 0.4,
        ease: "power2.in"
      })
      .to(overlayRef.current, {
        opacity: 0.8,
        duration: 0.15,
        ease: "power2.inOut"
      }, "-=0.1")
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: "power2.inOut"
      })
      .fromTo(imageRef.current,
        {
          scale: 1.3,
          opacity: 0,
          rotation: 12,
          filter: "blur(12px) brightness(1.3)",
          transformOrigin: "center center"
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          filter: "blur(0px) brightness(1)",
          duration: 0.6,
          ease: "back.out(1.4)"
        }
      )
      .to(imageRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
  };

  const handleSelectionHover = (index) => {
    cinematicImageTransition(index);
    gsap.to(selectionItemsRef.current[index], {
      x: 10,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleSelectionLeave = (index) => {
    gsap.to(selectionItemsRef.current[index], {
      x: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleSelectionClick = (index) => {
    cinematicImageTransition(index);
  };

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#E6E5E1] px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 2xl:px-80 py-12 md:py-20 lg:py-32 flex flex-col gap-12 md:gap-16 lg:gap-32"
    >
      <div ref={headerRef} className="w-full flex items-center">
        <div className="flex flex-col gap-6 md:gap-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight md:leading-[4.5rem]">
            The <br /> Sleepy Owl <br /> Collection
          </h1>
          <p className="w-full sm:w-80 md:w-96 text-sm md:text-base text-gray-700 leading-relaxed">
            From cold brew pioneers to coffee connoisseurs, Sleepy Owl brings you premium coffee experiences...
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
        <div ref={selectionsRef} className="w-full lg:w-1/2 pt-0 lg:pt-20">
          {sleepyOwlSelections.map((selection, i) => (
            <div
              key={i}
              ref={el => selectionItemsRef.current[i] = el}
              onMouseEnter={() => handleSelectionHover(i)}
              onMouseLeave={() => handleSelectionLeave(i)}
              onClick={() => handleSelectionClick(i)}
              className="flex items-center justify-between gap-4 border-b-2 border-gray-400 w-full p-4 md:p-6 hover:bg-white transition-all duration-300 ease-in-out cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <h1 className="text-base md:text-lg font-semibold text-gray-600">
                  {String(i + 1).padStart(2, '0')}
                </h1>
                <p className="text-sm md:text-base font-medium">{selection}</p>
              </div>
              <div className="w-8 h-8 bg-[#D9D8D6] rounded-full flex items-center justify-center group-hover:bg-gray-300 transition-all duration-300 group-hover:rotate-45">
                <ArrowRight className="text-black text-sm" size={16} />
              </div>
            </div>
          ))}
        </div>

        <div
          ref={imageContainerRef}
          className="w-full lg:w-1/2 h-64 md:h-80 lg:h-[41rem] flex items-center justify-center px-4 lg:px-8 relative overflow-hidden"
        >
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-white opacity-0 z-10 pointer-events-none rounded-2xl"
          />

          <img
            ref={imageRef}
            className="h-full w-full max-w-md object-cover rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl relative z-0"
            src={mockImages[imageIndex]}
            alt={`${sleepyOwlSelections[imageIndex]} coffee`}
            loading="lazy"
            style={{ filter: 'contrast(1.05) saturate(1.1)' }}
          />

          <div className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
        </div>
      </div>

      <div className="w-full flex justify-center my-8 md:my-16">
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl">
          {products.map((product, i) => (
            <div
              key={i}
              className="product-card relative bg-[#ebe9e4] border border-[#ebe9e4] rounded-[22px] px-6 md:px-8 py-8 md:py-10 flex flex-col items-center w-full max-w-[350px] mx-auto shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -10, scale: 1.02, duration: 0.3, ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0, scale: 1, duration: 0.3, ease: "power2.out"
                });
              }}
            >
              <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 w-7 h-[14px] rounded-full bg-white shadow" />
              <img
                src={product.image}
                alt={product.name}
                className="object-cover h-32 md:h-44 w-32 md:w-44 rounded-lg select-none mx-auto shadow-md transition-transform duration-300 hover:scale-110"
                loading="lazy"
              />
              <div className="w-full my-6 md:my-9 flex items-center justify-center">
                <div className="w-full bg-white rounded-xl px-4 md:px-6 py-3 md:py-4 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="uppercase font-normal tracking-wider text-sm md:text-base lg:text-[17px] leading-tight text-[#181818] flex-1 pr-2">
                    {product.name}
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#e0dfdb] flex items-center justify-center hover:bg-[#d5d4cf] transition-all duration-300 cursor-pointer hover:rotate-90">
                      <ChevronRight className="text-[#868686]" size={18} />
                    </div>
                  </div>
                </div>
              </div>
              {product.intensity && (
                <div className="w-full mb-3 flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 uppercase font-semibold tracking-wider text-sm md:text-[15px] text-[#232323] mb-2">
                    <span>Intensity:</span>
                    <span className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(idx => (
                        <div
                          key={idx}
                          className={`w-4 h-5 md:w-5 md:h-6 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                            idx <= product.intensity
                              ? 'bg-[#191919] border-[#191919]'
                              : 'bg-transparent border-[#cccccc]'
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                  {product.notes && (
                    <div className="font-normal text-sm md:text-[15px] tracking-wider uppercase text-[#232323] mb-2">
                      Notes: {product.notes}
                    </div>
                  )}
                </div>
              )}
              <div className="w-full mt-auto">
                <hr className="w-full border-t border-[#e5e5e5] my-2" />
                <div className="mt-3 md:mt-4 text-center font-light tracking-wider text-lg md:text-[19px] text-[#232323] min-h-[28px] flex items-center justify-center">
                  {product.price}
                </div>
              </div>
              <div className="absolute -bottom-[14px] left-1/2 -translate-x-1/2 w-7 h-[14px] rounded-full bg-white shadow" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section3;
