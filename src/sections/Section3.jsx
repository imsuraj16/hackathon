import React, { useState } from "react";
import { images } from "../utils/images"; // Apne Sleepy Owl yaa other images ka array


const products = [
  {
    name: "CHRISTMAS CHOCOLATE BAR",
    price: "FROM 4.50€",
    image: "https://www.deuza.fr/3889-large_default/barre-chocolat-elgorriaga-noel-35.jpg",
    intensity: null,
    notes: null
  },
  {
    name: "DONIBANE",
    price: "FROM 7.50€",
    image: "https://www.deuza.fr/3825-large_default/cafe-donibane.jpg",
    intensity: 3,
    notes: "COCOA"
  },
  {
    name: "SALVADOR PACAMARA",
    price: "FROM 11.50€",
    image: "https://www.deuza.fr/3886-large_default/cafe-salvador-pacamara.jpg",
    intensity: 4,
    notes: "FRUITY"
  }
];

const Section3 = () => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="w-full bg-[#E6E5E1] px-[20rem] py-[10rem] flex flex-col gap-[8rem]">
      <div className="w-full flex items-center">
        <div className="flex flex-col gap-[3rem]">
          <h1 className="text-[5rem] leading-[4.5rem]">
            La <br /> collection <br /> DEUZA
          </h1>
          <p className="w-[15rem]">
            Il n’y a pas que le café de caractère qui a conquis le cœur et les tasses des luziens. L’amour des beaux produits a poussé la Maison DEUZA à proposer des thés originaux aux arômes envoutants et savoureux d’une palette riche de près de 140 références.
          </p>
        </div>
      </div>

      {/* Selectable Image Cards */}
      <div className="flex">
        <div className="w-full pt-[5rem]">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              onMouseEnter={() => setImageIndex(i)}
              className="flex items-start justify-start gap-[2rem] border-b-2 border-gray-400 w-fit p-6 hover:bg-white transition-all duration-300 ease-in-out cursor-pointer"
            >
              <h1 className="text-lg font-semibold">0{i + 1}</h1>
              <p className="text-base">Selection de Neol</p>
              <div className="w-8 h-8 bg-[#D9D8D6] rounded-full flex items-center justify-center">
                <i className="ri-arrow-right-s-line text-black text-xl"></i>
              </div>
            </div>
          ))}
        </div>

        <div className="h-[41rem] w-full flex items-center justify-center">
          <img
            className="h-full object-cover rounded-2xl shadow-lg"
            src={images[imageIndex]}
            alt="coffee"
          />
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full flex justify-center my-16">
        <div className="flex gap-8 justify-center flex-wrap">
          {products.map((p, i) => (
            <div
              key={i}
              className="relative bg-[#ebe9e4] border border-[#ebe9e4] rounded-[22px] px-8 py-10 flex flex-col items-center min-w-[340px] max-w-[350px] shadow-[0_0_0_1.5px_#ebe9e4_inset] mx-1"
              style={{ boxShadow: "0 0 0 1.5px #e6e6e1 inset" }}
            >
              {/* Top round tab */}
              <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 w-7 h-[14px] rounded-full bg-white shadow" />
              
              {/* Product Image */}
              <img
                src={p.image}
                alt={p.name}
                className="object-contain h-[180px] select-none mx-auto"
                style={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.11))" }}
              />

              {/* Name + Arrow Button */}
              <div className="w-full my-9 flex items-center justify-center">
                <div className="w-full bg-white rounded-xl px-6 py-4 flex justify-between items-center">
                  <div className="uppercase font-normal tracking-[0.17em] text-[17px] leading-tight text-[#181818] whitespace-pre-line" style={{ letterSpacing: "0.16em" }}>
                    {p.name}
                  </div>
                  <div className="ml-4">
                    <div className="w-9 h-9 rounded-full bg-[#e0dfdb] flex items-center justify-center">
                      <svg width="22" height="22" fill="none">
                        <circle cx="11" cy="11" r="11" fill="#e0dfdb" />
                        <path
                          d="M9.5 7.5l4 4-4 4"
                          stroke="#868686"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Intensity & Notes */}
              {p.intensity && (
                <div className="w-full mb-3">
                  <div className="flex items-center gap-2 uppercase font-semibold tracking-[0.13em] text-[15px] text-[#232323] mb-1">
                    Intensity:
                    <span className="flex gap-1 ml-4">
                      {[1, 2, 3, 4, 5].map(idx => (
                        <svg
                          key={idx}
                          className="inline"
                          width="23"
                          height="23"
                          viewBox="0 0 23 23"
                          fill={idx <= p.intensity ? "#191919" : "none"}
                          stroke="#191919"
                          strokeWidth="1.3"
                        >
                          <ellipse
                            cx="11.5"
                            cy="11.5"
                            rx="7"
                            ry="9"
                            fill={idx <= p.intensity ? "#191919" : "none"}
                            stroke={idx <= p.intensity ? "#191919" : "#cccccc"}
                          />
                        </svg>
                      ))}
                    </span>
                  </div>
                  {p.notes && (
                    <div className="font-normal text-[15px] tracking-[0.11em] uppercase text-[#232323] mb-2">
                      Notes: {p.notes}
                    </div>
                  )}
                </div>
              )}

              {/* Divider and Price */}
              <hr className="w-full border-t border-[#e5e5e5] my-1" />
              <div className="mt-4 text-center font-light tracking-[0.12em] text-[19px] text-[#232323]">
                {p.price}
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
