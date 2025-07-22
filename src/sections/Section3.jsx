import React, { useState } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import mockImages from "../utils/images";

const products = [
  {
    name: "HOT COFFEE BAGS",
    price: "FROM ₹299",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop&crop=center",
    intensity: 4,
    notes: "BOLD & RICH"
  },
  {
    name: "COLD BREW BAGS",
    price: "FROM ₹399",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=300&h=300&fit=crop&crop=center",
    intensity: 3,
    notes: "SMOOTH & REFRESHING"
  },
  {
    name: "INSTANT COFFEE",
    price: "FROM ₹199",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop&crop=center",
    intensity: 5,
    notes: "STRONG & AROMATIC"
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

  return (
    <div className="w-full bg-[#E6E5E1] px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 2xl:px-80 py-12 md:py-20 lg:py-32 flex flex-col gap-12 md:gap-16 lg:gap-32">
      {/* Header Section */}
      <div className="w-full flex items-center">
        <div className="flex flex-col gap-6 md:gap-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight md:leading-[4.5rem]">
            The <br /> Sleepy Owl <br /> Collection
          </h1>
          <p className="w-full sm:w-80 md:w-96 text-sm md:text-base text-gray-700 leading-relaxed">
            From cold brew pioneers to coffee connoisseurs, Sleepy Owl brings you premium coffee experiences. Our carefully curated selection features bold flavors, smooth blends, and innovative brewing methods that have revolutionized the Indian coffee scene.
          </p>
        </div>
      </div>

      {/* Selectable Image Cards Section */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
        <div className="w-full lg:w-1/2 pt-0 lg:pt-20">
          {sleepyOwlSelections.map((selection, i) => (
            <div
              key={i}
              onMouseEnter={() => setImageIndex(i)}
              onClick={() => setImageIndex(i)}
              className="flex items-center justify-between gap-4 border-b-2 border-gray-400 w-full p-4 md:p-6 hover:bg-white transition-all duration-300 ease-in-out cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <h1 className="text-base md:text-lg font-semibold text-gray-600">
                  {String(i + 1).padStart(2, '0')}
                </h1>
                <p className="text-sm md:text-base font-medium">{selection}</p>
              </div>
              <div className="w-8 h-8 bg-[#D9D8D6] rounded-full flex items-center justify-center group-hover:bg-gray-300 transition-colors duration-200">
                <ArrowRight className="text-black text-sm" size={16} />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/2 h-64 md:h-80 lg:h-[41rem] flex items-center justify-center px-4 lg:px-8">
          <img
            className="h-full w-full max-w-md object-cover rounded-2xl shadow-lg transition-opacity duration-300"
            src={mockImages[imageIndex]}
            alt={`${sleepyOwlSelections[imageIndex]} coffee`}
            loading="lazy"
          />
        </div>
      </div>

      {/* Products Cards Section */}
      <div className="w-full flex justify-center my-8 md:my-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl">
          {products.map((product, i) => (
            <div
              key={i}
              className="relative bg-[#ebe9e4] border border-[#ebe9e4] rounded-[22px] px-6 md:px-8 py-8 md:py-10 flex flex-col items-center w-full max-w-[350px] mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Top round tab */}
              <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 w-7 h-[14px] rounded-full bg-white shadow" />
              
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="object-cover h-32 md:h-44 w-32 md:w-44 rounded-lg select-none mx-auto shadow-md"
                loading="lazy"
              />

              {/* Name + Arrow Button */}
              <div className="w-full my-6 md:my-9 flex items-center justify-center">
                <div className="w-full bg-white rounded-xl px-4 md:px-6 py-3 md:py-4 flex justify-between items-center shadow-sm">
                  <div className="uppercase font-normal tracking-wider text-sm md:text-base lg:text-[17px] leading-tight text-[#181818] flex-1 pr-2">
                    {product.name}
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#e0dfdb] flex items-center justify-center hover:bg-[#d5d4cf] transition-colors duration-200 cursor-pointer">
                      <ChevronRight className="text-[#868686]" size={18} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Intensity & Notes */}
              {product.intensity && (
                <div className="w-full mb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 uppercase font-semibold tracking-wider text-sm md:text-[15px] text-[#232323] mb-2">
                    <span>Intensity:</span>
                    <span className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(idx => (
                        <div
                          key={idx}
                          className={`w-4 h-5 md:w-5 md:h-6 rounded-full border-2 transition-colors duration-200 ${
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

              {/* Divider and Price */}
              <hr className="w-full border-t border-[#e5e5e5] my-2" />
              <div className="mt-3 md:mt-4 text-center font-light tracking-wider text-lg md:text-[19px] text-[#232323]">
                {product.price}
              </div>

              {/* Bottom round tab */}
              <div className="absolute -bottom-[14px] left-1/2 -translate-x-1/2 w-7 h-[14px] rounded-full bg-white shadow" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section3;