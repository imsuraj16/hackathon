import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Support",
    text: "An easy way for your audience to say thanks",
    image:
      "https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "Recurring Support",
    text: "Offer memberships to your biggest fans",
    image:
      "https://images.unsplash.com/photo-1529133396358-0f5f0c4a1c8a?q=80&w=687&auto=format&fit=crop",
  },
  {
    title: "Extra Perks",
    text: "Deliver exclusive content to your supporters",
    image:
      "https://images.unsplash.com/photo-1549652127-2e5e59e86a7a?w=600&auto=format&fit=crop&q=60",
  },
];

const transitionVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

function Signup() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      <div className="w-full lg:w-[40%] bg-[#191512] flex items-center justify-center relative overflow-hidden min-h-[40vh] lg:min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute p-4 sm:p-6 lg:p-8 text-center max-w-xs sm:max-w-sm"
            variants={transitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <img
              src={slides[index].image}
              alt={slides[index].title}
              className="mb-3 sm:mb-4 rounded-xl shadow-lg w-full h-32 sm:h-40 lg:h-48 object-cover"
            />

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {slides[index].title}
            </h2>
            <p className="text-white text-sm sm:text-base">
              {slides[index].text}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 lg:hidden">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[60%] bg-[#E6E5E1] flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-8 lg:py-0 relative min-h-[60vh] lg:min-h-screen">
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 lg:right-10 text-xs sm:text-sm">
          <span className="text-gray-600">Already have an account?</span>{" "}
          <Link
            to="/login"
            className="text-orange-500 font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>

        <div className="max-w-md mx-auto lg:mx-0 w-full">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-center lg:text-left">
            Create your account
          </h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base text-center lg:text-left">
            Choose a username for your page.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center mb-6">
            <span className="bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 sm:py-2 rounded-t-md sm:rounded-l-md sm:rounded-t-none border border-gray-300 sm:border-r-0 text-sm sm:text-base whitespace-nowrap">
              buymeacoffee.com/
            </span>
            <input
              type="text"
              placeholder="yourname"
              className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-b-md sm:rounded-r-md sm:rounded-b-none focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
            />
          </div>

          <button className="w-full sm:w-auto bg-orange-400 text-black font-medium px-6 sm:px-8 py-3 rounded-full hover:bg-[#FFA300] transition duration-200 text-sm sm:text-base">
            Sign up
          </button>

          <p className="text-xs sm:text-sm text-gray-500 mt-6 text-center lg:text-left leading-relaxed">
            By continuing, you agree to the{" "}
            <a href="#" className="underline text-gray-700 hover:text-gray-900">
              terms of service
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-gray-700 hover:text-gray-900">
              privacy policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
