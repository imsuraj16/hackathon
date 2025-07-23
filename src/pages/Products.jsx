import React, { useState, useEffect, useRef } from 'react';
import { products } from "../utils/products";
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const fallbackProducts = [
    {
      id: 1,
      title: "Premium Collection",
      subtitle: "[01]",
      description: "Discover our premium range of carefully curated products designed to elevate your lifestyle and meet your everyday needs.",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop&crop=center"
    }
  ];

  const productData = products && products.length > 0 ? products : fallbackProducts;

  const nextProduct = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % productData.length);
    setTimeout(() => setIsAnimating(false), 600); // match animation duration
  };

  const prevProduct = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + productData.length) % productData.length);
    setTimeout(() => setIsAnimating(false), 600);
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

    const container = document.getElementById('product-container');
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isAnimating]);

  const currentProduct = productData[currentIndex];

  const getCircles = (index) => [
    { size: 120 + index * 10, x: 80 + index * 15, y: 200 + index * 20, opacity: 0.15 + index * 0.05 },
    { size: 60 + index * 8, x: 200 - index * 10, y: 250 + index * 15, opacity: 0.1 + index * 0.03 },
    { size: 40 + index * 5, x: 150 + index * 8, y: 320 - index * 10, opacity: 0.2 + index * 0.04 }
  ];

  const circles = getCircles(currentIndex);

  return (
    <div
      id="product-container"
      className="w-full h-screen flex items-center justify-center overflow-hidden relative"
      style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#2A2621' }}
    >
      {/* Background circles */}
      <div className="absolute inset-0">
        {circles.map((circle, index) => (
          <div
            key={`${currentProduct.id || currentIndex}-${index}`}
            className="absolute rounded-full transition-all duration-1000 ease-out"
            style={{
              background: `linear-gradient(135deg, #BDB2A7 0%, #9A8F84 100%)`,
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              left: `${circle.x}px`,
              top: `${circle.y}px`,
              opacity: circle.opacity,
              transform: isAnimating ? 'scale(1.2)' : 'scale(1)',
              filter: 'blur(2px)'
            }}
          />
        ))}
      </div>

      {/* Content area */}
      <div className="w-full max-w-7xl mx-auto px-8 flex items-center justify-between relative z-10">
        {/* Left section */}
        <div className="w-1/2 pr-12">
          <div className="relative overflow-hidden">
            <div className="mb-4 h-8">
              <span
                className={`font-medium transition-all duration-500 ${
                  isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
                }`}
                style={{ color: '#BDB2A7', fontSize: '14px' }}
              >
                {currentProduct.subtitle || `[${String(currentIndex + 1).padStart(2, '0')}]`}
              </span>
            </div>
            <div className="mb-8 overflow-hidden">
              <h1
                className={`text-6xl font-bold text-white leading-tight transition-all duration-700 ${
                  isAnimating ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
                }`}
              >
                {currentProduct.title}
              </h1>
            </div>
            <div className="overflow-hidden">
              <p
                className={`text-lg leading-relaxed transition-all duration-900 ${
                  isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
                }`}
                style={{ color: '#D1C7BC' }}
              >
                {currentProduct.description}
              </p>
            </div>
          </div>
          <button onClick={()=>navigate(`/products/${currentProduct.id}`)} className='bg-amber-800 px-[3rem] py-2 rounded-lg mt-[1.3rem]'>See details</button>
        </div>

        {/* Right section - image */}
        <div className="relative flex justify-center items-center h-[500px] rounded-2xl">
  <img
    src={currentProduct.image}
    alt={currentProduct.title}
    className={`max-h-full max-w-full object-contain transition-all duration-1000 ${
      isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
    }`}
  />
</div>

      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
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
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'scale-125' : 'hover:opacity-70'
            }`}
            style={{
              backgroundColor: index === currentIndex ? '#BDB2A7' : 'rgba(189, 178, 167, 0.3)'
            }}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevProduct}
        disabled={isAnimating}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-sm hover:opacity-80 transition-all duration-300 flex items-center justify-center text-white disabled:opacity-30"
        style={{ backgroundColor: 'rgba(189, 178, 167, 0.1)' }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextProduct}
        disabled={isAnimating}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-sm hover:opacity-80 transition-all duration-300 flex items-center justify-center text-white disabled:opacity-30"
        style={{ backgroundColor: 'rgba(189, 178, 167, 0.1)' }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Product index display */}
      <div className="absolute top-8 right-8 text-sm opacity-60" style={{ color: '#BDB2A7' }}>
        <span>{String(currentIndex + 1).padStart(2, '0')} / {String(productData.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default Products;
