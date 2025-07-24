import React from "react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import Simple from "../components/Simple";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex font-['Helvetica_Now_Display'] bg-[#191512] overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-1/2 justify-center items-center bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('loginimg.png')" }}
      >
        <Simple />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 bg-[#2C2C2C] text-white px-4 sm:px-6 lg:px-16 py-8 lg:py-12 flex flex-col justify-center min-h-screen"
      >
        <div className="max-w-md mx-auto lg:mx-0 w-full">
          <div className="mb-8 lg:mb-10 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center justify-center lg:justify-start gap-2">
              <img
                src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/59167acc-cfd7-4f04-89e3-143e995c30ea.png"
                alt="logo"
                className="w-10 h-8 sm:w-12 sm:h-9 lg:w-14 lg:h-10"
              />
              Sleepy <span className="text-[#C49A6C]">OWL</span>
            </h2>
          </div>

          <h3 className="text-lg sm:text-xl lg:text-2xl mb-6 lg:mb-4 text-center lg:text-left">
            Welcome Back, Please login to your account
          </h3>

          <form className="flex flex-col gap-4 lg:gap-6">
            <div>
              <label className="block mb-1 text-sm">Email address</label>
              <input
                type="email"
                defaultValue="jubaer@gmail.com"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 lg:py-2 rounded bg-[#3A3A3A] text-white focus:outline-none focus:ring-2 focus:ring-[#C49A6C] text-sm sm:text-base"
              />
            </div>

            <div className="relative">
              <label className="block mb-1 text-sm">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 lg:py-2 rounded bg-[#3A3A3A] text-white focus:outline-none focus:ring-2 focus:ring-[#C49A6C] text-sm sm:text-base pr-10"
              />
              <FaEye className="absolute right-3 top-8 sm:top-9 lg:top-10 text-gray-400 cursor-pointer text-sm sm:text-base" />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-xs sm:text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                Remember me
              </label>
              <a href="#" className="text-[#C49A6C] hover:underline">
                Forgot password?
              </a>
            </div>

            <button className="bg-white text-[#2C2C2C] py-2 sm:py-3 lg:py-2 rounded text-base sm:text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Sign In
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 border py-2 sm:py-3 lg:py-2 rounded border-gray-500 hover:border-gray-400 transition-colors duration-200 text-sm sm:text-base"
            >
              <FaGoogle className="text-sm sm:text-base" />
              Sign in with Google
            </button>
          </form>

          <p className="mt-6 lg:mt-8 text-xs sm:text-sm text-center">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#C49A6C] font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
