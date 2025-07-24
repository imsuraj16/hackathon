import React, { useState, useEffect, useRef } from "react";
import { products } from "../utils/products";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const navigate = useNavigate();

  const fallbackProducts = [
    {
      id: 1,
      title: "Premium Collection",
      subtitle: "[01]",
      description:
        "Discover our premium range of carefully curated products designed to elevate your lifestyle and meet your everyday needs.",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop&crop=center",
    },
  ];

  const productData =
    products && products.length > 0 ? products : fallbackProducts;

  const nextProduct = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % productData.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevProduct = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + productData.length) % productData.length
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isDownSwipe = distance > 50;
    const isUpSwipe = distance < -50;

    if (isDownSwipe && !isAnimating) {
      nextProduct();
    }
    if (isUpSwipe && !isAnimating) {
      prevProduct();
    }
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      if (isAnimating) return;

      const delta = e.deltaY;

      if (delta > 30) {
        nextProduct();
      } else if (delta < -30) {
        prevProduct();
      }
    };

    const container = document.getElementById("product-container");
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isAnimating]);

  const currentProduct = productData[currentIndex];

  const getCircles = (index) => [
    {
      size: {
        mobile: 80 + index * 8,
        tablet: 100 + index * 9,
        desktop: 120 + index * 10,
      },
      x: {
        mobile: 40 + index * 10,
        tablet: 60 + index * 12,
        desktop: 80 + index * 15,
      },
      y: {
        mobile: 150 + index * 15,
        tablet: 180 + index * 18,
        desktop: 200 + index * 20,
      },
      opacity: 0.15 + index * 0.05,
    },
    {
      size: {
        mobile: 45 + index * 6,
        tablet: 50 + index * 7,
        desktop: 60 + index * 8,
      },
      x: {
        mobile: 120 - index * 8,
        tablet: 160 - index * 9,
        desktop: 200 - index * 10,
      },
      y: {
        mobile: 200 + index * 12,
        tablet: 225 + index * 13,
        desktop: 250 + index * 15,
      },
      opacity: 0.1 + index * 0.03,
    },
    {
      size: {
        mobile: 30 + index * 4,
        tablet: 35 + index * 4,
        desktop: 40 + index * 5,
      },
      x: {
        mobile: 100 + index * 6,
        tablet: 125 + index * 7,
        desktop: 150 + index * 8,
      },
      y: {
        mobile: 260 - index * 8,
        tablet: 290 - index * 9,
        desktop: 320 - index * 10,
      },
      opacity: 0.2 + index * 0.04,
    },
  ];

  const circles = getCircles(currentIndex);

  return (
    <div
      id="product-container"
      className="w-full min-h-screen flex items-center justify-center overflow-hidden relative px-4 sm:px-6 lg:px-8 py-8 lg:py-0"
      style={{ fontFamily: "Inter, sans-serif", backgroundColor: "#2A2621" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0">
        {circles.map((circle, index) => (
          <div
            key={`${currentProduct.id || currentIndex}-${index}`}
            className="absolute rounded-full transition-all duration-1000 ease-out"
            style={{
              background: `linear-gradient(135deg, #BDB2A7 0%, #9A8F84 100%)`,
              width: `${circle.size.mobile}px`,
              height: `${circle.size.mobile}px`,
              left: `${circle.x.mobile}px`,
              top: `${circle.y.mobile}px`,
              opacity: circle.opacity,
              transform: isAnimating ? "scale(1.2)" : "scale(1)",
              filter: "blur(2px)",
            }}
          />
        ))}

        <style jsx>{`
          @media (min-width: 768px) {
            .absolute.rounded-full:nth-child(${1}) {
              width: ${circles[0].size.tablet}px !important;
              height: ${circles[0].size.tablet}px !important;
              left: ${circles[0].x.tablet}px !important;
              top: ${circles[0].y.tablet}px !important;
            }
            .absolute.rounded-full:nth-child(${2}) {
              width: ${circles[1].size.tablet}px !important;
              height: ${circles[1].size.tablet}px !important;
              left: ${circles[1].x.tablet}px !important;
              top: ${circles[1].y.tablet}px !important;
            }
            .absolute.rounded-full:nth-child(${3}) {
              width: ${circles[2].size.tablet}px !important;
              height: ${circles[2].size.tablet}px !important;
              left: ${circles[2].x.tablet}px !important;
              top: ${circles[2].y.tablet}px !important;
            }
          }
          @media (min-width: 1024px) {
            .absolute.rounded-full:nth-child(${1}) {
              width: ${circles[0].size.desktop}px !important;
              height: ${circles[0].size.desktop}px !important;
              left: ${circles[0].x.desktop}px !important;
              top: ${circles[0].y.desktop}px !important;
            }
            .absolute.rounded-full:nth-child(${2}) {
              width: ${circles[1].size.desktop}px !important;
              height: ${circles[1].size.desktop}px !important;
              left: ${circles[1].x.desktop}px !important;
              top: ${circles[1].y.desktop}px !important;
            }
            .absolute.rounded-full:nth-child(${3}) {
              width: ${circles[2].size.desktop}px !important;
              height: ${circles[2].size.desktop}px !important;
              left: ${circles[2].x.desktop}px !important;
              top: ${circles[2].y.desktop}px !important;
            }
          }
        `}</style>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8 lg:gap-0">
        <div className="w-full lg:w-1/2 lg:pr-12 text-center lg:text-left order-2 lg:order-1">
          <div className="relative overflow-hidden">
            <div className="mb-3 sm:mb-4 h-6 sm:h-8">
              <span
                className={`font-medium transition-all duration-500 block ${
                  isAnimating
                    ? "translate-y-8 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
                style={{ color: "#BDB2A7", fontSize: "12px" }}
              >
                {currentProduct.subtitle ||
                  `[${String(currentIndex + 1).padStart(2, "0")}]`}
              </span>
            </div>
            <div className="mb-6 sm:mb-8 overflow-hidden">
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight transition-all duration-700 ${
                  isAnimating
                    ? "translate-y-full opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                {currentProduct.title}
              </h1>
            </div>
            <div className="overflow-hidden mb-6 lg:mb-0">
              <p
                className={`text-sm sm:text-base lg:text-lg leading-relaxed transition-all duration-900 ${
                  isAnimating
                    ? "translate-y-8 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
                style={{ color: "#D1C7BC" }}
              >
                {currentProduct.description}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/products/${currentProduct.id}`)}
            className="bg-amber-800 px-6 sm:px-8 lg:px-12 py-2 sm:py-3 rounded-lg mt-4 sm:mt-6 text-sm sm:text-base text-white hover:bg-amber-700 transition-colors duration-300"
          >
            See details
          </button>
        </div>

        <div className="relative flex justify-center items-center w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl order-1 lg:order-2">
          <img
            src={currentProduct.image}
            alt={currentProduct.title}
            className={`max-h-full max-w-full object-contain transition-all duration-1000 rounded-lg ${
              isAnimating ? "scale-110 opacity-0" : "scale-100 opacity-100"
            }`}
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {productData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating && index !== currentIndex) {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 600);
              }
            }}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "scale-125" : "hover:opacity-70"
            }`}
            style={{
              backgroundColor:
                index === currentIndex ? "#BDB2A7" : "rgba(189, 178, 167, 0.3)",
            }}
          />
        ))}
      </div>

      <button
        onClick={prevProduct}
        disabled={isAnimating}
        className="absolute left-2 sm:left-4 lg:left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-sm hover:opacity-80 transition-all duration-300 flex items-center justify-center text-white disabled:opacity-30 z-20"
        style={{ backgroundColor: "rgba(189, 178, 167, 0.2)", border: "1px solid rgba(189, 178, 167, 0.3)" }}
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextProduct}
        disabled={isAnimating}
        className="absolute right-2 sm:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-sm hover:opacity-80 transition-all duration-300 flex items-center justify-center text-white disabled:opacity-30 z-20"
        style={{ backgroundColor: "rgba(189, 178, 167, 0.2)", border: "1px solid rgba(189, 178, 167, 0.3)" }}
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div
        className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8 text-xs sm:text-sm opacity-60"
        style={{ color: "#BDB2A7" }}
      >
        <span>
          {String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(productData.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default Products;