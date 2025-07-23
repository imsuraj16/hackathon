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
    <div className="flex min-h-screen w-full">
      {/* Left Side */}
      <div className="w-[40%] bg-[#191512] flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute p-8 text-center max-w-sm"
            variants={transitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <img
              src={slides[index].image}
              alt={slides[index].title}
              className="mb-4 rounded-xl shadow-lg w-full h-100 object-cover"
            />

            <h2 className="text-2xl font-bold text-white mb-2">
              {slides[index].title}
            </h2>
            <p className="text-white text-base">{slides[index].text}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Side */}
      <div className="w-[60%] bg-[#E6E5E1] flex flex-col justify-center px-16 relative">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Create your account</h1>
          <p className="text-gray-600 mb-6">Choose a username for your page.</p>
          <div className="flex items-center mb-6">
            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-l-md border border-gray-300 border-r-0">
              buymeacoffee.com/
            </span>
            <input
              type="text"
              placeholder="yourname"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <button className="bg-orange-400 text-black font-medium px-6 py-3 rounded-full hover:bg-[#FFA300] transition duration-200">
            Sign up
          </button>
          <p className="text-sm text-gray-500 mt-6">
            By continuing, you agree to the{" "}
            <a href="#" className="underline text-gray-700">
              terms of service
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-gray-700">
              privacy policy
            </a>
            .
          </p>
        </div>

        {/* Top Right Link */}
        <div className="absolute top-6 right-10 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
